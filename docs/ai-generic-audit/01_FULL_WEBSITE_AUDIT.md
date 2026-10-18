# TEJAS ’26 — THE FRESH BLOOM
## Evidence-Based AI-Generic Design Audit & Remediation Blueprint
### Document 01: Full Website Section-by-Section Audit

---

### 1. SECTION INVENTORY & INSPECTION STATUS

| Section / Component | Source File(s) | Desktop (1440px) | Mobile (390px) | Small Mobile (360px) | Inspection Status |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Document Head & Metadata** | `index.html` | Inspected | Inspected | Inspected | Fully Audited |
| **Cinematic Intro Overture** | `CinematicIntro.jsx`, `utils/audio.js` | Tested | Tested | Tested | Fully Audited (Gate, Audio, Skip) |
| **Sticky Navigation Bar** | `src/main.jsx:91-125` | Tested | Tested | Tested | Fully Audited (Scroll trigger, Tap) |
| **Mobile Hamburger Drawer** | `src/main.jsx:130-167` | N/A | Tested | Tested | Fully Audited (Slide-down, Links) |
| **Master Hero & Identity** | `src/main.jsx:128-253` | Tested | Tested | Tested | Fully Audited (SVGs, 4 Pillars, CTA) |
| **3D Interactive Envelope** | `InteractiveEnvelope.jsx` | Tested | Tested | Tested | Fully Audited (Sealed, 3D tilt, Opened) |
| **Unfolded Invitation Card** | `InteractiveEnvelope.jsx:337-440` | Tested | Tested | Tested | Fully Audited (Typography, Buttons) |
| **Dress Code & Essentials** | `DressCodeEssentials.jsx` | Tested | Tested | Tested | Fully Audited (4 Cards, 4 Pills) |
| **Confluence Agenda** | `AgendaSection.jsx` | Tested | Tested | Tested | Fully Audited (4 Rows, Google Cal) |
| **Closing Sign-Off & Footer**| `ClosingSignOff.jsx` | Tested | Tested | Tested | Fully Audited (Hallmark, Attributions) |
| **Milestones Section** | `MilestonesSection.jsx` | Not in DOM | Not in DOM | Not in DOM | Orphaned Code Audited |
| **Celebration Cheers** | `CelebrationCheers.jsx` | Not in DOM | Not in DOM | Not in DOM | Orphaned Code Audited |
| **Visual Gallery** | `VisualGallery.jsx` | Not in DOM | Not in DOM | Not in DOM | Orphaned Code Audited |
| **Registration Logic** | `src/registration.js` | Not in DOM | Not in DOM | Not in DOM | Dead Code Audited |

---

### 2. SECTION-BY-SECTION DETAILED FINDINGS

```
FINDING TAXONOMY:
- P0: Critical functional defect, severe accessibility violation, or blocking content falsehood.
- P1: Prominent AI-generic aesthetic trope, major CSS duplication, or visual breakage.
- P2: Secondary UI polish, contrast edge-case, or touch ergonomic friction.
- P3: Minor cleanup, unused asset purge, or syntactic enhancement.
```

---

#### SECTION 1: Document Head, Meta Tags & SEO (`index.html`)

##### Finding META-01 (Priority: P0 · Confidence: Confirmed)
- **Component / File**: `index.html:20-26`
- **Evidence**:
  ```html
  <meta property="og:url" content="[PUBLIC URL]" />
  <meta property="og:image" content="[PUBLIC URL]/og-image.jpg" />
  <meta name="twitter:image" content="[PUBLIC URL]/og-image.jpg" />
  ```
- **Current Behavior**: Raw string `[PUBLIC URL]` is embedded in production HTML. In addition, no `og-image.jpg` exists in the `/public` directory.
- **Why it is Weak**: Classic AI template scaffold leftover. Unrendered placeholder text destroys Open Graph cards on WhatsApp, iMessage, Instagram, and LinkedIn.
- **Recommended Correction**:
  - Replace `[PUBLIC URL]` with the production base URL (or relative path if hosted on standard domain).
  - Generate an authentic 1200×630px social share banner featuring "TEJAS '26 — The Fresh Bloom · Department of MCA, Srusti Academy" and place it at `/public/og-image.jpg`.
