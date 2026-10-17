import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import {
  playMasterSoundtrack,
  stopMasterSoundtrack,
  toggleMasterSoundtrackMute,
  stopIntroAudio,
  initGlobalAudioUnlock,
  playMicroTap,
  getMasterIntroAudio
} from '../utils/audio';

// Visual Timing Milestones (Empirically verified from 14.01s Bujji Theme)
const CUES = {
  HIT_1_T: 2.25,        // Beat 1: Letter T emerges with directional light
  HIT_2_E: 2.95,        // Beat 2: Letter E arms catch directional light
  HIT_3_J: 3.50,        // Beat 3: Letter J elongated drop-tail gleams in focus
  HIT_4_A: 4.05,        // Beat 4: Letter A apex wedge cuts through shadow
  HIT_5_S: 5.15,        // Beat 5: Letter S baseline strike (T E J A S wide array)
  CONVERGE: 5.90,       // Drum roll / riser crescendo: letters contract inward
  IMPACT_TEJAS: 7.00,   // PRIMARY MONUMENTAL CLIMAX: TEJAS foil impact & anamorphic glint
  REVEAL_YEAR: 7.60,    // '2026' emerges above between gold hairline rules
  REVEAL_BLOOM: 9.90,   // SECONDARY CLIMAX & VOCAL BLOOM: 'The Fresh Bloom' script & lotus unfurls
  SKIP_THRESHOLD: 10.0, // Mandatory skip threshold: Skip control becomes available
  FINISH_TRANSITION: 13.85 // Natural acoustic resolution & seamless dissolve into unopened envelope
};

