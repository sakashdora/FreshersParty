import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Calendar, MapPin, Users, Sparkles, ArrowRight, Volume2, VolumeX,
  Play, Pause, Award, Music, Utensils, Camera, Check, Copy, Download,
  Menu, X, Clock, Shirt, ChevronRight, HelpCircle
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/accordion';
import FuturisticIntroLoader from './components/FuturisticIntroLoader';
import './styles.css';

// --- Lightweight Canvas Confetti Generator ---
function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#e8bc7b', '#ffd384', '#00f2fe', '#ff4b72', '#ffffff'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.7) * 20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.98;
      p.alpha -= 0.012;
      p.rotation += p.rotSpeed;

      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  }

  render();
}

// --- Web Audio Synthesizer for Ambient Sound Experience ---
class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx) this.ctx = new AudioContext();
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const chords = [220, 277.18, 329.63, 440]; // A major warm ambient pad
      this.oscillators = chords.map(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        return { osc, gain };
      });
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  stop() {
    if (this.oscillators.length) {
      this.oscillators.forEach(({ osc, gain }) => {
        try {
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
          setTimeout(() => osc.stop(), 500);
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
    }
    this.isPlaying = false;
  }
}

const audioEngine = new AmbientAudioEngine();

// --- Live Countdown Component ---
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 24, hours: 14, minutes: 35, seconds: 40 });

  useEffect(() => {
    // Target event: 25 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 25);
    targetDate.setHours(10, 30, 0, 0);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container" aria-label="Event countdown">
      <div className="countdown-box">
        <span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="countdown-label">Days</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-box">
        <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Hours</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-box">
        <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">Mins</span>
      </div>
      <span className="countdown-divider">:</span>
      <div className="countdown-box">
        <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">Secs</span>
      </div>
    </div>
  );
}