- **Expected Benefit**: Rich, professional previews when invitation links are circulated in student WhatsApp groups.

##### Finding META-02 (Priority: P0 · Confidence: Confirmed)
- **Component / File**: `index.html:7, 31` vs `InteractiveEnvelope.jsx:381`
- **Evidence**:
  - `index.html:7`: `<meta name="description" content="... 10:30 onwards." />`
  - `index.html:31`: `<noscript>... 10:30 onwards. ...</noscript>`
  - `InteractiveEnvelope.jsx:381`: `"celebrations from 11:40 AM to 5:00 PM."`
- **Current Behavior**: Search engine snippets and noscript fallbacks state the event starts at 10:30 AM, while the main invitation specifies 11:40 AM reporting time.
- **Why it is Weak**: Factual contradiction originating from uncoordinated AI prompt revisions.
- **Recommended Correction**: Update `index.html` description and noscript text to: `"Reporting 11:40 AM · Inauguration & Confluence 11:40 AM to 5:00 PM · JRD Tata Hall."`
- **Expected Benefit**: Eliminates attendee confusion and schedule mismatches.

---

#### SECTION 2: Cinematic Intro Gate & Audio Overture (`CinematicIntro.jsx`)

##### Finding INTRO-01 (Priority: P0 · Confidence: Confirmed)
- **Component / File**: `CinematicIntro.jsx:25, 52-59`
- **Evidence**:
  ```javascript
  const CUES = {
    ...
    SKIP_THRESHOLD: 10.0, // Mandatory skip threshold: Skip control becomes available
    ...
  };
  // Escape key handler:
  if (e.key === 'Escape' && introState === 'PLAYING') {
    if (milestoneRef.current >= 10 || audioFailed) {
      handleFinish();
    }
  }
  ```
- **Current Behavior**: Users cannot skip or close the intro until 10 full seconds have elapsed. The `<kbd>Esc</kbd>` key is actively intercepted and suppressed.
- **Why it is Weak**: Severe WCAG 2.2.2 (Pause, Stop, Hide) and 2.1.1 (Keyboard operability) violation. Forcing users to endure a 10-second animation before letting them see the invitation is hostile UX typical of self-indulgent AI demo scripts.
- **Recommended Correction**:
  - Show a clearly visible "Skip to Invitation [Esc]" button from timestamp 0.0s.
  - Allow immediate exit on `Escape` keypress or background tap at any point.
- **Expected Benefit**: Respects user autonomy, saves cellular bandwidth, and passes accessibility compliance.

##### Finding INTRO-02 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `CinematicIntro.jsx:8-12`, `utils/audio.js`
- **Evidence**: Dual audio synthesis logic combining an external MP3 (`/audio/tejas_overture_master.mp3`) with Web Audio API synthesizer oscillators (`playMasterSoundtrack`).
- **Current Behavior**: On mobile browsers with strict autoplay policies, if the user interacts slightly off-center, audio fails or desynchronizes from the visual letter reveal milestones (`CUES.HIT_1_T` at 2.25s, etc.).
- **Why it is Weak**: Over-engineered kinetic typography synced to sub-second audio cues. If audio stalls on slow 4G, animations wait or hitch.
- **Recommended Correction**: Decouple visual progression from audio clock so visual animations run smoothly via CSS/RAF independently of audio loading state.

---

#### SECTION 3: Sticky Navigation & Mobile Menu (`main.jsx`)

