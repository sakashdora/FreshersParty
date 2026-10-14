import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Volume2 } from 'lucide-react';
import {
  playCinematicSwell,
  playRibbonMotionSweep,
  playCelestialRevealChime,
  playMilestoneSlideTick,
  playSkipTransition,
  playMicroTap,
  stopIntroAudio,
  initGlobalAudioUnlock
} from '../utils/audio';

export default function CinematicIntro({ onComplete }) {
  // Phase 0: 0-1.4s (Atmospheric emergence & ribbons glide)
  // Phase 1: 1.4-3.0s (Kinetic TEJAS '26 title reveal & warm concert chime)
  // Phase 2: 3.0-4.6s (Two milestone coordinates reveal)
  // Phase 3: 4.6-5.8s (Smooth dissolve & gateway transition)
  const [phase, setPhase] = useState(0);
  const [audioPromptVisible, setAudioPromptVisible] = useState(true);
  const canvasRef = useRef(null);
  const hasFinishedRef = useRef(false);

  // 1. Audio Choreography & Browser Gesture Handling
  useEffect(() => {
    initGlobalAudioUnlock(() => {
      setAudioPromptVisible(false);
    });

    // Sequence Choreography & Orchestral Sound Effects
    playCinematicSwell();
    playRibbonMotionSweep();

    const t1 = setTimeout(() => {
      setPhase(1);
      playCelestialRevealChime();
    }, 1400);

    const t2 = setTimeout(() => {
      setPhase(2);
      playMilestoneSlideTick();
    }, 3000);

    const t3 = setTimeout(() => {
      setPhase(3);
    }, 4600);

    const tComplete = setTimeout(() => {
      handleFinish();
    }, 5900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tComplete);
    };
  }, []);

  // 2. High-Performance Canvas Celestial Cosmos Animation
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

    // Mouse coordinates with smooth damping
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('pointermove', handleMouseMove);

    // 60 Luminous Stardust & Ember Particles
    const PARTICLE_COUNT = 65;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.45,
      speedY: -Math.random() * 0.55 - 0.25,
      seed: Math.random() * 100,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      color: Math.random() > 0.35 ? '#FDEBB2' : '#F7D6DC',
      depth: Math.random() * 0.8 + 0.2
    }));

    let startTime = performance.now();

    const render = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const mouseOffsetX = (mouseX - width / 2) * 0.03;
      const mouseOffsetY = (mouseY - height / 2) * 0.03;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + mouseOffsetX;
      const centerY = height * 0.42 + mouseOffsetY;

      // Layer 1: Atmospheric Volumetric God-Rays (Soft Rotating Beams)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(elapsed * 0.04);

      const beamCount = 6;
      for (let i = 0; i < beamCount; i++) {
        const angle = (i * Math.PI * 2) / beamCount;
        ctx.save();
        ctx.rotate(angle);

        const beamGradient = ctx.createRadialGradient(0, 0, 50, 0, 0, Math.max(width, height) * 0.65);
        beamGradient.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
        beamGradient.addColorStop(0.35, 'rgba(168, 32, 61, 0.04)');
        beamGradient.addColorStop(1, 'transparent');

        ctx.fillStyle = beamGradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-70, Math.max(width, height) * 0.7);
        ctx.lineTo(70, Math.max(width, height) * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // Layer 2: Concentric Astrolabe Celestial Hairline Rings
      ctx.save();
      ctx.translate(centerX, centerY);

      // Inner Gilded Astrolabe Ring
      ctx.save();
      ctx.rotate(-elapsed * 0.03);
      ctx.beginPath();
      const ringRadius = Math.min(width, height) * 0.34;
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 14]);
      ctx.stroke();

      // Cardinal Diamond Ticks on Ring
      for (let j = 0; j < 8; j++) {
        const tickAngle = (j * Math.PI * 2) / 8;
        const tx = Math.cos(tickAngle) * ringRadius;
        const ty = Math.sin(tickAngle) * ringRadius;
        ctx.fillStyle = 'rgba(253, 235, 178, 0.3)';
        ctx.fillRect(tx - 2, ty - 2, 4, 4);
      }
      ctx.restore();

      // Outer Fine Celestial Ring
      ctx.save();
      ctx.rotate(elapsed * 0.015);
      ctx.beginPath();
      const outerRingRadius = Math.min(width, height) * 0.46;
      ctx.arc(0, 0, outerRingRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.07)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([8, 24]);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // Layer 3: Organic Floating Stardust & Embers
      particles.forEach((p) => {
        // Organic Brownian undulation
        p.x += p.speedX + Math.sin(elapsed + p.seed) * 0.25;
        p.y += p.speedY;

        // Wrap around screen edges
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const pulse = 0.5 + 0.5 * Math.sin(elapsed * 2.5 + p.seed);
        const currentAlpha = (0.2 + 0.65 * pulse) * p.depth;
        const currentRadius = p.baseRadius * (0.85 + 0.25 * pulse);

        // Draw particle with soft glowing halo
        const pX = p.x + mouseOffsetX * p.depth;
        const pY = p.y + mouseOffsetY * p.depth;

        const glow = ctx.createRadialGradient(pX, pY, 0, pX, pY, currentRadius * 3.5);
        glow.addColorStop(0, p.color === '#FDEBB2' ? `rgba(255, 235, 178, ${currentAlpha})` : `rgba(247, 214, 220, ${currentAlpha})`);
        glow.addColorStop(0.4, p.color === '#FDEBB2' ? `rgba(212, 175, 55, ${currentAlpha * 0.5})` : `rgba(168, 32, 61, ${currentAlpha * 0.4})`);
        glow.addColorStop(1, 'transparent');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pX, pY, currentRadius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Solid core
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(pX, pY, currentRadius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
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

  const handleStageInteraction = () => {
    initGlobalAudioUnlock();
    playCinematicSwell();
    setAudioPromptVisible(false);
    playMicroTap();
  };

  return (
    <motion.div
      className="cinematic-intro-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.025, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }}
      onClick={handleStageInteraction}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to TEJAS '26 Opening Experience"
    >
      {/* 1. Dynamic Interactive Cosmos & Volumetric Light Canvas */}
      <canvas ref={canvasRef} className="intro-cosmos-canvas" aria-hidden="true" />
      <div className="intro-ambient-illumination" aria-hidden="true" />
      <div className="intro-vignette-overlay" aria-hidden="true" />

      {/* 2. Top HUD Bar: Discreet Audio Prompt & Minimalist Skip Button */}
      <div className="intro-hud-bar">
        {audioPromptVisible && (
          <div
            className="intro-sound-prompt"
            onClick={handleStageInteraction}
            title="Click to play full cinematic audio"
          >
            <Volume2 size={12} className="sound-pulse-icon" />
            <span>Click for cinematic sound</span>
          </div>
        )}

        <button
          className="intro-skip-pill"
          onClick={handleSkip}
          onMouseEnter={() => playMicroTap()}
          autoFocus
          aria-label="Skip to main invitation"
        >
          <span>Skip Intro</span>
          <ArrowRight size={14} className="skip-arrow" />
        </button>
      </div>

      {/* 3. Fluid Convergence Ribbons Framing the Stage (Swooping Above and Below Typography) */}
      <div className="intro-ribbon-canvas" aria-hidden="true">
        <svg viewBox="0 0 1000 600" fill="none" className="intro-ribbon-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2CC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9E7418" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="roseRibbonGrad" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#F7D6DC" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#A8203D" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#380716" stopOpacity="0.1" />
            </linearGradient>

            <filter id="ribbonSpecularGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden Ribbon Swooping Above Typography */}
          <motion.path
            d="M -60,110 C 260,30 420,175 500,180 C 580,185 750,480 1060,380"
            stroke="url(#goldRibbonGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#ribbonSpecularGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Velvet Rose Ribbon Swooping Below Tagline */}
          <motion.path
            d="M -60,510 C 300,580 420,430 500,425 C 580,420 760,60 1060,190"
            stroke="url(#roseRibbonGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="url(#ribbonSpecularGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.95 }}
            transition={{ duration: 2.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>

      {/* 4. Centerpiece Kinetic Stage */}
      <div className="intro-center-content">
        {/* Bespoke Editorial Hallmark Monogram */}
        <motion.div
          className="intro-hallmark-crest"
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="crest-hairline left" />
          <div className="crest-insignia">
            <span className="crest-year">MMXXVI</span>
            <span className="crest-divider">◆</span>
            <span className="crest-batch">MCA BATCH</span>
          </div>
          <div className="crest-hairline right" />
        </motion.div>

        {/* Institution & Department Eyebrow */}
        <motion.div
          className="intro-institution-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <span>DEPARTMENT OF COMPUTER APPLICATIONS</span>
          <span className="eyebrow-sep">·</span>
          <span>SRUSTI ACADEMY OF MANAGEMENT &amp; TECHNOLOGY</span>
        </motion.div>

        {/* Master Display Title TEJAS '26 with Kinetic Entrance */}
        <motion.div className="intro-title-wrapper">
          <motion.h1
            className="intro-cinematic-title"
            initial={{ opacity: 0, y: 32, scale: 0.96, letterSpacing: "0.14em" }}
            animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1, letterSpacing: "0.06em" } : { opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            TEJAS <span className="title-year-accent">’26</span>
          </motion.h1>
          <div className={`title-light-sweep ${phase >= 1 ? 'is-sweeping' : ''}`} aria-hidden="true" />
        </motion.div>

        {/* Pure Welcoming Tagline (Removed redundant "Senior Welcoming Gala") */}
        <motion.p
          className="intro-thematic-tagline"
          initial={{ opacity: 0, y: 14 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.85, delay: 0.25 }}
        >
          The Fresh Bloom
        </motion.p>

        {/* Dual Milestone Timeline Showcase */}
        <motion.div
          className="intro-milestones-timeline"
          initial={{ opacity: 0, y: 16 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="intro-milestone-entry">
            <span className="milestone-badge-date">27 OCT</span>
            <div className="milestone-text-block">
              <strong className="milestone-name">Theme &amp; Banner Reveal</strong>
              <span className="milestone-sub">Prelude Kickoff</span>
            </div>
          </div>

          <div className="milestone-node-connector" aria-hidden="true">
            <span className="connector-line" />
            <span className="connector-dot">◆</span>
            <span className="connector-line" />
          </div>

          <div className="intro-milestone-entry highlight">
            <span className="milestone-badge-date primary">30 OCT</span>
            <div className="milestone-text-block">
              <strong className="milestone-name">Freshers Day Gala</strong>
              <span className="milestone-sub">JRD Tata Hall · 10:00 AM</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 5. Bottom Architectural Credential */}
      <footer className="intro-stage-footnote">
        <span>Senior Welcome for Incoming MCA Batch (2026–2028) · Bhubaneswar</span>
      </footer>
    </motion.div>
  );
}
