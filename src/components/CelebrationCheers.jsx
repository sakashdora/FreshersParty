import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Flame, Rocket, PartyPopper, Star } from 'lucide-react';

const INITIAL_REACTIONS = [
  { id: 'excited', label: "Can't wait to attend!", icon: PartyPopper, count: 142, color: '#A31E3B' },
  { id: 'seniors', label: "Excited to meet seniors", icon: Heart, count: 189, color: '#5B0E23' },
  { id: 'mca', label: "Ready for the MCA journey", icon: Rocket, count: 126, color: '#D4AF37' },
  { id: 'vibes', label: "Here for the memories", icon: Star, count: 165, color: '#9E7418' }
];

export default function CelebrationCheers() {
  const [reactions, setReactions] = useState(INITIAL_REACTIONS);
  const [userClicked, setUserClicked] = useState({});

  const handleCheer = (id, color) => {
    // Trigger palette confetti burst with Imperial Velvet & Gold
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#5B0E23', '#D4AF37', '#A31E3B', '#FDEBB2', '#FAF7F2']
    });

    setReactions(prev =>
      prev.map(r => r.id === id ? { ...r, count: r.count + 1 } : r)
    );

    setUserClicked(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section className="celebration-cheers-section">
      <div className="section-container">
        <div className="cheers-card-wrap">
          <div className="cheers-header">
            <div className="accent-tag">
              <span className="accent-tag-diamond">◆</span>
              <span>COLLEGE SPIRIT</span>
            </div>
            <h3 className="cheers-title">Send Your Excitement</h3>
            <p className="cheers-desc">
              Join your fellow batchmates and seniors in sounding the call for TEJAS ’26.
              Tap a reaction to share the energy.
            </p>
          </div>

          <div className="cheers-buttons-grid">
            {reactions.map((reaction) => {
              const Icon = reaction.icon;
              const hasClicked = userClicked[reaction.id];

              return (
                <button
                  key={reaction.id}
                  className={`cheer-badge-btn ${hasClicked ? 'is-clicked' : ''}`}
                  onClick={() => handleCheer(reaction.id, reaction.color)}
                  aria-label={`${reaction.label}, ${reaction.count} cheers`}
                >
                  <div className="cheer-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="cheer-text-col">
                    <span className="cheer-label">{reaction.label}</span>
                    <span className="cheer-count">{reaction.count} cheers</span>
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
