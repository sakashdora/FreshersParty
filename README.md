# TEJAS ’26 — The Fresh Bloom
**Senior Creative Studio Digital Invitation & Agenda Experience**

The official digital invitation for the incoming MCA batch (2026–2028) at **Srusti Academy of Management & Technology**, JRD Tata Hall.

- **Event:** TEJAS ’26
- **Tagline:** The Fresh Bloom
- **Organized by:** Department of MCA, Srusti Academy of Management & Technology
- **Milestone 1:** The Name Reveal & Flex Drop — **27 October 2026**
- **Milestone 2 (Main Event):** Freshers Day Celebration — **30 October 2026**
- **Arrival:** 10:00 AM – 10:30 AM
- **Main Programme Start:** 10:30 AM onwards
- **Venue:** JRD Tata Hall, Srusti Academy of Management & Technology, Bhubaneswar

---

## Technical Stack & Libraries

- **Framework:** React 18 + Vite 6
- **Animation & Transitions:** `motion` (Motion for React) for choreographing entrances and layout transitions
- **Celebration Confetti:** `canvas-confetti` customized with the brand palette
- **Authentic Audio Design:** Mixkit royalty-free audio files (`cinematic-swell.mp3`, `cinematic-reveal.mp3`, `paper-rustle.mp3`) with graceful browser autoplay handling
- **Typography:** `Fraunces` (Google Fonts Display Serif) + `Outfit` (Google Fonts Humanist Grotesque)
- **Iconography:** `lucide-react`

---

## Architectural Highlights

1. **Dedicated 5–6s Fullscreen Cinematic Opening Sequence:**
   - Deep wine (`#4A1027`) backdrop with radiant convergence rays.
   - Dual-ribbon convergence animation (sky blue `#8CCFE8` and soft pink `#F0C2D0`) meeting at the center monogram seal.
   - Kinetic Fraunces title sequence and prominent, accessible **Skip Intro** control.
   - Stored in `sessionStorage` (`sangama_intro_v3_seen`) to prevent repetitive replays, with a manual **Replay Opening** chip.
   - Automatically bypassed if `prefers-reduced-motion` is active.

2. **Fixed Experience Intro Audio (No UI Mute Clutter):**
   - Seamlessly plays the soft opening swell and reveal chime on start.
   - No unnecessary mute/unmute buttons or sound settings panels.
   - Graceful fallback for strict browser autoplay policies.
   - Immediate audio shutdown on skip.

3. **Convincing 3D Interactive Envelope Centerpiece:**
   - Physical layered paper construction with 3D perspective (`perspective: 1200px`).
   - Outer back pocket, cream lining with soft pink inlays, side and bottom flaps with realistic drop shadows.
   - Triangular 3D flap that unfolds upward (`rotateX(-175deg)`).
   - Sky-blue satin ribbon and warm red/gold wax seal bearing the dual-arc "S" monogram.
   - Authentic paper rustle audio effect when opened.
   - Instant brand palette confetti burst upon opening (`#701C36`, `#8CCFE8`, `#F0C2D0`, `#B83B4B`, `#F8F3EC`).
   - Fully accessible with keyboard support (<kbd>Space</kbd> / <kbd>Enter</kbd> / <kbd>Esc</kbd>) and direct toggle.

4. **Official Invitation Letter From MCA Seniors:**
   - Exact approved copy from the Department of MCA seniors inviting juniors to Freshers Day on **30 October 2026**.
   - Event coordinates: 30 October 2026, 10:30 AM Onwards (Arrival 10:00–10:30 AM), JRD Tata Hall.

5. **Two Distinct Celebration Milestones:**
   - **27 October 2026:** The Name Reveal & Flex Drop — *“The name is unveiled. The celebration begins.”*
   - **30 October 2026:** SANGAMA ’26 Freshers Day — *“Where New Journeys Meet.”*

6. **Complete 13-Session Freshers Day Agenda:**
   - 10:00 AM – 10:30 AM: Arrival
   - 10:30 AM – 10:45 AM: Inaugural Ceremony (lamp lighting and Odissi dance)
   - 10:45 AM – 11:15 AM: Welcome Speeches
   - 11:45 AM – 12:00 PM: Introduction of Freshers
   - 12:00 PM – 12:45 PM: Icebreakers or Fun Games
   - 12:45 PM – 1:15 PM: Lunch Break
   - 1:30 PM – 2:15 PM: Group Performances
   - 2:15 PM – 3:00 PM: Games
   - 3:00 PM – 3:15 PM: Solo Performances
   - 3:15 PM – 3:45 PM: Games
   - 3:45 PM – 4:00 PM: Freshers Title Announcement
   - 4:00 PM – 4:15 PM: Vote of Thanks
   - 4:15 PM – 5:00 PM: DJ & Open Floor Celebration
   - Preserves natural buffer intervals (11:15–11:45 AM and 1:15–1:30 PM) without invented items. Includes a "Key Highlights" filter.

7. **Campus Spirit Visual Gallery:**
   - Art-directed celebration video player loop (`crowd-cheering.mp4`), editorial student camaraderie photo (`freshers-editorial.png`), Odissi cultural card, and tech builders card.

8. **Cleaned Up Experience:**
   - Removed conventional navigation bar.
   - Removed FAQ section.
   - Removed cluttered footer (replaced with minimal warm department sign-off).
   - Removed ticket generation, forms, and keepsake downloads.

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # verifies production bundle
npm run preview    # preview production build
```
