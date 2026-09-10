import { useState } from 'react';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutVisionMission } from './components/AboutVisionMission';
import { Coordinator } from './components/Coordinator';
import { Team } from './components/Team';
import { EventsDone } from './components/EventsDone';
import { Gallery } from './components/Gallery';
import { FuturePlan } from './components/FuturePlan';
import { CtaAndFooter } from './components/CtaAndFooter';
import { CursorGlow } from './components/CursorGlow';
import { GlobalBackground } from './components/GlobalBackground';
import { SectionSeam } from './components/SectionSeam';

export function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* 1. Global Ambient Background Motion (Drifting gradients, subtle grid, slow particles, light sweeps) */}
      <GlobalBackground />

      {/* 2. Minimalist Page Loader (600-1000ms) */}
      {!loadingComplete && (
        <Loader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* 3. Desktop Subtle Cursor Glow */}
      <CursorGlow />

      {/* 4. Persistent Fixed Navbar */}
      <Navbar onOpenApplyModal={() => setIsApplyModalOpen(true)} />

      {/* Main Ordered Flow:
          1. Intro (Hero)
          2. About, Vision, Mission
          3. Compass Coordinator
          4. Team
          5. Events Done (pure list: name + description)
          6. Gallery (placed before Future Plan)
          7. Future Plan (Roadmap with scroll-driven line)
          8. Etc: Call to Action, Modal & Footer
      */}
      <main className="relative z-10">
        {/* Intro / Hero */}
        <Hero onOpenApplyModal={() => setIsApplyModalOpen(true)} />

        <SectionSeam />

        {/* About, Vision, Mission */}
        <AboutVisionMission />

        <SectionSeam />

        {/* Compass Coordinator */}
        <Coordinator />

        <SectionSeam />

        {/* Executive Team */}
        <Team />

        <SectionSeam />

        {/* Events Done (Pure Name & Description) */}
        <EventsDone />

        <SectionSeam />

        {/* Gallery Section (Before Future Plan) */}
        <Gallery />

        <SectionSeam />

        {/* Future Plan (Roadmap with scroll-driven line) */}
        <FuturePlan />

        <SectionSeam />

        {/* Etc: Call to Action, Application Modal, & Footer */}
        <CtaAndFooter
          isApplyModalOpen={isApplyModalOpen}
          onCloseApplyModal={() => setIsApplyModalOpen(false)}
          onOpenApplyModal={() => setIsApplyModalOpen(true)}
        />
      </main>
    </div>
  );
}

export default App;
