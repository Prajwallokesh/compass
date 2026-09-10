import React, { useEffect, useState } from 'react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const start = performance.now();
    const duration = 850; // Between 600-1200ms as required

    const step = (time: number) => {
      const elapsed = time - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setFade(true);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04060A] text-white transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Full transparent logo */}
        <div className="relative mb-2 flex items-center justify-center">
          <img
            src="/compass-logo.png"
            alt="COMPASS - Computer Science Student Association, GECH"
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]"
          />
        </div>

        {/* Minimalist calibration line */}
        <div className="w-56 h-[2px] bg-slate-800/80 rounded-full overflow-hidden mt-3 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-75 shadow-[0_0_10px_rgba(0,242,254,0.6)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
