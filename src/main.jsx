import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Calendar, MapPin, Sparkles,
  Users, Sprout, Star, Infinity, Mail, ChevronRight, Menu, X 
} from 'lucide-react';
import './styles.css';
import './styles-v3.css';

import CinematicIntro from './components/CinematicIntro';
import InteractiveEnvelope from './components/InteractiveEnvelope';
import DressCodeEssentials from './components/DressCodeEssentials';
import AgendaSection from './components/AgendaSection';
import ClosingSignOff from './components/ClosingSignOff';
import { initGlobalAudioUnlock, playMicroTap } from './utils/audio';

const INTRO_STORAGE_KEY = 'tejas_intro_v3_seen';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      if (window.location.search.includes('nointro') || window.location.hash.includes('envelope')) return false;
      if (window.location.search.includes('intro') || window.location.search.includes('reset')) return true;
      try {
        return !sessionStorage.getItem(INTRO_STORAGE_KEY);
      } catch (err) {
        return true;
      }
    }
    return false;
  });

  const [isLetterOpen, setIsLetterOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('opened=1');
  });
  const [isStickyNavVisible, setIsStickyNavVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initGlobalAudioUnlock();

    const handleScroll = () => {
      setIsStickyNavVisible(window.scrollY > 320);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCompleteIntro = () => {
    setShowIntro(false);
    setIsLetterOpen(false);
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
      {/* Scroll Storytelling Progress Bar */}
      <div
        className="tejas-scroll-progress-line"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* 1. Cinematic Opening Experience (High-Art Editorial Cover) */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro
            key="cinematic-intro"
            onComplete={handleCompleteIntro}
          />
        )}
      </AnimatePresence>

      {/* Sticky Navigation Bar */}
      <nav
        className={`tejas-sticky-navbar ${isStickyNavVisible ? 'is-visible' : ''}`}
        aria-label="Quick page navigation"
      >
        <div className="sticky-nav-inner">
          <a
            href="#"
            className="sticky-nav-brand"
            onClick={(e) => {
              e.preventDefault();
              playMicroTap();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="sticky-brand-title">TEJAS</span>
            <span className="sticky-brand-accent">’26</span>
          </a>

          <div className="sticky-nav-links">
            <a href="#invitation-envelope" onClick={() => playMicroTap()}>Invitation</a>
            <a href="#dress-code-essentials" onClick={() => playMicroTap()}>Dress &amp; Essentials</a>
            <a href="#agenda-flow" onClick={() => playMicroTap()}>The Confluence</a>
          </div>

          <button
            type="button"
            className="sticky-replay-btn"
            onClick={handleReplayIntro}
            title="Replay cinematic opening experience"
          >
            <RotateCcw size={12} />
            <span>Replay Opening</span>
          </button>
        </div>
      </nav>

      {/* 2. Master Grand Hero & Invitation Stage */}
      <header className="main-hero-composition" role="banner">
        {/* Top bar with Academic Badge & Hamburger Menu */}
        <div className="hero-top-bar">
          <div className="hero-top-spacer" aria-hidden="true" />
          <div className="hero-eyebrow-badge">
            <span className="eyebrow-dot">✦</span>
            <span>DEPARTMENT OF COMPUTER APPLICATIONS</span>
            <span className="eyebrow-dot">✦</span>
            <span>SRUSTI ACADEMY</span>
            <span className="eyebrow-dot">✦</span>
          </div>
          <button
            type="button"
            className="hero-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Slide-down Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="hero-menu-drawer" role="menu">
              <a href="#invitation-envelope" onClick={() => { playMicroTap(); setMobileMenuOpen(false); }}>Invitation</a>
              <a href="#dress-code-essentials" onClick={() => { playMicroTap(); setMobileMenuOpen(false); }}>Dress &amp; Essentials</a>
              <a href="#agenda-flow" onClick={() => { playMicroTap(); setMobileMenuOpen(false); }}>The Confluence</a>
              <button
                type="button"
                className="hero-menu-replay-btn"
                onClick={() => { setMobileMenuOpen(false); handleReplayIntro(); }}
              >
                <RotateCcw size={13} />
                <span>Replay Intro</span>
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Subtle celestial convergence geometry */}
        <div className="hero-convergence-lines" aria-hidden="true">
          <svg viewBox="0 0 1000 400" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="heroLineGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C89B38" stopOpacity="0" />
                <stop offset="50%" stopColor="#E5B957" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C89B38" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="500" cy="180" r="140" stroke="#E5B957" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.25" />
            <circle cx="500" cy="180" r="260" stroke="#6E122E" strokeWidth="0.6" strokeDasharray="2 8" opacity="0.18" />
            <line x1="80" y1="180" x2="920" y2="180" stroke="url(#heroLineGold)" strokeWidth="0.8" />
            <line x1="500" y1="10" x2="500" y2="350" stroke="#E5B957" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.2" />
          </svg>
        </div>

        <div className="hero-identity-cluster">
          {/* Level 1: Master Display Title */}
          <h1 className="hero-master-title">
            TEJAS <span className="gold-accent">’26</span>
          </h1>

          {/* Golden Lotus Blossom Divider Ornament */}
          <div className="hero-lotus-divider" aria-hidden="true">
            <span className="hero-divider-line" />
            <svg className="hero-lotus-icon" viewBox="0 0 36 20" fill="none">
              <path d="M18 1.5 C16 6 12 12 7 14 C12 14.5 16 11 18 8 C20 11 24 14.5 29 14 C24 12 20 6 18 1.5 Z" fill="#C89B38"/>
              <path d="M18 8 C15.5 12 10 16 4 16 C9 17 15 15 18 11.5 C21 15 27 17 32 16 C26 16 20.5 12 18 8 Z" fill="#E5B957" opacity="0.9"/>
              <circle cx="18" cy="17" r="1.5" fill="#C89B38"/>
            </svg>
            <span className="hero-divider-line" />
          </div>

          {/* Level 2: Thematic Tagline */}
          <p className="hero-tagline">
            The Fresh Bloom
          </p>

          <p className="hero-curated-lead">
            The Senior Welcome &amp; Ceremonial Induction for Incoming MCA Batch (2026–2028)
          </p>

          {/* 4 Pillars Bar */}
          <div className="hero-pillars-bar" role="list" aria-label="Ceremony Highlights">
            <div className="hero-pillar-item" role="listitem">
              <Users size={16} className="hero-pillar-icon" />
              <span>NEW BEGINNINGS</span>
            </div>
            <span className="hero-pillar-sep" aria-hidden="true" />
            <div className="hero-pillar-item" role="listitem">
              <Sprout size={16} className="hero-pillar-icon" />
              <span>BRIGHTER BONDS</span>
            </div>
            <span className="hero-pillar-sep" aria-hidden="true" />
            <div className="hero-pillar-item" role="listitem">
              <Star size={16} className="hero-pillar-icon" />
              <span>MEMORIES AHEAD</span>
            </div>
            <span className="hero-pillar-sep" aria-hidden="true" />
            <div className="hero-pillar-item" role="listitem">
              <Infinity size={16} className="hero-pillar-icon" />
              <span>A JOURNEY TOGETHER</span>
            </div>
          </div>

          {/* CTA: OPEN LETTER DIRECTLY Button */}
          <div className="hero-cta-wrapper">
            <button
              type="button"
              className="hero-direct-open-btn"
              onClick={() => {
                playMicroTap();
                setIsLetterOpen(true);
                const el = document.getElementById('invitation-envelope');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              aria-label="Open Letter Directly"
            >
              <Mail size={16} className="hero-btn-mail-icon" />
              <span className="hero-btn-label">OPEN LETTER DIRECTLY</span>
              <ChevronRight size={16} className="hero-btn-arrow-icon" />
            </button>
          </div>
        </div>

        {/* 3. The 3D Interactive Envelope Centerpiece */}
        <InteractiveEnvelope
          isLetterOpen={isLetterOpen}
          onToggleOpen={(open) => setIsLetterOpen(open)}
        />
      </header>

      {/* 4. Main Experience Content Sections */}
      <main id="main-content">
        {/* Dress Code & Event Essentials (Showcase) */}
        <DressCodeEssentials />

        {/* The Senior-Junior Confluence (11:40 AM to 5:00 PM · Lunch 12:30 PM · Mr. & Mrs. Fresher) */}
        <AgendaSection />
      </main>

      {/* 5. Department Sign-Off & Architectural Footer */}
      <ClosingSignOff />
    </div>
  );
}

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
}
