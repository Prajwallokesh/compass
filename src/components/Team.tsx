import React, { useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { User } from 'lucide-react';
import teamMembers from '../data/team.json';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
}

export const Team: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const members = teamMembers as TeamMember[];

  // Clean up legacy localStorage keys to ensure data is always loaded from bundled code
  useEffect(() => {
    try {
      localStorage.removeItem('compass_team_members_v2');
      localStorage.removeItem('compass_team_members');
    } catch {
      // ignore
    }
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Team
            </span>
          </h2>

        </div>

        {/* Flagship Cards Grid - Photo, Name, Designation (Finalized View-Only & True Center Aligned) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,242,254,0.12)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
            >
              {/* Top glowing accent line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Ambient Aura */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

              <div>
                {/* 1. Photo Frame (View-Only) */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-[#060B18] border border-white/[0.08] group-hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-t from-[#040711] via-[#091124] to-[#101b38] flex flex-col items-center justify-center p-4 text-slate-400">
                      <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover:scale-110 transition-transform duration-300">
                        <User className="w-8 h-8 text-cyan-400" />
                      </div>
                      <span className="text-[11px] font-mono text-cyan-300/80 tracking-widest uppercase font-semibold">
                        COMPASS
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        GECH CSE
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Name & 3. Designation (True Center Aligned) */}
                <div className="text-center w-full mt-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors tracking-tight mb-1 text-center">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold tracking-wide uppercase text-center">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
