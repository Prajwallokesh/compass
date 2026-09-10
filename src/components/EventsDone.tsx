import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface EventItem {
  id: string;
  title: string;
  description: string;
}

export const EventsDone: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const events: EventItem[] = [
    {
      id: 'hacksprint-1',
      title: 'HackSprint 1.0',
      description:
        'Flagship 24-hour campus hackathon bringing student developers together to ideate, prototype, and build innovative software solutions tackling real-world problems.',
    },
    {
      id: 'hacksprint-2',
      title: 'HackSprint 2.0',
      description:
        'The elevated second edition of our premier hackathon, pushing technological boundaries across AI systems, distributed computing, and full-stack engineering.',
    },
    {
      id: 'sadhana-tech-session',
      title: 'Sadhana (Tech Session)',
      description:
        'Intensive technical masterclass and hands-on workshop focused on core computer science fundamentals, practical coding practices, and peer mentorship.',
    },
    {
      id: 'code4change-1',
      title: 'Code4Change 1.0',
      description:
        'Purpose-driven social coding initiative empowering students to engineer impactful software tools addressing community, societal, and campus challenges.',
    },
    {
      id: 'code4change-2',
      title: 'Code4Change 2.0',
      description:
        'Advanced continuation sprint expanding community-first prototypes into production-ready open-source platforms and sustainable digital utilities.',
    },
    {
      id: 'tech-quiz',
      title: 'Tech Quiz',
      description:
        'High-energy competitive trivia tournament testing student acumen in computer architecture, algorithmic reasoning, developer tooling, and modern tech.',
    },
    {
      id: 'industry-expert-talks',
      title: 'Industry Expert Talks',
      description:
        'Interactive guest sessions and career masterclasses featuring experienced industry professionals sharing practical engineering insights and career guidance.',
    },
  ];

  return (
    <section
      id="events"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            Events{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Done
            </span>
          </h2>

        </div>

        {/* Events Grid - Pure Event Name and Description Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((event, idx) => (
            <div
              key={event.id}
              className={`group relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-500 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,242,254,0.12)] hover:-translate-y-1.5 overflow-hidden flex flex-col justify-center ${idx === events.length - 1 ? 'md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''
                }`}
            >
              {/* Subtle top glowing accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Background Ambient Aura */}
              <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

              {/* Watermark Index */}
              <span className="absolute right-6 bottom-2 text-7xl font-black tracking-tighter text-white/[0.02] group-hover:text-cyan-400/[0.04] transition-colors duration-500 pointer-events-none font-mono">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="relative z-10">
                {/* 1. Event Name */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-100 transition-colors tracking-tight mb-4">
                  {event.title}
                </h3>

                {/* 2. Description */}
                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
