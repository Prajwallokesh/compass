import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Code2,
  Lightbulb,
  Layers,
  Sparkles,
  Brain,
  Terminal,
  Users,
  ArrowUpRight,
} from 'lucide-react';

interface FuturePlanItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FuturePlan: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const plans: FuturePlanItem[] = [
    {
      id: 'hackathons',
      number: '01',
      title: 'Hackathons',
      icon: Code2,
      description:
        'Intensive collegiate hackathons challenging student teams to prototype, engineer, and deploy high-impact software solutions.',
    },
    {
      id: 'ideathons',
      number: '02',
      title: 'Ideathons',
      icon: Lightbulb,
      description:
        'Collaborative ideation sprints turning novel student concepts and societal challenges into structured tech blueprints.',
    },
    {
      id: 'project-expo',
      number: '03',
      title: 'Project Expo',
      icon: Layers,
      description:
        'Annual departmental showcase giving student developers a stage to demonstrate capstone projects and research prototypes.',
    },
    {
      id: 'talent-hunt',
      number: '04',
      title: 'Talent Hunt',
      icon: Sparkles,
      description:
        'Scouting initiative identifying, celebrating, and mentoring emerging programmers, designers, and problem-solvers.',
    },
    {
      id: 'tech-quiz',
      number: '05',
      title: 'Tech Quiz',
      icon: Brain,
      description:
        'High-energy competitive quizzes testing domain mastery across computer science theory, systems, and modern tech.',
    },
    {
      id: 'tech-session',
      number: '06',
      title: 'Tech Session',
      icon: Terminal,
      description:
        'Hands-on practical masterclasses and peer-guided technical workshops covering modern frameworks and engineering.',
    },
    {
      id: 'industry-expert-talks',
      number: '07',
      title: 'Industry Expert Talks',
      icon: Users,
      description:
        'Interactive keynotes and fireside chats with experienced industry veterans and software architects sharing guidance.',
    },
  ];

  return (
    <section
      id="future-plan"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            Future{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Plans
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {plans.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === plans.length - 1;

            if (isLast) {
              // 7th Card: Wide Highlight Banner spanning the full row on desktop & tablet
              return (
                <div
                  key={item.id}
                  className="md:col-span-2 lg:col-span-3 group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,242,254,0.12)] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Subtle top glowing accent line */}
                  <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Ambient Aura */}
                  <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_16px_rgba(0,242,254,0.25)] transition-all shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                            #{item.number}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-widest">
                            CAREER MENTORSHIP
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors tracking-tight">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl">
                      {item.description}
                    </p>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                      <span>PLANNED</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1" />
                    </div>
                  </div>
                </div>
              );
            }

            // Cards 1–6: Balanced, spacious vertical cards
            return (
              <div
                key={item.id}
                className="group relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-400/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,242,254,0.12)] hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle top glowing accent line */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Ambient Aura */}
                <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

                <div>
                  {/* Top Bar: Icon + Index Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60 group-hover:shadow-[0_0_16px_rgba(0,242,254,0.25)] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
                      #{item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors tracking-tight mb-2 mt-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(0,242,254,0.8)]" />
                    <span>PLANNED</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
