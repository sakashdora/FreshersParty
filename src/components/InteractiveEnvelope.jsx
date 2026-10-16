import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Calendar, MapPin, Clock, ArrowDown,
  RotateCcw, Sparkles, Heart, ChevronRight, Check
} from 'lucide-react';
import { playPaperRustle, playMicroTap, playCelestialRevealChime } from '../utils/audio';

export default function InteractiveEnvelope({ isLetterOpen, onToggleOpen }) {
  // State: 'sealed' | 'unsealing' | 'opened' | 'resealing'
  const [animState, setAnimState] = useState(isLetterOpen ? 'opened' : 'sealed');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const isOpen = animState === 'opened' || animState === 'unsealing';
  const isBusy = animState === 'unsealing' || animState === 'resealing';

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 640 : false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize external prop changes
  useEffect(() => {
    if (isLetterOpen !== undefined) {
      if (isLetterOpen && animState === 'sealed') {
        handleOpen();
      } else if (!isLetterOpen && animState === 'opened') {
        handleClose();
      }
    }
  }, [isLetterOpen]);

  // Subtle 3D tilt on mouse hover when closed
  const handleMouseMove = (e) => {
    if (isOpen || isBusy || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 5,
      y: (x / (rect.width / 2)) * 5
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Coordinated unsealing sequence
  const handleOpen = useCallback(() => {
    if (animState !== 'sealed') return;
    setAnimState('unsealing');
    playPaperRustle();

    // Step 1: Seal & ribbon dissolve, flap rotates open (0ms - 400ms)
    // Step 2: Card glides up from inside the pocket (350ms - 900ms)
    setTimeout(() => {
      playCelestialRevealChime();
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.58 },
        colors: ['#E5B957', '#C89B38', '#6E122E', '#FCE7A2', '#FDFBF7']
      });
      setAnimState('opened');
      if (onToggleOpen) onToggleOpen(true);
    }, 700);
  }, [animState, onToggleOpen]);

  // Coordinated resealing sequence
  const handleClose = useCallback(() => {
    if (animState !== 'opened') return;
    setAnimState('resealing');
    playPaperRustle();

    // Step 1: Card descends into pocket (0ms - 400ms)
    // Step 2: Flap rotates down and seal reappears (400ms - 800ms)
    setTimeout(() => {
      setAnimState('sealed');
      if (onToggleOpen) onToggleOpen(false);
    }, 750);
  }, [animState, onToggleOpen]);

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen && !isBusy) {
        handleOpen();
      } else if (isOpen && !isBusy) {
        handleClose();
      }
    } else if (e.key === 'Escape' && isOpen && !isBusy) {
      handleClose();
    }
  };

  return (
    <section
      className="tejas-envelope-stage"
      id="invitation-envelope"
      aria-label="Official Ceremonial Invitation"
    >
      {/* Ambient Lighting Dome */}
      <div className="envelope-ambient-glow" aria-hidden="true" />

      {/* Stage Header & Status Bar */}
      <div className="envelope-stage-header">
        <div className="envelope-status-badge">
          <span className="badge-sparkle">✦</span>
          <span>OFFICIAL CORRESPONDENCE · MCA BATCH 2026–2028</span>
          <span className="badge-sparkle">✦</span>
        </div>

        <p className="envelope-status-subtitle">
          {isOpen
            ? "Your welcoming correspondence is unveiled below. Read the coordinates and fold back at any time."
            : "Handcrafted and sealed by the Department of MCA seniors. Touch the royal wax seal to unveil your invitation."}
        </p>

        {/* Accessible Direct Button */}
        {!isOpen && (
          <button
            type="button"
            className="envelope-direct-cta-btn"
            onClick={handleOpen}
            onMouseEnter={() => playMicroTap()}
            aria-label="Open invitation letter directly"
          >
            <span>Unseal &amp; Open Letter Directly</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* Main 3D Envelope Presentation Chassis */}
      <div
        ref={containerRef}
        className={`envelope-master-chassis ${isOpen ? 'state-opened' : 'state-sealed'}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={!isOpen && !isBusy ? handleOpen : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={!isOpen ? 0 : -1}
        role="button"
        aria-label={!isOpen ? "Wax-sealed invitation envelope for TEJAS '26. Press Enter or Space to unseal." : "Opened envelope"}
        aria-expanded={isOpen}
      >
        {/* Soft Ground Contact Shadow */}
        <div className="envelope-table-shadow" aria-hidden="true" />

        {/* 3D Physics Tilting Box */}
        <motion.div
          className="envelope-viewport-3d"
          animate={{
            rotateX: !isOpen ? tilt.x : 0,
            rotateY: !isOpen ? tilt.y : 0
          }}
          transition={{ type: 'spring', damping: 24, stiffness: 180 }}
        >
          {/* ============================================================
              LAYER 1: ENVELOPE BACK SHELL & PATTERNED SILK INNER LINING
              ============================================================ */}
          <div className="envelope-back-wall">
            {/* Damask silk inner lining visible behind the card */}
            <div className="envelope-lining-pattern">
              <div className="lining-filigree-grid" />
              <div className="lining-inner-border" />
            </div>
          </div>

          {/* ============================================================
              LAYER 2: ROTATING TOP FLAP (3D HINGE AT TOP EDGE)
              When closed: z-index 10 (over the pocket & card)
              When opened: rotateX(-180deg), drops to z-index 2 (behind card)
              ============================================================ */}
          <motion.div
            className="envelope-flap-3d"
            initial={false}
            animate={{
              rotateX: isOpen ? -180 : 0,
              zIndex: isOpen ? 2 : 10
            }}
            transition={{
              duration: 0.65,
              delay: isOpen ? 0.08 : 0.28,
              ease: [0.16, 1, 0.3, 1]
            }}
            aria-hidden="true"
          >
            {/* Outside Face: Deep Midnight Oxford Velvet with Gold Contour */}
            <div className="flap-face flap-outside">
              <div className="flap-shape-contour" />
              <div className="flap-gold-piping" />
              <div className="flap-monogram-crest">
                <svg viewBox="0 0 60 22" fill="none" className="flap-crest-svg">
                  <path d="M4 3 L30 18 L56 3" stroke="#E5B957" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="30" cy="18" r="2.5" fill="#E5B957" />
                  <path d="M22 6 L30 12 L38 6" stroke="#C89B38" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>
            </div>

            {/* Inside Face: Silk Lining revealed when flipped 180 degrees */}
            <div className="flap-face flap-inside">
              <div className="flap-inside-lining" />
              <div className="flap-inside-border" />
            </div>
          </motion.div>

          {/* ============================================================
              LAYER 3: THE INVITATION CARD (SLIDES OUT OF POCKET)
              When closed: hidden inside sleeve pocket (opacity 0, zIndex 4)
              When opened: glides upward into view (opacity 1, zIndex 15)
              ============================================================ */}
          <motion.article
            className={`envelope-letter-card ${isOpen ? 'card-is-emerged' : 'card-is-tucked'}`}
            initial={false}
            animate={
              isOpen
                ? { y: isMobile ? -200 : -270, scale: 1, opacity: 1, zIndex: 15 }
                : { y: 20, scale: 0.98, opacity: 0, zIndex: 4 }
            }
            transition={{
              duration: 0.75,
              delay: isOpen ? 0.22 : 0,
              ease: [0.16, 1, 0.3, 1]
            }}
            role="document"
            aria-label="Official Invitation Letter from Department of MCA Seniors"
          >
            <div className="card-cardstock-surface">
              {/* Double Gold Foil Stamped Framing */}
              <div className="card-foil-frame" aria-hidden="true" />
              <div className="card-corner-motif top-l" aria-hidden="true">✦</div>
              <div className="card-corner-motif top-r" aria-hidden="true">✦</div>
              <div className="card-corner-motif btm-l" aria-hidden="true">✦</div>
              <div className="card-corner-motif btm-r" aria-hidden="true">✦</div>

              {/* Card Header & Dept Credential */}
              <div className="card-header-bar">
                <div className="card-crest-coin" aria-hidden="true">
                  <span>T</span>
                </div>

                <div className="card-header-titles">
                  <span className="card-dept-name">DEPARTMENT OF COMPUTER APPLICATIONS</span>
                  <strong className="card-inst-name">SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</strong>
                  <span className="card-event-badge">TEJAS ’26 · THE FRESH BLOOM · OFFICIAL INVITATION</span>
                </div>

                {/* Reseal / Fold Back Button */}
                {isOpen && (
                  <button
                    type="button"
                    className="card-foldback-pill-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    aria-label="Fold invitation letter back into envelope"
                    title="Fold back into envelope"
                  >
                    <RotateCcw size={12} />
                    <span>Fold Back</span>
                  </button>
                )}
              </div>

              <div className="card-hairline-separator" aria-hidden="true" />

              {/* Salutation */}
              <h3 className="card-salutation-heading">Dear Juniors,</h3>

              {/* Invitation Letter Body */}
              <div className="card-letter-content">
                <p>
                  A new chapter is about to begin, and we cannot wait to welcome you into the MCA family.
                </p>
                <p>
                  On <strong>30 October 2026</strong>, the Department of MCA invites you to celebrate Freshers Day with us at <strong>JRD Tata Hall</strong> — a day filled with laughter, performances, fun games, and memories that will define your college journey.
                </p>
                <p>
                  As your seniors, we look forward to meeting you, cheering for your talents, and making you feel at home. Come with your enthusiasm and your brightest smiles.
                </p>
                <p className="card-highlight-tagline">
                  “Let us make this beginning memorable, together.”
                </p>
              </div>

              {/* Official Event Coordinates Trio */}
              <div className="card-coordinates-grid">
                <div className="coord-card">
                  <Calendar size={15} className="coord-card-icon" />
                  <div className="coord-card-info">
                    <span className="coord-card-label">Freshers Day Gala</span>
                    <strong className="coord-card-value">30 October 2026</strong>
                    <span className="coord-card-sub">Full Day Celebration</span>
                  </div>
                </div>

                <div className="coord-card">
                  <Clock size={15} className="coord-card-icon" />
                  <div className="coord-card-info">
                    <span className="coord-card-label">Programme Timing</span>
                    <strong className="coord-card-value">10:30 AM Onwards</strong>
                    <span className="coord-card-sub">Doors Open 10:00 AM</span>
                  </div>
                </div>

                <div className="coord-card">
                  <MapPin size={15} className="coord-card-icon" />
                  <div className="coord-card-info">
                    <span className="coord-card-label">Ceremonial Venue</span>
                    <strong className="coord-card-value">JRD Tata Hall</strong>
                    <span className="coord-card-sub">Srusti Campus, BBSR</span>
                  </div>
                </div>
              </div>

              {/* Seniors Sign-Off Block */}
              <div className="card-signoff-row">
                <div className="signoff-quote">“The Fresh Bloom.”</div>
                <div className="signoff-signature">
                  <span className="signoff-greeting">With warm wishes and excitement,</span>
                  <strong className="signoff-name">Your Seniors</strong>
                  <span className="signoff-dept">Department of Computer Applications</span>
                  <span className="signoff-campus">Srusti Academy of Management &amp; Technology</span>
                </div>
              </div>

              {/* Direct Next Step Action Links */}
              <div className="card-action-links">
                <a
                  href="#agenda-flow"
                  className="card-cta-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('agenda-flow')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Programme Schedule</span>
                  <ArrowDown size={14} />
                </a>

                <button
                  type="button"
                  className="card-cta-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    confetti({
                      particleCount: 70,
                      spread: 75,
                      colors: ['#E5B957', '#C89B38', '#6E122E', '#FCE7A2', '#FDFBF7']
                    });
                  }}
                >
                  <Heart size={14} className="heart-icon" />
                  <span>Cheer with Seniors</span>
                </button>
              </div>
            </div>
          </motion.article>

          {/* ============================================================
              LAYER 4: FRONT POCKET SLEEVE
              z-index: 6 (ALWAYS IN FRONT OF LOWER CARD!)
              Covers bottom half of card when emerged, creating realistic physical slot
              ============================================================ */}
          <div className="envelope-front-pocket" aria-hidden="true">
            {/* Pocket body with Euro-cut neckline */}
            <div className="pocket-cut-surface">
              <div className="pocket-inner-shadow" />
              <div className="pocket-gold-hem" />
              <div className="pocket-center-insignia">
                <span className="insignia-text">✦ DEPARTMENT OF MCA · TEJAS ’26 · THE FRESH BLOOM ✦</span>
              </div>
            </div>

            {/* Corner Filigree Brackets */}
            <div className="pocket-bracket btm-left" />
            <div className="pocket-bracket btm-right" />
          </div>

          {/* ============================================================
              LAYER 5: WOVEN SATIN BELLY BAND RIBBON
              z-index: 11 (Over the front pocket & flap when closed)
              ============================================================ */}
          <motion.div
            className="envelope-satin-ribbon"
            animate={{
              opacity: isOpen ? 0 : 1,
              scaleY: isOpen ? 0.7 : 1
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            aria-hidden="true"
          >
            <div className="ribbon-strip-horizontal" />
            <div className="ribbon-stitched-line top" />
            <div className="ribbon-stitched-line bottom" />
          </motion.div>

          {/* ============================================================
              LAYER 6: SCULPTED ROYAL WAX SEAL MEDALLION
              z-index: 12 (Sitting squarely over the flap point & ribbon)
              ============================================================ */}
          <motion.div
            className="envelope-wax-medallion"
            animate={{
              opacity: isOpen ? 0 : 1,
              scale: isOpen ? 0.6 : 1,
              y: isOpen ? -18 : 0
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isOpen && !isBusy) handleOpen();
            }}
            role="button"
            tabIndex={!isOpen ? 0 : -1}
            aria-label="Royal Wax Seal: Touch to unseal invitation letter"
          >
            {/* Golden Pulsing Halo */}
            <div className="seal-ambient-pulse" aria-hidden="true" />

            {/* Dimensional Wax Disc */}
            <div className="seal-wax-disc">
              <svg viewBox="0 0 64 64" className="seal-emblem-svg" fill="none">
                <defs>
                  <linearGradient id="waxGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2D1" />
                    <stop offset="45%" stopColor="#E5B957" />
                    <stop offset="100%" stopColor="#9C771B" />
                  </linearGradient>
                  <path id="sealTopArc" d="M 10 32 A 22 22 0 0 1 54 32" fill="none" />
                  <path id="sealBtmArc" d="M 54 32 A 22 22 0 0 1 10 32" fill="none" />
                </defs>

                {/* Stamped Organic Outer Lip */}
                <circle cx="32" cy="32" r="29" stroke="url(#waxGoldFoil)" strokeWidth="0.8" opacity="0.85" />
                <circle cx="32" cy="32" r="26.5" stroke="#E5B957" strokeWidth="1" strokeDasharray="1.5 2" opacity="0.9" />

                {/* Circular Inscribed Text */}
                <text fontSize="4.2" fill="#FFEBB3" fontWeight="700" letterSpacing="0.1em" fontFamily="Outfit, sans-serif">
                  <textPath href="#sealTopArc" startOffset="50%" textAnchor="middle">
                    DEPARTMENT OF MCA
                  </textPath>
                </text>

                {/* Central Medallion Seal */}
                <g transform="translate(32, 32)">
                  <circle cx="0" cy="0" r="13.5" fill="#420919" stroke="url(#waxGoldFoil)" strokeWidth="1.2" />
                  
                  {/* Lotus Motif */}
                  <path
                    d="M 0 -8 C 2 -4 5 -1 0 5 C -5 -1 -2 -4 0 -8 Z"
                    fill="url(#waxGoldFoil)"
                    opacity="0.95"
                  />
                  <path
                    d="M -1 -2 C -5 -1 -8 3 -3 6 C 0 5 1 2 -1 -2 Z"
                    fill="#C89B38"
                    opacity="0.85"
                  />
                  <path
                    d="M 1 -2 C 5 -1 8 3 3 6 C 0 5 -1 2 1 -2 Z"
                    fill="#C89B38"
                    opacity="0.85"
                  />

                  {/* TEJAS '26 Text */}
                  <text
                    x="0"
                    y="10.5"
                    textAnchor="middle"
                    fill="#FFF2D1"
                    fontFamily="Cinzel, Georgia, serif"
                    fontSize="5"
                    fontWeight="800"
                    letterSpacing="0.08em"
                  >
                    TEJAS ’26
                  </text>
                </g>

                <text fontSize="3.8" fill="#FFEBB3" fontWeight="600" letterSpacing="0.08em" fontFamily="Outfit, sans-serif">
                  <textPath href="#sealBtmArc" startOffset="50%" textAnchor="middle">
                    SRUSTI ACADEMY
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Interactive Invitation Tooltip Badge */}
            {!isOpen && (
              <div className="seal-interactive-badge">
                <span className="badge-gem">✦</span>
                <span>TOUCH TO UNSEAL</span>
                <span className="badge-gem">✦</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Accessible Footer Caption & Control Hint */}
      <div className="envelope-accessibility-caption">
        {!isOpen ? (
          <span>Click the royal wax seal or press <kbd>Space</kbd> / <kbd>Enter</kbd> to unveil the invitation</span>
        ) : (
          <span>Invitation unveiled · Click <strong>Fold Back</strong> or press <kbd>Esc</kbd> to re-seal envelope</span>
        )}
      </div>
    </section>
  );
}
