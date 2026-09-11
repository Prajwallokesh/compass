import React, { useState } from 'react';
import {
  Send,
  X,
  CheckCircle,
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

      {/* Ultra Minimal Footer - Logo & Designed by only */}
      <footer className="relative z-10 bg-[#03050A] border-t border-white/[0.08] py-6 sm:py-7 px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src="/compass-logo.png"
              alt="COMPASS"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          {/* Designer Credit */}
          <p
            className="text-sm sm:text-base text-slate-400 tracking-wide font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Designed by{' '}
            <span className="text-cyan-400 font-bold tracking-normal hover:text-cyan-300 transition-colors">
              Prajwal K L
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};
