import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutVisionMission: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Vision &amp; Mission
            </span>
          </h2>
        </div>

        {/* 2-Column Pure Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Card 1: Our Vision */}
          <div className="group relative p-6 sm:p-10 lg:p-14 rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-center shadow-[0_16px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(0,242,254,0.12)] hover:-translate-y-1.5 overflow-hidden">
            {/* Subtle top glowing accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

            {/* Background Watermark */}
            <span className="absolute right-6 bottom-4 text-6xl sm:text-8xl font-black tracking-tighter text-white/[0.02] group-hover:text-cyan-400/[0.05] transition-colors duration-500 pointer-events-none font-mono">
              VISION
            </span>

            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight group-hover:text-cyan-100 transition-colors">
                Our Vision
              </h3>

              {/* Statement */}
              <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed">
                To build a <span className="text-white font-medium">student-driven innovation ecosystem</span> that empowers learners to shape the future through{' '}
                <span className="text-cyan-300 font-medium">Artificial Intelligence</span>,{' '}
                <span className="text-white font-medium">emerging technologies</span>, and{' '}
                <span className="text-cyan-300 font-medium">responsible innovation</span>.
              </p>
            </div>
          </div>

          {/* Card 2: Our Mission */}
          <div className="group relative p-6 sm:p-10 lg:p-14 rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-500 flex flex-col justify-center shadow-[0_16px_50px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)] hover:-translate-y-1.5 overflow-hidden">
            {/* Subtle top glowing accent line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Ambient Aura */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

            {/* Background Watermark */}
            <span className="absolute right-6 bottom-4 text-6xl sm:text-8xl font-black tracking-tighter text-white/[0.02] group-hover:text-indigo-400/[0.05] transition-colors duration-500 pointer-events-none font-mono">
              MISSION
            </span>

            <div className="relative z-10">
              {/* Title */}
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight group-hover:text-indigo-100 transition-colors">
                Our Mission
              </h3>

              {/* Statement */}
              <p className="text-base sm:text-xl lg:text-2xl text-slate-200 font-light leading-relaxed">
                To transform students from <span className="text-white font-medium">technology learners into technology creators</span> through{' '}
                <span className="text-indigo-300 font-medium">AI-driven learning</span>, hands-on experimentation, collaborative projects, research,{' '}
                <span className="text-white font-medium">hackathons, ideathons</span>, industry engagement, and{' '}
                <span className="text-indigo-300 font-medium">real-world innovation</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