##### Finding NAV-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `src/main.jsx:91-125`, `styles-v3.css:67-128`
- **Evidence**:
  ```jsx
  <div className="sticky-nav-links">
    <a href="#invitation-envelope" onClick={() => playMicroTap()}>Invitation</a>
    <a href="#dress-code-essentials" onClick={() => playMicroTap()}>Dress &amp; Essentials</a>
    <a href="#agenda-flow" onClick={() => playMicroTap()}>The Confluence</a>
  </div>
  ```
- **Current Behavior**: On viewports between 641px and 860px (tablets / foldable screens), the sticky navbar links wrap onto multiple lines or overflow horizontally off-screen because flex layout has no wrapping constraints.
- **Why it is Weak**: Breakpoint gap in responsive design. Desktop layout assumes >1024px; mobile drawer kicks in only at <=640px.
- **Recommended Correction**: Raise mobile drawer trigger breakpoint to `768px` or `840px`, and set `overflow-x: auto` on `.sticky-nav-inner` with scroll snapping.
- **Expected Benefit**: Seamless navigation across iPad mini, tablets, and landscape phones.

##### Finding NAV-02 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `src/main.jsx:139-166`
- **Evidence**: Hamburger menu toggle button `.hero-menu-toggle-btn` has `aria-expanded={mobileMenuOpen}`, but the `.hero-menu-drawer` does not have `aria-modal="true"`, does not trap keyboard focus when open, and does not close on `Escape`.
- **Current Behavior**: Screen reader users navigating past the open menu continue into the background hero while the drawer remains visually on top.
- **Why it is Weak**: Incomplete accessibility implementation of a mobile overlay pattern.
- **Recommended Correction**: Add an `Escape` key listener, `aria-modal="true"`, and focus management to the drawer.
- **Expected Benefit**: WCAG 2.4.3 (Focus Order) compliance.

---

#### SECTION 4: Master Grand Hero & Identity Cluster (`main.jsx`)

##### Finding HERO-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `src/main.jsx:212-233`
- **Evidence**:
  ```jsx
  <div className="hero-pillars-bar" role="list">
    <div className="hero-pillar-item"><Users size={16} /><span>NEW BEGINNINGS</span></div>
    <div className="hero-pillar-item"><Sprout size={16} /><span>BRIGHTER BONDS</span></div>
    <div className="hero-pillar-item"><Star size={16} /><span>MEMORIES AHEAD</span></div>
    <div className="hero-pillar-item"><Infinity size={16} /><span>A JOURNEY TOGETHER</span></div>
  </div>
  ```
- **Current Behavior**: Four generic capsule pills with SaaS landing-page iconography (Users, Sprout, Star, Infinity) float underneath the hero title.
- **Why it is Weak**: Quintessential AI-generic "feature bar" pattern. It mimics a B2B SaaS product highlighting "Scalability / Security / Performance", adding zero event-specific substance for college students.
- **Recommended Correction**:
  Replace this artificial SaaS feature bar with **Event Quick-Facts**:
  - `📅 Wednesday, 28 October 2026`
  - `📍 JRD Tata Hall, Campus`
  - `⏰ 11:40 AM to 5:00 PM`
  - `🍽️ Grand Fellowship Lunch`
- **Expected Benefit**: Delivers instant, valuable logistical information at the exact point of highest user attention.

##### Finding HERO-02 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `src/main.jsx:170-184`
- **Evidence**:
  ```jsx
  <div className="hero-convergence-lines" aria-hidden="true">
    <svg viewBox="0 0 1000 400" fill="none"> ... </svg>
  </div>
  ```
- **Current Behavior**: Concentric dashed orbital circles and hairline vectors labeled "celestial convergence lines" sit behind the title.
- **Why it is Weak**: Faux-astrological / crypto-tech aesthetic that clashes with the organic "Fresh Bloom" floral theme and Odissi cultural identity of Odisha.
- **Recommended Correction**: Subsume or replace celestial geometry with subtle, authentic Odissi filigree motifs (Choti / Sambalpuri geometric hairline accents or organic botanical curves).
- **Expected Benefit**: Cultural authenticity and thematic cohesion with the "Fresh Bloom" identity.