// --- App Root Component ---
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // VIP Pass Generator State
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [studentDept, setStudentDept] = useState('MCA Batch 2025');
  const [passClaimed, setPassClaimed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [ticketTilt, setTicketTilt] = useState({ x: 0, y: 0 });

  // RSVP Form State
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);

  const videoRef = useRef(null);

  function toggleAudio() {
    const active = audioEngine.toggle();
    setIsPlayingAudio(active);
  }

  function toggleVideoPlay() {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  }

  function toggleVideoMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  }

  function handleClaimPass(e) {
    e.preventDefault();
    if (!studentName.trim()) return;
    setPassClaimed(true);
    fireConfetti();
  }

  function handleCopyShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  }

  function handleRSVP(e) {
    e.preventDefault();
    if (!rsvpEmail.trim()) return;
    setRsvpDone(true);
    fireConfetti();
  }

  function handleTicketMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTicketTilt({ x: -(y / 14), y: x / 14 });
  }

  function handleTicketMouseLeave() {
    setTicketTilt({ x: 0, y: 0 });
  }

  function downloadPassImage() {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 540;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 900, 540);
    grad.addColorStop(0, '#040814');
    grad.addColorStop(0.5, '#071526');
    grad.addColorStop(1, '#020408');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 540);

    // Fine cyber grid
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 900; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 540);
      ctx.stroke();
    }
    for (let y = 0; y < 540; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(900, y);
      ctx.stroke();
    }

    // Outer neon border
    ctx.strokeStyle = '#00f5ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 860, 500);

    // High-tech corner reticles
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(20, 55); ctx.lineTo(20, 20); ctx.lineTo(55, 20);
    ctx.moveTo(845, 20); ctx.lineTo(880, 20); ctx.lineTo(880, 55);
    ctx.moveTo(20, 485); ctx.lineTo(20, 520); ctx.lineTo(55, 520);
    ctx.moveTo(845, 520); ctx.lineTo(880, 520); ctx.lineTo(880, 485);
    ctx.stroke();

    // Top Brand Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px monospace';
    ctx.fillText('NIRVAHAN // 2026', 50, 75);

    // VIP Tag
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(660, 45, 175, 34);
    ctx.fillStyle = '#030508';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('VIP GUEST PASS', 675, 68);

    // Divider
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 105);
    ctx.lineTo(845, 105);
    ctx.stroke();

    // Student Name
    ctx.fillStyle = '#00f5ff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText((studentName || 'Alex Morgan').toUpperCase(), 50, 180);

    // Batch & Department
    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px monospace';
    ctx.fillText(studentDept.toUpperCase(), 50, 220);

    // Metadata Grid
    ctx.fillStyle = '#00f5ff';
    ctx.font = '13px monospace';
    ctx.fillText('VENUE', 50, 275);
    ctx.fillText('TIME', 250, 275);
    ctx.fillText('PASS ID', 450, 275);
    ctx.fillText('STATUS', 650, 275);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 17px monospace';
    ctx.fillText('SRUSTI AUDITORIUM', 50, 305);
    ctx.fillText('10:30 HRS ONWARDS', 250, 305);
    const passId = `NVH-2026-${((studentName || 'Alex').length * 4821 + 1047).toString().slice(0, 5)}`;
    ctx.fillText(passId, 450, 305);
    ctx.fillText('ACTIVE // VIP ACCESS', 650, 305);

    // Security token
    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.fillText(`AUTHENTICATION HASH: SHA-256//NVH-MCA-2025-SECURE-ENTRY`, 50, 370);

    // Barcode
    ctx.fillStyle = '#00f5ff';
    for (let i = 0; i < 68; i++) {
      const w = (i % 3 === 0 ? 5 : i % 2 === 0 ? 3 : 2);
      ctx.fillRect(50 + i * 9, 410, w, 55);
    }

    // QR Code simulation block
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(720, 360, 115, 115);
    ctx.fillStyle = '#030508';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('NIRVAHAN', 742, 415);
    ctx.fillText('VERIFIED', 745, 435);

    const link = document.createElement('a');
    link.download = `NIRVAHAN_2026_VIP_PASS_${(studentName || 'STUDENT').replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    fireConfetti();
  }

  return (
    <div className="site-wrapper">
      {showIntro && (
        <FuturisticIntroLoader onComplete={() => setShowIntro(false)} />
      )}

      {/* 1. Header Navigation */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="brand" aria-label="NIRVAHAN Home">
            <div className="brand-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 240 200" width="22" height="19" fill="none">
                <path d="M 50 15 L 105 55 L 105 130 L 50 170 Z" fill="#00f5ff" />
                <path d="M 105 55 L 155 90 L 125 112 L 75 75 Z" fill="#00c8ff" />
                <path d="M 190 15 L 190 170 L 140 135 L 140 50 Z" fill="#38bdf8" />
                <path d="M 85 105 L 135 142 L 190 170 L 140 170 L 95 135 Z" fill="#e0f2fe" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">NIRVAHAN</span>
              <span className="brand-sub">MCA FRESHER GALA 2026</span>
            </div>
          </a>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main Navigation">
            <a href="#home" className="nav-link active" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#story" className="nav-link" onClick={() => setMenuOpen(false)}>The Story</a>
            <a href="#experience" className="nav-link" onClick={() => setMenuOpen(false)}>Highlights</a>
            <a href="#schedule" className="nav-link" onClick={() => setMenuOpen(false)}>Itinerary</a>
            <a href="#pass" className="nav-link" onClick={() => setMenuOpen(false)}>VIP Pass</a>
            <a href="#faq" className="nav-link" onClick={() => setMenuOpen(false)}>FAQ</a>
          </nav>

          <div className="header-right">
            <button
              className="replay-intro-btn"
              onClick={() => setShowIntro(true)}
              title="Re-watch Futuristic Intro"
              aria-label="Re-watch Futuristic Intro"
            >
              <Sparkles size={13} />
              <span>Intro</span>
            </button>

            <button
              className="audio-toggle-btn"
              onClick={toggleAudio}
              title={isPlayingAudio ? 'Mute ambient atmosphere' : 'Play ambient music'}
              aria-label="Toggle ambient music"
            >
              <div className="sound-bars">
                <span className={`sound-bar ${isPlayingAudio ? 'playing' : ''}`} />
                <span className={`sound-bar ${isPlayingAudio ? 'playing' : ''}`} />
                <span className={`sound-bar ${isPlayingAudio ? 'playing' : ''}`} />
                <span className={`sound-bar ${isPlayingAudio ? 'playing' : ''}`} />
              </div>
              <span>{isPlayingAudio ? 'Ambience ON' : 'Sound'}</span>
            </button>

            <a href="#pass" className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '11px' }}>
              Claim Pass ✦
            </a>

            <button
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Live Crowd Cheering Video */}
      <section className="hero-section" id="home">
        <div className="hero-video-wrap">
          <video
            ref={videoRef}
            className="hero-bg-video"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            poster="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2200&q=90"
          >
            <source src="/crowd-cheering.mp4" type="video/mp4" />
          </video>
          <div className="hero-vignette" />
          <div className="hero-grid-overlay" />
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-status-pill">
              <span className="pulse-dot" />
              <span>SYSTEM: ONLINE • MCA FRESHER NIGHTCLUB • 2026</span>
            </div>

            <h1 className="hero-title-main">NIRVAHAN</h1>
            <p className="hero-subtitle-banner">MCA FRESHER FESTIVAL // SRUSTI ARENA</p>

            <p className="hero-tagline">
              Step into an electric realm of volumetric lasers, 132 BPM club soundstages,
              glam red carpet spotlights, and an unforgettable initiation into the MCA brotherhood.
            </p>

            <CountdownTimer />

            <div className="hero-actions">
              <a href="#pass" className="btn btn-primary">
                Claim VIP Pass <ArrowRight size={16} />
              </a>
              <a href="#experience" className="btn btn-outline">
                Explore Soundstage
              </a>
            </div>
          </div>

          <div className="event-meta-strip">
            <div className="meta-col">
              <div className="meta-icon-badge"><Calendar size={20} /></div>
              <div className="meta-texts">
                <div className="meta-title">DATE & TIME</div>
                <div className="meta-val">COMING SOON // 10:30 HRS</div>
              </div>
            </div>

            <div className="meta-col">
              <div className="meta-icon-badge"><MapPin size={20} /></div>
              <div className="meta-texts">
                <div className="meta-title">LOCATION COORDINATES</div>
                <div className="meta-val">SRUSTI MAIN ARENA</div>
              </div>
            </div>

            <div className="meta-col">
              <div className="meta-icon-badge"><Users size={20} /></div>
              <div className="meta-texts">
                <div className="meta-title">GUESTS OF HONOR</div>
                <div className="meta-val">MCA BATCH '25 & SENIORS</div>
              </div>
            </div>

            <div className="meta-col">
              <div className="meta-icon-badge"><Shirt size={20} /></div>
              <div className="meta-texts">
                <div className="meta-title">DRESS PROTOCOL</div>
                <div className="meta-val">ROYAL ETHNIC // BLACK TIE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Controls Pill */}
        <div className="video-status-float">
          <button onClick={toggleVideoPlay} title={isVideoPlaying ? 'Pause video' : 'Play video'}>
            {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <span>4K LIVE ARENA FEED</span>
          <button onClick={toggleVideoMute} title={isVideoMuted ? 'Unmute video' : 'Mute video'}>
            {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </section>

      {/* 3. The Story & Spirit Section */}
      <section className="story-section section-pad" id="story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="kicker">01 // THE DIRECTIVE</span>
              <h2>Strangers today.<br /><em>Family forever</em> tomorrow.</h2>
              <div className="story-paragraphs">
                <p>
                  Every legendary tech journey begins with a handshake and high frequency.
                  NIRVAHAN isn't just an orientation welcome — it's the digital portal connecting
                  fresh talent with lifelong senior allies.
                </p>
                <p>
                  Under piercing cyan lasers and thunderous sound systems, the entire MCA cohort
                  unites for a milestone celebration that will set the tempo for your academic tenure.
                </p>
              </div>
              <div className="story-quote">
                // CORE DIRECTIVE: "You only get one Fresher’s Night. Make it legendary."
              </div>
            </div>

            <div className="story-cards-col">
              <div className="story-pillar-card">
                <div className="pillar-icon-wrap"><Sparkles size={22} /></div>
                <div className="pillar-info">
                  <h3>THE ICEBREAKER PROTOCOL</h3>
                  <p>Interactive squad matchmaking, casual campus network handshakes, and immediate camaraderie.</p>
                </div>
              </div>

              <div className="story-pillar-card">
                <div className="pillar-icon-wrap"><Music size={22} /></div>
                <div className="pillar-info">
                  <h3>LIVE CONCERT SOUNDSTAGE</h3>
                  <p>132 BPM electronic drops, solo acoustic solos, beatboxing, and senior tribute choreography.</p>
                </div>
              </div>

              <div className="story-pillar-card">
                <div className="pillar-icon-wrap"><Award size={22} /></div>
                <div className="pillar-info">
                  <h3>MR. & MS. FRESHER 2026</h3>
                  <p>Strobe-lit ramp walk, charisma showdown, and the grand coronation ceremony.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Highlights (High-Tech Matrix) */}
      <section className="experience-section section-pad" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="kicker">02 // THE MATRIX</span>
            <h2 className="section-title">An Evening Of <em>Pure Electric</em> Resonance</h2>
            <p className="section-description">
              Curated festival zones designed to elevate your campus experience into a memory of a lifetime.
            </p>
          </div>

          <div className="experience-grid">
            <div className="experience-card">
              <div className="experience-img-wrap">
                <img
                  className="experience-img"
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80"
                  alt="DJ and Laser Stage"
                  loading="lazy"
                />
                <span className="experience-badge">132 BPM AUDIO</span>
              </div>
              <div className="experience-body">
                <h3>DJ ARENA & LASER SPECTACLE</h3>
                <p>Volumetric cyan lighting grids, subterranean bass frequencies, and open dance arena with our guest DJ.</p>
              </div>
            </div>

            <div className="experience-card">
              <div className="experience-img-wrap">
                <img
                  className="experience-img"
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
                  alt="Red carpet glam cam"
                  loading="lazy"
                />
                <span className="experience-badge">STROBE GLAM</span>
              </div>
              <div className="experience-body">
                <h3>CYBER RED CARPET & 360° GLAM</h3>
                <p>Ultra-high definition portraits, immediate digital passes, polaroid souvenirs, and media wall interviews.</p>
              </div>
            </div>

            <div className="experience-card">
              <div className="experience-img-wrap">
                <img
                  className="experience-img"
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80"
                  alt="Gala Dinner Feast"
                  loading="lazy"
                />
                <span className="experience-badge">NITRO BAR</span>
              </div>
              <div className="experience-body">
                <h3>MIDNIGHT FEAST & CRAFT MOCKTAILS</h3>
                <p>Multi-cuisine royal feast buffet, artisanal dessert displays, and chilled handcrafted mocktails.</p>
              </div>
            </div>

            <div className="experience-card">
              <div className="experience-img-wrap">
                <img
                  className="experience-img"
                  src="https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80"
                  alt="Crowd cheering"
                  loading="lazy"
                />
                <span className="experience-badge">CORONATION</span>
              </div>
              <div className="experience-body">
                <h3>CROWNING MR. & MS. FRESHER</h3>
                <p>Ramp charisma, rapid-fire wit challenge, live voting, and the official NIRVAHAN royalty sash.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Schedule / Itinerary (Cyber Stage Chronology) */}
      <section className="schedule-section section-pad" id="schedule">
        <div className="container">
          <div className="section-header">
            <span className="kicker">03 // CHRONOLOGY</span>
            <h2 className="section-title">Stage Timeline // <em>Hour By Hour</em></h2>
            <p className="section-description">
              Precision-timed agenda designed to keep the momentum surging from morning roll-call to the night finale.
            </p>
          </div>

          <div className="timeline-wrap">
            <div className="timeline-item">
              <div className="timeline-marker"><Clock size={20} /></div>
              <div className="timeline-card">
                <div className="timeline-main">
                  <h3>BIO-REGISTRATION & RED CARPET ARRIVAL</h3>
                  <p>Check-in at the security desk, activate your holographic pass, and capture the media wall portrait.</p>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-time">10:30 HRS</div>
                  <div className="timeline-location">MAIN ENTRY // GATE 01</div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"><Sparkles size={20} /></div>
              <div className="timeline-card">
                <div className="timeline-main">
                  <h3>INAUGURAL PROTOCOL & TRADITIONAL LAMP</h3>
                  <p>Faculty keynote addresses, organizing committee intro, and blessing ceremonies for MCA 2025.</p>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-time">11:15 HRS</div>
                  <div className="timeline-location">MAIN AUDITORIUM</div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"><Award size={20} /></div>
              <div className="timeline-card">
                <div className="timeline-main">
                  <h3>TALENT SHOWCASE & FRESHER RAMP BATTLE</h3>
                  <p>Spotlight performances, batch ramp walk, comedic routines, and Mr./Ms. Fresher Round 1 evaluation.</p>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-time">12:00 HRS</div>
                  <div className="timeline-location">CENTRAL STAGE // 110 BPM</div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"><Utensils size={20} /></div>
              <div className="timeline-card">
                <div className="timeline-main">
                  <h3>GRAND GALA FEAST & SQUAD NETWORKING</h3>
                  <p>Gourmet multi-cuisine spread, nitro beverages, faculty mingling, and instant crew connections.</p>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-time">13:30 HRS</div>
                  <div className="timeline-location">DINING PAVILION</div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"><Music size={20} /></div>
              <div className="timeline-card">
                <div className="timeline-main">
                  <h3>DJ ARENA // 132 BPM BASS COLLAPSE & FINALE</h3>
                  <p>Volumetric laser arrays, heavy electronic drops, winner coronation ceremony, and the grand batch photograph.</p>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-time">15:30 HRS</div>
                  <div className="timeline-location">OPEN ARENA // 132 BPM PEAK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive VIP Holographic Pass Generator */}
      <section className="pass-section section-pad" id="pass">
        <div className="container">
          <div className="section-header">
            <span className="kicker">04 // ACCESS TOKEN</span>
            <h2 className="section-title">Generate Your <em>Cyber VIP Pass</em></h2>
            <p className="section-description">
              Personalize your verifiable holographic souvenir pass equipped with cryptographic token ID and digital barcode.
            </p>
          </div>

          <div className="pass-generator-grid">
            <div className="pass-form-card">
              <h3 className="pass-form-title">PERSONALIZE CREDENTIALS</h3>
              <p className="pass-form-subtitle">
                Input your credentials to mint your authenticated NIRVAHAN digital invitation card.
              </p>

              <form onSubmit={handleClaimPass}>
                <div className="form-group">
                  <label className="form-label" htmlFor="fresherName">Student Full Name</label>
                  <input
                    id="fresherName"
                    type="text"
                    className="form-input"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    maxLength={32}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="fresherDept">Assigned Batch / Division</label>
                  <select
                    id="fresherDept"
                    className="form-select"
                    value={studentDept}
                    onChange={(e) => setStudentDept(e.target.value)}
                  >
                    <option value="MCA Batch 2025 (Section A)">MCA Batch 2025 (Section A)</option>
                    <option value="MCA Batch 2025 (Section B)">MCA Batch 2025 (Section B)</option>
                    <option value="MCA Senior Host / Volunteer">MCA Senior Host / Volunteer</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  GENERATE & ACTIVATE PASS ✦
                </button>
              </form>

              {passClaimed && (
                <div className="rsvp-success" style={{ width: '100%', justifyContent: 'center' }}>
                  <Check size={18} /> CREDENTIALS VERIFIED! WELCOME TO NIRVAHAN '26.
                </div>
              )}
            </div>

            {/* 3D Holographic Card Preview */}
            <div className="pass-preview-col">
              <div
                className="vip-ticket-card"
                onMouseMove={handleTicketMouseMove}
                onMouseLeave={handleTicketMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${ticketTilt.x}deg) rotateY(${ticketTilt.y}deg)`
                }}
              >
                <div className="ticket-header-row">
                  <div className="ticket-brand">NIRVAHAN // '26</div>
                  <div className="ticket-vip-tag">VIP ACCESS</div>
                </div>

                <div className="ticket-body-content">
                  <div className="ticket-holder-name">{studentName || 'ALEX MORGAN'}</div>
                  <div className="ticket-holder-dept">{studentDept}</div>

                  <div className="ticket-details-grid">
                    <div className="ticket-field">
                      <span>LOCATION</span>
                      <strong>SRUSTI AUDITORIUM</strong>
                    </div>
                    <div className="ticket-field">
                      <span>COMMENCE</span>
                      <strong>10:30 HRS ONWARDS</strong>
                    </div>
                    <div className="ticket-field">
                      <span>TOKEN HASH</span>
                      <strong>NVH-{(studentName.length * 4821 + 1047).toString().slice(0, 5)}</strong>
                    </div>
                    <div className="ticket-field">
                      <span>SECURITY STATUS</span>
                      <strong>CLEARED // VIP GUEST</strong>
                    </div>
                  </div>
                </div>

                <div className="ticket-footer-row">
                  <div className="ticket-barcode">
                    {[3, 6, 2, 4, 1, 5, 2, 6, 4, 3, 5, 2, 4, 1, 6, 2, 3, 5, 2, 4].map((w, idx) => (
                      <span key={idx} className="barcode-line" style={{ width: `${w}px` }} />
                    ))}
                  </div>

                  {/* High-Tech Vector QR Symbol */}
                  <svg className="ticket-qr-code" viewBox="0 0 24 24" fill="#030508">
                    <rect x="2" y="2" width="6" height="6" />
                    <rect x="4" y="4" width="2" height="2" fill="#fff" />
                    <rect x="16" y="2" width="6" height="6" />
                    <rect x="18" y="4" width="2" height="2" fill="#fff" />
                    <rect x="2" y="16" width="6" height="6" />
                    <rect x="4" y="18" width="2" height="2" fill="#fff" />
                    <rect x="11" y="4" width="2" height="2" />
                    <rect x="11" y="8" width="2" height="4" />
                    <rect x="16" y="11" width="3" height="3" />
                    <rect x="10" y="16" width="4" height="2" />
                    <rect x="18" y="18" width="4" height="4" />
                  </svg>
                </div>
              </div>

              <div className="pass-actions-row">
                <button className="btn btn-primary" onClick={downloadPassImage}>
                  <Download size={15} /> Download Badge
                </button>
                <button className="btn btn-outline" onClick={fireConfetti}>
                  <Sparkles size={15} /> Celebrate
                </button>
                <button className="btn btn-outline" onClick={handleCopyShare}>
                  {copiedLink ? <Check size={15} /> : <Copy size={15} />}
                  {copiedLink ? 'Link Copied!' : 'Share Pass'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RSVP & Notifications Desk */}
      <section className="rsvp-section section-pad" id="notify">
        <div className="container">
          <div className="rsvp-box">
            <span className="kicker">SATELLITE COMMS // NOTIFY DESK</span>
            <h2 className="section-title">Stay On The <em>Frequency</em></h2>
            <p className="section-description">
              Receive confidential event intel, artist lineup announcements, and campus gate entry advisories.
            </p>

            {rsvpDone ? (
              <div className="rsvp-success">
                <Check size={20} /> ON NOTIFICATION MATRIX // PRIORITY CHANNEL ESTABLISHED
              </div>
            ) : (
              <form className="rsvp-form-row" onSubmit={handleRSVP}>
                <input
                  type="email"
                  className="rsvp-input"
                  placeholder="student_auth --email..."
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  SUBSCRIBE ✦
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions (Radix Accordion) */}
      <section className="faq-section section-pad" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="kicker">SYSTEM KNOWLEDGE // FAQ</span>
            <h2 className="section-title">Direct Inquiries // <em>Q&A</em></h2>
            <p className="section-description">
              Essential answers and clearance parameters for the incoming batch.
            </p>
          </div>

          <div className="faq-container">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>[SYS.FAQ-01] Who is authorized to attend NIRVAHAN 2026?</AccordionTrigger>
                <AccordionContent>
                  All newly admitted students of MCA Batch 2025, coordinating faculty leads,
                  and official senior committee hosts hold full security clearance to attend.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>[SYS.FAQ-02] Is there any ticket fee or entry tariff?</AccordionTrigger>
                <AccordionContent>
                  Zero cost. Access is 100% complimentary for all official MCA 2025 freshers.
                  Simply present your college student ID card along with this digital pass token.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>[SYS.FAQ-03] What is the mandated dress protocol?</AccordionTrigger>
                <AccordionContent>
                  The official code is <strong>Royal Ethnic & Black-Tie Formal</strong>.
                  Kurtas, sherwanis, sarees, suits, or blazers are requested for the high-res red carpet session.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>[SYS.FAQ-04] How can I register for the Mr. & Ms. Fresher battle?</AccordionTrigger>
                <AccordionContent>
                  Any fresher from the new batch can register at the registration booth at 10:30 HRS
                  or via your section representatives before the talent showcase commences.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>[SYS.FAQ-05] Are catering and beverages provided?</AccordionTrigger>
                <AccordionContent>
                  Affirmative. A lavish multi-course buffet lunch featuring gourmet vegetarian and non-vegetarian
                  delicacies, alongside chilled craft mocktails and desserts, will be served.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 9. Site Footer */}
      <footer className="site-footer" id="contact">
        <div className="container">
          <div className="footer-top">
            <a href="#home" className="brand">
              <div className="brand-icon">
                <svg viewBox="0 0 240 200" width="22" height="19" fill="none">
                  <path d="M 50 15 L 105 55 L 105 130 L 50 170 Z" fill="#00f5ff" />
                  <path d="M 105 55 L 155 90 L 125 112 L 75 75 Z" fill="#00c8ff" />
                  <path d="M 190 15 L 190 170 L 140 135 L 140 50 Z" fill="#38bdf8" />
                  <path d="M 85 105 L 135 142 L 190 170 L 140 170 L 95 135 Z" fill="#e0f2fe" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">NIRVAHAN</span>
                <span className="brand-sub">MCA FRESHER FESTIVAL 2026</span>
              </div>
            </a>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="#home" className="nav-link">Top ↑</a>
              <a href="#schedule" className="nav-link">Timeline</a>
              <a href="#pass" className="nav-link">Mint Pass</a>
              <a href="#faq" className="nav-link">FAQ</a>
            </div>
          </div>

          <div className="footer-wordmark" aria-hidden="true">
            NIRVAHAN 2026
          </div>

          <div className="footer-bottom">
            <span>© 2026 SRUSTI CAMPUS // MCA FRESHER COMMUNITY. ALL RIGHTS RESERVED.</span>
            <span>SYSTEM ENCRYPTED • SECURE PROTOCOL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
