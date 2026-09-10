import React, { useEffect, useRef } from 'react';

interface TwinkleStar {
  x: number;
  y: number;
  z: number; // 0.2 to 1.0
  baseRadius: number;
  color: string;
  glowColor: string;
  twinkleSpeed: number;
  twinklePhase: number;
  hasGlint: boolean;
  glintAngle: number;
  glintSpeed: number;
}

interface MovingStar {
  x: number;
  y: number;
  z: number;
  speed: number;
  radius: number;
  length: number;
  color: string;
  opacity: number;
}

interface FallingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // in radians (~35-50 deg)
  progress: number; // 0 to 1
  thickness: number;
  headColor: string;
  tailColor: string;
}

export const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
      initElements();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let twinkleStars: TwinkleStar[] = [];
    let movingStars: MovingStar[] = [];
    const fallingStars: FallingStar[] = [];
    let nextFallingStarTime = performance.now() + 500;

    const initElements = () => {
      // 1. Subtle, Calm Twinkling Constellation (~70-85 stars)
      const count = Math.floor(Math.min(window.innerWidth, 1920) * 0.05);
      twinkleStars = Array.from({ length: count }).map(() => {
        const z = 0.2 + Math.random() * 0.8;
        const roll = Math.random();

        let color = 'rgba(240, 248, 255, ';
        let glowColor = 'rgba(0, 242, 254, ';
        if (roll > 0.94) {
          color = 'rgba(196, 181, 253, '; // Soft Violet
          glowColor = 'rgba(167, 139, 250, ';
        } else if (roll > 0.68) {
          color = 'rgba(103, 232, 249, '; // Bright Cyan
          glowColor = 'rgba(0, 242, 254, ';
        } else if (roll > 0.55) {
          color = 'rgba(186, 230, 253, '; // Ice Blue
          glowColor = 'rgba(56, 189, 248, ';
        }

        const isGlintStar = roll > 0.95; // ~5% diamond sparkle stars

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          baseRadius: (isGlintStar ? 1.5 + Math.random() * 0.6 : 0.5 + z * 0.8) * dpr,
          color,
          glowColor,
          twinkleSpeed: 0.0014 + Math.random() * 0.0028,
          twinklePhase: Math.random() * Math.PI * 2,
          hasGlint: isGlintStar,
          glintAngle: Math.random() * Math.PI,
          glintSpeed: (Math.random() - 0.5) * 0.005,
        };
      });

      // 2. Moving Stardust (Sparse, serene occasional stardust stream)
      movingStars = Array.from({ length: 16 }).map(() => {
        const z = 0.3 + Math.random() * 0.7;
        const isCyan = Math.random() > 0.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          speed: (0.4 + z * 0.9) * dpr,
          radius: (0.6 + z * 0.6) * dpr,
          length: (5 + z * 10) * dpr,
          color: isCyan ? '#00f2fe' : '#ffffff',
          opacity: 0.2 + z * 0.35,
        };
      });
    };

    initElements();

    // Spawn a high-speed dramatic falling star (meteor)
    const spawnFallingStar = () => {
      const angle = (Math.PI / 180) * (32 + Math.random() * 22); // 32° to 54°
      const length = (140 + Math.random() * 160) * dpr;
      const speed = 0.016 + Math.random() * 0.018;
      const isCyan = Math.random() > 0.3;

      fallingStars.push({
        x: Math.random() * (width * 0.85),
        y: Math.random() * (height * 0.45),
        length,
        speed,
        angle,
        progress: 0,
        thickness: (1.5 + Math.random() * 1.5) * dpr,
        headColor: '#ffffff',
        tailColor: isCyan ? 'rgba(0, 242, 254, ' : 'rgba(99, 102, 241, ',
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId: number;

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax
      const targetX = mousePos.current.x * 24 * dpr;
      const targetY = mousePos.current.y * 24 * dpr;
      currentOffset.current.x += (targetX - currentOffset.current.x) * 0.04;
      currentOffset.current.y += (targetY - currentOffset.current.y) * 0.04;

      // 1. Render Background Twinkling Stars
      for (let i = 0; i < twinkleStars.length; i++) {
        const star = twinkleStars[i];

        if (!prefersReducedMotion) {
          // Slow background drift
          star.y -= 0.1 * star.z * dpr;
          star.x += 0.03 * star.z * dpr;
          if (star.y < 0) {
            star.y = height;
            star.x = Math.random() * width;
          }
          if (star.x > width) star.x = 0;

          if (star.hasGlint) {
            star.glintAngle += star.glintSpeed;
          }
        }

        const px = star.x + currentOffset.current.x * star.z;
        const py = star.y + currentOffset.current.y * star.z;

        const twinkle = Math.sin(now * star.twinkleSpeed + star.twinklePhase);
        const alpha = Math.max(0.18, Math.min(1.0, 0.48 + 0.52 * twinkle));
        const radius = star.baseRadius * (0.8 + 0.25 * twinkle);

        // Radial glow for brighter stars
        if (star.z > 0.5 || star.hasGlint) {
          ctx.beginPath();
          ctx.arc(px, py, radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = star.glowColor + (alpha * 0.25) + ')';
          ctx.fill();
        }

        // Central star core
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color + alpha + ')';
        ctx.fill();

        // 4-Point cross diffraction glint
        if (star.hasGlint && alpha > 0.48) {
          const rayLen = radius * 3.6;
          const rayAlpha = (alpha - 0.35) * 0.7;

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(star.glintAngle);
          ctx.strokeStyle = star.color + rayAlpha + ')';
          ctx.lineWidth = 0.8 * dpr;

          ctx.beginPath();
          ctx.moveTo(-rayLen, 0);
          ctx.lineTo(rayLen, 0);
          ctx.moveTo(0, -rayLen);
          ctx.lineTo(0, rayLen);
          ctx.stroke();

          ctx.restore();
        }
      }

      // 2. Render Moving / Falling Stars (continuous downward stardust streams)
      if (!prefersReducedMotion) {
        for (let k = 0; k < movingStars.length; k++) {
          const m = movingStars[k];
          m.y += m.speed;
          m.x += m.speed * 0.25; // Subtle diagonal drift

          // Wrap to top
          if (m.y > height + 20) {
            m.y = -20;
            m.x = Math.random() * width;
          }
          if (m.x > width + 20) {
            m.x = -20;
          }

          const px = m.x + currentOffset.current.x * m.z;
          const py = m.y + currentOffset.current.y * m.z;

          // Falling star streak tail
          const tailX = px - m.length * 0.25;
          const tailY = py - m.length;

          const grad = ctx.createLinearGradient(tailX, tailY, px, py);
          grad.addColorStop(0, 'rgba(0, 242, 254, 0)');
          grad.addColorStop(1, m.color === '#00f2fe' ? `rgba(0, 242, 254, ${m.opacity})` : `rgba(255, 255, 255, ${m.opacity})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = grad;
          ctx.lineWidth = m.radius;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Star point head
          ctx.beginPath();
          ctx.arc(px, py, m.radius * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = m.color;
          ctx.fill();
        }
      }

      // 3. Render Large Cinematic Falling Stars (Meteors)
      if (!prefersReducedMotion) {
        // Spawns an occasional shooting star every 4.5 to 8.5 seconds, max 1 active
        if (now > nextFallingStarTime && fallingStars.length < 1) {
          spawnFallingStar();
          nextFallingStarTime = now + 4500 + Math.random() * 4000;
        }

        for (let j = fallingStars.length - 1; j >= 0; j--) {
          const meteor = fallingStars[j];
          meteor.progress += meteor.speed;

          if (meteor.progress >= 1) {
            fallingStars.splice(j, 1);
            continue;
          }

          const travelDist = meteor.progress * (height * 0.9);
          const headX = meteor.x + Math.cos(meteor.angle) * travelDist;
          const headY = meteor.y + Math.sin(meteor.angle) * travelDist;

          const tailX = headX - Math.cos(meteor.angle) * meteor.length;
          const tailY = headY - Math.sin(meteor.angle) * meteor.length;

          // Smooth fade in & out
          const lifeAlpha =
            meteor.progress < 0.15
              ? meteor.progress / 0.15
              : meteor.progress > 0.7
              ? (1 - meteor.progress) / 0.3
              : 1;

          // Meteor Glow Trail
          const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
          gradient.addColorStop(0, meteor.tailColor + '0)');
          gradient.addColorStop(0.6, meteor.tailColor + (0.5 * lifeAlpha) + ')');
          gradient.addColorStop(0.9, `rgba(255, 255, 255, ${0.85 * lifeAlpha})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${lifeAlpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(headX, headY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = meteor.thickness;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Brilliant Incandescent Meteor Head
          ctx.beginPath();
          ctx.arc(headX, headY, meteor.thickness * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${lifeAlpha})`;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 14 * dpr;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030509]">
      {/* 1. Ambient Volumetric Cosmic Glows */}
      <div
        className="ambient-orb-1 absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] rounded-full blur-[140px] pointer-events-none opacity-35"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 242, 254, 0.24) 0%, rgba(99, 102, 241, 0.14) 50%, transparent 70%)',
        }}
      />
      <div
        className="ambient-orb-2 absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] rounded-full blur-[150px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(14, 165, 233, 0.12) 50%, transparent 70%)',
        }}
      />
      <div
        className="ambient-orb-3 absolute -bottom-[10%] left-[25%] w-[55vw] h-[55vw] rounded-full blur-[160px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 242, 254, 0.2) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
        }}
      />

      {/* 2. Soft Celestial Grid */}
      <div className="ambient-grid absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] opacity-60" />

      {/* 3. HTML5 Canvas for Twinkling Stars, Falling Stardust & Meteors */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