---

#### SECTION 5: 3D Interactive Envelope Centerpiece (`InteractiveEnvelope.jsx`)

##### Finding ENV-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:196-282`
- **Evidence**: Two massive SVG laurel branches (`.env-flank-laurel`) flanking the envelope with 14 individual leaves each, multiple linear gradients (`laurelStemGradL`, `laurelLeafGradL`), and heavy SVG filter drop shadows (`#laurelBranchShadow`).
- **Current Behavior**: Flanking golden laurel wreaths frame the envelope on desktop. On mobile, they are hidden or clipped abruptly.
- **Why it is Weak**: Overdone Roman imperial aesthetic straight out of an AI prompt for "ultra-luxury royal gala". Creates visual clutter, adds 90+ DOM elements, and bears no cultural or academic relevance to an MCA department.
- **Recommended Correction**: Remove or replace the heavy imperial laurel branches with subtle, warm marigold or lotus petal motifs, or clean minimal card framing.
- **Expected Benefit**: Reduces visual noise, lowers GPU composite load, and aligns with authentic Indian celebration aesthetics.

##### Finding ENV-02 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:483-566`
- **Evidence**: Wax seal SVG with 10 concentric circles, dotted rings, circular laurel wreath, and a 10-point faceted star medallion with 7 nested polygon highlights.
- **Current Behavior**: An extraordinarily complex 3D faux-wax medallion sits at the center flap.
- **Why it is Weak**: AI-generated visual hyper-inflation. The medallion attempts to combine a European wax seal, a Soviet marshal star, and Roman laurel leaves simultaneously.
- **Recommended Correction**: Streamline the seal into a clean, refined wax seal featuring the **Tejas lotus blossom** or an embossed collegiate monogram "T".
- **Expected Benefit**: Cohesive iconography matching the lotus divider in the hero.

##### Finding ENV-03 (Priority: P0 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:136, 337-440`
- **Evidence**:
  ```javascript
  const cardV = {
    opening: { y: isMobile ? -290 : -410, opacity: 1, scale: 1 },
    revealed: { y: isMobile ? -290 : -410, opacity: 1, scale: 1 },
  };
  ```
- **Current Behavior**: On viewports with heights under 750px (e.g. mobile browsers with keyboard open or small screens 360×740px), translating the card by `-290px` pushes the top of the card completely off the top of the viewport or underneath sticky navigation, while the bottom buttons disappear below the fold.
- **Why it is Weak**: Hardcoded pixel translation assumes an idealized screen height.
- **Recommended Correction**: Use dynamic responsive positioning or modal expansion on mobile where the card takes `max-height: 85vh` and centers itself smoothly in view upon opening.
- **Expected Benefit**: 100% legibility across all phone sizes without clipping or awkward scrolling.

##### Finding ENV-04 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:188-192`
- **Evidence**: Envelope chassis has `tabIndex={isSealed ? 0 : -1}`, `role="button"`, and handles `Enter`/`Space`. However, when opened, focus is not shifted into the card or the `Fold Back` button.
- **Current Behavior**: Keyboard users pressing Enter to open the envelope lose focus into the ether because the chassis switches to `tabIndex={-1}`.
- **Why it is Weak**: Keyboard focus drop defect.
- **Recommended Correction**: Programmatically shift focus to the opened card's `.card-reseal-btn` or the main salutation heading using `ref.current.focus()` upon transition to `revealed`.
- **Expected Benefit**: Smooth, accessible keyboard flow.

---

#### SECTION 6: Unfolded Junior Invitation Card (`InteractiveEnvelope.jsx:343-440`)

