import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight, Zap, Shield, Radio, Terminal } from 'lucide-react';

export default function FuturisticIntroLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioCtxRef = useRef(null);
  const canvasRef = useRef(null);

  const phaseMessages = [
    { code: 'SYS.BOOT', text: 'INITIALIZING MCA FREQUENCY MATRIX' },
    { code: 'GEO.LOC', text: 'LOCKING SRUSTI CAMPUS COORDINATES [20.2961° N, 85.8245° E]' },
    { code: 'BASS.SYNC', text: 'CALIBRATING HIGH-FIDELITY SOUNDSTAGE' },
    { code: 'VIP.AUTH', text: 'SYNCING MCA BATCH 2025 SOUVENIR PASS PROTOCOL' },
    { code: 'SYS.READY', text: 'ALL SYSTEMS NOMINAL — CELEBRATION UNLOCKED' }
  ];

  // Synthesize futuristic UI sounds via Web Audio API (tactile, sleek, non-cliché)
  const playCyberSound = (type) => {
    if (!isAudioEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      if (type === 'tick') {
        // High-tech subtle data click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'complete') {
        // Futuristic dual-tone harmonic chord
        [587.33, 880, 1174.66].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.03, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.6);
        });
      } else if (type === 'enter') {
        // Cinematic bass drop & frequency sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.7);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio context may be restricted by autoplay policy
    }
  };

  // Background Grid Canvas with subtle cyber data streams
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Subtle data stream dots
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.8 + 0.4,
      size: Math.random() * 1.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    }));

    let scanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Sci-fi perspective technical grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving laser scanline
      scanY = (scanY + 2.5) % height;
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, width, 60);

      // Cyber particles
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading progress calculation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Non-linear realistic loading feel
      const increment = Math.max(1, Math.floor(Math.random() * 4) + 1);
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress % 12 === 0) {
        playCyberSound('tick');
      }

      if (currentProgress < 25) setPhaseIndex(0);
      else if (currentProgress < 50) setPhaseIndex(1);
      else if (currentProgress < 75) setPhaseIndex(2);
      else if (currentProgress < 100) setPhaseIndex(3);
      else {
        setPhaseIndex(4);
        setIsReadyToEnter(true);
        playCyberSound('complete');
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [isAudioEnabled]);

  // Auto enter after 100% completion if user doesn't click
  useEffect(() => {
    if (isReadyToEnter) {
      const autoTimer = setTimeout(() => {
        triggerEnter();
      }, 2200);
      return () => clearTimeout(autoTimer);
    }
  }, [isReadyToEnter]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePos({
      x: (clientX - centerX) / 45,
      y: (clientY - centerY) / 45
    });
  };

  const triggerEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    playCyberSound('enter');
    setTimeout(() => {
      onComplete?.();
    }, 900);
  };

  return (
    <div
      className={`intro-loader-backdrop ${isExiting ? 'intro-exiting' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="intro-canvas" />

      {/* Cyber HUD Framing Brackets */}
      <div className="hud-corner hud-top-left">
        <span className="hud-label">MCA // BATCH 2025</span>
        <div className="hud-corner-line" />
      </div>

      <div className="hud-corner hud-top-right">
        <button
          className="hud-audio-btn"
          onClick={() => setIsAudioEnabled(!isAudioEnabled)}
          title={isAudioEnabled ? 'Mute Interface Sound' : 'Enable Interface Sound'}
        >
          {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{isAudioEnabled ? 'AUDIO // 48K' : 'MUTED'}</span>
        </button>
        <button
          className="hud-skip-btn"
          onClick={triggerEnter}
          title="Skip straight to experience"
        >
          SKIP ➔
        </button>
      </div>

      <div className="hud-corner hud-bottom-left">
        <span className="hud-coord">LOC: 20.2961°N, 85.8245°E // BHUBANESWAR</span>
      </div>

      <div className="hud-corner hud-bottom-right">
        <span className="hud-status-chip">
          <span className="hud-dot" /> SECURE HANDSHAKE
        </span>
      </div>

      {/* Central Holographic Logo & Telemetry Card */}
      <div
        className="intro-center-card"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
        }}
      >
        {/* Hologram Scanner Bar */}
        <div className="logo-scanner-line" />

        {/* The Exact NIRVAHAN Geometric Interlocking Monogram (Precision SVG) */}
        <div className="logo-vector-wrapper">
          <svg
            className="nirvahan-vector-logo"
            viewBox="0 0 240 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Electric Cyan to Deep Laser Blue Gradients (Zero purple) */}
              <linearGradient id="cyanFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#00c8ff" />
                <stop offset="100%" stopColor="#0066ff" />
              </linearGradient>

              <linearGradient id="cyanFacetDiagonal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00c8ff" />
                <stop offset="60%" stopColor="#0052cc" />
                <stop offset="100%" stopColor="#002b80" />
              </linearGradient>

              <linearGradient id="azureFacetRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              <linearGradient id="steelFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Glow Aura */}
            <circle cx="120" cy="100" r="70" fill="url(#cyanFacetLeft)" opacity="0.12" filter="blur(28px)" />

            {/* Segment 1: Left Angled Vertical Pillar */}
            <path
              d="M 50 15 L 105 55 L 105 130 L 50 170 Z"
              fill="url(#cyanFacetLeft)"
              className="logo-poly poly-left"
            />

            {/* Segment 2: Left Inward Diagonal Bridge */}
            <path
              d="M 105 55 L 155 90 L 125 112 L 75 75 Z"
              fill="url(#cyanFacetDiagonal)"
              className="logo-poly poly-diag-1"
            />

            {/* Segment 3: Right Angled Spear Top */}
            <path
              d="M 190 15 L 190 170 L 140 135 L 140 50 Z"
              fill="url(#azureFacetRight)"
              className="logo-poly poly-right"
            />

            {/* Segment 4: Lower Interlocking Ribbon Fold */}
            <path
              d="M 85 105 L 135 142 L 190 170 L 140 170 L 95 135 Z"
              fill="url(#steelFacet)"
              className="logo-poly poly-diag-2"
            />

            {/* Precision Laser Edge Highlights */}
            <line x1="50" y1="15" x2="105" y2="55" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="140" y1="50" x2="190" y2="15" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
          </svg>
        </div>

        {/* Wordmark Typography (Exact Stencil & Angular Cuts) */}
        <div className="intro-wordmark-container">
          <div className="intro-brand-title">
            <span className="char">N</span>
            <span className="char">I</span>
            <span className="char">R</span>
            <span className="char">V</span>
            <span className="char">A</span>
            <span className="char">H</span>
            <span className="char">A</span>
            <span className="char">N</span>
          </div>
          <div className="intro-brand-subtitle">
            <span>F R E S H E R S</span>
            <span className="sub-divider">•</span>
            <span>N I G H T</span>
            <span className="sub-tag">2 0 2 6</span>
          </div>
        </div>

        {/* Futuristic Telemetry Status Bar */}
        <div className="intro-telemetry-box">
          <div className="telemetry-top-line">
            <div className="status-indicator">
              <span className="pulse-indicator" />
              <span className="status-code">{phaseMessages[phaseIndex].code}</span>
            </div>
            <div className="percentage-counter">
              <span className="pct-number">{String(progress).padStart(3, '0')}</span>
              <span className="pct-symbol">%</span>
            </div>
          </div>

          {/* Precision Neon Loading Track */}
          <div className="intro-progress-bar-wrap">
            <div className="intro-progress-bar-fill" style={{ width: `${progress}%` }}>
              <div className="progress-lead-spark" />
            </div>
          </div>

          <div className="telemetry-log">
            <Terminal size={11} className="log-icon" />
            <span className="log-text">{phaseMessages[phaseIndex].text}</span>
          </div>
        </div>

        {/* Interactive Action Trigger */}
        <div className="intro-action-zone">
          {isReadyToEnter ? (
            <button
              className="btn-enter-nirvahan"
              onClick={triggerEnter}
              autoFocus
            >
              <span className="btn-glow-layer" />
              <span className="btn-text">
                ENTER NIRVAHAN <ChevronRight size={16} />
              </span>
            </button>
          ) : (
            <div className="loading-prompt">
              <span className="system-syncing">SYSTEM SYNCHRONIZING</span>
              <span className="sync-dots">...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
