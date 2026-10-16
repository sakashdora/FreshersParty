import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, PartyPopper, Star, Smile } from 'lucide-react';
import { playMicroTap } from '../utils/audio';

const STORAGE_KEY = 'tejas_reactions_v3';

const DEFAULT_REACTIONS = [
  { id: 'celebrate', emoji: '🎉', label: "Can't wait to attend!", count: 168 },
  { id: 'bloom', emoji: '🌸', label: "The Fresh Bloom vibe", count: 214 },
  { id: 'shine', emoji: '✨', label: "Ready for the memories", count: 182 },
  { id: 'seniors', emoji: '💛', label: "Excited to meet seniors", count: 247 }
];

export default function CelebrationCheers() {
  const [reactions, setReactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return DEFAULT_REACTIONS.map((r) => ({
          ...r,
          count: parsed[r.id] !== undefined ? parsed[r.id] : r.count
        }));
      }
    } catch (e) {}
    return DEFAULT_REACTIONS;
  });

  const [clickedMap, setClickedMap] = useState(() => {
    try {
      const savedClicked = localStorage.getItem(`${STORAGE_KEY}_clicked`);
      if (savedClicked) return JSON.parse(savedClicked);
    } catch (e) {}
    return {};
  });

  const totalCheers = reactions.reduce((sum, r) => sum + r.count, 0);

  const handleCheer = (id) => {
    playMicroTap();

    // Trigger palette confetti burst with Imperial Velvet Wine & Solar Gold
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#5B0E23', '#D4AF37', '#A31E3B', '#FDEBB2', '#FAF7F2']
    });

    const updated = reactions.map((r) =>
      r.id === id ? { ...r, count: r.count + 1 } : r
    );
    setReactions(updated);

    const updatedClicked = { ...clickedMap, [id]: (clickedMap[id] || 0) + 1 };
    setClickedMap(updatedClicked);

    try {
      const countMap = updated.reduce((acc, r) => ({ ...acc, [r.id]: r.count }), {});
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countMap));
      localStorage.setItem(`${STORAGE_KEY}_clicked`, JSON.stringify(updatedClicked));
    } catch (e) {}
  };

  return (
    <section className="celebration-cheers-section" id="celebration-cheers" aria-label="Send Celebration Reactions">
      <div className="section-container">
        <div className="cheers-card-wrap">
          <div className="cheers-header">
            <div className="cheers-eyebrow">
              <span className="accent-tag-diamond">✦</span>
              <span>STUDENT EXCITEMENT &amp; CONFLUENCE</span>
              <span className="accent-tag-diamond">✦</span>
            </div>
            <h3 className="cheers-title">Send Your Excitement</h3>
            <p className="cheers-desc">
              Tap a reaction to share the energy for TEJAS ’26. Every tap joins our collective celebratory tally.
            </p>
            <div className="cheers-live-counter">
              <span className="live-dot" />
              <span><strong>{totalCheers.toLocaleString()}</strong> cheers sent by MCA freshers &amp; seniors</span>
            </div>
          </div>

          <div className="cheers-buttons-grid">
            {reactions.map((reaction) => {
              const clickCount = clickedMap[reaction.id] || 0;
              const hasClicked = clickCount > 0;

              return (
                <button
                  key={reaction.id}
                  type="button"
                  className={`cheer-badge-btn ${hasClicked ? 'is-clicked' : ''}`}
                  onClick={() => handleCheer(reaction.id)}
                  aria-label={`${reaction.label}, ${reaction.count} cheers recorded`}
                >
                  <div className="cheer-emoji-box" aria-hidden="true">
                    <span>{reaction.emoji}</span>
                  </div>
                  <div className="cheer-text-col">
                    <span className="cheer-label">{reaction.label}</span>
                    <span className="cheer-count">
                      {reaction.count} {reaction.count === 1 ? 'cheer' : 'cheers'}
                      {clickCount > 0 && <span className="user-tap-badge">+{clickCount}</span>}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
