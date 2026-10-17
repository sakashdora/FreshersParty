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
  const isSealed   = phase === S.SEALED;
  const isOpening  = phase === S.OPENING;
  const isRevealed = phase === S.REVEALED;
  const isClosing  = phase === S.CLOSING;
  const isBusy     = isOpening || isClosing;
  const isOpen     = isRevealed || isOpening;

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
    const nx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const ny = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setTilt({ x: -ny * 6, y: nx * 6 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // ── Animation variants ────────────────────────────────────────────────────
  const EASE = [0.16, 1, 0.3, 1];

  const flapV = {
    sealed:   { rotateX: 0,    transition: { duration: 0.55, delay: 0.28, ease: EASE } },
    opening:  { rotateX: -180, transition: { duration: 0.62, delay: 0.06, ease: EASE } },
    revealed: { rotateX: -180 },
    closing:  { rotateX: 0,    transition: { duration: 0.52, delay: 0.30, ease: EASE } },
  };

  const cardV = {
    sealed:   { y: 32,  opacity: 0, scale: 0.97, transition: { duration: 0.4, ease: 'easeIn' } },
    opening:  { y: isMobile ? -185 : -258, opacity: 1, scale: 1, transition: { duration: 0.72, delay: 0.28, ease: EASE } },
    revealed: { y: isMobile ? -185 : -258, opacity: 1, scale: 1 },
    closing:  { y: 32,  opacity: 0, scale: 0.97, transition: { duration: 0.38, ease: 'easeIn' } },
  };

  const sealV = {
    sealed:   { opacity: 1, scale: 1,   y: 0,   transition: { duration: 0.4,  ease: 'easeOut' } },
    opening:  { opacity: 0, scale: 0.5, y: -14, transition: { duration: 0.28, ease: 'easeIn'  } },
    revealed: { opacity: 0, scale: 0.5, y: -14 },
    closing:  { opacity: 1, scale: 1,   y: 0,   transition: { duration: 0.35, delay: 0.35, ease: 'easeOut' } },
  };

  const ribbonV = {
    sealed:   { opacity: 1, scaleY: 1,   transition: { duration: 0.35, ease: 'easeOut' } },
    opening:  { opacity: 0, scaleY: 0.5, transition: { duration: 0.26, ease: 'easeIn' } },
    revealed: { opacity: 0, scaleY: 0.5 },
    closing:  { opacity: 1, scaleY: 1,   transition: { duration: 0.3, delay: 0.4, ease: 'easeOut' } },
  };

  const rm = prefersReducedMotion ? {} : undefined; // empty variants when reduced-motion

  return (
    <section
      className="env-stage"
      id="invitation-envelope"
      aria-label="Interactive Invitation Envelope"
    >
      <div className="env-glow" aria-hidden="true" />

      {/* Header copy */}
      <div className="env-header">
        <div className="env-eyebrow">
          <span className="env-eyebrow-dot">✦</span>
          <span>OFFICIAL CORRESPONDENCE · MCA BATCH 2026–2028</span>
          <span className="env-eyebrow-dot">✦</span>
        </div>
        <p className="env-subtitle">
          {isOpen
            ? 'Your invitation has been unveiled. Read the details below.'
            : 'Handcrafted and sealed by your MCA Seniors. Tap the seal to open.'}
        </p>
        {isSealed && (
          <button
            type="button"
            className="env-skip-btn"
            onClick={doOpen}
            onMouseEnter={() => playMicroTap()}
            aria-label="Open invitation directly"
          >
            <span>Open Letter Directly</span>
            <ChevronRight size={13} />
          </button>
        )}
      </div>

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
              <div className="env-flap-vline" />
              <svg viewBox="0 0 120 56" fill="none" className="env-flap-chevron">
                <path d="M2 2 L60 52 L118 2" stroke="#C89B38" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"/>
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
              <div className="env-pocket-tag">
                <span>✦ TEJAS '26 · THE FRESH BLOOM · MCA SENIORS ✦</span>
              </div>
            </div>
          </div>

          {/* ── LAYER 5: Belly-band ribbon ── */}
          <motion.div
            className="env-ribbon"
            animate={phase}
            variants={rm ?? ribbonV}
            aria-hidden="true"
          >
            <div className="env-ribbon-band" />
            <div className="env-ribbon-stitch top" />
            <div className="env-ribbon-stitch bottom" />
          </motion.div>

          {/* ── LAYER 6: Wax seal ── */}
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
              <svg viewBox="0 0 80 80" fill="none" className="seal-svg">
                <defs>
                  <radialGradient id="sealGrad" cx="38%" cy="32%" r="65%">
                    <stop offset="0%"   stopColor="#9C1535" />
                    <stop offset="60%"  stopColor="#6B0D22" />
                    <stop offset="100%" stopColor="#3A0612" />
                  </radialGradient>
                  <linearGradient id="goldRing2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#FFF2CC" />
                    <stop offset="50%"  stopColor="#E5B957" />
                    <stop offset="100%" stopColor="#9C771B" />
                  </linearGradient>
                  <path id="topArc2"  d="M 12 40 A 28 28 0 0 1 68 40" fill="none" />
                  <path id="btmArc2"  d="M 68 40 A 28 28 0 0 1 12 40" fill="none" />
                </defs>
                <circle cx="40" cy="40" r="37" stroke="url(#goldRing2)" strokeWidth="1.2" opacity="0.9" />
                <circle cx="40" cy="40" r="33" stroke="#E5B957" strokeWidth="0.8" strokeDasharray="1.8 2.4" opacity="0.75" />
                <circle cx="40" cy="40" r="31" fill="url(#sealGrad)" />
                <circle cx="40" cy="40" r="23" stroke="#E5B957" strokeWidth="0.7" opacity="0.55" />
                <g transform="translate(40,40)" opacity="0.95">
                  <path d="M0,-13 C3,-6 6,-1 0,6 C-6,-1 -3,-6 0,-13Z" fill="url(#goldRing2)" />
                  <path d="M0,-13 C3,-6 6,-1 0,6 C-6,-1 -3,-6 0,-13Z" fill="url(#goldRing2)" transform="rotate(72)" />
                  <path d="M0,-13 C3,-6 6,-1 0,6 C-6,-1 -3,-6 0,-13Z" fill="url(#goldRing2)" transform="rotate(144)" opacity="0.65" />
                  <path d="M0,-13 C3,-6 6,-1 0,6 C-6,-1 -3,-6 0,-13Z" fill="url(#goldRing2)" transform="rotate(216)" opacity="0.65" />
                  <path d="M0,-13 C3,-6 6,-1 0,6 C-6,-1 -3,-6 0,-13Z" fill="url(#goldRing2)" transform="rotate(288)" />
                  <circle cx="0" cy="0" r="3.2" fill="#FFF2CC" opacity="0.9" />
                </g>
                <text fontSize="5.2" fill="#FFE8A0" fontWeight="700" letterSpacing="0.12em" fontFamily="Outfit, sans-serif">
                  <textPath href="#topArc2" startOffset="50%" textAnchor="middle">DEPARTMENT OF MCA</textPath>
                </text>
                <text fontSize="4.8" fill="#FFE8A0" fontWeight="600" letterSpacing="0.1em" fontFamily="Outfit, sans-serif">
                  <textPath href="#btmArc2" startOffset="50%" textAnchor="middle">SRUSTI ACADEMY · '26</textPath>
                </text>
              </svg>
            </div>
            {isSealed && (
              <div className="seal-hint">
                <span>✦</span><span>TAP TO OPEN</span><span>✦</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <p className="env-caption">
        {isOpen
          ? <><strong>Fold Back</strong> or press <kbd>Esc</kbd> to re-seal</>
          : <>Tap the seal or press <kbd>Space</kbd> / <kbd>Enter</kbd> to unveil</>
        }
      </p>
    </section>
  );
}