export default function CinematicIntro({ onComplete }) {
  // States: 'GATE' (entry prompt) -> 'PAUSE' (~1s silent acoustic stage) -> 'PLAYING' (14s music & sequence)
  const [introState, setIntroState] = useState('GATE');
  const [milestone, setMilestone] = useState(0); // Milestone thresholds 0..10 (Zero RAF state thrashing)
  const [isMuted, setIsMuted] = useState(false);
  const [audioFailed, setAudioFailed] = useState(false);

  const animFrameRef = useRef(null);
  const audioStartTimeRef = useRef(null);
  const stopAudioRef = useRef(null);
  const hasFinishedRef = useRef(false);
  const milestoneRef = useRef(0);

  // 1. Finish Handler with gentle audio fadeout and seamless handoff to unopened envelope
  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (stopAudioRef.current) stopAudioRef.current();
    stopMasterSoundtrack(350);
    onComplete();
  }, [onComplete]);

  // 2. Keyboard accessibility (Escape strictly allowed only after 10s skip gate or on audio failure)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && introState === 'PLAYING') {
        if (milestoneRef.current >= 10 || audioFailed) {
          handleFinish();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introState, audioFailed, handleFinish]);

  // 3. User Initiates "Open Invitation" (Option A — Dedicated Modal Overture)
  const handleOpenInvitation = (e) => {
    if (e) e.stopPropagation();
    hasFinishedRef.current = false;
    milestoneRef.current = 0;
    setMilestone(0);
    playMicroTap();
    initGlobalAudioUnlock();
    setIntroState('PAUSE');

    // 1.0 second silent acoustic pause before soundtrack begins
    setTimeout(() => {
      setIntroState('PLAYING');
      const audioStart = performance.now();
      audioStartTimeRef.current = audioStart;

      // Start the master soundtrack
      const cleanup = playMasterSoundtrack({
        onEnded: () => {
          if (audioStartTimeRef.current && (performance.now() - audioStartTimeRef.current) / 1000 >= 13.0) {
            handleFinish();
          }
        },
        onError: (err) => {
          console.warn('Audio playback error; falling back to high-res clock:', err);
          setAudioFailed(true);
        }
      });
      stopAudioRef.current = cleanup;

      // High-precision, zero-thrash RAF loop:
      // Updates milestone state ONLY when crossing cue thresholds (~10 renders across 14s, not 840)
      const tick = () => {
        const audio = getMasterIntroAudio();
        let currentTime = 0;

        if (audio && !audio.paused && audio.currentTime > 0) {
          currentTime = audio.currentTime;
        } else {
          currentTime = (performance.now() - audioStart) / 1000;
        }

        // Determine active milestone
        let nextMilestone = 0;
        if (currentTime >= CUES.SKIP_THRESHOLD) nextMilestone = 10;
        else if (currentTime >= CUES.REVEAL_BLOOM) nextMilestone = 9;
        else if (currentTime >= CUES.REVEAL_YEAR) nextMilestone = 8;
        else if (currentTime >= CUES.IMPACT_TEJAS) nextMilestone = 7;
        else if (currentTime >= CUES.CONVERGE) nextMilestone = 6;
        else if (currentTime >= CUES.HIT_5_S) nextMilestone = 5;
        else if (currentTime >= CUES.HIT_4_A) nextMilestone = 4;
        else if (currentTime >= CUES.HIT_3_J) nextMilestone = 3;
        else if (currentTime >= CUES.HIT_2_E) nextMilestone = 2;
        else if (currentTime >= CUES.HIT_1_T) nextMilestone = 1;

        if (nextMilestone > milestoneRef.current) {
          milestoneRef.current = nextMilestone;
          setMilestone(nextMilestone);
        }

        if (currentTime >= CUES.FINISH_TRANSITION) {
          handleFinish();
          return;
        }

        animFrameRef.current = requestAnimationFrame(tick);
      };

      animFrameRef.current = requestAnimationFrame(tick);
    }, 1000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (stopAudioRef.current) stopAudioRef.current();
      stopIntroAudio();
    };
  }, []);

  // Audio mute toggle
  const handleToggleMute = (e) => {
    e.stopPropagation();
    const muted = toggleMasterSoundtrackMute();
    setIsMuted(muted);
  };

  // Derive active cinematic milestones from discrete milestone state
  const isPlaying = introState === 'PLAYING';
  const showLetterT = isPlaying && milestone >= 1;
  const showLetterE = isPlaying && milestone >= 2;
  const showLetterJ = isPlaying && milestone >= 3;
  const showLetterA = isPlaying && milestone >= 4;
  const showLetterS = isPlaying && milestone >= 5;
  const isConverging = isPlaying && milestone >= 6 && milestone < 7;
  const isImpacted = isPlaying && milestone >= 7;
  const showYear = isPlaying && milestone >= 8;
  const showBloom = isPlaying && milestone >= 9;
  const isSkipAvailable = isPlaying && (milestone >= 10 || audioFailed);

  return (
    <motion.div
      className="intro-editorial-curtain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
      role="dialog"
      aria-modal="true"
      aria-label="TEJAS 2026 Ceremonial Overture"
    >
      {/* 1. Tactile Cotton Paper Surface & Raking Light Sweep */}
      <div className="intro-paper-substrate" aria-hidden="true" />
      <div
        className={`intro-raking-light-beam ${isPlaying ? 'active' : ''} ${isImpacted ? 'impact-flash' : ''}`}
        aria-hidden="true"
      />
      <div className="intro-vignette-mask" aria-hidden="true" />

      {/* 2. Top Minimalist Control HUD (Zero layout shift, no escape key indicator) */}
      <header className="intro-control-hud">
        {isPlaying ? (
          <button
            type="button"
            id="intro-sound-toggle-btn"
            className={`intro-hud-btn sound-toggle ${!isMuted ? 'active' : ''}`}
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
          >
            {isMuted ? <VolumeX size={13} className="hud-icon" /> : <Volume2 size={13} className="hud-icon" />}
            <span>{isMuted ? 'MUTED' : 'SOUND ON'}</span>
          </button>
        ) : (
          <div className="hud-placeholder" />
        )}

        {/* Skip button — strictly locked until 10.0s of actual playback or audio failure */}
        {isPlaying ? (
          <button
            type="button"
            id="intro-skip-btn"
            className={`intro-hud-btn skip-pill ${isSkipAvailable ? 'is-available' : 'is-locked'}`}
            onClick={handleFinish}
            disabled={!isSkipAvailable}
            aria-label="Skip to invitation"
          >
            <span>Skip Intro</span>
            <ArrowRight size={13} className="hud-arrow" />
          </button>
        ) : (
          <div className="hud-placeholder" />
        )}
      </header>

      {/* 3. Centerpiece Stage: Gate Mode vs. Active Title Sequence */}
      <main className="intro-stage-monument">
        {introState === 'GATE' ? (
          /* ===================================================================
             INITIAL INTERACTION GATE (Option A — Dedicated Modal Overture)
             No artificial Roman badges, filler captions, or duration countdowns.
             =================================================================== */
          <motion.div
            className="intro-gate-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="gate-prestige-eyebrow">
              <span className="gate-rail" />
              <span>MCA BATCH 2026 · SRUSTI ACADEMY</span>
              <span className="gate-rail right" />
            </div>

            <h1 className="gate-master-title">
              TEJAS <span className="gate-year-accent">’26</span>
            </h1>

            <p className="gate-tagline">
              The Fresh Bloom
            </p>

            <p className="gate-instruction-lead">
              A ceremonial invitation welcoming the incoming MCA batch.
            </p>

            <button
              type="button"
              id="intro-open-invitation-btn"
              className="intro-open-invitation-btn"
              onClick={handleOpenInvitation}
            >
              <span className="btn-sparkle-glyph">✦</span>
              <span className="btn-label-text">OPEN INVITATION</span>
              <span className="btn-sparkle-glyph">✦</span>
            </button>
          </motion.div>
        ) : introState === 'PAUSE' ? (
          /* ===================================================================
             ACOUSTIC PAUSE (~1.0s Silent Stage Preparation)
             =================================================================== */
          <motion.div
            className="intro-pause-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pause-pulse-indicator" />
          </motion.div>
        ) : (
          /* ===================================================================
             THE CINEMATIC TITLE SEQUENCE (Synchronized to Bujji Theme)
             High-contrast luminous ivory letters transforming into gold foil stamp.
             =================================================================== */
          <div className="intro-cinematic-scene">
            {/* 1. Symmetrical Top Cohort Year 2026 (Revealed at 7.60s) */}
            <div className={`intro-cohort-crest ${showYear ? 'is-revealed' : ''}`}>
              <span className="intro-hairline-rule left" />
              <div className="intro-cohort-details">
                <span className="cohort-numeral">2 0 2 6</span>
              </div>
              <span className="intro-hairline-rule right" />
            </div>

            {/* 2. Monumental TEJAS Typography Stage */}
            <div className={`intro-letters-stage ${isImpacted ? 'impacted' : isConverging ? 'converging' : ''}`}>
              {/* Anamorphic Horizontal Specular Light Glint on 7.00s Impact */}
              {isImpacted && <div className="intro-anamorphic-glint" aria-hidden="true" />}

              {/* Individual Letters: T, E, J, A, S */}
              <div className="intro-letters-row" aria-label="TEJAS">
                <span className={`intro-letter-unit ${showLetterT ? 'revealed' : ''} ${isImpacted ? 'foil-stamped' : ''}`}>
                  T
                </span>
                <span className={`intro-letter-unit ${showLetterE ? 'revealed' : ''} ${isImpacted ? 'foil-stamped' : ''}`}>
                  E
                </span>
                <span className={`intro-letter-unit ${showLetterJ ? 'revealed' : ''} ${isImpacted ? 'foil-stamped' : ''}`}>
                  J
                </span>
                <span className={`intro-letter-unit ${showLetterA ? 'revealed' : ''} ${isImpacted ? 'foil-stamped' : ''}`}>
                  A
                </span>
                <span className={`intro-letter-unit ${showLetterS ? 'revealed' : ''} ${isImpacted ? 'foil-stamped' : ''}`}>
                  S
                </span>
              </div>
            </div>

            {/* 3. The Fresh Bloom Subtitle & Lotus Petal Motif (Revealed at 9.90s) */}
            <div className={`intro-fresh-bloom-reveal ${showBloom ? 'is-revealed' : ''}`}>
              <div className="bloom-motif-flank left" aria-hidden="true">
                <svg viewBox="0 0 48 24" fill="none" className="lotus-svg">
                  <path d="M 48 20 C 32 20 20 12 0 10 C 20 8 32 0 48 0" stroke="url(#lotusGold)" strokeWidth="1" />
                  <path d="M 48 15 C 36 15 26 11 10 10 C 26 9 36 5 48 5" stroke="url(#lotusGold)" strokeWidth="0.75" opacity="0.6" />
                  <circle cx="2" cy="10" r="1.5" fill="#E5B957" />
                  <defs>
                    <linearGradient id="lotusGold" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E5B957" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#C89B38" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h2 className="bloom-calligraphic-title">
                The Fresh Bloom
              </h2>

              <div className="bloom-motif-flank right" aria-hidden="true">
                <svg viewBox="0 0 48 24" fill="none" className="lotus-svg mirrored">
                  <path d="M 0 20 C 16 20 28 12 48 10 C 28 8 16 0 0 0" stroke="url(#lotusGoldRight)" strokeWidth="1" />
                  <path d="M 0 15 C 12 15 22 11 38 10 C 22 9 12 5 0 5" stroke="url(#lotusGoldRight)" strokeWidth="0.75" opacity="0.6" />
                  <circle cx="46" cy="10" r="1.5" fill="#E5B957" />
                  <defs>
                    <linearGradient id="lotusGoldRight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C89B38" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#E5B957" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
}
