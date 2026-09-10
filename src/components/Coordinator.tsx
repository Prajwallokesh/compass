import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GraduationCap } from 'lucide-react';

const COORDINATOR_STORAGE_KEY = 'compass_coordinator_photo_v1';

export const Coordinator: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [imgSrc] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(COORDINATOR_STORAGE_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return '/coordinator.jpeg';
  });
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="coordinator"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header - Styled Like Vision & Mission */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            Compass{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Coordinator
            </span>
          </h2>
        </div>

        {/* Flagship Spotlight - Designed with Vision & Mission Material & Aesthetics */}
        <div className="group relative rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_70px_rgba(0,242,254,0.12)] overflow-hidden p-5 sm:p-8 lg:p-12">
          {/* Subtle Top Glowing Accent Line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Background Ambient Auras */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700" />

          {/* Background Watermark */}
          <span className="absolute right-8 bottom-4 text-7xl sm:text-9xl font-black tracking-tighter text-white/[0.02] group-hover:text-cyan-400/[0.04] transition-colors duration-500 pointer-events-none font-mono">
            COORDINATOR
          </span>

          {/* Inside Layout: Tightened Spacing Between Image (Left) + Words (Right) */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-center justify-center">
            {/* Left Column: Portrait & Full Designation */}
            <div className="w-full sm:w-auto lg:w-80 shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Portrait Frame (Finalized View-Only) */}
              <div
                className="group/img relative w-48 h-56 sm:w-64 sm:h-72 rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060B18] shadow-[0_0_30px_rgba(0,242,254,0.15)] flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
              >
                {!imgError ? (
                  <img
                    src={imgSrc}
                    alt="Dr. Vasantha Kumara M - COMPASS Coordinator"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-t from-[#040711] via-[#0b1328] to-[#121c38] flex flex-col items-center justify-center p-6 text-slate-400">
                    <div className="w-20 h-20 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
                      <GraduationCap className="w-10 h-10" />
                    </div>
                    <span className="text-xs font-mono text-cyan-300/90 tracking-widest uppercase text-center">
                      Department of CS&amp;E
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 text-center">
                      GECH • HASSAN
                    </span>
                  </div>
                )}
              </div>

              {/* Designation */}
              <h3 className="text-lg sm:text-2xl lg:text-[26px] xl:text-3xl font-black text-white mt-4 sm:mt-5 mb-1 tracking-tight whitespace-nowrap">
                Dr. Vasantha Kumara M
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold mb-2 tracking-wide uppercase">
                COMPASS Coordinator
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Associate Professor, Department of Computer Science &amp; Engineering<br />
                <span className="text-slate-400">Government Engineering College, Hassan</span>
              </p>
            </div>

            {/* Right Column: Coordinator Address Words */}
            <div className="flex-1 flex flex-col justify-center space-y-5 sm:space-y-6">
              {/* Main Address Quote */}
              <div className="space-y-4 sm:space-y-5 pl-4 sm:pl-6 border-l-2 border-cyan-500/50">
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-light leading-relaxed italic">
                  &ldquo;COMPASS is more than a platform for technical activities &mdash; it is a space where{' '}
                  <span className="text-white font-medium not-italic">curiosity becomes capability</span> and ideas become{' '}
                  <span className="text-cyan-300 font-medium not-italic">meaningful solutions</span>. In an era shaped by Artificial Intelligence and rapidly evolving technology, our students must go beyond the boundaries of the classroom to{' '}
                  <span className="text-white font-medium not-italic">explore, experiment, build, and innovate</span>.&rdquo;
                </p>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed italic">
                  &ldquo;Through COMPASS, I encourage every student to embrace new technologies, participate in{' '}
                  <span className="text-cyan-300 font-medium not-italic">hackathons and ideathons</span>, work on real-world projects, and learn from one another.&rdquo;
                </p>
              </div>

              {/* Department Note Strip */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 flex-wrap gap-2">
                <span className="text-cyan-400/90 font-medium">
                  Department of Computer Science &amp; Engineering • GECH
                </span>
                <span className="text-slate-500">Affiliated to VTU Belagavi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
