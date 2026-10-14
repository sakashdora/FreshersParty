import React, { useState } from 'react';
import {
  Clock, Gamepad2, Music, Award, Users, Utensils,
  Flame, Mic2, Compass, CheckCircle2, ChevronRight,
  Crown, CalendarPlus, Download, MapPin, Music2,
  Calendar, Layers, Check
} from 'lucide-react';
import { playMicroTap } from '../utils/audio';



const AGENDA_ITEMS = [
  // --- ACT I: CEREMONIAL OVERTURE ---
  {
    id: 1,
    act: 'act-1',
    actLabel: 'ACT I',
    time: "10:00 AM – 10:30 AM",
    duration: "30 MIN",
    title: "Arrival & Batch Reception",
    category: "Welcome & Seating",
    badgeType: "welcome",
    desc: "Doors open at JRD Tata Hall. Badge collection, commemorative welcome kits, guest registration, and hall seating.",
    isMajor: false,
    isFlagship: false,
    icon: Compass,
    highlights: ["Door registration & wristbands", "Seating arrangements by batch"]
  },
  {
    id: 2,
    act: 'act-1',
    actLabel: 'ACT I',
    time: "10:30 AM – 10:45 AM",
    duration: "15 MIN",
    title: "Inaugural Lamp Lighting & Odissi Dance",
    subtitle: "Sacred invocation & classical cultural benediction",
    category: "Traditional Ceremony",
    badgeType: "ceremony",
    flagshipTag: "SACRED TRADITION",
    desc: "Auspicious Mangalacharan lamp lighting led by department dignitaries, followed by a revered classical Odissi performance welcoming new beginnings.",
    isMajor: true,
    isFlagship: true,
    icon: Flame,
    highlights: ["Dignitary lamp lighting ceremony", "Classical Odissi invocation recital"]
  },
  {
    id: 3,
    act: 'act-1',
    actLabel: 'ACT I',
    time: "10:45 AM – 11:15 AM",
    duration: "30 MIN",
    title: "Welcome Addresses & Faculty Blessings",
    category: "Leadership Speeches",
    badgeType: "speech",
    desc: "Inspiring opening addresses and words of wisdom from esteemed MCA faculty heads, management directors, and senior organizing council.",
    isMajor: false,
    isFlagship: false,
    icon: Mic2,
    highlights: ["Inspirational faculty keynotes", "Senior council presidential address"]
  },

  // Intermission Buffer 1
  {
    isBuffer: true,
    act: 'act-1',
    time: "11:15 AM – 11:45 AM (30 MIN)",
    label: "Stage Reset & Refreshment Prelude",
    desc: "Auditorium transition, green-room prep for junior batch entry, and light refreshments."
  },

  // --- ACT II: SPOTLIGHT & FEAST ---
  {
    id: 4,
    act: 'act-2',
    actLabel: 'ACT II',
    time: "11:45 AM – 12:00 PM",
    duration: "15 MIN",
    title: "Introduction of the Freshers",
    subtitle: "Welcoming the Incoming MCA Batch (2026–2028)",
    category: "Batch Spotlight",
    badgeType: "spotlight",
    desc: "The spotlight shines on the incoming juniors. First official stage introductions to fellow batchmates, faculty mentors, and senior leaders.",
    isMajor: true,
    isFlagship: false,
    icon: Users,
    highlights: ["Junior cohort stage roll-call", "Official batch welcome cheers"]
  },
  {
    id: 5,
    act: 'act-2',
    actLabel: 'ACT II',
    time: "12:00 PM – 12:45 PM",
    duration: "45 MIN",
    title: "Interactive Icebreakers & Fun Games",
    category: "Interactive Banter",
    badgeType: "games",
    desc: "Spirited team games, fun stage banter, and laughter-packed icebreaking challenges curated to spark instant connections and lasting friendships.",
    isMajor: false,
    isFlagship: false,
    icon: Gamepad2,
    highlights: ["Team sync challenges", "Senior-junior impromptu trivia"]
  },
  {
    id: 6,
    act: 'act-2',
    actLabel: 'ACT II',
    time: "12:45 PM – 1:15 PM",
    duration: "30 MIN",
    title: "The Fellowship Grand Lunch",
    subtitle: "Campus Dining Arena · Community feast",
    category: "Fellowship Feast",
    badgeType: "feast",
    flagshipTag: "CAMPUS FEAST",
    desc: "Festive multi-course buffet lunch at the campus dining arena, sharing memorable meals, casual conversations, and laughter across all batches.",
    isMajor: true,
    isFlagship: true,
    icon: Utensils,
    highlights: ["Festive campus buffet luncheon", "Informal faculty & student fellowship"]
  },

  // Intermission Buffer 2
  {
    isBuffer: true,
    act: 'act-2',
    time: "1:15 PM – 1:30 PM (15 MIN)",
    label: "Afternoon Hall Reconvening",
    desc: "Return to JRD Tata Hall and audiovisual check for the premier cultural afternoon showcase."
  },

  // --- ACT III: REVELRY & FINALE ---
  {
    id: 7,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "1:30 PM – 2:15 PM",
    duration: "45 MIN",
    title: "Ensemble Cultural Performances",
    subtitle: "Group dance routines & dramatic sketches",
    category: "Cultural Showcase",
    badgeType: "performance",
    desc: "High-octane group dance choreographies, live fusion band sets, and entertaining theatrical skits by talented senior and junior performers.",
    isMajor: true,
    isFlagship: false,
    icon: Music,
    highlights: ["Choreographed group dance medleys", "Student drama & musical acts"]
  },
  {
    id: 8,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "2:15 PM – 3:00 PM",
    duration: "45 MIN",
    title: "Crowd Games & On-Stage Challenges",
    category: "Stage Contests",
    badgeType: "games",
    desc: "Entertaining interactive games, spot talent dares, and playful senior-junior friendly competition with audience voting.",
    isMajor: false,
    isFlagship: false,
    icon: Gamepad2,
    highlights: ["Interactive audience rounds", "Spot prize showdowns"]
  },
  {
    id: 9,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "3:00 PM – 3:15 PM",
    duration: "15 MIN",
    title: "Solo Spotlight: Vocals & Instruments",
    category: "Individual Talent",
    badgeType: "talent",
    desc: "Individual acoustic vocal showcases, guitar melodies, and expressive solo stage talent demonstrating the artistic depth of the new batch.",
    isMajor: true,
    isFlagship: false,
    icon: Mic2,
    highlights: ["Acoustic vocal performances", "Solo instrumental showcases"]
  },
  {
    id: 10,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "3:15 PM – 3:45 PM",
    duration: "30 MIN",
    title: "Final Showdown & Mystery Games",
    category: "Stage Contests",
    badgeType: "games",
    desc: "The concluding round of whimsical stage challenges, impromptu charades, and playful banter setting the mood for the crowning honors.",
    isMajor: false,
    isFlagship: false,
    icon: Gamepad2,
    highlights: ["Mystery talent challenges", "Crowd cheer decibel contest"]
  },
  {
    id: 11,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "3:45 PM – 4:00 PM",
    duration: "15 MIN",
    title: "Crowning of Mr. & Ms. Fresher ’26",
    subtitle: "The Premier Honours & Title Ceremony of TEJAS ’26",
    category: "Royal Accolades",
    badgeType: "crowning",
    flagshipTag: "PREMIER HONOURS",
    desc: "The pinnacle ceremonial moment: announcement, sash presentation, and royal crowning of Mr. and Ms. Fresher TEJAS ’26 based on charisma, intellect, and grace.",
    isMajor: true,
    isFlagship: true,
    icon: Crown,
    highlights: ["Ceremonial sash & royal crowning", "Official titleholder address & photo honors"]
  },
  {
    id: 12,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "4:00 PM – 4:15 PM",
    duration: "15 MIN",
    title: "Valedictory & Vote of Thanks",
    category: "Closing Address",
    badgeType: "closing",
    desc: "Heartfelt gratitude expressed to faculty patrons, executive student coordinators, stage crews, volunteers, and the entire MCA family.",
    isMajor: false,
    isFlagship: false,
    icon: CheckCircle2,
    highlights: ["Acknowledgement of committees", "Faculty felicitation & final blessings"]
  },
  {
    id: 13,
    act: 'act-3',
    actLabel: 'ACT III',
    time: "4:15 PM – 5:00 PM",
    duration: "45 MIN",
    title: "The Grand DJ Floor & Celebration Bash",
    subtitle: "Open floor euphoria, lights & commemorative photography",
    category: "Grand Finale",
    badgeType: "finale",
    flagshipTag: "EPIC FINALE",
    desc: "The auditorium transforms with dynamic beats, laser illuminations, open dance floor celebration, and the grand official batch group portrait.",
    isMajor: true,
    isFlagship: true,
    icon: Music2,
    highlights: ["Live club-style DJ set", "Batch commemorative photo session"]
  }
];

