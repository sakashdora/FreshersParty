# TEJAS ’26 — The Fresh Bloom
### Official MCA Freshers Celebration & Digital Invitation Web Application
**Department of Computer Applications · Srusti Academy of Management & Technology, Bhubaneswar**

[![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Motion](https://img.shields.io/badge/Motion-14.2.0-F05340?logo=framer&logoColor=white)](https://motion.dev/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-2EA44F)](#)

---

## 🌸 About the Event

**TEJAS ’26 — The Fresh Bloom** is the ceremonial senior-junior welcome and induction celebration hosted by the senior cohort of the Department of Computer Applications for the incoming MCA batch (2026–2028).

- **1. Poster Reveal**: Wednesday, 28 October 2026 at 4:00 PM
- **2. Main Event — TEJAS 2026**: Friday, 30 October 2026 (11:40 AM – 5:00 PM)
  - **Reporting Time**: 11:40 AM
  - **Grand Fellowship Lunch**: 12:30 PM – 01:30 PM
  - **Stage Showcase & Fresher Titles**: 01:30 PM – 04:15 PM (Dance, singing, mimicry, comedy & Mr./Miss Fresher competitions; title awards announced after activities)
  - **Celebration Finale & DJ**: 04:15 PM – 05:00 PM
  - **Venue**: JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar

---

## 🏛️ Repository Architecture

The project has been structured into clean, modular layers separating active application components, styles, utilities, backend services, and structured documentation:

```
FreshersParty/
├── index.html                  # HTML5 entry point & Open Graph metadata
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite bundler configuration
├── THIRD_PARTY_NOTICES.md      # Open-source licenses & attributions
├── README.md                   # Repository guide & technical documentation
│
├── src/                        # Application source code
│   ├── main.jsx                # Application root & hero composition
│   ├── components/             # Active interactive UI components
│   │   ├── CinematicIntro.jsx  # Fullscreen editorial opening sequence
│   │   ├── InteractiveEnvelope.jsx # 3D interactive invitation centerpiece
│   │   ├── DressCodeEssentials.jsx # Dress code showcase & logistics pills
│   │   ├── AgendaSection.jsx   # Schedule flow & Google Calendar integration
│   │   └── ClosingSignOff.jsx  # Department hallmark & senior sign-off
│   │
│   ├── styles/                 # Master design system & component stylesheets
│   │   ├── styles.css          # Core design tokens, layout & reset rules
│   │   └── styles-v3.css       # Visual enhancements & component themes
│   │
│   ├── utils/                  # Shared helper libraries
│   │   └── audio.js            # Web Audio API synthesizer & sound effects
│   │
│   └── archive/                # Archived/inactive components & scripts
│       ├── components/         # Deprecated components preserved for reference
│       └── registration.js     # Standalone registration validation utility
│
├── public/                     # Public static assets
│   ├── audio/                  # Royalty-free procedural acoustic assets
│   ├── favicon.svg             # Application browser favicon
│   └── *.jpg / *.png           # Optimized photography & graphics
│
├── server/                     # Lightweight Node.js registration backend
│   ├── index.mjs               # Express/HTTP server entry
│   ├── export.mjs              # CSV/Excel export utility
│   └── registrations.mjs       # Registration data management
│
└── docs/                       # Comprehensive documentation & research
    ├── ai-generic-audit/       # Full 8-part UI/UX & design system audit
    │   ├── 00_AUDIT_SUMMARY.md
    │   ├── 01_FULL_WEBSITE_AUDIT.md
    │   ├── 02_COPYWRITING_AUDIT.md
    │   ├── 03_ENVELOPE_AND_INVITATION_AUDIT.md
    │   ├── 04_DESIGN_SYSTEM_AND_ASSET_AUDIT.md
    │   ├── 05_REMEDIATION_BLUEPRINT.md
    │   ├── 06_QA_AND_REGRESSION_CHECKLIST.md
    │   └── 07_EVIDENCE_REGISTER.md
    ├── design/                 # Design specs, creative direction & tokens
    ├── planning/               # Implementation roadmaps & decision matrices
    └── archive/                # Historical mockups & legacy assets
```

---

## 💻 Tech Stack & Dependencies

- **Framework**: [React 18.3](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Animation Choreography**: [Motion 14](https://motion.dev/) (declarative spring physics and state variants)
- **Acoustic Engineering**: Procedural Web Audio API sound synthesis with HTML5 Audio fallback
- **Typography**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (Display Serif) + [Outfit](https://fonts.google.com/specimen/Outfit) (Body & UI Sans)
- **Micro-Interactions**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) calibrated to gold/wine palette
- **Iconography**: [lucide-react](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0+ or 20.0+
- npm 9.0+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/tejas-2026.git
cd FreshersParty

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be running at `http://localhost:5173`.

### Useful URL Query Parameters
- `?nointro`: Bypasses the cinematic overture directly to the invitation hero.
- `?intro`: Forces replay of the cinematic intro regardless of session storage.
- `?opened=1`: Automatically mounts the 3D envelope in the unfolded state.

### Production Build & Verification

```bash
# Compile and bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License & Attribution

Crafted with dedication by the MCA Senior Cohort (Batch 2025–2027) for our incoming juniors.  
For third-party software licenses and asset attributions, see [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
