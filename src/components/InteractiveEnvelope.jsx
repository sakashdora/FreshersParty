import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowDown, Heart, ChevronRight } from 'lucide-react';
import { playPaperRustle, playMicroTap, playCelestialRevealChime } from '../utils/audio';

// ─── State machine ─────────────────────────────────────────────────────────
// SEALED → OPENING → REVEALED → CLOSING → SEALED
const S = { SEALED: 'sealed', OPENING: 'opening', REVEALED: 'revealed', CLOSING: 'closing' };

export default function InteractiveEnvelope({ isLetterOpen, onToggleOpen }) {
  const [phase, setPhase] = useState(() => (isLetterOpen ? S.REVEALED : S.SEALED));
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const containerRef = useRef(null);
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
    // Functional updater — never reads stale phase
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
          particleCount: 90,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#E5B957', '#C89B38', '#7A1030', '#FCE7A2', '#FDF8F0'],
          gravity: 0.85,
        });
      }
      if (onToggleOpen) onToggleOpen(true);
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
    sealed: { y: 32, opacity: 0, scale: 0.97, transition: { duration: 0.4, ease: 'easeIn' } },
    opening: { y: isMobile ? -290 : -410, opacity: 1, scale: 1, transition: { duration: 0.72, delay: 0.28, ease: EASE } },
    revealed: { y: isMobile ? -290 : -410, opacity: 1, scale: 1 },
    closing: { y: 32, opacity: 0, scale: 0.97, transition: { duration: 0.38, ease: 'easeIn' } },
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
            <span className="env-eyebrow-dot">✦</span>
            <span>OFFICIAL CORRESPONDENCE · MCA BATCH 2026–2028</span>
            <span className="env-eyebrow-dot">✦</span>
          </div>
          <p className="env-subtitle">
            Your invitation has been unveiled. Read the details below.
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

        {/* Flanking realistic botanical golden laurel branches matching Image 2 */}
        <div className="env-flank-laurel flank-left" aria-hidden="true">
          <svg viewBox="0 0 180 120" fill="none" className="laurel-branch-svg">
            <defs>
              <linearGradient id="laurelStemGradL" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#75500A" />
                <stop offset="50%" stopColor="#E5B957" />
                <stop offset="100%" stopColor="#FFF4D0" />
              </linearGradient>
              <linearGradient id="laurelLeafGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E0" />
                <stop offset="30%" stopColor="#F5D061" />
                <stop offset="70%" stopColor="#C89B38" />
                <stop offset="100%" stopColor="#7A5208" />
              </linearGradient>
              <filter id="laurelBranchShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>
            <g filter="url(#laurelBranchShadow)">
              <path d="M 15 110 C 50 102 95 85 160 35" stroke="url(#laurelStemGradL)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 15 110 C 50 102 95 85 160 35" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

              <path d="M 28 102 C 12 90 10 70 32 72 C 42 85 36 98 28 102 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 28 102 Q 22 84 32 72" stroke="#FFFDF0" strokeWidth="1" opacity="0.8" />

              <path d="M 45 96 C 52 74 38 60 56 62 C 64 76 56 92 45 96 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 45 96 Q 50 78 56 62" stroke="#FFFDF0" strokeWidth="1" opacity="0.8" />

              <path d="M 65 85 C 42 70 45 46 72 52 C 80 66 74 80 65 85 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 65 85 Q 58 66 72 52" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.85" />

              <path d="M 88 75 C 96 52 82 38 102 42 C 108 58 98 72 88 75 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 88 75 Q 94 56 102 42" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.85" />

              <path d="M 112 62 C 90 48 95 24 124 30 C 130 46 122 58 112 62 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 112 62 Q 106 42 124 30" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.9" />

              <path d="M 134 48 C 142 26 128 12 148 18 C 154 32 144 45 134 48 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 134 48 Q 140 30 148 18" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.9" />

              <path d="M 160 35 C 160 12 178 5 180 20 C 178 32 168 36 160 35 Z" fill="url(#laurelLeafGradL)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 160 35 Q 170 20 180 20" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.95" />
            </g>
          </svg>
        </div>
        <div className="env-flank-laurel flank-right" aria-hidden="true">
          <svg viewBox="0 0 180 120" fill="none" className="laurel-branch-svg">
            <defs>
              <linearGradient id="laurelStemGradR" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#75500A" />
                <stop offset="50%" stopColor="#E5B957" />
                <stop offset="100%" stopColor="#FFF4D0" />
              </linearGradient>
              <linearGradient id="laurelLeafGradR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF8E0" />
                <stop offset="30%" stopColor="#F5D061" />
                <stop offset="70%" stopColor="#C89B38" />
                <stop offset="100%" stopColor="#7A5208" />
              </linearGradient>
            </defs>
            <g filter="url(#laurelBranchShadow)">
              <path d="M 165 110 C 130 102 85 85 20 35" stroke="url(#laurelStemGradR)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 165 110 C 130 102 85 85 20 35" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

              <path d="M 152 102 C 168 90 170 70 148 72 C 138 85 144 98 152 102 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 152 102 Q 158 84 148 72" stroke="#FFFDF0" strokeWidth="1" opacity="0.8" />

              <path d="M 135 96 C 128 74 142 60 124 62 C 116 76 124 92 135 96 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 135 96 Q 130 78 124 62" stroke="#FFFDF0" strokeWidth="1" opacity="0.8" />

              <path d="M 115 85 C 138 70 135 46 108 52 C 100 66 106 80 115 85 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 115 85 Q 122 66 108 52" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.85" />

              <path d="M 92 75 C 84 52 98 38 78 42 C 72 58 82 72 92 75 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 92 75 Q 86 56 78 42" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.85" />

              <path d="M 68 62 C 90 48 85 24 56 30 C 50 46 58 58 68 62 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 68 62 Q 74 42 56 30" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.9" />

              <path d="M 46 48 C 38 26 52 12 32 18 C 26 32 36 45 46 48 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 46 48 Q 40 30 32 18" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.9" />

              <path d="M 20 35 C 20 12 2 5 0 20 C 2 32 12 36 20 35 Z" fill="url(#laurelLeafGradR)" stroke="#6E4804" strokeWidth="0.8" />
              <path d="M 20 35 Q 10 20 0 20" stroke="#FFFDF0" strokeWidth="1.2" opacity="0.95" />
            </g>
          </svg>
        </div>

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

          {/* ── LAYER 3: Invitation card ── */}
          <motion.article
            className={`env-card ${isOpen ? 'card-open' : 'card-tucked'}`}
            animate={phase}
            variants={rm ?? cardV}
            role="document"
            aria-label="Official Invitation — TEJAS The Fresh Bloom"
          >
            <div className="card-surface">
              <div className="card-frame" aria-hidden="true" />

              {/* Card header row */}
              <div className="card-top">
                <div className="card-monogram" aria-hidden="true">T</div>
                <div className="card-top-copy">
                  <span className="card-dept">DEPARTMENT OF COMPUTER APPLICATIONS</span>
                  <strong className="card-inst">Srusti Academy of Management &amp; Technology</strong>
                </div>
                {isOpen && !isBusy && (
                  <button
                    type="button"
                    className="card-reseal-btn"
                    onClick={(e) => { e.stopPropagation(); doClose(); }}
                    aria-label="Fold back into envelope"
                  >
                    <RotateCcw size={11} />
                    <span>Fold Back</span>
                  </button>
                )}
              </div>

              <div className="card-rule" aria-hidden="true" />

              {/* Identity block */}
              <div className="card-identity">
                <p className="card-eyebrow-copy">You are cordially invited to</p>
                <h2 className="card-event-name">TEJAS <em>'26</em></h2>
                <p className="card-tagline">The Fresh Bloom</p>
              </div>

              {/* Letter body */}
              <div className="card-body-text">
                <p className="card-salutation">Dear Juniors,</p>
                <p>
                  A new chapter begins, and we cannot wait to welcome you into the MCA family.
                  On <strong>30 October 2026</strong>, join us for Freshers Day — a day of
                  laughter, performances, and memories that will define your years here.
                </p>
                <p className="card-quote">
                  "Let us make this beginning unforgettable, together."
                </p>
              </div>

              {/* Date details */}
              <div className="card-dates">
                <div className="card-date-item">
                  <div className="date-label">Freshers Day</div>
                  <div className="date-value">30 October 2026</div>
                  <div className="date-note">Full Day Celebration</div>
                </div>
                <div className="card-date-sep" />
                <div className="card-date-item">
                  <div className="date-label">Banner &amp; Name Reveal</div>
                  <div className="date-value">27 October 2026</div>
                  <div className="date-note">Look out for the drop</div>
                </div>
              </div>

              {/* Sign-off */}
              <div className="card-signoff">
                <span className="card-signoff-quote">"The Fresh Bloom."</span>
                <div className="card-signoff-by">
                  <strong>Your Seniors</strong>
                  <span>MCA · Srusti Academy</span>
                </div>
              </div>

              {/* Actions */}
              <div className="card-actions">
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
                >
                  <Heart size={13} />
                  <span>Cheer for us</span>
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
              <svg viewBox="0 0 100 100" fill="none" className="seal-svg">
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
                  <linearGradient id="starGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF2" />
                    <stop offset="42%" stopColor="#FCD56B" />
                    <stop offset="85%" stopColor="#D4A135" />
                    <stop offset="100%" stopColor="#966B14" />
                  </linearGradient>
                  <filter id="sealDropGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Bevel Gold Rim */}
                <circle cx="50" cy="50" r="48" fill="url(#goldBezelGrad)" />
                <circle cx="50" cy="50" r="45" stroke="#FFEBA8" strokeWidth="0.8" opacity="0.6" />

                {/* Ruby Wax Core */}
                <circle cx="50" cy="50" r="43.5" fill="url(#rubySealGrad)" />

                {/* Concentric Gold Beaded Rings */}
                <circle cx="50" cy="50" r="40" stroke="url(#goldBezelGrad)" strokeWidth="1" strokeDasharray="1.6 2.2" opacity="0.9" />
                <circle cx="50" cy="50" r="37.5" stroke="#FFEAA7" strokeWidth="0.6" opacity="0.4" />

                {/* Circular Laurel Wreath */}
                <g stroke="url(#goldBezelGrad)" fill="url(#goldBezelGrad)" strokeWidth="0.4" opacity="0.95">
                  <path d="M 50 16 C 30 16 20 32 20 50 C 20 66 30 81 48 83" fill="none" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M 50 16 C 70 16 80 32 80 50 C 80 66 70 81 52 83" fill="none" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Left Wreath Leaves */}
                  <path d="M22 36 C17 34 16 28 20 26 C24 28 25 33 22 36 Z" />
                  <path d="M25 38 C28 34 29 28 24 26 C21 28 22 35 25 38 Z" />
                  <path d="M18 48 C13 47 12 41 16 38 C20 40 21 45 18 48 Z" />
                  <path d="M20 50 C24 47 26 41 21 38 C17 40 18 47 20 50 Z" />
                  <path d="M19 62 C14 62 13 56 18 53 C22 55 22 60 19 62 Z" />
                  <path d="M22 63 C25 61 28 55 24 52 C20 54 20 60 22 63 Z" />
                  <path d="M26 73 C22 75 19 70 23 66 C27 67 28 72 26 73 Z" />
                  <path d="M28 73 C30 70 34 66 31 63 C27 65 26 70 28 73 Z" />
                  <path d="M38 81 C34 83 32 78 37 74 C41 75 41 80 38 81 Z" />

                  {/* Right Wreath Leaves */}
                  <path d="M78 36 C83 34 84 28 80 26 C76 28 75 33 78 36 Z" />
                  <path d="M75 38 C72 34 71 28 76 26 C79 28 78 35 75 38 Z" />
                  <path d="M82 48 C87 47 88 41 84 38 C80 40 79 45 82 48 Z" />
                  <path d="M80 50 C76 47 74 41 79 38 C83 40 82 47 80 50 Z" />
                  <path d="M81 62 C86 62 87 56 82 53 C78 55 78 60 81 62 Z" />
                  <path d="M78 63 C75 61 72 55 76 52 C80 54 80 60 78 63 Z" />
                  <path d="M74 73 C78 75 81 70 77 66 C73 67 72 72 74 73 Z" />
                  <path d="M72 73 C70 70 66 66 69 63 C73 65 74 70 72 73 Z" />
                  <path d="M62 81 C66 83 68 78 63 74 C59 75 59 80 62 81 Z" />

                  <circle cx="50" cy="83" r="2.2" fill="url(#goldBezelGrad)" />
                </g>

                {/* Central 5-Pointed Gold Star */}
                <polygon
                  points="50,26 55.5,39.5 70,40.5 59,50 63,64 50,55.5 37,64 41,50 30,40.5 44.5,39.5"
                  fill="url(#starGoldGrad)"
                  stroke="#8A5A12"
                  strokeWidth="0.6"
                  filter="url(#sealDropGlow)"
                />
                <polygon points="50,26 50,55.5 44.5,39.5" fill="#FFFBE8" opacity="0.6" />
                <polygon points="50,26 50,55.5 55.5,39.5" fill="#B8861B" opacity="0.35" />
                <polygon points="70,40.5 50,55.5 59,50" fill="#FFFBE8" opacity="0.4" />
                <polygon points="63,64 50,55.5 59,50" fill="#996D13" opacity="0.4" />
                <polygon points="37,64 50,55.5 41,50" fill="#FFFBE8" opacity="0.4" />
                <polygon points="30,40.5 50,55.5 41,50" fill="#996D13" opacity="0.4" />
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
    </section>
  );
}