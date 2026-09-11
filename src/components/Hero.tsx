import React, { useState, useEffect } from 'react';
import { HeroCompassCanvas } from './HeroCompassCanvas';

interface HeroProps {
  onOpenApplyModal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState({
    visual: false,
    heading: false,
    subheading: false,
    cta: false,
  });

  // Calm sequence choreography: BACKGROUND -> VISUAL -> HEADING -> DESCRIPTION -> CTA
  useEffect(() => {
    const t1 = setTimeout(() => setStage((s) => ({ ...s, visual: true })), 150);
    const t2 = setTimeout(() => setStage((s) => ({ ...s, heading: true })), 450);
    const t3 = setTimeout(() => setStage((s) => ({ ...s, subheading: true })), 850);
    const t4 = setTimeout(() => setStage((s) => ({ ...s, cta: true })), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    // Dampen heavily so parallax is restrained to 5-15px max
    setMousePos({ x, y });
  };

  return (
    <section
      id="intro"
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] sm:min-h-screen flex flex-col justify-between items-center overflow-hidden bg-transparent pt-16 pb-4 sm:pt-20 sm:pb-8 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* 1. Subtle Background Grid & Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle radial glow following cursor softly */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[120px] transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(0,242,254,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          left: 'calc(50% - 300px)',
          top: 'calc(50% - 300px)',
        }}
      />

      {/* 2. Abstract Digital Compass Canvas */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${stage.visual ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <HeroCompassCanvas mousePos={mousePos} />
      </div>

      {/* 3. Hero Content - Full-Screen Distributed on Mobile & Desktop */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-between text-center w-full min-h-[calc(100svh-5rem)] sm:min-h-[calc(100vh-6rem)] py-2 sm:py-3 flex-1">
        {/* Top Slot: Institutional Header (Department + Association Badge) - Positioned at top just below navbar */}
        <div className="w-full flex flex-col items-center justify-center pt-1 sm:pt-2 mb-auto gap-3.5 sm:gap-4.5">
          <div
            className={`transition-all duration-700 ${stage.visual ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold tracking-[0.2em] sm:tracking-[0.26em] text-cyan-300 uppercase drop-shadow-[0_0_16px_rgba(0,242,254,0.45)]">
              Department of CSE, GEC Hassan
            </p>
          </div>
          <div
            className={`inline-flex items-center justify-center px-5 py-2 sm:px-7 sm:py-2.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md shadow-[0_0_24px_rgba(0,242,254,0.2)] transition-all duration-700 ${stage.visual ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.18em] sm:tracking-[0.24em] text-cyan-300 uppercase">
              COMPASS STUDENT ASSOCIATION
            </span>
          </div>
        </div>

        {/* Center Slot: Main Cinematic Heading + Subheading */}
        <div className="flex flex-col items-center justify-center my-auto py-3 sm:py-4 w-full">
          {/* Main Cinematic Heading: "BUILD THE FUTURE." - Substantially bigger */}
          <h1
            className={`text-[3.85rem] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-3 sm:mb-5 uppercase leading-[0.98] sm:leading-tight ${stage.heading ? 'cinematic-heading' : 'opacity-0'
              }`}
            style={{
              textShadow: '0 0 50px rgba(0, 242, 254, 0.25)',
            }}
          >
            <span className="block text-white">BUILD THE</span>
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              FUTURE.
            </span>
          </h1>

          {/* Subheading - Bigger & more readable */}
          <p
            className={`max-w-2xl text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed mb-4 sm:mb-6 px-3 sm:px-4 transition-all duration-700 ease-out ${stage.subheading
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
              }`}
          >
            The premier Computer Science and Engineering student ecosystem at GECH. We learn emerging technologies, build intelligent solutions, turn breakthrough ideas into reality, and empower the next generation of innovators, engineers, and researchers.
          </p>
        </div>

        {/* Bottom Slot: Tagline */}
        <div
          className={`w-full pb-2 sm:pb-0 sm:mt-6 transition-all duration-1000 ${stage.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto px-4">
            <span className="h-[1px] flex-1 max-w-[32px] sm:max-w-[50px] bg-gradient-to-r from-transparent to-cyan-400/50" />
            <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.18em] sm:tracking-[0.24em] text-cyan-300 uppercase select-none drop-shadow-[0_0_12px_rgba(0,242,254,0.3)] whitespace-nowrap">
              AI ISNT THE FUTURE, ITS NOW
            </p>
            <span className="h-[1px] flex-1 max-w-[32px] sm:max-w-[50px] bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
        </div>
      </div>
    </section>
  );
};
