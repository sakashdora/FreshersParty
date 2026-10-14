import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import './styles.css';

import CinematicIntro from './components/CinematicIntro';
import InteractiveEnvelope from './components/InteractiveEnvelope';
import MilestonesSection from './components/MilestonesSection';
import AgendaSection from './components/AgendaSection';
import VisualGallery from './components/VisualGallery';
import CelebrationCheers from './components/CelebrationCheers';
import ClosingSignOff from './components/ClosingSignOff';
import { initGlobalAudioUnlock, playMicroTap, playCinematicSwell } from './utils/audio';

const INTRO_STORAGE_KEY = 'tejas_intro_v2_seen';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    try {
      return !sessionStorage.getItem(INTRO_STORAGE_KEY);
    } catch (err) {
      return true;
    }
  });

  const [isLetterOpen, setIsLetterOpen] = useState(false);

  useEffect(() => {
    initGlobalAudioUnlock();
  }, []);

  const handleCompleteIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch (e) {}
  };

  const handleReplayIntro = () => {
    playMicroTap();
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tejas-app-root sangama-app-root">
      {/* 1. Cinematic Opening Sequence (9/10 Master Experience) */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro
            key="cinematic-intro"
            onComplete={handleCompleteIntro}
          />
        )}
      </AnimatePresence>

      {/* 2. Master Hero Composition (Art-directed scene with architectural convergence) */}
      <header className="main-hero-composition" role="banner">
        {/* Subtle decorative convergence rays & celestial grid */}
        <div className="hero-convergence-lines" aria-hidden="true">
          <svg viewBox="0 0 1000 400" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="heroLineGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AA4A" stopOpacity="0" />
                <stop offset="50%" stopColor="#D4AA4A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#D4AA4A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="200" r="160" stroke="#D4AA4A" strokeWidth="0.7" strokeDasharray="3 6" opacity="0.3" />
            <circle cx="500" cy="200" r="280" stroke="#701C36" strokeWidth="0.5" strokeDasharray="2 8" opacity="0.2" />
            <line x1="120" y1="200" x2="880" y2="200" stroke="url(#heroLineGold)" strokeWidth="0.8" />
            <line x1="500" y1="20" x2="500" y2="380" stroke="#D4AA4A" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.25" />
            <circle cx="500" cy="200" r="3" fill="#D4AA4A" opacity="0.6" />
          </svg>
        </div>

        <div className="hero-identity-cluster">
          {/* Refined Academic Department Eyebrow */}
          <div className="hero-eyebrow-badge">
            <span className="eyebrow-dot">◆</span>
            <span>DEPARTMENT OF COMPUTER APPLICATIONS</span>
            <span className="eyebrow-dot">·</span>
            <span>SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</span>
          </div>

          <h1 className="hero-master-title">
            TEJAS <span className="gold-accent">’26</span>
          </h1>

          <p className="hero-tagline">
            The Fresh Bloom
          </p>

          <p className="hero-invitation-context">
            The formal welcoming celebration presented by the senior MCA batch for the incoming class of 2026–2028. Marking two memorable chapters: the Theme &amp; Banner Reveal on 27 October, and the Freshers Day Gala on 30 October at JRD Tata Hall.
          </p>

          {/* Clean Editorial Navigation Chips (No tacky emojis or AI generic icons) */}
          <nav className="hero-nav-chips" aria-label="Page sections quick navigation">
            <a
              href="#invitation-envelope"
              className="nav-chip"
              onMouseEnter={() => playMicroTap()}
            >
              <span className="nav-chip-indicator" />
              <span>The Invitation Letter</span>
            </a>

            <a
              href="#milestones"
              className="nav-chip"
              onMouseEnter={() => playMicroTap()}
            >
              <span className="nav-chip-indicator" />
              <span>Two Milestones</span>
            </a>

            <a
              href="#agenda-flow"
              className="nav-chip"
              onMouseEnter={() => playMicroTap()}
            >
              <span className="nav-chip-indicator" />
              <span>Programme Schedule</span>
            </a>

            <a
              href="#gallery"
              className="nav-chip"
              onMouseEnter={() => playMicroTap()}
            >
              <span className="nav-chip-indicator" />
              <span>Campus Spirit</span>
            </a>

            <button
              onClick={handleReplayIntro}
              onMouseEnter={() => playMicroTap()}
              className="nav-chip replay-chip"
              title="Replay cinematic opening experience"
            >
              <RotateCcw size={12} className="replay-icon" />
              <span>Replay Opening</span>
            </button>
          </nav>
        </div>

        {/* 3. The 3D Interactive Envelope Centerpiece */}
        <InteractiveEnvelope
          isLetterOpen={isLetterOpen}
          onToggleOpen={(open) => setIsLetterOpen(open)}
        />
      </header>

      {/* 4. Main Experience Content Sections */}
      <main id="main-content">
        {/* Milestones: 27 Oct Banner Reveal & 30 Oct Freshers Day */}
        <MilestonesSection />

        {/* Authoritative Freshers Day Agenda (All 13 Sessions) */}
        <AgendaSection />

        {/* Premium Curated Visual Gallery */}
        <VisualGallery />

        {/* Celebration Cheers & Student Reactions */}
        <CelebrationCheers />
      </main>

      {/* 5. Minimal Warm Department Sign-Off */}
      <ClosingSignOff />
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
