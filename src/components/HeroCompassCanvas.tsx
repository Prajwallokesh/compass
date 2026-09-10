import React, { useEffect, useRef } from 'react';

interface HeroCompassCanvasProps {
  mousePos: { x: number; y: number }; // normalized -1 to 1
}

export const HeroCompassCanvas: React.FC<HeroCompassCanvasProps> = ({ mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const currentOffset = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef(mousePos);

  // Keep mouse position synchronized without restarting the canvas lifecycle
  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getCanvasDims = () => ({
      w: canvas.offsetWidth > 0 ? canvas.offsetWidth : window.innerWidth,
      h: canvas.offsetHeight > 0 ? canvas.offsetHeight : window.innerHeight,
    });

    let dims = getCanvasDims();
    let width = (canvas.width = dims.w * window.devicePixelRatio);
    let height = (canvas.height = dims.h * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      dims = getCanvasDims();
      width = canvas.width = dims.w * window.devicePixelRatio;
      height = canvas.height = dims.h * window.devicePixelRatio;
    };

    window.addEventListener('resize', handleResize);

    // 24 Constellation nodes distributed across 3 orbital rings
    const nodeCount = 24;
    const nodes: { angle: number; radius: number; speed: number; pulsePhase: number; size: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const ringIndex = i % 3;
      const baseRadius = ringIndex === 0 ? 60 : ringIndex === 1 ? 100 : 145;
      nodes.push({
        angle: (i / nodeCount) * Math.PI * 2,
        radius: baseRadius + (i % 2 === 0 ? 12 : -10),
        speed: (0.0003 + (i % 3) * 0.0001), // subtle slow clockwise drift
        pulsePhase: Math.random() * Math.PI * 2,
        size: i % 4 === 0 ? 2.8 : 1.6,
      });
    }

    // 8 Cyber telemetry pulses along guide rays
    const pulses = Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      length: 160 + (i % 2) * 50,
      progress: (i / 8),
      speed: 0.0025 + (i % 2) * 0.0015,
    }));

    let rotation = 0;
    let lastTime = performance.now();
    let isVisible = true;

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const render = (currentTime: number) => {
      if (!isVisible) {
        lastTime = currentTime;
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      // Delta time in seconds, clamped to 0.1s
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Ultra-calm, completely slow clockwise rotation (~80s per full 360° turn)
      rotation += dt * 0.078;

      ctx.clearRect(0, 0, width, height);

      // Lerp mouse offset for restrained, smooth parallax (max 10-14px)
      const targetOffsetX = mousePosRef.current.x * 12 * window.devicePixelRatio;
      const targetOffsetY = mousePosRef.current.y * 12 * window.devicePixelRatio;
      currentOffset.current.x += (targetOffsetX - currentOffset.current.x) * 0.05;
      currentOffset.current.y += (targetOffsetY - currentOffset.current.y) * 0.05;

      const centerX = width / 2 + currentOffset.current.x;
      const centerY = height / 2 + currentOffset.current.y;
      const baseScale = Math.min(width, height) / (dims.w < 640 ? 440 : 620);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(baseScale, baseScale);

      // =========================================================================
      // LAYER 1: FIXED OUTER RETICLE & HUD FRAME (Stationary Reference Frame)
      // =========================================================================

      // Outer HUD corner brackets
      const bracketDist = 295;
      const bracketLen = 18;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
      ctx.lineWidth = 1.2;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(-bracketDist, -bracketDist + bracketLen);
      ctx.lineTo(-bracketDist, -bracketDist);
      ctx.lineTo(-bracketDist + bracketLen, -bracketDist);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(bracketDist - bracketLen, -bracketDist);
      ctx.lineTo(bracketDist, -bracketDist);
      ctx.lineTo(bracketDist, -bracketDist + bracketLen);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(bracketDist, bracketDist - bracketLen);
      ctx.lineTo(bracketDist, bracketDist);
      ctx.lineTo(bracketDist - bracketLen, bracketDist);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(-bracketDist + bracketLen, bracketDist);
      ctx.lineTo(-bracketDist, bracketDist);
      ctx.lineTo(-bracketDist, bracketDist - bracketLen);
      ctx.stroke();

      // Fixed outer bezel guide rings
      ctx.beginPath();
      ctx.arc(0, 0, 278, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 284, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Fixed cardinal index crosshair notches at 12, 3, 6, 9 o'clock
      const fixedCrosshairs = [
        { x: 0, y: -284, dx: 0, dy: -8 },
        { x: 284, y: 0, dx: 8, dy: 0 },
        { x: 0, y: 284, dx: 0, dy: 8 },
        { x: -284, y: 0, dx: -8, dy: 0 },
      ];
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.55)';
      ctx.lineWidth = 1.5;
      fixedCrosshairs.forEach((c) => {
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x + c.dx, c.y + c.dy);
        ctx.stroke();
      });

      // =========================================================================
      // LAYER 2: ROTATING COMPASS INSTRUMENT ASSEMBLY (COMPLETELY SLOW CLOCKWISE)
      // =========================================================================
      ctx.save();
      ctx.rotate(rotation);

      // --- 2A. Telemetry Degree Ring (Radius 252) with Micro Ticks & Degree Readouts ---
      ctx.beginPath();
      ctx.arc(0, 0, 252, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.22)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 72 radial micro-ticks (every 5 degrees)
      for (let i = 0; i < 72; i++) {
        const rad = (i / 72) * Math.PI * 2;
        const isCardinal = i % 18 === 0; // every 90°
        const isIntercardinal = i % 9 === 0 && !isCardinal; // every 45°
        const isMajor = i % 6 === 0 && !isCardinal && !isIntercardinal; // every 30°

        const len = isCardinal ? 14 : isIntercardinal ? 10 : isMajor ? 7 : 3.5;
        const startR = 252;
        const x1 = Math.cos(rad) * startR;
        const y1 = Math.sin(rad) * startR;
        const x2 = Math.cos(rad) * (startR - len);
        const y2 = Math.sin(rad) * (startR - len);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        if (isCardinal) {
          ctx.strokeStyle = '#00f2fe';
          ctx.lineWidth = 2;
        } else if (isIntercardinal) {
          ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
          ctx.lineWidth = 1.5;
        } else if (isMajor) {
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }

      // Telemetry Degree Numbers at every 45°
      const degreeLabels = [
        { label: '000°', angle: -Math.PI / 2, color: '#00f2fe' },
        { label: '045°', angle: -Math.PI / 4, color: 'rgba(0, 242, 254, 0.6)' },
        { label: '090°', angle: 0, color: 'rgba(255, 255, 255, 0.5)' },
        { label: '135°', angle: Math.PI / 4, color: 'rgba(0, 242, 254, 0.6)' },
        { label: '180°', angle: Math.PI / 2, color: 'rgba(244, 63, 94, 0.7)' },
        { label: '225°', angle: (3 * Math.PI) / 4, color: 'rgba(0, 242, 254, 0.6)' },
        { label: '270°', angle: Math.PI, color: 'rgba(255, 255, 255, 0.5)' },
        { label: '315°', angle: (-3 * Math.PI) / 4, color: 'rgba(0, 242, 254, 0.6)' },
      ];

      ctx.font = '500 8.5px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      degreeLabels.forEach((d) => {
        const textRadius = 265;
        const tx = Math.cos(d.angle) * textRadius;
        const ty = Math.sin(d.angle) * textRadius;
        ctx.fillStyle = d.color;
        ctx.fillText(d.label, tx, ty);
      });

      // --- 2B. Segmented Orbital Radar Calipers (Radius 225) ---
      const arcSegments = [
        { start: 0.15, end: 1.42 },
        { start: 1.72, end: 2.99 },
        { start: 3.29, end: 4.56 },
        { start: 4.86, end: 6.13 },
      ];
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
      arcSegments.forEach((seg) => {
        ctx.beginPath();
        ctx.arc(0, 0, 225, seg.start, seg.end);
        ctx.stroke();
      });

      // Dashed inner telemetry track
      ctx.beginPath();
      ctx.arc(0, 0, 218, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 9]);
      ctx.stroke();
      ctx.setLineDash([]);

      // --- 2C. Primary Cardinal Typography (N, E, S, W) ---
      const cardinalPoints = [
        { label: 'N', x: 0, y: -198, color: '#00f2fe', isNorth: true, chevronDir: -1 },
        { label: 'E', x: 198, y: 0, color: 'rgba(255, 255, 255, 0.75)', isNorth: false },
        { label: 'S', x: 0, y: 198, color: 'rgba(244, 63, 94, 0.8)', isNorth: false, chevronDir: 1 },
        { label: 'W', x: -198, y: 0, color: 'rgba(255, 255, 255, 0.75)', isNorth: false },
      ];

      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      cardinalPoints.forEach((c) => {
        ctx.fillStyle = c.color;
        if (c.isNorth) {
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 10;
        }
        ctx.fillText(c.label, c.x, c.y);
        ctx.shadowBlur = 0;
      });

      // Directional arrow chevron above North
      ctx.beginPath();
      ctx.moveTo(0, -212);
      ctx.lineTo(-5, -205);
      ctx.lineTo(5, -205);
      ctx.closePath();
      ctx.fillStyle = '#00f2fe';
      ctx.fill();

      // --- 2D. Cyber Telemetry Energy Pulses ---
      pulses.forEach((p) => {
        ctx.save();
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.moveTo(48, 0);
        ctx.lineTo(p.length, 0);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();

        p.progress = (p.progress + p.speed) % 1;
        const pulseX = 48 + p.progress * (p.length - 48);
        ctx.beginPath();
        ctx.arc(pulseX, 0, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.85)';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      // --- 2E. Constellation Network & Orbiting Data Beacons ---
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        const n2 = nodes[(i + 1) % nodes.length];
        const x1 = Math.cos(n1.angle) * n1.radius;
        const y1 = Math.sin(n1.angle) * n1.radius;
        const x2 = Math.cos(n2.angle) * n2.radius;
        const y2 = Math.sin(n2.angle) * n2.radius;

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        // Cross chord connections
        if (i % 3 === 0) {
          const crossNode = nodes[(i + 5) % nodes.length];
          ctx.moveTo(x1, y1);
          ctx.lineTo(Math.cos(crossNode.angle) * crossNode.radius, Math.sin(crossNode.angle) * crossNode.radius);
        }
      }
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.14)';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Constellation node stars
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        const nx = Math.cos(n.angle) * n.radius;
        const ny = Math.sin(n.angle) * n.radius;
        const pulse = 0.5 + 0.5 * Math.sin(currentTime * 0.0018 + n.pulsePhase);

        ctx.beginPath();
        ctx.arc(nx, ny, n.size, 0, Math.PI * 2);
        if (idx % 3 === 0) {
          ctx.fillStyle = `rgba(0, 242, 254, ${0.45 + 0.55 * pulse})`;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 6 * pulse;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + 0.35 * pulse})`;
          ctx.fill();
        }
      });

      // =========================================================================
      // LAYER 3: THE BRAND-NEW 8-POINT CYBER-STAR COMPASS ROSE & NEEDLE
      // =========================================================================

      // --- 3A. Secondary Intercardinal Blades (NE, SE, SW, NW at 45°) ---
      for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate(Math.PI / 4 + (i * Math.PI) / 2);

        // Left facet
        ctx.beginPath();
        ctx.moveTo(0, -78);
        ctx.lineTo(-9, -12);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(99, 102, 241, 0.22)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Right facet
        ctx.beginPath();
        ctx.moveTo(0, -78);
        ctx.lineTo(9, -12);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 242, 254, 0.1)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      }

      // --- 3B. East & West Primary Horizontal Diamond Wings ---
      // West Wing
      ctx.beginPath();
      ctx.moveTo(-125, 0);
      ctx.lineTo(-14, -13);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.16)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-125, 0);
      ctx.lineTo(-14, 13);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // East Wing
      ctx.beginPath();
      ctx.moveTo(125, 0);
      ctx.lineTo(14, -13);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(125, 0);
      ctx.lineTo(14, 13);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // --- 3C. South Primary Needle Blade (Rose / Crimson Accent) ---
      const southGradL = ctx.createLinearGradient(0, 0, 0, 155);
      southGradL.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
      southGradL.addColorStop(1, 'rgba(244, 63, 94, 0.85)');

      // South facet left
      ctx.beginPath();
      ctx.moveTo(0, 155);
      ctx.lineTo(-16, 14);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(244, 63, 94, 0.22)';
      ctx.fill();
      ctx.strokeStyle = southGradL;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // South facet right
      ctx.beginPath();
      ctx.moveTo(0, 155);
      ctx.lineTo(16, 14);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(244, 63, 94, 0.1)';
      ctx.fill();
      ctx.strokeStyle = southGradL;
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // South central spine
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 155);
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.9)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // --- 3D. North Primary Needle Blade (Glowing Dual-Facet Electric Cyan) ---
      const northGradL = ctx.createLinearGradient(0, -182, 0, 0);
      northGradL.addColorStop(0, '#00f2fe');
      northGradL.addColorStop(0.7, 'rgba(2, 132, 199, 0.7)');
      northGradL.addColorStop(1, 'rgba(99, 102, 241, 0.3)');

      const northGradR = ctx.createLinearGradient(0, -182, 0, 0);
      northGradR.addColorStop(0, '#38bdf8');
      northGradR.addColorStop(0.7, 'rgba(56, 189, 248, 0.4)');
      northGradR.addColorStop(1, 'rgba(14, 165, 233, 0.15)');

      // North Left Facet (Brighter specular side)
      ctx.beginPath();
      ctx.moveTo(0, -182);
      ctx.lineTo(-18, -14);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.3)';
      ctx.fill();
      ctx.strokeStyle = northGradL;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // North Right Facet
      ctx.beginPath();
      ctx.moveTo(0, -182);
      ctx.lineTo(18, -14);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 242, 254, 0.14)';
      ctx.fill();
      ctx.strokeStyle = northGradR;
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // North Razor Spine Line with luminous glow
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -182);
      ctx.strokeStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // North Needle Tip Diamond Jewel
      ctx.beginPath();
      ctx.arc(0, -182, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // =========================================================================
      // LAYER 4: CENTRAL QUANTUM APERTURE & CORE NEXUS
      // =========================================================================
      const corePulse = 0.5 + 0.5 * Math.sin(currentTime * 0.0022);

      // Core radial ambient glow bloom
      const hubBloom = ctx.createRadialGradient(0, 0, 0, 0, 0, 42);
      hubBloom.addColorStop(0, `rgba(0, 242, 254, ${0.4 + 0.2 * corePulse})`);
      hubBloom.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
      hubBloom.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fillStyle = hubBloom;
      ctx.fill();

      // Intermediate cyber aperture ring with crosshair lines
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Micro crosshair notches at center aperture
      const crosshairNotches = [
        { x: 0, y: -26, len: 4 },
        { x: 26, y: 0, len: 4 },
        { x: 0, y: 26, len: 4 },
        { x: -26, y: 0, len: 4 },
      ];
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 1.2;
      crosshairNotches.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.fill();
      });

      // Inner jewel ring
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(8, 14, 30, 0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center pivot jewel point
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12 * (0.8 + 0.4 * corePulse);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bright center pin
      ctx.beginPath();
      ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore(); // Restore rotating compass assembly
      ctx.restore(); // Restore center translate & scale

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0"
    />
  );
};
