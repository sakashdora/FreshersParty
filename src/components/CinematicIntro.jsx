import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import {
  playCinematicSwell,
  playCelestialRevealChime,
  playMilestoneSlideTick,
  playSkipTransition,
  playMicroTap,
  stopIntroAudio,
  initGlobalAudioUnlock
} from '../utils/audio';

export default function CinematicIntro({ onComplete }) {
  // Phases: 0 (Cosmos Emergence), 1 (Monumental Typography & Sacred Bloom), 2 (Dual Milestone Gateway), 3 (Entrance Ready)
  const [phase, setPhase] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const canvasRef = useRef(null);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    initGlobalAudioUnlock(() => {
      setIsAudioActive(true);
    });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playSkipTransition();
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const t1 = setTimeout(() => {
      setPhase(1);
      playCelestialRevealChime();
    }, 900);

    const t2 = setTimeout(() => {
      setPhase(2);
      playMilestoneSlideTick();
    }, 2200);

    const t3 = setTimeout(() => {
      setPhase(3);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 2. Luminous Stardust & Celestial Starfield Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 30 : 60;
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI,
      isGold: Math.random() > 0.4
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle celestial rays from center
      const cx = width / 2;
      const cy = height * 0.45;
      const radGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.6);
      radGrad.addColorStop(0, 'rgba(229, 185, 87, 0.09)');
      radGrad.addColorStop(0.35, 'rgba(110, 18, 46, 0.06)');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      stars.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX + Math.sin(time + s.size) * 0.2;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const currentAlpha = s.opacity * (0.6 + 0.4 * Math.sin(time * 2 + s.pulse));
        ctx.fillStyle = s.isGold
          ? `rgba(252, 231, 162, ${currentAlpha})`
          : `rgba(243, 194, 178, ${currentAlpha})`;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    stopIntroAudio();
    onComplete();
  };

  const handleSkip = (e) => {
    e.stopPropagation();
    playSkipTransition();
    handleFinish();
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    initGlobalAudioUnlock();
    playCinematicSwell();
    setIsAudioActive(true);
  };

  return (
    <motion.div
      className="intro-editorial-curtain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to TEJAS '26 Opening Experience"
    >
      {/* 1. Deep Space Astrolabe & Stardust Canvas */}
      <canvas ref={canvasRef} className="intro-starfield-canvas" aria-hidden="true" />
      <div className="intro-astrolabe-ambient" aria-hidden="true" />
      <div className="intro-vignette-mask" aria-hidden="true" />

      {/* 2. Top HUD Bar: High Contrast Glassmorphic Navigation */}
      <header className="intro-control-hud">
        <button
          type="button"
          className={`intro-hud-btn sound-toggle ${isAudioActive ? 'active' : ''}`}
          onClick={toggleSound}
          aria-label={isAudioActive ? 'Sound is enabled' : 'Click to enable audio'}
        >
          {isAudioActive ? <Volume2 size={14} className="hud-icon" /> : <VolumeX size={14} className="hud-icon" />}
          <span>{isAudioActive ? 'AUDIO ENGAGED' : 'ENABLE SOUND'}</span>
        </button>

        <button
          type="button"
          className="intro-hud-btn skip-pill"
          onClick={handleSkip}
          aria-label="Skip introductory sequence"
        >
          <span>Skip to Invitation</span>
          <kbd className="hud-kbd">[ESC]</kbd>
          <ArrowRight size={13} className="hud-arrow" />
        </button>
      </header>

      {/* 3. Centerpiece Editorial Stage */}
      <main className="intro-stage-monument">
        {/* Academic Prestige Hallmark Overline */}
        <motion.div
          className="intro-monogram-crest"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="crest-rail left" />
          <div className="crest-content">
            <span className="crest-roman">MMXXVI</span>
            <span className="crest-diamond">✦</span>
            <span className="crest-cohort">MCA SENIOR WELCOME</span>
            <span className="crest-diamond">✦</span>
            <span className="crest-city">BHUBANESWAR</span>
          </div>
          <span className="crest-rail right" />
        </motion.div>

        {/* Institution Eyebrow */}
        <motion.div
          className="intro-department-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span>DEPARTMENT OF COMPUTER APPLICATIONS</span>
          <span className="eyebrow-dot">·</span>
          <span>SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</span>
        </motion.div>

        {/* The Master Monumental Title: TEJAS '26 */}
        <motion.div className="intro-monument-title-box">
          <motion.h1
            className="intro-hero-letters"
            initial={{ opacity: 0, y: 40, letterSpacing: '0.18em' }}
            animate={phase >= 1 ? { opacity: 1, y: 0, letterSpacing: '0.08em' } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="letter-word">TEJAS</span>
            <span className="letter-year">’26</span>
          </motion.h1>
          <div className={`intro-shimmer-sweep ${phase >= 1 ? 'sweeping' : ''}`} aria-hidden="true" />
        </motion.div>

        {/* The Sacred Lotus / Botanical Bloom Emblem Centerpiece */}
        <motion.div
          className="intro-bloom-centerpiece"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated SVG Sacred Lotus / Fresh Bloom Geometry */}
          <div className="bloom-mandala-graphic" aria-hidden="true">
            <svg viewBox="0 0 240 70" fill="none" className="bloom-svg">
              {/* Flanking Gilded Filigree Lines */}
              <line x1="10" y1="35" x2="80" y2="35" stroke="url(#introGoldGrad)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
              <line x1="160" y1="35" x2="230" y2="35" stroke="url(#introGoldGrad)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
              <circle cx="10" cy="35" r="2" fill="#E5B957" />
              <circle cx="230" cy="35" r="2" fill="#E5B957" />

              <defs>
                <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C89B38" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#FCE7A2" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#C89B38" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="petalPeachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCE7A2" />
                  <stop offset="50%" stopColor="#F3C2B2" />
                  <stop offset="100%" stopColor="#6E122E" />
                </linearGradient>
              </defs>

              {/* Center Lotus Petals */}
              <motion.path
                d="M 120 12 C 108 24 106 42 120 54 C 134 42 132 24 120 12 Z"
                fill="url(#petalPeachGrad)"
                opacity="0.9"
                initial={{ pathLength: 0, scale: 0.7 }}
                animate={phase >= 1 ? { pathLength: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <path d="M 104 22 C 96 32 102 46 120 52 C 114 38 108 28 104 22 Z" fill="#E5B957" opacity="0.75" />
              <path d="M 136 22 C 144 32 138 46 120 52 C 126 38 132 28 136 22 Z" fill="#E5B957" opacity="0.75" />
              <circle cx="120" cy="52" r="3" fill="#FCE7A2" />
            </svg>
          </div>

          <p className="intro-tagline-text">
            The Fresh Bloom
          </p>

          <p className="intro-sub-quote">
            “A welcoming confluence of talent, leadership &amp; lifelong camaraderie”
          </p>
        </motion.div>

        {/* Dual Milestone Pillar Gateways */}
        <motion.div
          className="intro-gateway-pillars"
          initial={{ opacity: 0, y: 24 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Prelude Milestone */}
          <div className="gateway-card prelude">
            <div className="card-top-tag">
              <span className="tag-chapter">CHAPTER I · PRELUDE</span>
            </div>
            <div className="card-date-badge">27 OCT 2026</div>
            <strong className="card-title">Theme &amp; Banner Reveal</strong>
            <span className="card-venue">Department Campus · 11:00 AM</span>
          </div>

          <div className="gateway-confluence-nexus" aria-hidden="true">
            <span className="nexus-line" />
            <div className="nexus-gem">✦</div>
            <span className="nexus-line" />
          </div>

          {/* Grand Gala Milestone */}
          <div className="gateway-card gala highlight">
            <div className="card-top-tag">
              <span className="tag-chapter gold">CHAPTER II · GRAND GALA</span>
            </div>
            <div className="card-date-badge gold">30 OCT 2026</div>
            <strong className="card-title">Freshers Day Gala</strong>
            <span className="card-venue">JRD Tata Hall · 10:00 AM</span>
          </div>
        </motion.div>

        {/* Main Enter Action Button */}
        <motion.div
          className="intro-portal-action"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <button
            type="button"
            className="intro-enter-btn"
            onClick={handleFinish}
            onMouseEnter={() => playMicroTap()}
          >
            <span className="btn-glow-aura" />
            <span className="btn-label">UNVEIL CEREMONIAL INVITATION</span>
            <ChevronDown size={16} className="btn-chevron" />
          </button>
        </motion.div>
      </main>

      {/* Bottom Footer Notice */}
      <footer className="intro-bottom-notice">
        <span>Srusti Academy of Management &amp; Technology · Welcoming Incoming MCA Batch 2026–2028</span>
      </footer>
    </motion.div>
  );
}