##### Finding CARD-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:377-386`
- **Evidence**:
  ```jsx
  <div className="card-body-text">
    <p className="card-salutation">Dear Juniors,</p>
    <p>
      A new chapter begins, and we cannot wait to welcome you into the MCA family.
      On <strong>28 October 2026</strong>, join us for <strong>The Senior-Junior Confluence</strong> — featuring batch icebreakers, delicious lunch at <strong>12:30 PM</strong>, the crowning of <strong>Mr. &amp; Mrs. Fresher</strong>, and celebrations from <strong>11:40 AM to 5:00 PM</strong>.
    </p>
    <p className="card-quote">
      "Let us make this beginning unforgettable, together."
    </p>
  </div>
  ```
- **Current Behavior**: Cramming the entire event itinerary, lunch timing, and contest details into a single dense 4-line paragraph on parchment paper.
- **Why it is Weak**: Poor editorial hierarchy. An invitation card should deliver emotional resonance and clear, scannable core details, not a dense run-on sentence.
- **Recommended Correction**:
  - Restructure into:
    1. Warm personal welcome from the senior batch.
    2. Elegant, highlighted Event Badge (Date, Venue, Reporting Time).
    3. Warm invitation to share lunch and celebrate.
- **Expected Benefit**: Instant visual clarity and genuine personal warmth.

##### Finding CARD-02 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `InteractiveEnvelope.jsx:427-437`
- **Evidence**: Button labeled `"Cheer for us"` with a Heart icon triggers confetti.
- **Current Behavior**: Juniors reading their invitation are asked to "Cheer for us" (the seniors).
- **Why it is Weak**: Awkward perspective reversal. A freshers invitation is hosted by seniors *for* juniors. Asking the guests to "cheer for us" sounds bizarre.
- **Recommended Correction**: Change button label to `"Send Love to Seniors"` or `"Celebrate with Us"` or `"Can't Wait! 🎉"`.
- **Expected Benefit**: Natural, heartwarming emotional tone.

---

#### SECTION 7: Dress Code & Event Essentials (`DressCodeEssentials.jsx`)

##### Finding DRESS-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `DressCodeEssentials.jsx:6-31`, `styles-v3.css:320-410`
- **Evidence**:
  - Junior Boys: `White Shirts & Blue Jeans`
  - Junior Girls: `Anarkali`
  - Senior Boys: `Kurta`
  - Senior Girls: `Saree`
  Images used: `/dress_junior_boy.jpg`, `/dress_junior_girl.jpg`, `/dress_senior_boy.jpg`, `/dress_senior_girl_v2.jpg`.
- **Current Behavior**: Four portrait cards with stock AI/editorial photographs.
- **Why it is Weak**: The photographs have disparate lighting, aspect ratios, and visual styles. The contrast between AI-generated studio portraits and casual Indian campus dress expectations can be jarring.
- **Recommended Correction**:
  - Unify card aspect ratios (e.g. consistent 4:5 or 3:4 portrait crops).
  - Add supportive styling advice (e.g., "Comfortable ethnic wear", "Footwear suitable for stage & dance").
  - Add subtle badge tags indicating "Juniors (Guests of Honour)" vs "Seniors (Hosts)".
- **Expected Benefit**: Clear, practical guidance for new students anxious about what to wear.

##### Finding DRESS-02 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `DressCodeEssentials.jsx:66-96`
- **Evidence**: Intricate SVG golden corner filigrees with cubic bezier curves and radial stops placed at corners.
- **Current Behavior**: Decorative vectors float at the top corners of the section. On mobile, they overlap with section titles or cause horizontal scroll overflow.
- **Why it is Weak**: Ad-hoc decorative SVGs without responsive scaling rules.
- **Recommended Correction**: Set `pointer-events: none`, `max-width: 80px`, and hide or scale down gracefully on screens `<640px`.
- **Expected Benefit**: Prevents layout shift and horizontal scrollbar leakage.

---

#### SECTION 8: Senior-Junior Confluence Agenda (`AgendaSection.jsx`)