export default function AgendaSection() {
  const [expandedItem, setExpandedItem] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const toggleExpand = (id) => {
    playMicroTap();
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleGoogleCalendar = () => {
    playMicroTap();
    const title = encodeURIComponent("TEJAS '26 — MCA Freshers Day Gala");
    const details = encodeURIComponent(
      "Official Freshers Day Celebration for MCA Batch 2026–2028.\n\n" +
      "Schedule Highlights:\n" +
      "• 10:00 AM: Arrival & Seating\n" +
      "• 10:30 AM: Lamp Lighting & Odissi Dance\n" +
      "• 11:45 AM: Introduction of Freshers\n" +
      "• 12:45 PM: Fellowship Grand Lunch\n" +
      "• 01:30 PM: Cultural Performances & Games\n" +
      "• 03:45 PM: Crowning of Mr. & Ms. Fresher '26\n" +
      "• 04:15 PM: Grand DJ Floor & Celebration Bash\n\n" +
      "Venue: JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar."
    );
    const location = encodeURIComponent("JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar");
    // 30 Oct 2026: 10:00 AM IST to 5:00 PM IST (04:30 UTC to 11:30 UTC)
    const dates = "20261030T043000Z/20261030T113000Z";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`, '_blank');
  };

  const handleDownloadIcs = () => {
    playMicroTap();
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Srusti Academy of Management//TEJAS 26 MCA Freshers//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:tejas26-freshers-gala-oct30@srustiacademy.ac.in',
      'SUMMARY:TEJAS \'26 — MCA Freshers Day Gala',
      'DESCRIPTION:Official Freshers Day Celebration for MCA Batch 2026-2028. From inaugural Odissi dance to Mr. & Ms. Fresher Crowning and DJ dance floor.',
      'LOCATION:JRD Tata Hall\\, Srusti Academy of Management & Technology\\, Bhubaneswar',
      'DTSTART:20261030T043000Z',
      'DTEND:20261030T113000Z',
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'TEJAS-26-Freshers-Day-Itinerary.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySchedule = () => {
    playMicroTap();
    const textSummary =
      "TEJAS '26 — MCA Freshers Day Programme (30 Oct 2026 · JRD Tata Hall)\n\n" +
      "10:00 AM – Arrival & Registration\n" +
      "10:30 AM – Lamp Lighting & Odissi Dance [Tradition]\n" +
      "10:45 AM – Welcome Speeches & Keynotes\n" +
      "11:45 AM – Introduction of Freshers\n" +
      "12:00 PM – Interactive Icebreakers & Games\n" +
      "12:45 PM – Fellowship Grand Lunch [Feast]\n" +
      "01:30 PM – Cultural Group Performances\n" +
      "02:15 PM – Crowd Games & Fun Contests\n" +
      "03:00 PM – Solo Singing & Instrumental\n" +
      "03:15 PM – Final Games Showdown\n" +
      "03:45 PM – Crowning of Mr. & Ms. Fresher '26 [Honours]\n" +
      "04:00 PM – Valedictory & Vote of Thanks\n" +
      "04:15 PM – Grand DJ Floor & Celebration [Finale]";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textSummary).then(() => {
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2400);
      });
    }
  };



  return (
    <section className="agenda-section" id="agenda-flow" aria-label="Official Freshers Day Agenda">
      <div className="section-container">
        {/* Curated Editorial Section Header */}
        <div className="agenda-master-header">
          <div className="agenda-eyebrow-pill">
            <span className="pill-dot">◆</span>
            <span>OFFICIAL ITINERARY · 30 OCTOBER 2026</span>
            <span className="pill-dot">◆</span>
          </div>

          <h2 className="agenda-master-title">
            Freshers Day Master Programme
          </h2>

          <p className="agenda-master-description">
            A comprehensive, artfully paced celebration sequence hosted at <strong>JRD Tata Hall</strong>.
            Spanning traditional blessings, batch spotlights, festive dining, and our jubilant DJ finale.
          </p>

          {/* Key Facts Summary Ribbon */}
          <div className="agenda-metrics-strip">
            <div className="metric-cell">
              <Clock size={15} className="metric-icon" />
              <div className="metric-text">
                <span className="metric-val">10:00 AM – 5:00 PM</span>
                <span className="metric-label">7 Full Hours of Festivity</span>
              </div>
            </div>

            <div className="metric-divider" aria-hidden="true" />

            <div className="metric-cell">
              <Layers size={15} className="metric-icon" />
              <div className="metric-text">
                <span className="metric-val">13 Curated Moments</span>
                <span className="metric-label">3 Signature Acts</span>
              </div>
            </div>

            <div className="metric-divider" aria-hidden="true" />

            <div className="metric-cell">
              <MapPin size={15} className="metric-icon" />
              <div className="metric-text">
                <span className="metric-val">JRD Tata Hall</span>
                <span className="metric-label">Srusti Academy, Bhubaneswar</span>
              </div>
            </div>
          </div>

          {/* Quick Calendar Export Utility Strip */}
          <div className="agenda-utility-toolbar">
            <button
              onClick={handleGoogleCalendar}
              className="agenda-tool-btn primary"
              title="Add TEJAS '26 Freshers Day to Google Calendar"
            >
              <CalendarPlus size={14} />
              <span>Add to Google Calendar</span>
            </button>

            <button
              onClick={handleDownloadIcs}
              className="agenda-tool-btn"
              title="Download standard iCal / Outlook .ics calendar event"
            >
              <Download size={14} />
              <span>Download iCal (.ics)</span>
            </button>

            <button
              onClick={handleCopySchedule}
              className="agenda-tool-btn"
              title="Copy complete text schedule to clipboard"
            >
              {copiedNotification ? <Check size={14} className="copied-icon" /> : <Clock size={14} />}
              <span>{copiedNotification ? 'Schedule Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Master Timeline Flow Container */}
        <div className="agenda-curated-timeline">
          {AGENDA_ITEMS.map((item, index) => {
            // Render Intermission Buffer Item
            if (item.isBuffer) {
              return (
                <div key={`buffer-${index}`} className="agenda-buffer-node" aria-hidden="true">
                  <div className="buffer-line" />
                  <div className="buffer-chip">
                    <span className="buffer-time">{item.time}</span>
                    <span className="buffer-sep">·</span>
                    <span className="buffer-label">{item.label}</span>
                  </div>
                  <div className="buffer-line" />
                </div>
              );
            }

            const Icon = item.icon;
            const isFlagship = item.isFlagship;
            const isExpanded = expandedItem === item.id;

            return (
              <article
                key={item.id}
                className={`agenda-card ${isFlagship ? 'is-flagship' : ''} ${item.isMajor ? 'is-major' : ''} type-${item.badgeType}`}
                onClick={() => toggleExpand(item.id)}
                tabIndex={0}
                role="button"
                aria-expanded={isExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
              >
                {/* Left Gilded Time Pillar */}
                <div className="agenda-card-sidebar">
                  <div className="time-badge-box">
                    <span className="time-primary">{item.time}</span>
                    <span className="duration-pill">{item.duration}</span>
                  </div>
                  <span className="act-tag-indicator">{item.actLabel}</span>
                </div>

                {/* Main Content Body */}
                <div className="agenda-card-main">
                  <div className="card-header-line">
                    <div className="category-and-flagship">
                      <span className={`agenda-badge badge-${item.badgeType}`}>
                        {item.category}
                      </span>
                      {isFlagship && (
                        <span className="flagship-crown-badge">
                          <Crown size={12} className="crown-icon" />
                          <span>{item.flagshipTag}</span>
                        </span>
                      )}
                    </div>

                    <div className="card-icon-halo" aria-hidden="true">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="card-event-title">
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <p className="card-event-subtitle">
                      {item.subtitle}
                    </p>
                  )}

                  <p className="card-event-description">
                    {item.desc}
                  </p>

                  {/* Curated Highlights Chips */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="card-highlights-row">
                      {item.highlights.map((h, hIdx) => (
                        <span key={hIdx} className="highlight-mini-chip">
                          <span className="mini-dot">✦</span>
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expandable Coordination Note */}
                  {isExpanded && (
                    <div className="card-expanded-drawer">
                      <div className="drawer-inner">
                        <span className="drawer-label">VENUE COORDINATION NOTE:</span>
                        <p className="drawer-text">
                          {item.id === 2 && "Traditional Odissi blessing troupe opens the stage. Attendees are kindly requested to be seated by 10:25 AM."}
                          {item.id === 4 && "Batch 2026–2028 representatives will be invited onto the dais. Keep cameras and phones ready for batch portraits!"}
                          {item.id === 6 && "Multi-course feast served at the campus dining arena. Vegetarian and regional Odia culinary specialties included."}
                          {item.id === 11 && "Official voting was completed during preliminary rounds. Royal sashes and commemorative trophies presented on center stage."}
                          {item.id === 13 && "Grand sound system with bass drops and club lighting. Open floor welcoming all juniors, seniors, and alumni!"}
                          {![2, 4, 6, 11, 13].includes(item.id) && "Organized by the Senior MCA Steering Committee in collaboration with faculty mentors at JRD Tata Hall."}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="card-footer-action">
                    <span className="expand-prompt">
                      {isExpanded ? 'Hide details' : 'View event notes'}
                    </span>
                    <ChevronRight size={13} className={`expand-chevron ${isExpanded ? 'is-rotated' : ''}`} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Elegant Notice & Protocol Signpost */}
        <div className="agenda-notice-capsule">
          <div className="capsule-icon" aria-hidden="true">
            <Compass size={18} />
          </div>
          <div className="capsule-content">
            <strong className="capsule-heading">Official MCA Steering Protocol</strong>
            <p className="capsule-text">
              Programme timings are aligned with official institutional guidelines for Srusti Academy of Management &amp; Technology.
              Natural 15–30 minute buffers ensure relaxed transitions between formal ceremonial proceedings and vibrant stage revelry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
