import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowDown, Heart, ChevronRight, Maximize2, Download, X, Sparkles } from 'lucide-react';
import { playPaperRustle, playMicroTap, playCelestialRevealChime } from '../utils/audio';

// ─── State machine ─────────────────────────────────────────────────────────
// SEALED → OPENING → REVEALED → CLOSING → SEALED
const S = { SEALED: 'sealed', OPENING: 'opening', REVEALED: 'revealed', CLOSING: 'closing' };

export default function InteractiveEnvelope({ isLetterOpen, onToggleOpen }) {
  const [phase, setPhase] = useState(() => (isLetterOpen ? S.REVEALED : S.SEALED));
  const [showLightbox, setShowLightbox] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const resealBtnRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  );

  // Derived booleans from phase — no stale closure risk
  const isSealed = phase === S.SEALED;
  const isOpening = phase === S.OPENING;
  const isRevealed = phase === S.REVEALED;
  const isClosing = phase === S.CLOSING;
  const isBusy = isOpening || isClosing;
  const isOpen = isRevealed || isOpening;

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // ── OPEN sequence ──────────────────────────────────────────────────────────
  const doOpen = useCallback(() => {
    setPhase(prev => {
      if (prev !== S.SEALED) return prev; // guard
      return S.OPENING;
    });
    playPaperRustle();

    const delay = prefersReducedMotion ? 0 : 720;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase(prev => {
        if (prev !== S.OPENING) return prev; // guard
        return S.REVEALED;
      });
      playCelestialRevealChime();
      if (!prefersReducedMotion) {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.55 },
          colors: ['#E5B957', '#C89B38', '#7A1030', '#FCE7A2', '#FDF8F0'],
          gravity: 0.85,
        });
      }
      if (onToggleOpen) onToggleOpen(true);
      setTimeout(() => {
        resealBtnRef.current?.focus();
      }, 150);
    }, delay);
  }, [prefersReducedMotion, onToggleOpen]);

  // ── CLOSE sequence ─────────────────────────────────────────────────────────
  const doClose = useCallback(() => {
    setPhase(prev => {
      if (prev !== S.REVEALED) return prev; // guard
      return S.CLOSING;
    });
    playPaperRustle();

    const delay = prefersReducedMotion ? 0 : 700;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPhase(prev => {
        if (prev !== S.CLOSING) return prev;
        return S.SEALED;
      });
      if (onToggleOpen) onToggleOpen(false);
      containerRef.current?.focus();
    }, delay);
  }, [prefersReducedMotion, onToggleOpen]);

  // Sync external prop without stale closures
  const prevPropRef = useRef(isLetterOpen);
  useEffect(() => {
    if (isLetterOpen === prevPropRef.current) return;
    prevPropRef.current = isLetterOpen;
    if (isLetterOpen) {
      doOpen();
    } else {
      doClose();
    }
  }, [isLetterOpen, doOpen, doClose]);

  // ── Keyboard accessibility ─────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (isBusy) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isSealed) doOpen();
      else if (isRevealed) doClose();
    } else if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      doClose();
    }
  }, [isBusy, isSealed, isRevealed, isOpen, doOpen, doClose]);

  // ── 3-D hover tilt (desktop only, sealed state only) ──────────────────────
  const handleMouseMove = (e) => {
    if (isOpen || isBusy || !containerRef.current || isMobile) return;
    const r = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const ny = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setTilt({ x: -ny * 6, y: nx * 6 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // ── Animation variants ────────────────────────────────────────────────────
  const EASE = [0.16, 1, 0.3, 1];

  const flapV = {
    sealed: { rotateX: 0, transition: { duration: 0.55, delay: 0.28, ease: EASE } },
    opening: { rotateX: -180, transition: { duration: 0.62, delay: 0.06, ease: EASE } },
    revealed: { rotateX: -180 },
    closing: { rotateX: 0, transition: { duration: 0.52, delay: 0.30, ease: EASE } },
  };

  const cardV = {
    sealed: { y: 24, opacity: 0, scale: 0.96, transition: { duration: 0.4, ease: 'easeIn' } },
    opening: { y: isMobile ? -235 : -390, opacity: 1, scale: 1, transition: { duration: 0.72, delay: 0.28, ease: EASE } },
    revealed: { y: isMobile ? -235 : -390, opacity: 1, scale: 1 },
    closing: { y: 24, opacity: 0, scale: 0.96, transition: { duration: 0.38, ease: 'easeIn' } },
  };

  const sealV = {
    sealed: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    opening: { opacity: 0, scale: 0.5, y: -14, transition: { duration: 0.28, ease: 'easeIn' } },
    revealed: { opacity: 0, scale: 0.5, y: -14 },
    closing: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, delay: 0.35, ease: 'easeOut' } },
  };

  const ribbonV = {
    sealed: { opacity: 1, scaleY: 1, transition: { duration: 0.35, ease: 'easeOut' } },
    opening: { opacity: 0, scaleY: 0.5, transition: { duration: 0.26, ease: 'easeIn' } },
    revealed: { opacity: 0, scaleY: 0.5 },
    closing: { opacity: 1, scaleY: 1, transition: { duration: 0.3, delay: 0.4, ease: 'easeOut' } },
  };

  const rm = prefersReducedMotion ? {} : undefined; // empty variants when reduced-motion

  return (
    <section
      className="env-stage"
      id="invitation-envelope"
      aria-label="Interactive Invitation Envelope"
    >
      <div className="env-glow" aria-hidden="true" />
      <div className="env-sunburst-flare" aria-hidden="true" />

      {/* Header copy only shown when opened */}
      {isOpen && (
        <div className="env-header env-header-opened">
          <div className="env-eyebrow">
            <span>A SPECIAL WELCOME · MCA BATCH 2026–2028</span>
          </div>
          <p className="env-subtitle">
            We have prepared something special for you. Here are your celebration details.
          </p>
        </div>
      )}

      {/* 3D chassis */}
      <div
        ref={containerRef}
        className={`env-chassis ${isOpen ? 'is-open' : 'is-sealed'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={isSealed && !isBusy ? doOpen : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={isSealed ? 0 : -1}
        role="button"
        aria-label={isSealed ? 'Sealed invitation envelope. Press Enter or Space to open.' : 'Opened envelope'}
        aria-expanded={isOpen}
      >
        <div className="env-ground-shadow" aria-hidden="true" />

        {/* Tilt wrapper */}
        <motion.div
          className="env-3d-shell"
          animate={{ rotateX: !isOpen ? tilt.x : 0, rotateY: !isOpen ? tilt.y : 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 200 }}
        >
          {/* ── LAYER 1: Envelope body ── */}
          <div className="env-body" aria-hidden="true">
            <div className="env-body-inner" />
            <div className="env-fold-bl" />
            <div className="env-fold-br" />
            <div className="env-lining" />
          </div>

          {/* ── LAYER 2: Flap (hinged at top edge) ── */}
          <motion.div
            className="env-flap"
            style={{ transformOrigin: 'top center' }}
            animate={phase}
            variants={rm ?? flapV}
            aria-hidden="true"
          >
            <div className="env-flap-outside">
              {/* Full-width continuous Gold Seam Border SVG spanning edge-to-edge */}
              <svg viewBox="0 0 560 142" preserveAspectRatio="none" className="env-flap-seam-svg">
                <defs>
                  <linearGradient id="flapGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C89B38" stopOpacity="0.6" />
                    <stop offset="25%" stopColor="#FFF2CC" />
                    <stop offset="50%" stopColor="#F5D061" />
                    <stop offset="75%" stopColor="#FFF2CC" />
                    <stop offset="100%" stopColor="#C89B38" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="flapGoldBevel" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#75500A" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#75500A" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Outer shadow/bevel */}
                <path d="M 0 0 L 280 141 L 560 0" stroke="rgba(0,0,0,0.55)" strokeWidth="4" fill="none" />
                {/* Secondary gold trim */}
                <path d="M 0 0 L 280 140 L 560 0" stroke="url(#flapGoldGrad)" strokeWidth="3" fill="none" />
                {/* Highlight core */}
                <path d="M 0 0 L 280 139 L 560 0" stroke="url(#flapGoldBevel)" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="env-flap-inside">
              <div className="env-flap-inside-lining" />
            </div>
          </motion.div>

          {/* ── LAYER 3: Invitation card (Official Invitation Letter Poster) ── */}
          <motion.article
            className={`env-card ${isOpen ? 'card-open' : 'card-tucked'}`}
            animate={phase}
            variants={rm ?? cardV}
            role="document"
            aria-label="Official Invitation — TEJAS 2026 The Fresh Bloom"
          >
            <div className="card-surface poster-surface">
              {/* Card top bar with re-seal and expand buttons */}
              <div className="card-poster-topbar">
                {isOpen && !isBusy && (
                  <button
                    ref={resealBtnRef}
                    type="button"
                    className="card-reseal-btn"
                    onClick={(e) => { e.stopPropagation(); doClose(); }}
                    aria-label="Fold back into envelope"
                  >
                    <RotateCcw size={11} />
                    <span>Fold Back</span>
                  </button>
                )}

                <button
                  type="button"
                  className="card-zoom-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    playMicroTap();
                    setShowLightbox(true);
                  }}
                  aria-label="View Full Invitation Poster"
                >
                  <Maximize2 size={11} />
                  <span>Full View</span>
                </button>
              </div>

              {/* The Official Invitation Letter Poster File */}
              <div 
                className="card-poster-wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                  playMicroTap();
                  setShowLightbox(true);
                }}
                role="button"
                tabIndex={isOpen ? 0 : -1}
                aria-label="Click to enlarge invitation letter"
              >
                <img
                  src="/invitation_letter_tejas2026.jpg"
                  alt="Official Invitation Letter — TEJAS 2026 The Fresh Bloom · Srusti Academy MCA Freshers"
                  className="card-poster-img"
                  loading="eager"
                />
                <div className="card-poster-tap-hint">
                  <Sparkles size={11} />
                  <span>Click to view full size</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-actions poster-actions">
                <a
                  href="#agenda-flow"
                  className="card-btn card-btn-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('agenda-flow')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>View Programme</span>
                  <ArrowDown size={13} />
                </a>
                <button
                  type="button"
                  className="card-btn card-btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!prefersReducedMotion) {
                      confetti({ particleCount: 65, spread: 70, colors: ['#E5B957', '#C89B38', '#7A1030', '#FCE7A2'] });
                    }
                  }}
                  aria-label="Celebrate with us"
                >
                  <Heart size={13} fill="#C89B38" />
                  <span>Can't Wait! 🎉</span>
                </button>
              </div>
            </div>
          </motion.article>

          {/* ── LAYER 4: Front pocket sleeve ── */}
          <div className="env-pocket" aria-hidden="true">
            <div className="env-pocket-face">
              <div className="env-pocket-hem" />
              <div className="env-pocket-shadow" />
              {/* Bottom diagonal seams meeting at center seal apex */}
              <svg viewBox="0 0 560 280" preserveAspectRatio="none" className="env-bottom-seams-svg">
                <defs>
                  <linearGradient id="bottomSeamGoldL" gradientUnits="userSpaceOnUse" x1="0" y1="280" x2="280" y2="140">
                    <stop offset="0%" stopColor="#C89B38" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#FFF2CC" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F5D061" />
                  </linearGradient>
                  <linearGradient id="bottomSeamGoldR" gradientUnits="userSpaceOnUse" x1="560" y1="280" x2="280" y2="140">
                    <stop offset="0%" stopColor="#C89B38" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#FFF2CC" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F5D061" />
                  </linearGradient>
                </defs>
                <path d="M 0 280 L 280 140" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
                <path d="M 0 280 L 280 140" stroke="url(#bottomSeamGoldL)" strokeWidth="2" fill="none" />
                <path d="M 560 280 L 280 140" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
                <path d="M 560 280 L 280 140" stroke="url(#bottomSeamGoldR)" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>

          {/* ── LAYER 6: Wax seal with 3D Ruby Star Medallion ── */}
          <motion.div
            className="env-seal"
            animate={phase}
            variants={rm ?? sealV}
            onClick={(e) => {
              e.stopPropagation();
              if (isSealed && !isBusy) doOpen();
            }}
            role="button"
            tabIndex={isSealed ? 0 : -1}
            aria-label="Wax seal — tap to open invitation"
          >
            <div className="seal-halo" aria-hidden="true" />
            <div className="seal-disc">
              <svg viewBox="0 0 100 100" fill="none" className="seal-svg" aria-hidden="true">
                <defs>
                  <radialGradient id="rubySealGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#C9184A" />
                    <stop offset="38%" stopColor="#800F2F" />
                    <stop offset="78%" stopColor="#4A051A" />
                    <stop offset="100%" stopColor="#22020B" />
                  </radialGradient>
                  <linearGradient id="goldBezelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF6D8" />
                    <stop offset="30%" stopColor="#F3CF68" />
                    <stop offset="68%" stopColor="#B88A28" />
                    <stop offset="100%" stopColor="#75500A" />
                  </linearGradient>
                </defs>

                {/* Outer Bevel Gold Rim */}
                <circle cx="50" cy="50" r="48" fill="url(#goldBezelGrad)" />
                <circle cx="50" cy="50" r="45" stroke="#FFEBA8" strokeWidth="0.8" opacity="0.6" />

                {/* Ruby Wax Core */}
                <circle cx="50" cy="50" r="43.5" fill="url(#rubySealGrad)" />

                {/* Concentric Gold Beaded Ring */}
                <circle cx="50" cy="50" r="39" stroke="url(#goldBezelGrad)" strokeWidth="1" strokeDasharray="1.8 2.2" opacity="0.85" />

                {/* Central Sculpted Tejas Lotus Blossom */}
                <g fill="url(#goldBezelGrad)">
                  <path d="M 50 25 C 44 38 45 52 50 64 C 55 52 56 38 50 25 Z" />
                  <path d="M 50 36 C 40 40 34 50 40 62 C 45 58 48 48 50 36 Z" opacity="0.9" />
                  <path d="M 50 36 C 60 40 66 50 60 62 C 55 58 52 48 50 36 Z" opacity="0.9" />
                  <path d="M 45 48 C 30 52 24 64 34 71 C 40 68 44 58 45 48 Z" opacity="0.8" />
                  <path d="M 55 48 C 70 52 76 64 66 71 C 60 68 56 58 55 48 Z" opacity="0.8" />
                  <path d="M 32 72 Q 50 78 68 72 Q 50 74 32 72 Z" stroke="url(#goldBezelGrad)" strokeWidth="1.5" />
                  <circle cx="50" cy="74" r="2" fill="#FFEAA7" />
                </g>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isOpen && (
        <p className="env-caption">
          <strong>Fold Back</strong> or press <kbd>Esc</kbd> to re-seal
        </p>
      )}

      {/* Lightbox Modal for Full View & Download of Invitation Poster */}
      {showLightbox && (
        <div 
          className="poster-lightbox-overlay" 
          onClick={() => setShowLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full size invitation letter"
        >
          <div className="poster-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="poster-lightbox-header">
              <span className="lightbox-title">TEJAS 2026 — Official Invitation</span>
              <div className="lightbox-actions">
                <a
                  href="/invitation_letter_tejas2026.jpg"
                  download="TEJAS_2026_Invitation.jpg"
                  className="lightbox-btn download-btn"
                  aria-label="Download invitation"
                  onClick={() => playMicroTap()}
                >
                  <Download size={13} />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  className="lightbox-btn close-btn"
                  onClick={() => setShowLightbox(false)}
                  aria-label="Close modal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
            <div className="poster-lightbox-body">
              <img
                src="/invitation_letter_tejas2026.jpg"
                alt="TEJAS 2026 The Fresh Bloom Invitation Letter"
                className="lightbox-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}