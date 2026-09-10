import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Cpu, Network, Database, Sparkles, Activity } from 'lucide-react';

interface AiNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseSpeed: number;
  pulsePhase: number;
  group: number;
}

interface DataPacket {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export const AiSection: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener('resize', handleResize);

    const nodeCount = 38;
    const nodes: AiNode[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // Extremely slow movement
        vy: (Math.random() - 0.5) * 0.25,
        radius: 2 + Math.random() * 2.5,
        baseRadius: 2 + Math.random() * 2.5,
        pulseSpeed: 0.0015 + Math.random() * 0.002,
        pulsePhase: Math.random() * Math.PI * 2,
        group: Math.floor(Math.random() * 3),
      });
    }

    // Active data transmission packets
    const packets: DataPacket[] = [];
    for (let i = 0; i < 14; i++) {
      const from = Math.floor(Math.random() * nodeCount);
      let to = Math.floor(Math.random() * nodeCount);
      while (to === from) to = Math.floor(Math.random() * nodeCount);
      packets.push({
        from,
        to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      });
    }

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;

    const render = (time: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Move and update nodes gently
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Soft bounce off margins
          if (n.x < 30 || n.x > width - 30) n.vx *= -1;
          if (n.y < 30 || n.y > height - 30) n.vy *= -1;
        }

        // Pulse calculation
        const pulse = 0.5 + 0.5 * Math.sin(time * n.pulseSpeed + n.pulsePhase);
        n.radius = n.baseRadius + pulse * 1.5;
      }

      // 2. Draw connections (lines illuminate occasionally)
      const maxDistance = 160 * window.devicePixelRatio;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            const wave = 0.5 + 0.5 * Math.sin(time * 0.001 + (i + j) * 0.4);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha * (0.6 + 0.4 * wave)})`;
            ctx.lineWidth = 0.8 * window.devicePixelRatio;
            ctx.stroke();
          }
        }
      }

      // 3. Draw travelling data stream packets
      if (!prefersReducedMotion) {
        packets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress >= 1) {
            p.progress = 0;
            p.from = Math.floor(Math.random() * nodeCount);
            p.to = Math.floor(Math.random() * nodeCount);
          }

          const n1 = nodes[p.from];
          const n2 = nodes[p.to];
          if (!n1 || !n2) return;

          const px = n1.x + (n2.x - n1.x) * p.progress;
          const py = n1.y + (n2.y - n1.y) * p.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.2 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fillStyle = '#00f2fe';
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // 4. Draw Nodes
      nodes.forEach((n) => {
        // Distance to cursor
        const mouseDist = Math.hypot(n.x - mousePos.x * window.devicePixelRatio, n.y - mousePos.y * window.devicePixelRatio);
        const mouseHighlight = mouseDist < 120 * window.devicePixelRatio ? 0.6 : 0;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * window.devicePixelRatio, 0, Math.PI * 2);

        if (n.group === 0) {
          ctx.fillStyle = `rgba(0, 242, 254, ${0.4 + mouseHighlight})`;
        } else if (n.group === 1) {
          ctx.fillStyle = `rgba(99, 102, 241, ${0.45 + mouseHighlight})`;
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${0.35 + mouseHighlight})`;
        }
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const pillars = [
    {
      title: 'INTELLIGENCE',
      icon: Cpu,
      desc: 'Developing specialized fine-tuned models, LoRA adapters, and reasoning engines.',
    },
    {
      title: 'NETWORK',
      icon: Network,
      desc: 'Orchestrating autonomous multi-agent swarms with verifiable tool execution.',
    },
    {
      title: 'DATA',
      icon: Database,
      desc: 'Curating structured domain pipelines, vector indices, and retrieval systems.',
    },
    {
      title: 'CREATION',
      icon: Sparkles,
      desc: 'Deploying multimodal generative interfaces that amplify human productivity.',
    },
  ];

  return (
    <section
      id="ai"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="reveal-init relative py-28 px-4 sm:px-6 lg:px-8 bg-[#04060A]/30 backdrop-blur-[1px] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Required Typography */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>06 // MACHINE INTELLIGENCE HORIZON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 uppercase">
            AI ISN&apos;T THE FUTURE.
          </h2>
          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent uppercase mb-6">
            IT&apos;S NOW.
          </h3>

          <p className="max-w-2xl text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            At COMPASS, we transcend speculative discussions. Our students design, train,
            and deploy state-of-the-art neural architectures on campus computing rigs today.
          </p>
        </div>

        {/* Abstract Interactive Neural Visualization Canvas */}
        <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl bg-[#060913] border border-white/[0.08] shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden mb-12">
          {/* Internal Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Floating Minimalist Telemetry Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex flex-col gap-1 p-3 rounded-lg bg-[#04060A]/80 border border-white/[0.08] backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono uppercase text-cyan-300 tracking-wider">
                NEURAL TOPOLOGY: ACTIVE
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              38 Nodes • Dynamic Shards • 14 Vector Paths
            </span>
          </div>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 hidden sm:flex items-center gap-3 p-3 rounded-lg bg-[#04060A]/80 border border-white/[0.08] backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 uppercase">
              ORGANIC PULSE RATE:
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              0.002 Hz
            </span>
          </div>
        </div>

        {/* 4 Pillars Grid: INTELLIGENCE • NETWORK • DATA • CREATION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#080E1E]/60 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold tracking-wider font-mono text-white mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
