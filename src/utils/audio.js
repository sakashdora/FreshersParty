// ============================================================================
// AUDIO DESIGN SUITE — TEJAS '26
// Studio Master Audio Engine (Uncompressed 44.1kHz Stereo WAV + Hybrid Web Audio)
// Resilient to browser autoplay policies, ultra-low latency, zero external dependencies.
// ============================================================================

let audioCtx = null;
let isAudioMuted = false;
let isUnlocked = false;

// Native Studio Audio Elements
let introSwellAudio = null;
let introRevealAudio = null;
let paperRustleAudio = null;
let isAutoplayBlocked = false;

function getAudio(src) {
  if (typeof window === 'undefined') return null;
  try {
    const audio = new Audio(src);
    audio.preload = 'auto';
    return audio;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------------------------------
// Audio Context Initialization & Auto-Unlock on any user gesture
// ----------------------------------------------------------------------------
export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function initGlobalAudioUnlock(onUnlockedCallback) {
  if (typeof window === 'undefined') return;

  // Preload studio master assets
  if (!introSwellAudio) {
    introSwellAudio = getAudio('/audio/cinematic-impact-swell.wav');
    introRevealAudio = getAudio('/audio/cinematic-title-reveal.wav');
    paperRustleAudio = getAudio('/audio/paper-rustle.mp3');
  }

  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().then(() => {
        isUnlocked = true;
        isAutoplayBlocked = false;
        if (onUnlockedCallback) onUnlockedCallback();
      }).catch(() => {});
    } else {
      isUnlocked = true;
      isAutoplayBlocked = false;
      if (onUnlockedCallback) onUnlockedCallback();
    }

    // Try starting swell if was previously blocked
    if (introSwellAudio && isAutoplayBlocked) {
      introSwellAudio.currentTime = 0;
      introSwellAudio.volume = 0.85;
      introSwellAudio.play().catch(() => {});
    }

    ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(evt => {
      window.removeEventListener(evt, unlock);
    });
  };

  ['pointerdown', 'touchstart', 'keydown', 'click'].forEach(evt => {
    window.addEventListener(evt, unlock, { once: true, passive: true });
  });
}

export function toggleAudioMute() {
  isAudioMuted = !isAudioMuted;
  return isAudioMuted;
}

export function isMuted() {
  return isAudioMuted;
}

// ----------------------------------------------------------------------------
// 1. STUDIO MASTER CINEMATIC SWELL (Opening Atmosphere & Sub-Bass Impact)
// Sub-bass drop + French horn & Cello swell + golden particle shimmer
// ----------------------------------------------------------------------------
export function playCinematicSwell() {
  if (isAudioMuted) return;

  // Layer 1: Studio Master 44.1kHz Stereo WAV Asset
  if (!introSwellAudio) {
    introSwellAudio = getAudio('/audio/cinematic-impact-swell.wav');
  }

  if (introSwellAudio) {
    try {
      introSwellAudio.currentTime = 0;
      introSwellAudio.volume = 0.9;
      const promise = introSwellAudio.play();
      if (promise !== undefined) {
        promise.then(() => {
          isAutoplayBlocked = false;
        }).catch(() => {
          // Autoplay policy prevented playback until gesture
          isAutoplayBlocked = true;
        });
      }
    } catch (e) {
      isAutoplayBlocked = true;
    }
  }

  // Layer 2: Instant Web Audio Synth Layer (Warm Horn fifths & Sub-bass foundation)
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'running') {
    try {
      const now = ctx.currentTime;

      // Master lowpass envelope
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(520, now + 1.4);
      filter.frequency.exponentialRampToValueAtTime(160, now + 3.6);
      filter.Q.setValueAtTime(1.4, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(0.3, now + 1.0);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Warm orchestral chord voices: D2 (73.4Hz), A2 (110.0Hz), D3 (146.8Hz)
      const voices = [
        { freq: 73.42, type: 'triangle', gain: 0.35, detune: -3 },
        { freq: 73.42, type: 'sine', gain: 0.45, detune: 3 },
        { freq: 110.00, type: 'triangle', gain: 0.28, detune: 2 },
        { freq: 146.83, type: 'sine', gain: 0.22, detune: -2 },
      ];

      voices.forEach(v => {
        const osc = ctx.createOscillator();
        const vGain = ctx.createGain();

        osc.type = v.type;
        osc.frequency.setValueAtTime(v.freq, now);
        osc.detune.setValueAtTime(v.detune, now);
        vGain.gain.setValueAtTime(v.gain, now);

        osc.connect(vGain);
        vGain.connect(filter);

        osc.start(now);
        osc.stop(now + 3.8);
      });
    } catch (err) {}
  }
}

// ----------------------------------------------------------------------------
// 2. DELICATE SATIN SILK HARMONIC SHIMMER (Ribbon Glide)
// ----------------------------------------------------------------------------
export function playRibbonMotionSweep() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const notes = [440.00, 554.37, 659.25, 880.00];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.16;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, startTime + 0.8);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.03, startTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  } catch (e) {}
}

