import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenApplyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenApplyModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section based on scroll position
      const sections = [
        'intro',
        'about',
        'coordinator',
        'team',
        'events',
        'gallery',
        'future-plan',
      ];

      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About & Vision', href: '#about', id: 'about' },
    { label: 'Coordinator', href: '#coordinator', id: 'coordinator' },
    { label: 'Team', href: '#team', id: 'team' },
    { label: 'Events Done', href: '#events', id: 'events' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Future Plan', href: '#future-plan', id: 'future-plan' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#04060A]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand - Full Transparent Logo */}
        <a href="#intro" className="flex items-center group focus:outline-none py-1">
          <img
            src="/compass-logo.png"
            alt="COMPASS - Computer Science Student Association, GECH"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-3 py-1.5 text-xs tracking-wider uppercase font-mono transition-colors duration-200 ${
                  isActive ? 'text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.7)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApplyModal}
            className="btn-tactile hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-md bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,242,254,0.1)] transition-all cursor-pointer"
          >
            <span>Join COMPASS</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md border border-white/10 text-slate-300 hover:text-white bg-[#080D1A]"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#060912]/95 border-b border-white/10 backdrop-blur-xl transition-all">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-mono tracking-wider uppercase rounded-md transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplyModal();
              }}
              className="mt-2 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-mono tracking-wider uppercase rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
            >
              <span>Join COMPASS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
