import React, { useState } from 'react';
import {
  Send,
  X,
  CheckCircle,
  Mail,
  ArrowUp,
} from 'lucide-react';

interface CtaAndFooterProps {
  isApplyModalOpen: boolean;
  onCloseApplyModal: () => void;
  onOpenApplyModal: () => void;
}

export const CtaAndFooter: React.FC<CtaAndFooterProps> = ({
  isApplyModalOpen,
  onCloseApplyModal,
}) => {
  // Modal form states
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    year: '2nd Year',
    domain: 'Artificial Intelligence & ML',
    github: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onCloseApplyModal();
      setFormData({
        name: '',
        usn: '',
        year: '2nd Year',
        domain: 'Artificial Intelligence & ML',
        github: '',
        notes: '',
      });
    }, 1800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Interactive Application Modal (retained for navbar Join Collective trigger) */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md transition-opacity">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#080E1E] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-left">
            <button
              onClick={onCloseApplyModal}
              className="absolute top-5 right-5 p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white bg-white/[0.03] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                APPLICATION FORM • 2026–27
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Join COMPASS Student Association
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                For students of CSE, GECH seeking technical membership and peer mentorship.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Application Logged Successfully
                </h4>
                <p className="text-xs text-slate-300 max-w-xs">
                  Your coordinates have been received by the COMPASS team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1 font-sans text-xs">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aditi Sharma"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#050811] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-sans text-xs">
                      USN / ID
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.usn}
                      onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                      placeholder="e.g. 4GH24CS001"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#050811] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-sans text-xs">
                      Academic Year
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#050811] border border-white/10 text-white focus:outline-none focus:border-cyan-500/60"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-sans text-xs">
                    Primary Domain of Interest
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#050811] border border-white/10 text-white focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                    <option value="Generative AI & LLMs">Generative AI & LLMs</option>
                    <option value="Competitive Programming">Competitive Programming (DSA)</option>
                    <option value="Full-Stack & Cloud Systems">Full-Stack & Cloud Systems</option>
                    <option value="Cybersecurity">Cybersecurity & Networking</option>
                    <option value="UI/UX & Design Systems">UI/UX & Media Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-sans text-xs">
                    GitHub Profile or Portfolio Link
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#050811] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-tactile w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-[#04060A] font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="relative z-10 bg-[#03050A] border-t border-white/[0.08] py-8 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          {/* Brand Wordmark & College Info */}
          <div className="flex items-center gap-3.5">
            <img
              src="/compass-logo.png"
              alt="COMPASS"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <div className="border-l border-white/10 pl-3.5 text-left">
              <p className="text-xs font-semibold text-white tracking-wide">
                COMPASS (2026–27)
              </p>
              <p className="text-[11px] text-slate-400 font-light">
                Dept. of CSE • Government Engineering College, Hassan
              </p>
            </div>
          </div>

          {/* Designer Credit (Simple, Clean, Attractive) */}
          <p
            className="text-sm sm:text-base text-slate-400 tracking-wide font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Designed by{' '}
            <span className="text-cyan-400 font-bold tracking-normal hover:text-cyan-300 transition-colors">
              Prajwal K L
            </span>
          </p>

          {/* Socials / Contact Links & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="COMPASS GitHub"
              className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="COMPASS LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="mailto:compass.gech@gmail.com"
              aria-label="Email COMPASS"
              className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
