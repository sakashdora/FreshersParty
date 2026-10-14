import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar, MapPin, Clock, ArrowDown,
  RotateCcw, Eye, Heart
} from 'lucide-react';
import { playPaperRustle, playMicroTap } from '../utils/audio';

export default function InteractiveEnvelope({ onOpenLetter, isLetterOpen, onToggleOpen }) {
  // Opening stages: 'closed' -> 'untying' -> 'flap-opening' -> 'letter-rising' -> 'opened'
  const [stage, setStage] = useState(isLetterOpen ? 'opened' : 'closed');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef(null);

  useEffect(() => {
    if (isLetterOpen && stage === 'closed') {
      triggerOpenSequence();
    } else if (!isLetterOpen && stage === 'opened') {
      setStage('closed');
    }
  }, [isLetterOpen]);

  // Pointer tilt for tactile 3D effect
  const handleMouseMove = (e) => {
    if (!envelopeRef.current || stage !== 'closed') return;
    const rect = envelopeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 7,
      y: (x / (rect.width / 2)) * 7
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const triggerOpenSequence = useCallback(() => {
    if (stage !== 'closed') return;

    playPaperRustle();
    setStage('untying');

    setTimeout(() => {
      setStage('flap-opening');
    }, 400);

    setTimeout(() => {
      setStage('letter-rising');
    }, 850);

    setTimeout(() => {
      setStage('opened');

      // Launch celebration confetti with official TEJAS '26 palette
      confetti({
        particleCount: 85,
        spread: 85,
        origin: { y: 0.58 },
        colors: ['#D4AF37', '#5B0E23', '#A31E3B', '#FDEBB2', '#FAF7F2']
      });

      if (onToggleOpen) onToggleOpen(true);
    }, 1350);
  }, [stage, onToggleOpen]);

  const handleCloseSequence = () => {
    setStage('closed');
    if (onToggleOpen) onToggleOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (stage === 'closed') {
        triggerOpenSequence();
      } else if (stage === 'opened') {
        handleCloseSequence();
      }
    } else if (e.key === 'Escape' && stage === 'opened') {
      handleCloseSequence();
    }
  };

  const isOpen = stage === 'opened' || stage === 'letter-rising';

  return (
    <section className="envelope-interactive-section" id="invitation-envelope">
      {/* Visual Convergence & Ambient Stage Backdrop */}
      <div className="convergence-backdrop-lines" aria-hidden="true">
        <div className="axis-line axis-horizontal" />
        <div className="axis-line axis-vertical" />
        <div className="axis-glow-sphere" />
        <div className="envelope-stage-spotlight" />
      </div>

      <div className="envelope-section-header">
        <div className="envelope-eyebrow-pill">
          <span className="eyebrow-seal-mark">◆</span>
          <span>FORMAL CORRESPONDENCE</span>
        </div>
        <h2 className="envelope-section-title">The Senior Welcome</h2>
        <p className="envelope-section-subtitle">
          {isOpen
            ? "Your welcoming correspondence from the senior MCA batch is unveiled below."
            : "Hand-folded and wax-sealed by the Department of MCA seniors. Touch the wax seal to unveil your invitation coordinates and programme schedule."}
        </p>

        {/* Direct Accessible Toggle button when closed */}
        {!isOpen && (
          <div className="envelope-accessible-controls">
            <button
              className="btn-text-subtle"
              onClick={triggerOpenSequence}
              onMouseEnter={() => playMicroTap()}
              aria-label="Directly open invitation letter"
            >
              <Eye size={14} />
              <span>Open Invitation Directly</span>
            </button>
          </div>
        )}
      </div>

      {/* The 3D Envelope Scene Viewport */}
      <div
        className={`envelope-viewport ${stage}`}
        ref={envelopeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={stage === 'closed' ? triggerOpenSequence : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={stage === 'closed' ? 0 : -1}
        role="button"
        aria-label={stage === 'closed' ? "Sealed invitation envelope for TEJAS '26. Press Enter or Space to break seal and open letter." : "Opened envelope"}
        aria-expanded={isOpen}
        style={{
          transform: stage === 'closed'
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : 'none'
        }}
      >
        <div className="envelope-box">
          {/* Ornate Gold Filigree Corner Accents */}
          <div className="env-corner-filigree top-left" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M2 2h14c6.627 0 12 5.373 12 12v14M2 2v14c0 6.627 5.373 12 12 12h14" stroke="#E4B96B" strokeWidth="1.2" opacity="0.8" />
              <circle cx="8" cy="8" r="2" fill="#E4B96B" opacity="0.9" />
              <circle cx="16" cy="16" r="1.5" fill="#E4B96B" opacity="0.7" />
            </svg>
          </div>
          <div className="env-corner-filigree top-right" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M30 2H16C9.373 2 4 7.373 4 14v14M30 2v14c0 6.627-5.373 12-12 12H4" stroke="#E4B96B" strokeWidth="1.2" opacity="0.8" />
              <circle cx="24" cy="8" r="2" fill="#E4B96B" opacity="0.9" />
              <circle cx="16" cy="16" r="1.5" fill="#E4B96B" opacity="0.7" />
            </svg>
          </div>
          <div className="env-corner-filigree bottom-left" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M2 30h14c6.627 0 12-5.373 12-12V4M2 30V16c0-6.627 5.373-12 12-12h14" stroke="#E4B96B" strokeWidth="1.2" opacity="0.8" />
              <circle cx="8" cy="24" r="2" fill="#E4B96B" opacity="0.9" />
              <circle cx="16" cy="16" r="1.5" fill="#E4B96B" opacity="0.7" />
            </svg>
          </div>
          <div className="env-corner-filigree bottom-right" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M30 30H16c-6.627 0-12-5.373-12-12V4M30 30V16c0-6.627-5.373-12-12-12H4" stroke="#E4B96B" strokeWidth="1.2" opacity="0.8" />
              <circle cx="24" cy="24" r="2" fill="#E4B96B" opacity="0.9" />
              <circle cx="16" cy="16" r="1.5" fill="#E4B96B" opacity="0.7" />
            </svg>
          </div>

          {/* Embossed bottom rim branding */}
          <div className="env-bottom-brand-stamp" aria-hidden="true">
            <span>✦ DEPARTMENT OF MCA · TEJAS ’26 · THE FRESH BLOOM ✦</span>
          </div>

          {/* 1. Envelope Interior Back Lining (Warm Ivory with Gold Bloom Damask) */}
          <div className="env-lining">
            <div className="env-lining-pattern" />
          </div>

          {/* 2. The Rising Invitation Letter */}
          <div className={`env-letter ${stage}`}>
            <div className="env-letter-inner">
              {/* Gold deckle border inlay */}
              <div className="letter-deckle-frame" aria-hidden="true" />

              <div className="letter-header-row">
                <div className="letter-seal-mini">
                  <span>T</span>
                </div>
                <div className="letter-meta-stamp">
                  <span className="stamp-inst">DEPARTMENT OF MCA · SRUSTI ACADEMY</span>
                  <span className="stamp-sub">TEJAS ’26 · THE FRESH BLOOM · OFFICIAL INVITATION</span>
                </div>
                {/* Re-fold Button placed cleanly at top right of opened card */}
                {isOpen && (
                  <button
                    className="letter-refold-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseSequence();
                    }}
                    aria-label="Fold invitation letter back into envelope"
                    title="Fold back into envelope"
                  >
                    <RotateCcw size={13} />
                    <span>Fold</span>
                  </button>
                )}
              </div>

              <div className="letter-deckle-divider" />

              <h3 className="letter-heading">Dear Juniors,</h3>

              {/* Exact approved copy from Section 7 */}
              <div className="letter-body-copy">
                <p>
                  A new chapter is about to begin, and we cannot wait to welcome you into the MCA family.
                </p>
                <p>
                  On <strong>30 October 2026</strong>, the Department of MCA invites you to celebrate Freshers Day with us — a day filled with laughter, new friendships, exciting performances, fun games, and memories that we hope you will cherish long after the celebration ends.
                </p>
                <p>
                  College life is not just about classrooms and examinations. It is also about the people we meet, the experiences we share, and the moments that become stories we tell for years to come.
                </p>
                <p>
                  As your seniors, we look forward to meeting you, cheering for you, celebrating your talents, and making you feel at home in our department.
                </p>
                <p>
                  We sincerely hope you will join us and participate wholeheartedly. Come with your enthusiasm, your smiles, and your willingness to make new memories.
                </p>
                <p className="letter-highlight-line">
                  Let us make this beginning memorable, together.
                </p>
              </div>

              {/* Event Coordinates highlight inside letter */}
              <div className="letter-event-coords">
                <div className="coord-item">
                  <Calendar size={16} className="coord-icon" />
                  <div>
                    <span className="coord-label">Freshers Day</span>
                    <strong className="coord-val">30 October 2026</strong>
                  </div>
                </div>
                <div className="coord-item">
                  <Clock size={16} className="coord-icon" />
                  <div>
                    <span className="coord-label">Programme Time</span>
                    <strong className="coord-val">10:30 AM Onwards</strong>
                    <span className="coord-sub">(Arrival 10:00–10:30 AM)</span>
                  </div>
                </div>
                <div className="coord-item">
                  <MapPin size={16} className="coord-icon" />
                  <div>
                    <span className="coord-label">Venue</span>
                    <strong className="coord-val">JRD Tata Hall</strong>
                    <span className="coord-sub">Srusti Academy</span>
                  </div>
                </div>
              </div>

              {/* Letter Signature Block */}
              <div className="letter-signature-block">
                <div className="sig-quote">“The Fresh Bloom.”</div>
                <div className="sig-author">
                  <span>With warm wishes and excitement,</span>
                  <strong>Your Seniors</strong>
                  <em>Department of MCA</em>
                  <em>Srusti Academy of Management &amp; Technology</em>
                </div>
              </div>

              {/* Letter Action Bar */}
              <div className="letter-actions-row">
                <a
                  href="#agenda-flow"
                  className="letter-action-btn primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('agenda-flow')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Explore Programme Agenda</span>
                  <ArrowDown size={15} />
                </a>

                <button
                  className="letter-action-btn secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    confetti({
                      particleCount: 60,
                      spread: 65,
                      colors: ['#D4AF37', '#5B0E23', '#A31E3B', '#FDEBB2', '#FAF7F2']
                    });
                  }}
                  title="Celebrate with fellow students"
                >
                  <Heart size={15} className="heart-icon" />
                  <span>Cheer TEJAS</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Left Fold Flap with realistic bevel and gold thread line */}
          <div className="env-flap-left" aria-hidden="true">
            <div className="flap-gold-edge-left" />
          </div>

          {/* 4. Right Fold Flap with realistic bevel and gold thread line */}
          <div className="env-flap-right" aria-hidden="true">
            <div className="flap-gold-edge-right" />
          </div>

          {/* 5. Bottom Fold Flap with stitched gold piping and fold shadow */}
          <div className="env-flap-bottom" aria-hidden="true">
            <div className="env-flap-gold-trim" />
            <div className="env-flap-stitching" />
          </div>

          {/* 6. Top Triangular Fold Flap (Opens in 3D upwards) */}
          <div className={`env-flap-top ${stage}`} aria-hidden="true">
            <div className="flap-top-crease" />
            <div className="flap-top-gold-ornament">
              <svg viewBox="0 0 60 20" fill="none">
                <path d="M5 2 L30 16 L55 2" stroke="#E4B96B" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
                <circle cx="30" cy="16" r="2.5" fill="#E4B96B" />
              </svg>
            </div>
          </div>

          {/* 7. Woven Sky-Blue Silk Ribbon with Double Satin Bow */}
          <div className={`env-ribbon-silk ${stage}`} aria-hidden="true">
            <div className="ribbon-horizontal">
              <div className="ribbon-gold-piping top" />
              <div className="ribbon-silk-sheen" />
              <div className="ribbon-gold-piping bottom" />
            </div>
            <div className="ribbon-vertical">
              <div className="ribbon-gold-piping left" />
              <div className="ribbon-silk-sheen-vert" />
              <div className="ribbon-gold-piping right" />
            </div>
            <div className="ribbon-bow-knot">
              <div className="ribbon-loop loop-left" />
              <div className="ribbon-loop loop-right" />
              <div className="ribbon-knot-core" />
              <div className="ribbon-tail tail-left" />
              <div className="ribbon-tail tail-right" />
            </div>
          </div>

          {/* 8. Handcrafted Crimson & Gold Wax Seal Medallion */}
          <div
            className={`env-wax-seal ${stage}`}
            role="button"
            tabIndex={stage === 'closed' ? 0 : -1}
            aria-label="Official Wax Seal: Department of MCA Srusti Academy. Touch to unwrap invitation."
            onMouseEnter={() => playMicroTap()}
            onClick={(e) => {
              e.stopPropagation();
              if (stage === 'closed') triggerOpenSequence();
            }}
          >
            {/* Glowing Golden Pulse Aura */}
            <div className="seal-aura-ring" aria-hidden="true" />

            <div className="seal-disc">
              <div className="seal-scallop-rim" />
              <div className="seal-ring-outer" />
              <div className="seal-beaded-track" />
              
              {/* Bespoke Sculpted Seal Medallion (Authentic Collegiate Seal, No AI generic coin) */}
              <div className="seal-inner-coin">
                <svg viewBox="0 0 54 54" className="seal-coin-svg" fill="none">
                  <defs>
                    <linearGradient id="waxGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFF2CC" />
                      <stop offset="45%" stopColor="#D4AA4A" />
                      <stop offset="100%" stopColor="#8C6B19" />
                    </linearGradient>
                    <path id="upperSealArc" d="M 10 27 A 17 17 0 0 1 44 27" fill="none" />
                    <path id="lowerSealArc" d="M 44 27 A 17 17 0 0 1 10 27" fill="none" />
                  </defs>

                  {/* Concentric engraved milled edge */}
                  <circle cx="27" cy="27" r="25.5" stroke="#E8BC5B" strokeWidth="0.8" opacity="0.8" />
                  <circle cx="27" cy="27" r="23.5" stroke="#B3862B" strokeWidth="1" strokeDasharray="1.5 1.5" />

                  {/* Curved Arch Typography: Top */}
                  <text fontSize="4.2" fill="#3D0916" fontWeight="700" letterSpacing="0.9" fontFamily="Outfit, sans-serif">
                    <textPath href="#upperSealArc" startOffset="50%" textAnchor="middle">
                      DEPARTMENT OF MCA
                    </textPath>
                  </text>

                  {/* Center Architectural Monogram & Convergence Geometry */}
                  <g transform="translate(27, 27)">
                    {/* Intersecting convergence arcs */}
                    <circle cx="0" cy="0" r="11" stroke="#E8BC5B" strokeWidth="0.7" opacity="0.6" />
                    <line x1="-8" y1="0" x2="8" y2="0" stroke="#E8BC5B" strokeWidth="0.6" opacity="0.5" />
                    
                    {/* Center Typography Mark: TEJAS '26 */}
                    <text
                      x="0"
                      y="-1"
                      textAnchor="middle"
                      fill="#2A050E"
                      fontFamily="Cinzel, Georgia, serif"
                      fontSize="8.2"
                      fontWeight="800"
                      letterSpacing="0.12em"
                      style={{ filter: 'drop-shadow(0px 1px 1px rgba(255, 235, 170, 0.7))' }}
                    >
                      TEJAS
                    </text>
                    <text
                      x="0"
                      y="6.2"
                      textAnchor="middle"
                      fill="#5E142B"
                      fontFamily="Outfit, sans-serif"
                      fontSize="4.5"
                      fontWeight="700"
                      letterSpacing="0.14em"
                    >
                      2026
                    </text>
                  </g>

                  {/* Curved Arch Typography: Bottom */}
                  <text fontSize="3.8" fill="#5E142B" fontWeight="600" letterSpacing="0.8" fontFamily="Outfit, sans-serif">
                    <textPath href="#lowerSealArc" startOffset="50%" textAnchor="middle">
                      SRUSTI ACADEMY
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            {/* Pulsing Hint Badge when closed (No AI sparkles, dignified prompt) */}
            {stage === 'closed' && (
              <div className="seal-pulse-hint">
                <span className="hint-diamond">◆</span>
                <span>TOUCH SEAL TO UNWRAP</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helpful keyboard prompt below envelope */}
      <div className="envelope-keyboard-caption">
        {stage === 'closed' ? (
          <span>Click the wax seal or press <kbd>Space</kbd> / <kbd>Enter</kbd> to open</span>
        ) : (
          <span>Invitation open · Click Fold or press <kbd>Esc</kbd> to re-seal</span>
        )}
      </div>
    </section>
  );
}