// ----------------------------------------------------------------------------
// 3. MAJESTIC CONCERT TUBULAR CHIME & REVEAL (TEJAS '26 Identity)
// Cathedral tubular chime in D Major with natural physical metallic damping
// ----------------------------------------------------------------------------
export function playCelestialRevealChime() {
  if (isAudioMuted) return;

  // Layer 1: Studio Master 44.1kHz Stereo WAV Asset
  if (!introRevealAudio) {
    introRevealAudio = getAudio('/audio/cinematic-title-reveal.wav');
  }

  if (introRevealAudio) {
    try {
      introRevealAudio.currentTime = 0;
      introRevealAudio.volume = 0.95;
      const promise = introRevealAudio.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch (e) {}
  }

  // Layer 2: Web Audio Resonance
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'running') {
    try {
      const now = ctx.currentTime;
      const bellHarmonics = [
        { freq: 293.66, gain: 0.25, decay: 2.4 }, // D4 Fundamental
        { freq: 440.00, gain: 0.20, decay: 2.0 }, // A4 Fifth
        { freq: 587.33, gain: 0.16, decay: 1.8 }, // D5 Octave
        { freq: 739.99, gain: 0.12, decay: 1.4 }, // F#5 Third
        { freq: 1174.66, gain: 0.06, decay: 1.0 }, // D6 Shimmer
      ];

      bellHarmonics.forEach((h) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(h.freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(h.gain, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + h.decay + 0.1);
      });
    } catch (e) {}
  }
}

// ----------------------------------------------------------------------------
// 4. SUBTLE WARM MARIMBA TOUCH (Milestone Display)
// ----------------------------------------------------------------------------
export function playMilestoneSlideTick() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(146.8, now + 0.05);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

// ----------------------------------------------------------------------------
// 5. TACTILE MICRO-TAP (UI Interactions)
// ----------------------------------------------------------------------------
export function playMicroTap() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.02);

    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {}
}

// ----------------------------------------------------------------------------
// 6. WAX SEAL BREAK & PARCHMENT RUSTLE (Envelope Opening)
// ----------------------------------------------------------------------------
export function playPaperRustle() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();

  if (ctx && ctx.state === 'running') {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.1);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  if (paperRustleAudio) {
    try {
      paperRustleAudio.currentTime = 0;
      paperRustleAudio.volume = 0.7;
      const promise = paperRustleAudio.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch (e) {}
  }
}

// ----------------------------------------------------------------------------
// 7. SKIP / TRANSITION WHOOSH
// ----------------------------------------------------------------------------
export function playSkipTransition() {
  if (isAudioMuted) return;
  stopIntroAudio();

  const ctx = getAudioContext();
  if (!ctx || ctx.state !== 'running') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.34);
  } catch (e) {}
}

// ----------------------------------------------------------------------------
// 8. MASTER INTRO SOUNDTRACK (Kalki 2898 AD Bujji Theme - 14.01s)
// ----------------------------------------------------------------------------
let masterIntroAudio = null;

export function getMasterIntroAudio() {
  if (typeof window === 'undefined') return null;
  if (!masterIntroAudio) {
    masterIntroAudio = getAudio('/audio/intro_sound.mp3');
  }
  return masterIntroAudio;
}

export function playMasterSoundtrack({ onTimeUpdate, onEnded, onError } = {}) {
  const audio = getMasterIntroAudio();
  if (!audio) return null;

  try {
    audio.currentTime = 0;
    audio.volume = isAudioMuted ? 0 : 0.95;

    let timeListener = null;
    let endListener = null;

    if (onTimeUpdate) {
      timeListener = () => {
        onTimeUpdate(audio.currentTime);
      };
      audio.addEventListener('timeupdate', timeListener);
    }

    if (onEnded) {
      endListener = () => {
        onEnded();
      };
      audio.addEventListener('ended', endListener);
    }

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch((err) => {
        console.warn('Audio play restricted or blocked:', err);
        if (onError) onError(err);
      });
    }

    return () => {
      if (timeListener) audio.removeEventListener('timeupdate', timeListener);
      if (endListener) audio.removeEventListener('ended', endListener);
    };
  } catch (e) {
    console.warn('Master soundtrack playback error:', e);
    if (onError) onError(e);
    return null;
  }
}

export function setMasterSoundtrackVolume(vol) {
  if (masterIntroAudio) {
    try {
      masterIntroAudio.volume = isAudioMuted ? 0 : Math.max(0, Math.min(1, vol));
    } catch (e) {}
  }
}

export function stopMasterSoundtrack(fadeOutMs = 500) {
  if (!masterIntroAudio) return;
  try {
    if (fadeOutMs > 0 && masterIntroAudio.volume > 0.05 && !masterIntroAudio.paused) {
      const startVol = masterIntroAudio.volume;
      const startTime = performance.now();
      const fadeInterval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / fadeOutMs);
        if (masterIntroAudio) {
          masterIntroAudio.volume = Math.max(0, startVol * (1 - progress));
        }
        if (progress >= 1) {
          clearInterval(fadeInterval);
          if (masterIntroAudio) {
            masterIntroAudio.pause();
            masterIntroAudio.currentTime = 0;
            masterIntroAudio.volume = isAudioMuted ? 0 : 0.95;
          }
        }
      }, 30);
    } else {
      masterIntroAudio.pause();
      masterIntroAudio.currentTime = 0;
    }
  } catch (e) {}
}

export function toggleMasterSoundtrackMute() {
  isAudioMuted = !isAudioMuted;
  if (masterIntroAudio) {
    masterIntroAudio.volume = isAudioMuted ? 0 : 0.95;
  }
  return isAudioMuted;
}

// ----------------------------------------------------------------------------
// 9. STOP ALL INTRO AUDIO (Skip / Exit)
// ----------------------------------------------------------------------------
export function stopIntroAudio() {
  stopMasterSoundtrack(300);
  if (introSwellAudio) {
    try {
      introSwellAudio.pause();
      introSwellAudio.currentTime = 0;
    } catch (e) {}
  }
  if (introRevealAudio) {
    try {
      introRevealAudio.pause();
      introRevealAudio.currentTime = 0;
    } catch (e) {}
  }
}