##### Finding AGENDA-01 (Priority: P0 · Confidence: Confirmed)
- **Component / File**: `AgendaSection.jsx:74-75`
- **Evidence**:
  ```javascript
  const dates = "20261028T061000Z/20261028T113000Z";
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`, '_blank');
  ```
- **Current Behavior**: Google Calendar URL uses UTC timestamps without an explicit timezone parameter `&ctz=Asia/Kolkata`.
- **Why it is Weak**: If a student opens this link on a device configured with international sync, Google Calendar converts `061000Z` to their local computer clock, causing incorrect calendar entries.
- **Recommended Correction**: Append `&ctz=Asia/Kolkata` to the Google Calendar URL and provide an `.ics` download option for Apple Calendar / Outlook users.
- **Expected Benefit**: Reliable calendar scheduling for all attendees.

##### Finding AGENDA-02 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `AgendaSection.jsx:10-57`
- **Evidence**:
  - Event 1: `THE SENIOR-JUNIOR CONFLUENCE` (11:40 AM – 12:30 PM, 50 MIN)
  - Event 2: `GRAND FELLOWSHIP LUNCH` (12:30 PM – 01:30 PM, 60 MIN)
  - Event 3: `MR. & MRS. FRESHER ’26` (01:30 PM – 04:15 PM, 2 HR 45 MIN)
  - Event 4: `CELEBRATION FINALE & OPEN DJ FLOOR` (04:15 PM – 05:00 PM, 45 MIN)
- **Current Behavior**: Uses repetitive terminology ("Confluence", "Fellowship Feast", "Premier Honours & Accolades").
- **Why it is Weak**: Inflated corporate vocabulary instead of exciting college freshers activities.
- **Recommended Correction**: Modernize copywriting:
  - Event 1: "Warm Welcome & Icebreaker Games"
  - Event 2: "Fellowship Lunch Buffet"
  - Event 3: "Mr. & Mrs. Fresher Talent & Ramp Walk"
  - Event 4: "DJ Night & Celebration Dance"
- **Expected Benefit**: Resonates directly with post-grad student culture.

---

#### SECTION 9: Closing Sign-Off & Footer (`ClosingSignOff.jsx`)

##### Finding FOOTER-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**: `ClosingSignOff.jsx:18-25`
- **Evidence**:
  ```jsx
  <div className="crest-insignia-pill" aria-hidden="true">
    <span className="crest-star">◆</span>
    <span className="crest-cohort">TEJAS ’26</span>
    <span className="crest-sep">·</span>
    <span className="crest-sub">THE FRESH BLOOM</span>
    <span className="crest-star">◆</span>
  </div>
  ```
- **Current Behavior**: Repeated "crest insignia pill" with diamond glyphs `◆` right above creator credits.
- **Why it is Weak**: Redundant branding repetition. The event name has already appeared in the sticky nav, hero, envelope, card, and timeline.
- **Recommended Correction**: Replace with an inspiring closing motto or an institutional sign-off from the Department of Computer Applications.
- **Expected Benefit**: Authentic academic closure.

##### Finding FOOTER-02 (Priority: P2 · Confidence: Confirmed)
- **Component / File**: `ClosingSignOff.jsx:37-47`
- **Evidence**:
  ```jsx
  <div className="creator-badge true-inspire">
    <span className="badge-shine" aria-hidden="true" />
    <span className="creator-text">True Inspire</span>
  </div>
  <span className="creator-ampersand">&amp;</span>
  <div className="creator-badge tejas-team">
    <span className="badge-shine" aria-hidden="true" />
    <span className="creator-text">Tejas The Fresh Bloom Team</span>
  </div>
  ```
- **Current Behavior**: Shimmering pseudo-luxury gradient badges with animated shine overlays (`.badge-shine`).
- **Why it is Weak**: AI-generic CSS animation overload. A subtle, elegant student credit is far more dignified than animated neon-sheen badges.
- **Recommended Correction**: Restyle into a clean, respectful typographic credit line: `"Crafted with pride by MCA Batch 2025–2027 in honour of our incoming juniors."`
- **Expected Benefit**: Sincere senior-to-junior dedication.

---

#### SECTION 10: Orphaned Components & Dead Code

##### Finding ORPH-01 (Priority: P1 · Confidence: Confirmed)
- **Component / File**:
  - `src/components/MilestonesSection.jsx` (91 lines, 4.1 KB)
  - `src/components/CelebrationCheers.jsx` (174 lines, 7.0 KB)
  - `src/components/VisualGallery.jsx` (230 lines, 10.0 KB)
  - `src/registration.js` (13 lines, 795 B)
- **Evidence**: Confirmed via codebase grep that none of these 4 files are imported by `main.jsx` or any active component.
- **Current Behavior**: Over 500 lines of component code and associated CSS in `styles.css`/`styles-v3.css` reside in the repository as dead weight.
- **Why it is Weak**: Bloats repository size, creates confusion for collaborating developers, and contains conflicting event dates (`MilestonesSection` has `30 OCTOBER 2026`).
- **Recommended Correction**:
  - Archive these unused files into `src/archive/` or delete them cleanly if unneeded.
  - Remove all associated unused CSS rules from the unified stylesheet.
- **Expected Benefit**: Clean codebase architecture, zero confusion about active features.

---

### 3. CONFIDENCE MATRIX

| Finding ID | Area | Severity | Confidence | Verification Mechanism |
| :--- | :--- | :---: | :---: | :--- |
| **META-01** | Open Graph Head | P0 | Confirmed | Inspected `index.html:20-26` source |
| **META-02** | Description Mismatch | P0 | Confirmed | Compared `index.html` with active components |
| **INTRO-01**| 10s Hostage Gate | P0 | Confirmed | Tested live keyboard `Escape` in browser subagent |
| **INTRO-02**| Audio Clock Sync | P1 | Confirmed | Inspected RAF loop and cue threshold logic |
| **NAV-01**  | Tablet Nav Wrap | P1 | Confirmed | Tested viewport resizing between 640px and 860px |
| **NAV-02**  | Drawer A11y | P2 | Confirmed | Verified lack of `aria-modal` and focus trap |
| **HERO-01** | 4 SaaS Feature Pills | P1 | Confirmed | Inspected `main.jsx:212-233` and DOM rendering |
| **HERO-02** | Celestial Orbit SVG | P2 | Confirmed | Inspected `hero-convergence-lines` SVG markup |
| **ENV-01**  | Heavy Laurel Wreaths | P1 | Confirmed | Analyzed SVG filters and DOM node density |
| **ENV-02**  | Soviet/Roman Wax Seal| P1 | Confirmed | Inspected `InteractiveEnvelope.jsx:483-566` |
| **ENV-03**  | Mobile Card Overflow | P0 | Confirmed | Tested 360×740px viewport rendering artifact |
| **ENV-04**  | Envelope Focus Drop | P2 | Confirmed | Tested Tab/Enter interaction sequence |
| **CARD-01** | Card Copy Clutter | P1 | Confirmed | Analyzed card typography hierarchy |
| **CARD-02** | "Cheer for Us" Reversal| P2 | Confirmed | Evaluated invitation perspective semantics |
| **DRESS-01**| Inconsistent Photos | P1 | Confirmed | Inspected `/public/dress_*.jpg` assets |
| **DRESS-02**| SVG Filigree Overflow | P2 | Confirmed | Tested mobile horizontal scrollbar leakage |
| **AGENDA-01**| Google Cal UTC Time | P0 | Confirmed | Tested calendar generation link parameters |
| **AGENDA-02**| Jargon Schedule Copy | P1 | Confirmed | Inspected timeline titles and descriptions |
| **FOOTER-01**| Redundant Insignia | P1 | Confirmed | Inspected footer DOM and visual artifact |
| **FOOTER-02**| Neon Shine Badges | P2 | Confirmed | Inspected `.badge-shine` CSS keyframe animations |
| **ORPH-01** | 4 Dead Code Files | P1 | Confirmed | Executed project-wide import grep search |
