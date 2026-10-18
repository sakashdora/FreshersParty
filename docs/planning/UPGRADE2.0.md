# UPGRADE 2.0 — SANGAMA '26 Master Specification (Version 2)
## "Where New Journeys Meet" — Premium Event Invitation Website
**Version:** 2.0 | **Date:** October 14, 2026 | **Creative Direction:** Concept B — Two Lines Meet | **Status:** Awaiting Stakeholder Approval

---

> [!IMPORTANT]
> This is a specification and planning document only. No application source code has been modified during its creation. Implementation must not begin until this document is explicitly approved. Supersedes Version 1.

---

## Table of Contents

1. Executive Summary
2. Existing-State Assessment
3. Product Goals and Non-Goals
4. Confirmed Information and Open Questions
5. Creative Concept — "Two Lines Meet"
6. Brand and Visual Direction
7. Experience Architecture
8. Component Visual Specifications
9. Envelope and Letter Interaction — Full Specification
10. Motion Language
11. Micro-Interaction System
12. Responsive Behaviour Matrix
13. Accessibility Requirements
14. Technical Implementation Plan
15. Performance and Reliability Plan
16. Content and Asset Manifest
17. SEO, Sharing, and Privacy
18. Implementation Roadmap
19. File-Level Change Plan
20. Testing and Quality Assurance
21. Acceptance Criteria
22. Risk Register
23. Decisions Log and Release Checklist

---

## 1. Executive Summary

### The Transformation

The existing project is a Vite + React SPA named "Nirvahan — The Freshers Party", built around a printed-paper scrapbook aesthetic. It is functional, accessible, and technically solid. Its accessible patterns, countdown logic, calendar exporter, and keepsake generator are preserved.

The upgrade transforms it into **SANGAMA '26 — "Where New Journeys Meet"**: a focused, mobile-first invitation experience for MCA Technical students at Srusti Academy of Management & Technology, JRD Tata Hall.

### The Creative Concept — "Two Lines Meet"

SANGAMA is a Sanskrit word for confluence: two rivers meeting. The entire visual language derives from this idea. In the hero, two fine editorial lines converge at the left margin of the event title — a compositional mark that says "this is where things meet." The ribbon on the envelope is two strands that cross and tie. The wax seal monogram is formed by two arcs curving toward each other. Section transitions use convergent line pairs.

This concept is not applied arbitrarily. Every time the convergence motif appears, it is because the design is expressing something that is already true about SANGAMA '26.

### Typography

**Fraunces** (variable, display) and **Outfit** (variable, body and UI). The tension between Fraunces's warm literary curves and Outfit's clean geometric construction is the character of SANGAMA '26: old knowledge, new journeys.

### Colour Narrative

The palette moves through three emotional temperatures across the visitor's journey:
- **Before opening** — warm neutral page, cool wine-red sealed envelope, dusty sky ribbon, champagne seal
- **Reading the letter** — warmest moment; cream paper, near-black ink
- **Completing the visit** — return to quiet warm neutral; footer in deep burgundy as a grounded close

### Success Criteria

- Every MCA student understands the event identity and essential confirmed details within 30 seconds.
- The envelope opens on first tap, on mobile, on the first visit, with no coaching beyond a single line of instruction.
- The experience functions — and is readable — with motion disabled, audio blocked, or JavaScript unavailable.
- Production build: zero console errors, no horizontal overflow at 360 px, LCP ≤ 2.5 s on mobile simulation.

---

## 2. Existing-State Assessment

### Framework and Architecture (Verified)

| Property | Verified Value |
| :--- | :--- |
| Framework | React 18.3.1 |
| Build tool | Vite 6.0.5 with `@vitejs/plugin-react` 4.3.4 |
| Styling | Vanilla CSS, `src/styles.css` (268 lines) |
| Icons | `lucide-react` 0.468.0 |
| Routing | Hash anchors only, no router library |
| Entry HTML | `index.html` |
| Entry JS | `src/main.jsx` (185 lines, monolithic) |
| Git | 1 commit on `main`, clean working tree |
| `node_modules` | Not installed |

### Existing Strengths to Preserve

| Strength | Evidence |
| :--- | :--- |
| Reduced-motion bypass in `shouldShowIntro()` | `src/main.jsx:27-30` |
| `sessionStorage` seen-flag with try/catch | `src/main.jsx:27-30, 72-75` |
| Modal focus trap and focus restoration | `src/main.jsx:76-87` |
| WAI-ARIA tablist with Arrow-key navigation | `src/main.jsx:161-170` |
| RFC 5545 `.ics` calendar blob download | `src/main.jsx:40-47` |
| Client-side canvas keepsake generator | `src/main.jsx:110-129` |
| Clipboard share with permission-denied fallback | `src/main.jsx:106-109` |
| Mobile hamburger menu with Escape dismissal | `src/main.jsx:88-94` |
| `prefers-reduced-motion` media listener | `src/main.jsx:95-100` |
| Touch-action and tap-highlight reset on buttons | `src/styles.css:20-22` |

### Issues Requiring Resolution

| Issue | Severity | Source |
| :--- | :--- | :--- |
| Brand entirely misnamed ("Nirvahan") | P1 | `main.jsx:6,8,34,35,46,49` |
| Venue inconsistency: "Srusti Auditorium" vs. "JRD Tata Hall" | P1 | `main.jsx:17`, brief |
| Event date in countdown unconfirmed for SANGAMA '26 | P1 | `main.jsx:6` |
| Cobalt blue / coral palette incompatible with target identity | P1 | `styles.css:1-16` |
| Missing envelope, ribbon, seal, letter interaction | P1 | Audit report §3 |
| Orphaned `FuturisticIntroLoader.jsx` and `accordion.jsx` | P2 | `src/components/` |
| `motion`, `@radix-ui/react-accordion` unused in `package.json` | P2 | `package.json:12,14` |
| Missing OG / Twitter meta tags | P2 | `index.html` |
| 2.48 MB uncompressed hero PNG | P2 | `public/freshers-editorial.png` |
| 5.15 MB duplicate video in root directory | P2 | Root directory |
| Sub-10 px type on mobile (5–9 px labels) | P2 | `styles.css:61-62,68` |
| `#e0e4ff` on `#284be8` fails WCAG AA | P2 | `styles.css:75` |
| Touch targets below 44 px on secondary actions | P3 | `styles.css:80` |
| No Google Maps link for venue | P3 | `main.jsx:174` |

---

## 3. Product Goals and Non-Goals

### Goals

1. Rebrand entirely to SANGAMA '26 — Where New Journeys Meet.
2. Implement the "Two Lines Meet" convergence concept as the visual grammar.
3. Replace the 2D ticket introduction with a mobile-first interactive envelope experience that is the centrepiece — not duplicated by a second envelope on the page.
4. Establish the new design system: Fraunces + Outfit, colour narrative palette, convergence motif.
5. Present confirmed event information truthfully, with explicit placeholders for unconfirmed details.
6. Retain and improve all accessible interactions (keyboard navigation, focus management, reduced-motion support).
7. Upgrade the keepsake generator and `.ics` exporter to SANGAMA '26 identity.
8. Add OG and Twitter meta tags for WhatsApp and Instagram share previews.
9. Production build passes with zero console errors.
10. No horizontal overflow at 360 px.
11. Remove two unused dependencies and two orphaned files.
12. Keep bundle lean: no new JS dependencies.

### Non-Goals

- No backend, database, authentication, or CMS.
- No React Router, state management library, or UI component library.
- No analytics or visitor tracking.
- No full-page scroll hijacking.
- No sections added purely to make the page look complete.
- Do not use the `motion` library or any JS animation library.
- Do not invent event details that have not been confirmed.

---

## 4. Confirmed Information and Open Questions

### Confirmed

| Detail | Value |
| :--- | :--- |
| Event name | SANGAMA '26 |
| Tagline | Where New Journeys Meet |
| Audience | MCA Technical Students |
| Time | 10:30 onwards |
| Venue | Srusti Academy of Management & Technology, JRD Tata Hall |

### Flagged Inconsistency

The existing codebase says "Srusti Auditorium". The brief says "JRD Tata Hall". This specification uses the brief. The organizer must confirm the hall name before publication.

### Open Questions (block implementation unless stated)

| # | Question | Blocking Component | Placeholder |
| :--- | :--- | :--- | :--- |
| Q1 | Confirmed calendar date? | Countdown, `.ics`, letter | `[EVENT DATE TO BE CONFIRMED]` |
| Q2 | Is JRD Tata Hall the correct hall? | Venue card | `[VENUE TO BE CONFIRMED]` |
| Q3 | Google Maps destination URL? | Directions button | Button disabled |
| Q4 | Welcome letter body copy? | Letter card | `[WELCOME LETTER PENDING]` — **P0 blocker** |
| Q5 | Letter signatory? | Letter closing | `[SIGNED BY: TO BE CONFIRMED]` |
| Q6 | Approved ambient audio file? | Audio toggle | Feature disabled |
| Q7 | Dress code confirmed? | FAQ | Marked tentative |
| Q8 | Public URL for the site? | OG tags | `[URL TO BE CONFIRMED]` |
| Q9 | `freshers-editorial.png` approved for SANGAMA '26? | Hero image | Retain with review, replace if not approved |

---

## 5. Creative Concept — "Two Lines Meet"

### The Idea

SANGAMA in Sanskrit means confluence: two rivers, two paths, two people meeting. This concept makes that meaning visible in the design — not as decoration, but as grammar.

### How the Concept Manifests

**The Convergence Mark**
Two fine lines — one horizontal from the left margin, one vertical from above — meet at the left baseline of the event title. They are 0.5 px, rendered as an SVG, coloured in `--gold-light`. They appear on page load with a brief draw-in animation. This is not a logo. It is a compositional gesture: this is where things meet.

**The Ribbon**
Rather than a horizontal bow, the ribbon is two strands that cross diagonally over the face of the envelope and tie at centre. The crossing of two strands is SANGAMA in physical form. The strands are SVG paths animated with `stroke-dashoffset` on opening, giving a genuine untying motion.

**The Wax Seal**
The seal monogram is the letter "S" constructed from two opposing arcs that curve toward each other — meeting at the stem. The arcs are not mirrored; they approach from slightly different directions, as two paths do.

**Section Dividers**
Fine editorial rules between sections: two lines, 0.5 px, that converge from opposite edges to a centred diamond or dot mark before separating. These are subtle — they should be noticed only on second reading.

**The Typography**
Fraunces's italic, used for the tagline and letter greeting, leans forward as if reaching toward something. Outfit, used for navigation and body text, is grounded and open. The two typefaces represent the two registers of SANGAMA: anticipation and welcome.

### What This Concept Is Not

- It is not a pattern library of converging lines plastered everywhere.
- It is not a geometric illustration covering the page.
- It is not a symbolic logo exercise.
- It is a design grammar: when a convergence mark appears, there is a reason for it.

---

## 6. Brand and Visual Direction

### Colour Tokens (Final)

All tokens replace the existing `:root` variables in `src/styles.css`.

```css
:root {
  /* Brand / Wine */
  --wine:           #5c1527;
  --wine-mid:       #7b2039;
  --wine-deep:      #3a0e18;
  --wine-text:      #8c2a42;

  /* Complement / Sky */
  --sky:            #7fa8bc;
  --sky-light:      #c8dde6;
  --sky-pale:       #eef5f8;

  /* Accent / Champagne */
  --gold:           #b8872a;
  --gold-light:     #d4aa4a;
  --gold-pale:      #f0e0bf;

  /* Surfaces */
  --paper:          #faf6f0;
  --paper-warm:     #f5ede4;
  --blush-letter:   #fdf9f5;
  --envelope-back:  #f0e5d8;

  /* Text */
  --ink:            #1e1410;
  --ink-mid:        #4a3830;
  --ink-muted:      #7a6858;
  --letter-ink:     #2c1e18;
  --ink-on-wine:    #fdf8f4;

  /* Borders */
  --line:           #ddd0c4;
  --line-warm:      #c8b8a8;
  --line-sky:       #a8c4d0;

  /* System */
  --focus-ring:     #5c1527;
  --success:        #2d5a45;
  --warning:        #8a5a00;
  --error:          #8a1a1a;
  --disabled-bg:    #ede5dc;
  --disabled-txt:   #9a8878;

  /* Shadows */
  --shadow-1: 0 1px 4px rgba(30,20,16,0.06);
  --shadow-2: 0 4px 16px rgba(30,20,16,0.10);
  --shadow-3: 0 8px 32px rgba(30,20,16,0.14);
  --shadow-envelope: 0 16px 64px rgba(58,14,24,0.28);

  /* Motion (see §10) */
  --dur-instant: 80ms;
  --dur-micro:   150ms;
  --dur-fast:    250ms;
  --dur-base:    350ms;
  --dur-slow:    500ms;
  --dur-flap:    420ms;

  --ease-micro:    cubic-bezier(0.4, 0, 0.2, 1);
  --ease-open:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring:   cubic-bezier(0.16, 1.0, 0.3, 1);
  --ease-dissolve: cubic-bezier(0.8, 0, 0.6, 1);

  /* Layout */
  --container: min(1200px, calc(100% - 2 * var(--gutter)));
  --gutter:    clamp(20px, 5vw, 72px);
  --max-envelope: min(460px, calc(100vw - 2 * var(--gutter)));
}
```

### Contrast Requirements (WCAG 2.2 AA, verified)

| Foreground | Background | Ratio | Usage |
| :--- | :--- | :--- | :--- |
| `--ink` `#1e1410` | `--paper` `#faf6f0` | ≥ 15:1 | Body text |
| `--ink-on-wine` `#fdf8f4` | `--wine` `#5c1527` | ≥ 9:1 | Text on wine CTA |
| `--ink` `#1e1410` | `--blush-letter` `#fdf9f5` | ≥ 15:1 | Letter text |
| `--ink-mid` `#4a3830` | `--paper` `#faf6f0` | ≥ 7:1 | Supporting body |
| `--wine` `#5c1527` | `--paper` `#faf6f0` | ≥ 8:1 | Wine text on page |
| `--gold-light` `#d4aa4a` | `--wine` `#5c1527` | ≥ 3:1 | Seal/decorative (large UI only) |

All ratios must be verified with WebAIM Contrast Checker during implementation. Do not estimate; measure.

### Typography System

#### Primary Display: Fraunces

| Attribute | Value |
| :--- | :--- |
| Family | `'Fraunces', Georgia, serif` |
| Variable axes | `wght` 100–900, `opsz` 9–144 |
| Event title | `wght` 600, `opsz` 9 |
| Tagline / letter greeting | `wght` 400, italic, `opsz` 9 |
| Section headings | `wght` 500, `opsz` 36 |
| Countdown numerals | `wght` 500, `opsz` 9, `font-variant-numeric: tabular-nums; font-feature-settings: "tnum"` |
| Fallback | `Georgia, 'Times New Roman', serif` |

#### Secondary Body and UI: Outfit

| Attribute | Value |
| :--- | :--- |
| Family | `'Outfit', system-ui, sans-serif` |
| Navigation / labels | `wght` 500 |
| Body copy | `wght` 400 |
| Buttons | `wght` 600 |
| Captions | `wght` 400, `letter-spacing: 0.04em` |
| Fallback | `system-ui, -apple-system, sans-serif` |

#### Google Fonts URL (index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,300..600&family=Outfit:wght@400;500;600&display=swap" />
```

Both are variable fonts (single network request each). `display=swap` ensures text is visible during load.

#### Type Scale

CSS custom properties for the type scale:

```css
--text-display: clamp(52px, 13.5vw, 112px);  /* h1 event title */
--text-h2:      clamp(30px, 4.5vw, 48px);     /* section headings */
--text-h3:      clamp(18px, 2.2vw, 24px);     /* card headings */
--text-body-lg: 18px;                          /* letter, hero intro */
--text-body:    16px;                          /* body text, FAQ answers */
--text-sm:      14px;                          /* captions, meta */
--text-xs:      12px;                          /* labels, eyebrows */
--text-micro:   11px;                          /* absolute minimum size */
```

**Mobile rule:** No text smaller than `11px` on any viewport. All micro-labels at `5–9px` in the previous design are eliminated or promoted to `11px` minimum.

**Measure limit:** Body paragraphs capped at `62ch`.

#### Wordmark Treatment

`SANGAMA '26` set in Fraunces weight 600 in the navigation. Size: 22px. Letter-spacing: `-0.02em`. The apostrophe is typographically correct (right single quotation mark `'`, Unicode `U+2019`). Not all-caps. Not small-caps. The weight and optical setting give it dignity without formality.

### Spacing Scale

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  96px
--space-10: 128px
```

### Border Radius

```css
--radius-sm:   3px   /* buttons, tags */
--radius-md:   8px   /* cards */
--radius-lg:   16px  /* letter card */
--radius-pill: 999px /* nav CTA */
--radius-seal: 50%   /* wax seal disc */
```

---

## 7. Experience Architecture

### Information Architecture (Revised)

The fullscreen intro envelope and the in-page envelope section in Version 1 created a redundant experience: the visitor opened an envelope twice.

**Version 2 resolves this.** The envelope opens once. The fullscreen intro IS the envelope experience. After closing, the `#letter` section shows the letter in its readable open state — no second envelope, no second interaction.

### Visitor Journey

```
INTRO STATE (first visit)
  ┌───────────────────────────────────────────────────────┐
  │  Full-screen: deep wine-red page background           │
  │  Eyebrow: SRUSTI ACADEMY · MCA '26                    │
  │  Portrait envelope centred on screen                  │
  │  One instruction: "Tap to open your invitation"       │
  │  Skip intro → (44px min touch target)                 │
  └──────────── Tap / Enter / Space ─────────────────────┘
                      │ cause-and-effect opening sequence
                      ▼
  ┌───────────────────────────────────────────────────────┐
  │  Letter card rises from envelope                      │
  │  [Welcome letter content]                             │
  │  Event details summary: venue, time, date             │
  │  "Continue ↓" button                                  │
  └──────────── Continue / scroll ───────────────────────┘
                      │ overlay fades; sessionStorage written
                      ▼

MAIN PAGE (all visits after first)
  ┌────────────┐  Navigation (sticky, minimal)
  ├────────────┤  Hero — Event identity
  ├────────────┤  #letter — Open letter (already read; compact view)
  ├────────────┤  #details — Event details card + countdown
  ├────────────┤  #faq — Compact FAQ accordion
  ├────────────┤  #keepsake — Download personalised pass + share
  └────────────┘  Footer
```

**Why this structure:**
- No section is purely decorative.
- The envelope opens once and leaves a meaningful trace (the letter in `#letter`).
- Essential event details are accessible from the navigation without going through the envelope again.
- The page is short enough to read entirely on a single scroll session.
- The experience tab section and horizontal ticker are removed (reasons: 5.15 MB video, thematic contradiction, dilution of centrepiece).

### Section Count

Six sections: navigation, hero, letter, details, FAQ, keepsake, footer. This is not fewer sections for minimalism's sake — each earns its place.

---

## 8. Component Visual Specifications

### 8.1 Navigation Bar

**Purpose:** Site-wide persistent navigation. Minimal — does not compete with the envelope.

**Content:**
- Left: `SANGAMA '26` wordmark (Fraunces 600, 22px)
- Centre: Links — `The Invitation`, `Details`, `Your Copy` (targeting `#letter`, `#details`, `#keepsake`)
- Right: Pill CTA — `You're invited ↗`
- Mobile: Wordmark + CTA visible; hamburger toggle reveals links

**Visual specification:**
- Height: `64px` desktop, `56px` mobile
- Background: `--paper` with `backdrop-filter: blur(10px) saturate(1.4)` on sticky scroll (after 80px scroll)
- Before scroll: no blur, clean `--paper` background
- Bottom border: `1px solid --line` only after scroll
- Wordmark: `--wine` colour
- Nav links: `--ink-mid`, Outfit 500, 13px
- CTA: `border: 1px solid --line-warm`, `--ink-mid` text, `--radius-pill`, `height: 38px`, `padding: 0 18px`
- Mobile menu: `position: absolute`, full width, `--paper` background, links stacked at 16px Outfit 500, `border-top: 1px solid --line`

**Interaction states:**

| Element | Hover | Focus | Active |
| :--- | :--- | :--- | :--- |
| Nav link | `--ink` colour; 1px `--wine` underline extends left→right (`scaleX(0→1)`) 250ms | 2px solid `--wine` outline, 4px offset | — |
| CTA pill | Border → `--wine`, text → `--wine`, arrow shifts right 2px, 150ms | 2px solid `--wine` outline | Brief `--gold-pale` bg flash |
| Hamburger | `--wine` colour, 150ms | 2px solid `--wine` outline | Scale 0.92, 80ms |

**Accessibility:**
- `<nav aria-label="Main navigation">`
- Hamburger: `aria-expanded`, `aria-controls="nav-links"`, `aria-label="Open menu"` / `"Close menu"`
- Escape closes mobile menu; focus returns to toggle
- Skip-to-content link: `position: fixed; top: -80px` → `top: 10px` on focus, `--wine` background

**Mobile:** No nav links visible without hamburger. CTA visible at all times. Hamburger at 44 × 44 px.

**Acceptance:**
- [ ] SANGAMA '26 wordmark visible at all widths
- [ ] Skip-to-content link accessible by keyboard
- [ ] Mobile menu accessible via Escape
- [ ] No horizontal overflow

---

### 8.2 Hero Section

**Purpose:** Communicates the event identity without requiring any interaction. The first scroll experience after the intro closes.

**Composition:**

```
─────────────────────────────────────────────────
        ╱ convergence mark (SVG, --gold-light) ╲
                                                  
  SRUSTI ACADEMY · MCA TECHNICAL STUDENTS         (eyebrow, Outfit 500, 11px, --ink-muted, tracking 0.12em)
                                                  
  SANGAMA '26                                     (Fraunces 600, --text-display, --ink)
                                                  
  Where New Journeys Meet                          (Fraunces 400 italic, clamp(18px, 2.8vw, 28px), --ink-mid)
                                                  
  [EVENT DATE TO BE CONFIRMED] · 10:30 onwards    (Outfit 400, 14px, --ink-muted)
  JRD Tata Hall · Srusti Academy                  
                                                  
  [Open the Invitation ↓]                         (primary button, full-width on mobile)
─────────────────────────────────────────────────
```

**Convergence mark:** An SVG absolutely positioned at the top-left of the hero container. Two paths: one horizontal (left to the title's left edge) and one vertical (top to the title's baseline). They meet at a point. `stroke: var(--gold-light)`, `stroke-width: 0.5`, `fill: none`. The paths animate their `stroke-dashoffset` from full length to 0 on page load over 600ms (staggered: horizontal first, 80ms delay for vertical). Hidden if `prefers-reduced-motion`.

**Background:** `--paper`. A very subtle linear gradient `--paper` to `--paper-warm`, top to bottom, `opacity: 0.6`. No strong colour shifts.

**Mobile layout (360px):**
- Eyebrow on two lines if needed
- `SANGAMA '26` wraps to one line at most (~7 characters + apostrophe: fits at ~52px on 360px)
- CTA button full-width, 52px height
- Convergence mark scaled to fit, or simplified to a single short horizontal mark only

**Entry animation:**
- Eyebrow: `opacity(0 → 1)` 400ms, no translate
- Title: `opacity(0) translateY(16px) → opacity(1) translateY(0)`, 500ms, `--ease-spring`, 80ms after eyebrow
- Tagline: same, 160ms after eyebrow
- Supporting copy: same, 240ms after eyebrow
- CTA: `opacity(0) → opacity(1)`, 350ms, 320ms after eyebrow
- Disabled entirely under `prefers-reduced-motion`

**Acceptance:**
- [ ] `SANGAMA '26` visible as `<h1>` on first screen at 360px without scrolling
- [ ] CTA scrolls to `#envelope-section` smoothly
- [ ] Convergence mark does not create horizontal overflow
- [ ] Entry animation disabled under reduced-motion

---

### 8.3 Envelope and Letter Section (`#letter`)

*Full interaction specification in §9. This section covers appearance and content in the post-intro state.*

After the intro closes, the `#letter` section shows the letter in its open state. The envelope is not visible again — the open letter card is displayed directly, centred, at readable size.

**Purpose of this section:** The letter, once opened, remains accessible throughout the visit. It is the primary content of the invitation.

**Letter card appearance:**

```
┌─────────────────────────────────────────┐  ← --radius-lg border, --line-warm border
│  ╔═══════════════════════════════════╗  │  ← fine inner frame (0.5px --line-warm)
│  ║                                   ║  │
│  ║  Dear [Batch],                    ║  │  ← Fraunces 400 italic, --wine-text, 22px
│  ║                                   ║  │
│  ║  [WELCOME LETTER CONTENT]         ║  │  ← Outfit 400, --letter-ink, 16px, lh 1.75
│  ║  [PENDING APPROVAL]               ║  │
│  ║                                   ║  │
│  ║  Where New Journeys Meet.         ║  │  ← Fraunces 400 italic, --ink-mid, 15px
│  ║                                   ║  │
│  ║  Venue:   JRD Tata Hall           ║  │  ← Outfit 400, --ink-mid, 14px
│  ║  Date:    [TO BE CONFIRMED]       ║  │
│  ║  Time:    10:30 onwards           ║  │
│  ║                                   ║  │
│  ║  [SIGNED BY: TO BE CONFIRMED]     ║  │  ← Fraunces 400 italic, --wine-text
│  ║  SANGAMA '26                      ║  │
│  ╚═══════════════════════════════════╝  │
└─────────────────────────────────────────┘
```

**Card surface:** `--blush-letter`, `box-shadow: --shadow-3`, `border-radius: --radius-lg`

**Inner frame:** A fine inset border `0.5px solid --line-warm` set as a second inset `box-shadow`: `inset 0 0 0 1px var(--line-warm)`. This creates the impression of a thin inner rule around the letter paper.

**Maximum width:** `min(560px, calc(100vw - 2 * var(--gutter)))`

**Mobile reading experience:** At 360px, full-bleed with 20px side gutters. Font-size `--text-body` (16px). Line-height 1.75. Letter is scrollable within the page (not a modal). No zoom required.

**Long letter:** If the letter content is longer than 60vh, a `max-height` is not applied — the card simply grows. Mobile scrolling is the mechanism. Do not clip the letter.

**Acceptance:**
- [ ] Letter readable at 16px without zooming on 360px mobile
- [ ] Placeholders visually distinct (different colour, e.g. `--wine-text` italic) from real content
- [ ] Letter accessible by keyboard (no interaction required — it is static text)

---

### 8.4 Event Details Card (`#details`)

**Content:**

```
SANGAMA '26
─────────────────────────────────────────
  📍  Srusti Academy of Management &    
      Technology, JRD Tata Hall          

  📅  [EVENT DATE TO BE CONFIRMED]      
      10:30 onwards                     

  SEE YOU IN:
  [##d : ##h : ##m : ##s]               ← hidden if date unconfirmed
─────────────────────────────────────────
  [Add to Calendar]    [Get Directions]
```

**Visual specification:**
- Card: `--paper-warm`, `--radius-md`, `--shadow-2`
- Left accent: `3px solid --wine` left border
- Icons: `lucide-react` MapPin and CalendarDays, `16px`, `--sky` colour (sky icons feel like navigation and horizon — appropriate)
- Date/time text: Outfit 400, `--ink-mid`
- "SEE YOU IN" label: Outfit 500, `11px`, `--ink-muted`, tracking `0.10em`
- Countdown values: Fraunces 600, `opsz 9`, `--text-h2`, `--wine-text`, `font-variant-numeric: tabular-nums`
- Separator dots between countdown units: `--line`, 12px

**Conditional logic:**
- `EVENT_DATE = null` → countdown hidden; `"Date to be announced"` in `--warning` colour
- Event passed → countdown hidden; `"Thank you for celebrating with us."` in `--ink-mid`

**Action buttons:**
- Add to Calendar: Secondary button style
- Get Directions: Secondary button, disabled + tooltip `"Directions will be added soon"` when Q3 unconfirmed

**Mobile:** Actions stacked full-width. Card takes full container width.

**Accessibility:**
- `aria-label="Event details"` region
- Countdown has `aria-live="off"` (do not announce every second)
- Directions: `aria-disabled="true"` + `title` when disabled

**Acceptance:**
- [ ] Venue matches brief exactly
- [ ] Countdown hidden when date is null
- [ ] `.ics` downloads with SANGAMA '26 identity

---

### 8.5 FAQ Accordion (`#faq`)

**Questions (all answers pending organizer confirmation):**

1. **Who is invited?** — The new MCA batch, seniors, and faculty. Bring your student ID. Entry details confirmed by your class representative.
2. **When and where?** — `[EVENT DATE TO BE CONFIRMED]`, 10:30 AM onwards, Srusti Academy of Management & Technology, JRD Tata Hall.
3. **What is the dress code?** — `[DRESS CODE TO BE CONFIRMED]`. Check with your class representative for final details.
4. **Can I perform or participate?** — Yes. Contact your section representative before the event or ask at arrival.
5. **Is the keepsake an entry pass?** — No. It is a personal souvenir. Entry arrangements are communicated by your class representative.

**Visual specification:**
- Each item: `--paper`, `border-bottom: 1px solid --line`
- Trigger: Fraunces 500 `clamp(15px, 2vw, 18px)`, `--ink`, `+` icon 20px `--wine`
- Expanded: trigger text `--wine`, `+` rotates 45° → cross shape, 200ms
- Answer: Outfit 400, `--text-body`, `--ink-mid`, lh 1.7, `padding: 0 0 20px`
- Transition: `grid-template-rows: 0fr → 1fr` (no JS height calculation)
- Eyebrow label above section: `FAQ`, Outfit 500, 11px, `--ink-muted`, tracking 0.12em

**Accessibility:**
- Each trigger: `<button role="button" aria-expanded>` inside `<h3>`
- Panel: `role="region"`, `aria-labelledby` pointing to trigger id
- Collapsed: `hidden` attribute on inner content div
- Keyboard: Enter/Space toggles; Tab moves between items

**Acceptance:**
- [ ] Each item expands/collapses
- [ ] Only one open at a time
- [ ] Tentative answers marked with "⚠ Subject to confirmation"
- [ ] Keyboard operable

---

### 8.6 Keepsake and Share Section (`#keepsake`)

**Content:**

```
Make it yours.

Enter your name to download a personal keepsake from SANGAMA '26.

[────────────────────────────────] [↓ Download]
 Your name

─────────────────────────────
Share the invitation:
[Share ↗]     [Copy link]
```

**Keepsake canvas (redesigned for SANGAMA '26):**
- Size: 1400 × 850 px (same as existing, for device consistency)
- Drawn at `window.devicePixelRatio` scale
- Background fill: `#3a0e18` (`--wine-deep`)
- Double-rule frame: two inset rectangles, `1px stroke`, `#d4aa4a` (`--gold-light`), outer at 24px inset, inner at 32px inset
- Convergence mark: two fine lines meeting at the upper-left corner of the inner frame, `0.5px`, `--gold-light`
- "SANGAMA '26": canvas font `"Fraunces"` (system fallback: `"Georgia"`) 700, 72px, `#fdf8f4` (`--ink-on-wine`), upper-centre
- "Where New Journeys Meet": italic, 28px, `#d4aa4a`, below title
- Guest name: 56px, `#fdf8f4`, centred, lower half
- Event line: Outfit (system fallback: `"Arial"`) 400, 16px, `#9a7888`, below name
- Venue line: 13px, `#9a7888`
- Fine print: `"PERSONAL KEEPSAKE · NOT AN ENTRY PASS"`, 10px, tracking 0.18em, `#6a4858`, bottom centre

**Input specification:**
- `type="text"`, `placeholder="Your name"`, `maxlength="45"`, `autocomplete="name"`
- Default: `border: 1px solid --line-warm`, `--paper` bg, `--ink` text, `--radius-sm`, `height: 52px`, `padding: 0 16px`
- Focus: `border-color: --wine`, `box-shadow: 0 0 0 3px var(--gold-pale)`
- Error (empty/whitespace): `border-color: --error`, error text `--error` below, 13px Outfit
- Success: Brief `✓` in `--success` after download initiated

**Share actions:**
- Primary: `navigator.share()` if available (native share sheet — ideal for WhatsApp)
- Fallback: `navigator.clipboard.writeText()` with `role="status"` success announcement
- Both buttons: secondary style

**Acceptance:**
- [ ] Canvas download includes SANGAMA '26 branding
- [ ] Name rejects whitespace-only
- [ ] Share action triggers native sheet on mobile
- [ ] Success/error announced to screen readers

---

### 8.7 Footer

**Content:**
- Left: SANGAMA '26 wordmark (Fraunces 600, 18px, `--ink-on-wine`)
- Centre: `© 2026 SANGAMA · Srusti Academy of Management & Technology` (Outfit 400, 12px, opacity 0.6)
- Right: Back-to-top button (icon-only, 44 × 44 px, circular `--wine-mid` outline)
- Bottom: Replay intro button (text: `"Open the invitation again"`, only shown when not `prefers-reduced-motion`)

**Visual specification:**
- Background: `--wine-deep`
- Top divider: 1px `--gold-light` line (the champagne rule that closes the experience)
- Text: `--ink-on-wine`
- Back-to-top: `border: 1px solid rgba(253,248,244,0.3)`, `--ink-on-wine` ArrowUp icon

**Acceptance:**
- [ ] Replay button works
- [ ] Back-to-top scrolls to `#home`
- [ ] Replay hidden under `prefers-reduced-motion`

---

## 9. Envelope and Letter Interaction — Full Specification

### Architecture Decision

**The envelope opens once.** The fullscreen intro is the envelope. After it closes, the main page shows the letter in its open state (`#letter` section). There is no second envelope on the page.

The intro overlay is stored in `sessionStorage` key `sangama-intro-v1` and shown only once per session.

### State Machine

```
LOAD
  ├─ prefers-reduced-motion → SKIP_TO_MAIN
  ├─ sessionStorage has key → SKIP_TO_MAIN
  └─ otherwise → INTRO_CLOSED

INTRO_CLOSED
  ├─ user taps/clicks/Enter/Space → INTRO_OPENING
  └─ user taps Skip / presses Escape → SKIP_TO_MAIN

INTRO_OPENING (animation guard: rejects new triggers)
  ├─ step 1: ribbon unties (0–290ms)
  ├─ step 2: seal dissolves (250–450ms)
  ├─ step 3: flap rotates (400–820ms)
  ├─ step 4: letter rises (680–1180ms)
  └─ step 5: complete → INTRO_OPEN

INTRO_OPEN
  └─ user taps/clicks "Continue ↓" or scrolls → SKIP_TO_MAIN

SKIP_TO_MAIN
  └─ sessionStorage flag written
  └─ overlay fades out (200ms)
  └─ focus restored to first main-page focusable element
  └─ body overflow restored
```

### Fullscreen Intro Layout

```
[Full viewport: --wine-deep background]
─────────────────────────────────────────────────
  SRUSTI ACADEMY · MCA TECHNICAL STUDENTS          ← Outfit 500, 11px, --ink-on-wine 50%, tracking 0.12em
                                                  
  ┌──────────────────────────┐
  │                          │  ← portrait envelope, aspect-ratio 3/4,
  │   ╲──────────────────╱   │    max-width: --max-envelope
  │    ╲  [ribbon bow]  ╱    │    background: --wine
  │     ╲  [S seal]  ╱      │    border: 1px solid rgba(212,170,74,0.25)
  │      ╲──────────╱        │    box-shadow: --shadow-envelope
  │                          │
  └──────────────────────────┘
                                                  
  Tap to open your invitation.                      ← Outfit 400, 14px, --ink-on-wine 60%
  [Skip intro →]                                    ← Outfit 500, 12px, --ink-on-wine 70%, 44px touch target
─────────────────────────────────────────────────
```

### Envelope Geometry and Layers (HTML / CSS)

```
.envelope-scene   — perspective: 1200px; perspective-origin: 50% 35%;
  .envelope-body  — background: --wine; position: relative; 
                    width: --max-envelope; aspect-ratio: 3/4; border-radius: 3px;
    .envelope-back    — interior visible behind flap; background: --envelope-back;
                        position: absolute; inset: 0; z-index: 1;
    .envelope-letter  — z-index: 2; positioned inside bottom 70% of envelope;
                        translateY(100%) opacity(0) in closed state;
    .envelope-ribbon  — SVG overlay, z-index: 5; two diagonal paths, --sky stroke;
    .envelope-flap    — clip-path: polygon(0 0, 50% 44%, 100% 0, 100% 100%, 0 100%);
                        position: absolute; top: 0; width: 100%; height: 50%;
                        background: --wine; z-index: 6; transform-origin: top center;
                        transform-style: preserve-3d;
    .envelope-seal    — SVG, z-index: 7; positioned at ribbon crossing point;
                        width: 44px; height: 44px;
```

**Flap geometry:** The flap is a CSS `clip-path` polygon forming a traditional V-shaped envelope flap pointing downward at the centre. When `rotateX(-175deg)` is applied, the flap folds back over the envelope body, revealing the interior lining.

**Ribbon:** An SVG element overlaid on the envelope face. Two diagonal `<path>` elements in `--sky`, `stroke-width: 2`, with a small bow-knot SVG group at the intersection. The paths have `stroke-dasharray` set to their full computed length and `stroke-dashoffset` animated from `0 → path-length` (untie on open).

**Wax seal:** A circular SVG with:
- A disc fill: radial gradient from `--gold-light` to `--gold`
- Inner shadow: `filter: drop-shadow(0 2px 4px rgba(30,14,8,0.4))`
- A bespoke "S" path constructed from two arcs meeting at the stem, `--wine-deep` fill

### Animation Sequence (cause-and-effect)

| Step | Element | Property | From → To | Start | End | Easing |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1a | Ribbon left strand `stroke-dashoffset` | Dashoffset | 0 → full | 0ms | 260ms | ease-out |
| 1b | Ribbon right strand `stroke-dashoffset` | Dashoffset | 0 → full | 40ms | 300ms | ease-out |
| 1c | Instruction text | `opacity` | 1 → 0 | 0ms | 200ms | ease |
| 2a | Seal group | `scale` | 1 → 1.08 | 250ms | 320ms | ease-out |
| 2b | Seal group | `opacity`, `scale` | 1 → 0, 1.08 → 0.6 | 310ms | 460ms | `--ease-dissolve` |
| 3 | Flap `.rotateX` | 0deg → -175deg | 400ms | 820ms | `--ease-open` |
| 4 | Flap `backface-visibility` | — | — during rotation | — | — | — |
| 5a | Letter card `translateY` | 100% → 0 | 680ms | 1180ms | `--ease-spring` |
| 5b | Letter card `opacity` | 0 → 1 | 680ms | 900ms | ease |
| 6 | Continue button `opacity` | 0 → 1 | 1100ms | 1300ms | ease |

**Total felt duration:** ~1300ms. This is intentional — the visitor sees the ribbon untype, feels the flap lift, and sees the letter rise. At no step is there a gap longer than 200ms between one cause and its effect.

**Interruption guard:**
```jsx
const [isOpening, setIsOpening] = useState(false);

function handleOpen() {
  if (isOpening || phase === 'open') return;
  setIsOpening(true);
  // begin animation sequence
  setTimeout(() => { setPhase('open'); setIsOpening(false); }, 1300);
}
```

### Reduced-Motion Behaviour

```css
@media (prefers-reduced-motion: reduce) {
  .envelope-intro-overlay { display: none; }
}
```

When the overlay is hidden, `shouldShowIntro()` returns `false` and the `#letter` section shows the letter card in its open state immediately, with no animation. The session flag is written on page load.

### Keyboard Behaviour

- Envelope scene: `tabindex="0"`, `role="button"`, `aria-label="Open your invitation. Press Enter or Space to open."`
- Skip button: `tabindex="0"`, receives focus automatically when intro opens
- Tab order during intro: envelope → skip (two-item focus trap)
- `Escape` → `SKIP_TO_MAIN`

### Screen Reader Behaviour

- Before opening: `aria-label` on envelope container describes the action
- On `INTRO_OPEN` state: `role="status"` region (outside of focus trap) announces `"Your invitation is open. Your letter is below."`
- After closing: focus moves to first focusable element in `#home`

---

## 10. Motion Language

### Three Registers

**Register 1 — Ambient:** The convergence mark draws on page load (600ms, `stroke-dashoffset`). The envelope shadow responds fractionally to pointer position (`transform: rotate(Xdeg)` on `mousemove`, capped at ±2deg) on pointer-capable devices only. These are the site's breathing. They never block interaction.

**Register 2 — Responsive:** Every interactive element responds in ≤ 150ms. Consistent easing. Tells the visitor the surface is aware of them. Stops after the interaction — no loops or pulses.

**Register 3 — Narrative:** The envelope opening sequence. A scene with cause, effect, and resolution.

### Motion Tokens (CSS custom properties)

Already defined in §6's `:root` block. Summary:

```css
/* Durations */
--dur-instant: 80ms;
--dur-micro:   150ms;
--dur-fast:    250ms;
--dur-base:    350ms;
--dur-slow:    500ms;
--dur-flap:    420ms;

/* Easing curves */
--ease-micro:    cubic-bezier(0.4, 0, 0.2, 1);    /* hover, micro-interactions */
--ease-open:     cubic-bezier(0.25, 0.46, 0.45, 0.94); /* flap — paper hinge feel */
--ease-spring:   cubic-bezier(0.16, 1.0, 0.3, 1);  /* letter rise — slight float */
--ease-dissolve: cubic-bezier(0.8, 0, 0.6, 1);     /* seal disappearance */
--ease-in:       cubic-bezier(0.4, 0, 1, 1);        /* elements leaving */
```

### Scroll Behaviour

`scroll-behavior: smooth` on `html`. `scroll-padding-top: 80px` (accounts for sticky nav).

**What does NOT animate on scroll:** No `IntersectionObserver` entrance animations on FAQ, details, or keepsake. Those elements are simply present. The decision not to animate them is a conscious choice: the envelope sequence has used the visitor's attention budget. Reserve scroll animation for the convergence mark only.

**One permitted scroll animation:** When the `#details` section enters the viewport for the first time, the countdown numerals count up briefly from 0 to their real value over 400ms. This rewards a reader who has scrolled down, without being disorienting. Disabled under `prefers-reduced-motion`.

---

## 11. Micro-Interaction System

### Interaction States for All Components

**Primary CTA (e.g. "Open the Invitation"):**
- Default: `--wine` bg, `--ink-on-wine` text, `--radius-sm`, `height: 52px`, `min-width: 200px`
- Hover: `--wine-mid` bg, `translateY(-2px)`, `--shadow-2`, arrow icon moves right `2px`, `var(--dur-micro)` `--ease-micro`
- Focus-visible: `outline: 2px solid var(--wine); outline-offset: 4px`
- Active: `translateY(1px)`, shadow reduces to `--shadow-1`, `var(--dur-instant)`
- Disabled: `--disabled-bg`, `--disabled-txt`, `cursor: not-allowed`
- Transition properties: `background-color transform box-shadow` only

**Secondary button (e.g. "Add to Calendar"):**
- Default: `transparent`, `1px solid --wine`, `--wine` text, same height
- Hover: `--gold-pale` bg, `--wine-mid` border, `translateY(-1px)`, `var(--dur-micro)`
- Focus-visible: same as primary
- Active: border → `--wine-deep`, no translate, `var(--dur-instant)`
- Disabled: `--disabled-bg` bg, `--disabled-txt` text and border

**Navigation link:**
- Default: `--ink-mid`, no underline
- Hover: `--ink`, `::after` underline `scaleX(0 → 1)` from left, `1px solid --wine`, `var(--dur-fast)`
- Active page: underline always visible (`scaleX(1)`)
- Focus-visible: `outline: 2px solid var(--wine); outline-offset: 4px`

**Nav CTA pill:**
- Default: `1px solid --line-warm`, `--ink-mid` text, transparent bg
- Hover: border → `--wine`, text → `--wine`, arrow `↗` shifts right `2px`, `var(--dur-micro)`
- Focus-visible: `outline: 2px solid var(--wine)`
- Active: `--gold-pale` bg flash, `var(--dur-instant)`

**Envelope body (closed, pointer-capable devices):**
- Default: `--shadow-envelope`
- Hover: shadow increases by one step (`0 20px 72px rgba(58,14,24,0.34)`), ribbon strands shift `2px` upward as if tensioning, `var(--dur-fast)`
- Focus-visible: `outline: 2px solid var(--gold-light); outline-offset: 8px` (wine focus ring would disappear against wine surface)
- Active (tap): `translateY(1px)`, shadow reduces, `var(--dur-instant)`, then triggers opening

**Wax seal:**
- Default: `--gold` fill disc, inner drop-shadow
- Hover: `box-shadow: 0 0 0 8px var(--gold-pale)` — a warm diffuse ring, not a glow, `200ms`
- Active: immediately triggers opening animation

**FAQ trigger:**
- Default: `--ink` text, `+` icon `--wine` 20px
- Hover: text → `--wine`, `+` icon `rotate(45deg)` (becomes cross shape), `border-bottom-color: --wine`, `var(--dur-fast)`
- Focus-visible: `outline: 2px solid var(--wine); outline-offset: 4px`
- Open state: trigger text stays `--wine`, icon stays rotated

**Keepsake input:**
- Default: `1px solid --line-warm`, `--paper` bg, `--ink` text, `height: 52px`
- Focus: `border-color: --wine`, `box-shadow: 0 0 0 3px var(--gold-pale)`
- Error: `border-color: --error`, error message `--error` below, 13px Outfit
- Success: `border-color: --success`, brief `✓` icon in `--success` appended to field

**Share / copy controls:**
- Default: icon + label, `--ink-mid`, Outfit 500, 14px
- Hover: icon shifts `2px` in action direction (copy: right; share: diagonally up-right), label → `--ink`, `var(--dur-micro)`
- Focus-visible: outline
- Success: icon morphs to `✓`, label changes to "Copied" or "Shared", `--success` colour, auto-resets after 2500ms

**Icon-only controls (back-to-top, audio toggle):**
- Default: `44 × 44px` circular, `border: 1px solid currentColor`
- Hover: `scale(1.08)`, border brightens, `var(--dur-micro)`
- Focus-visible: outline
- Active: `scale(0.94)`, `var(--dur-instant)`

**Text links (in letter, footnotes):**
- Default: `--wine-text` underline, text `--ink`
- Hover: underline thickens to `2px`, `var(--dur-micro)`

### Touch Equivalents

All hover states that shift position, change shadow, or change colour have their touch equivalents handled naturally by `:active` states. Touch devices never see hover states (no `@media (hover: hover)` hover styles — only hover-capable devices receive them). Touch users receive `:active` feedback.

Every interactive element that relies on hover for discoverability has an always-visible visual affordance (e.g., the envelope shows `"Tap to open"` instruction text; the FAQ trigger always shows the `+` icon).

---

## 12. Responsive Behaviour Matrix

### Key Rules

- **Mobile-first CSS:** Base styles target 360px. Media queries add complexity for larger screens.
- **Minimum text:** 11px at any width.
- **Touch targets:** 44 × 44px minimum at any width.
- **No horizontal overflow:** At any breakpoint.
- **Portrait envelope:** At mobile widths, the envelope occupies `calc(100vw - 40px)` up to the defined `--max-envelope` of `460px`.

### Breakpoints

```css
/* Mobile: base (360px+) */
/* Tablet: @media (min-width: 640px) */
/* Desktop: @media (min-width: 1024px) */
/* Wide: @media (min-width: 1440px) */
```

Mobile-first means base styles are for mobile and media queries add capabilities.

### Responsive Matrix

| Viewport | Nav | Hero title | Envelope | Letter | Details | FAQ | Keepsake |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 320px | Hamburger | 52px, single col | 280px wide | Full width | Full width | Full width | Full width |
| 360px | Hamburger | 56px, single col | 320px wide | Full width | Full width | Full width | Full width |
| 390px | Hamburger | 60px, single col | 350px wide | Full width | Full width | Full width | Full width |
| 430px | Hamburger | 64px, single col | 390px wide | Full width | Full width | Full width | Full width |
| 640px+ | Full nav | 80px, left-aligned | 440px, centred | 480px max | 480px max | 540px max | Two col |
| 1024px+ | Full nav | 96px, left-aligned | 460px, centred | 560px max | 540px max | 600px max | Two col |
| 1440px+ | Full nav | 112px, left-aligned | 460px, centred | 560px max | 540px max | 640px max | Two col |

### Safe-Area Handling

```css
/* Fullscreen intro overlay */
.envelope-intro-overlay {
  min-height: 100dvh;
  padding-bottom: max(32px, env(safe-area-inset-bottom));
}

/* Audio toggle (fixed bottom-right) */
.audio-toggle {
  bottom: max(24px, env(safe-area-inset-bottom));
  right: max(20px, env(safe-area-inset-right));
}
```

### Gutter Rules

```css
--gutter: clamp(20px, 5vw, 72px);
```

- 320–639px: ~20px each side
- 640–1023px: ~32px each side
- 1024–1439px: ~48px each side
- 1440px+: ~72px each side

### Hero Title Line Breaks

At 360px, `SANGAMA '26` in Fraunces 600 at 56px is approximately 300px wide — it fits on one line without wrapping. This must be verified in implementation. If it wraps at any target mobile width, reduce `clamp` minimum from 52px toward 48px.

---

## 13. Accessibility Requirements

### Mandatory Requirements (WCAG 2.2 AA)

| Requirement | Standard | Verification |
| :--- | :--- | :--- |
| Text contrast ≥ 4.5:1 (body) | 1.4.3 AA | WebAIM Contrast Checker |
| Text contrast ≥ 3:1 (large text / UI) | 1.4.3 AA | WebAIM |
| Focus visible on all interactive elements | 2.4.11 AA | Keyboard navigation test |
| No keyboard trap (except intentional intro overlay) | 2.1.2 AA | Keyboard test |
| Logical tab order | 1.3.1 AA | Tab sequence review |
| All images have appropriate alt text | 1.1.1 A | Code review |
| Decorative SVGs are `aria-hidden="true"` | 1.1.1 A | Code review |
| Form inputs have associated labels | 1.3.1 AA | Code review |
| Error messages are programmatically associated | 3.3.1 AA | Code review + test |
| `prefers-reduced-motion` respected | 2.3.3 AA | OS setting test |
| Heading hierarchy (no skips) | 1.3.1 AA | Code review |
| Semantic HTML throughout | 1.3.1 AA | Code review |
| Skip-to-content link | 2.4.1 A | Keyboard test |
| Envelope operable by keyboard | 2.1.1 A | Keyboard test |
| State changes announced | 4.1.3 AA | Screen reader test |
| No colour-only communication | 1.4.1 AA | Visual inspection |

### Manual Test Checklist

- [ ] Navigate entire page with Tab only
- [ ] Open envelope with keyboard (Enter/Space)
- [ ] Verify Skip closes intro (Escape / button)
- [ ] FAQ items: expand/collapse with keyboard
- [ ] Keepsake: submit form by keyboard, download
- [ ] Share action: keyboard accessible
- [ ] Enable `prefers-reduced-motion` → intro hidden, letter visible
- [ ] Convergence mark SVG is `aria-hidden`
- [ ] Wax seal SVG has accessible label when serving as interactive button
- [ ] All icons are `aria-hidden` or have a text label

---

## 14. Technical Implementation Plan

### Architecture Decisions

**Preserve:** React 18.3.1, Vite 6.0.5, vanilla CSS, lucide-react.

**Refactor:** Extract the envelope into its own component `src/components/Envelope.jsx`. The main App manages page-level state; Envelope manages its own animation phase state.

**CSS:** `src/styles.css` is replaced entirely with a mobile-first sheet. The new sheet is structured as:
1. `:root` custom properties (all tokens)
2. Reset and base element styles
3. Typography utilities
4. Layout utilities
5. Navigation
6. Hero
7. Envelope (intro)
8. Letter section
9. Event details
10. FAQ
11. Keepsake
12. Footer
13. Keyframes (named and grouped)
14. Reduced-motion overrides (single block at bottom)

### Component Boundaries

```
src/
  main.jsx              — App state, page assembly, data constants
  styles.css            — Complete design system and component styles
  components/
    Envelope.jsx        — Intro overlay state machine and animation
    EventDetails.jsx    — Countdown, details card, calendar action
```

### Data Constants

```javascript
// In main.jsx — updated before release:

// EVENT_DATE: Set to null until date confirmed by organizer (Q1)
// When confirmed: 'YYYY-MM-DDTHH:mm:ss+05:30'
const EVENT_DATE = null;

const INTRO_KEY   = 'sangama-intro-v1';  // changed from 'nirvahan-party-intro-v1'
const VENUE_NAME  = 'Srusti Academy of Management & Technology, JRD Tata Hall';
const VENUE_MAPS  = null; // confirmed Google Maps URL (Q3)
const EVENT_LABEL = 'SANGAMA \'26 — Where New Journeys Meet';
```

### Dependency Changes

**Remove from `package.json`:**
- `@radix-ui/react-accordion` (unused)
- `motion` (unused)

**Delete files:**
- `src/components/FuturisticIntroLoader.jsx`
- `src/components/accordion.jsx`
- Root `Crowd_cheering_at_music_concert_... - Trim.mp4`

**No new packages required.** SVG ribbon animation uses `stroke-dashoffset` (pure CSS/SVG). Audio feature (if enabled) uses `HTMLAudioElement`. Everything else: existing React, CSS, lucide-react.

### Font Loading (`index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,300..600&family=Outfit:wght@400;500;600&display=swap" />
```

---

## 15. Performance and Reliability Plan

### Core Web Vitals Targets

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| LCP | ≤ 2.5 s | DevTools Lighthouse, mobile simulation |
| INP | ≤ 200 ms | All interactive elements |
| CLS | ≤ 0.1 | Envelope animation must not shift layout |

### Performance Checklist

- [ ] Hero image converted to WebP, ≤ 300 KB, with explicit `width` and `height` (CLS prevention)
- [ ] Fonts loaded with `display=swap` and system fallbacks
- [ ] Video file (`crowd-cheering.mp4`) removed from primary experience; not loaded on page start
- [ ] Envelope animation uses only `transform` and `opacity` (no layout-triggering properties)
- [ ] `will-change: transform` applied to `.envelope-flap` and `.envelope-letter` during animation only; removed after via `animationend` callback
- [ ] SVG convergence mark and ribbon are inline SVGs (no external file requests)
- [ ] JS bundle ≤ 150 KB gzipped (no new dependencies)
- [ ] Variable fonts: two network requests total (Fraunces + Outfit)

### Graceful Fallbacks

| Scenario | Fallback |
| :--- | :--- |
| JavaScript fails | `<noscript>` message with event details in static HTML |
| Hero image missing | `alt` text visible; layout does not depend on image dimensions |
| Audio missing/blocked | Toggle hidden; silent experience |
| `navigator.share()` unavailable | Clipboard fallback |
| `navigator.clipboard` unavailable | Visible URL instruction |
| CSS 3D transforms unsupported | Envelope starts in open state with opacity transition |
| Font load fails | System serif + system UI fallbacks preserve vertical rhythm |
| Calendar download fails | `role="status"` error notice |

---

## 16. Content and Asset Manifest

### Confirmed

| Asset / Content | Status |
| :--- | :--- |
| Event name, tagline, audience, time, venue | ✅ Confirmed (brief) |

### Awaiting Approval (see Open Questions §4)

| Asset | Question | Placeholder |
| :--- | :--- | :--- |
| Event date | Q1 | `[EVENT DATE TO BE CONFIRMED]` |
| Maps URL | Q3 | Directions disabled |
| Welcome letter copy | Q4 | `[WELCOME LETTER PENDING]` — **P0** |
| Letter signatory | Q5 | `[SIGNED BY: TO BE CONFIRMED]` |
| Ambient audio file | Q6 | Feature disabled |
| Dress code | Q7 | FAQ answer marked tentative |
| Public URL | Q8 | OG tags use placeholder |

### Missing Assets (Must Be Created)

| Asset | Component | Priority |
| :--- | :--- | :--- |
| OG share image (1200 × 630 px) | `<head>` meta | P1 |
| SANGAMA '26 favicon SVG | `public/favicon.svg` | P1 |
| Convergence mark SVG (authored path) | Hero, section dividers | P1 |
| Wax seal SVG (dual-arc "S") | Envelope | P1 |
| Ribbon diagonal SVG paths | Envelope | P1 |
| Welcome letter copy | Envelope, `#letter` | P0 |

---

## 17. SEO, Sharing, and Privacy

### Head Metadata

```html
<title>SANGAMA '26 — Where New Journeys Meet · MCA Freshers</title>
<meta name="description" content="You're invited to SANGAMA '26 — where new journeys meet. MCA Freshers celebration at Srusti Academy of Management & Technology, JRD Tata Hall. 10:30 onwards." />
<meta name="theme-color" content="#3a0e18" />
<link rel="canonical" href="[PUBLIC URL]" />

<meta property="og:title" content="SANGAMA '26 — Where New Journeys Meet" />
<meta property="og:description" content="You're invited to the MCA Freshers celebration. Open your invitation." />
<meta property="og:image" content="[PUBLIC URL]/og-image.jpg" />
<meta property="og:type" content="website" />
<meta property="og:url" content="[PUBLIC URL]" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="SANGAMA '26 — Where New Journeys Meet" />
<meta name="twitter:description" content="You're invited. Open your invitation." />
<meta name="twitter:image" content="[PUBLIC URL]/og-image.jpg" />
```

**OG image:** 1200 × 630 px, `--wine-deep` background, `SANGAMA '26` in Fraunces display, tagline italic below, fine convergence mark, `--gold-light` rule line. A required missing asset (see §16).

### Privacy

- No cookies.
- `sessionStorage` key `sangama-intro-v1`: stores one boolean. No personal data.
- Keepsake name is used only in canvas `fillText()`, never sent to a server.
- No analytics, no tracking pixels, no third-party scripts beyond Google Fonts.

---

## 18. Implementation Roadmap

### Phase A — Foundation and Design System
**Objectives:** Clean project, correct dependencies, new design system active.

1. `npm install`
2. Delete `src/components/FuturisticIntroLoader.jsx`, `src/components/accordion.jsx`
3. Delete root duplicate video
4. Remove `@radix-ui/react-accordion` and `motion` from `package.json`; `npm install` again
5. Replace `src/styles.css` with new mobile-first design system (tokens, reset, layout, typography utilities)
6. Update `index.html`: title, meta description, `theme-color: #3a0e18`, Fraunces + Outfit fonts, OG/Twitter meta placeholders
7. Replace `public/favicon.svg` with SANGAMA '26 mark
8. Update data constants in `main.jsx`: `INTRO_KEY`, `VENUE_NAME`, `EVENT_LABEL`
9. `npm run dev` — verify no console errors, new tokens visible in DevTools

**Acceptance:** `npm run dev` runs; browser tab reads "SANGAMA '26"; no orphaned components; tokens visible.

---

### Phase B — Core Invitation Experience
**Objectives:** Envelope and letter interaction complete, all viewports functioning.

1. Author the SVG assets: convergence mark, wax seal "S" monogram, diagonal ribbon paths
2. Create `src/components/Envelope.jsx` with full state machine
3. CSS for envelope: `.envelope-scene`, `.envelope-body`, `.envelope-flap`, `.envelope-letter`, `.envelope-ribbon` (SVG inline), `.envelope-seal` (SVG inline)
4. Integrate `<Envelope>` into main page, replacing `<OpeningTicket>`
5. Implement Skip/Escape/focus-trap logic (port from existing intro engine)
6. Implement keyboard operability (`tabindex="0"`, Enter/Space handling)
7. Implement `aria-live` announcement on open
8. Implement `prefers-reduced-motion` fallback
9. Implement interruption guard (`isOpening` flag)
10. Build hero section: convergence mark, title, tagline, CTA
11. Build `#letter` section: open letter card (shows after intro closes)
12. Build event details section with conditional countdown
13. Cross-viewport check: 320, 360, 390, 430, 640, 768, 1024, 1366 px

**Acceptance:** Envelope opens on first tap; letter readable; no overflow at 320 px; reduced-motion shows letter immediately.

---

### Phase C — Visual Polish and Supporting Features
**Objectives:** FAQ, keepsake, share updated to SANGAMA '26 identity; all visual details refined.

1. Update FAQ with confirmed content; mark tentative items
2. Redesign keepsake canvas (SANGAMA '26 design, dual-rule frame, convergence mark, wine-deep background)
3. Update `.ics` calendar generator with SANGAMA '26 identity
4. Implement `navigator.share()` with clipboard fallback
5. Create OG image (1200 × 630 px) and add to `public/`
6. Update all OG meta tag references from placeholders to actual `og-image.jpg`
7. Convert `public/freshers-editorial.png` to WebP if retained (≤ 300 KB)
8. Replace old `public/crowd-cheering.mp4` reference (remove from experience)
9. Implement audio toggle stub (UI visible, no audio until Q6 resolved)
10. Apply all hover states and micro-interactions across all components

**Acceptance:** No Nirvahan copy anywhere; keepsake downloads SANGAMA '26 PNG; share works on mobile.

---

### Phase D — Responsive and Accessibility Hardening
**Objectives:** All target viewports verified; all WCAG items confirmed.

1. DevTools responsive test: 320, 360, 390, 430, 640, 768, 1024, 1366 px
2. Fix any overflow, clipping, or layout breaks
3. Keyboard-only navigation test (complete page, no mouse)
4. `prefers-reduced-motion` OS setting test
5. Contrast check: all colour combinations against WCAG AA
6. Screen reader test: VoiceOver iOS or NVDA Windows
7. Touch target audit: all elements ≥ 44 × 44 px
8. Minimum font size check: no text below 11 px
9. Verify SVG ribbon paths are `aria-hidden`
10. Verify focus ring visible on wine and off-white surfaces

**Acceptance:** All WCAG 2.2 AA items in §13 pass; zero horizontal scroll; all focus rings visible.

---

### Phase E — Performance, Regression, and Release
**Objectives:** Production build validated; all placeholder text resolved or confirmed pending.

1. `npm run build`
2. `npm run preview` — open at localhost:4173
3. Browser console: zero errors, zero unresolved warnings
4. Lighthouse mobile simulation: LCP ≤ 2.5 s, CLS ≤ 0.1
5. Verify `.ics` in Chrome, Firefox, Safari mobile
6. Verify share on Chrome Android and Safari iOS
7. Final placeholder audit: no `[...]` text published as real content
8. Update `README.md` to describe SANGAMA '26

**Acceptance:** Build passes; LCP ≤ 2.5 s; zero console errors; no placeholder text published.

---

## 19. File-Level Change Plan

| File | Action | Reason |
| :--- | :--- | :--- |
| `src/main.jsx` | Modify | Brand constants, section structure, component imports |
| `src/styles.css` | Replace entirely | New mobile-first design system |
| `src/components/Envelope.jsx` | Create | New centrepiece interaction |
| `src/components/EventDetails.jsx` | Create | Extracted countdown + details card |
| `src/components/FuturisticIntroLoader.jsx` | Delete | Orphaned |
| `src/components/accordion.jsx` | Delete | Orphaned |
| `index.html` | Modify | Title, meta, fonts, OG tags |
| `public/favicon.svg` | Replace | SANGAMA '26 mark |
| `public/freshers-editorial.png` | Convert to WebP | Pending Q9 approval |
| `public/crowd-cheering.mp4` | Remove from experience | Not used in new design |
| `public/og-image.jpg` | Create | Missing social sharing asset |
| `package.json` | Modify | Remove `motion`, `@radix-ui/react-accordion` |
| `README.md` | Modify | Update for SANGAMA '26 |
| `THIRD_PARTY_NOTICES.md` | Modify | Remove accordion notice |
| Root `Crowd_cheering_at_music_concert_... - Trim.mp4` | Delete | Duplicate |

---

## 20. Testing and Quality Assurance

### Function Tests

| Function | Test |
| :--- | :--- |
| `remaining()` | Returns `[0,0,0,0]` when `EVENT_DATE` is in the past; returns `null` when `EVENT_DATE = null` |
| `saveCalendar()` | Downloads `sangama-2026.ics` with SANGAMA identity |
| `keepsake()` | Downloads PNG with SANGAMA branding; rejects whitespace-only name |
| `share()` | Native sheet on mobile; clipboard fallback; error notice if both fail |

### Interaction Tests

- [ ] Intro closes automatically: No — it waits for user action
- [ ] Envelope: first tap opens; second tap during animation is blocked
- [ ] Escape closes intro; focus restores to main content
- [ ] Skip button closes intro; focus restores
- [ ] Enter/Space on envelope triggers opening
- [ ] Tab during intro: envelope → skip only (two-item trap)
- [ ] Mobile menu: opens/closes with toggle and Escape
- [ ] FAQ: each item expands/collapses by keyboard
- [ ] Keepsake: empty name rejected inline
- [ ] Share: native on mobile; clipboard fallback on desktop

### Visual Tests (DevTools responsive, each width)

Test at: 320, 360, 390, 430, 640, 768, 1024, 1366 px
- [ ] No horizontal scrollbar
- [ ] Envelope within viewport bounds
- [ ] All buttons ≥ 44 px height
- [ ] No text below 11 px
- [ ] Hero title fits on one line at 360 px (verify this)
- [ ] Letter readable without zoom

### Browser Tests

- [ ] Chrome latest (desktop)
- [ ] Firefox latest (desktop)
- [ ] Safari latest (macOS)
- [ ] Chrome Android (latest)
- [ ] Safari iOS (latest)

---

## 21. Acceptance Criteria

### Critical (Release Blockers)

| # | Criterion | Test Method |
| :--- | :--- | :--- |
| AC-01 | Page title reads "SANGAMA '26" | Browser tab |
| AC-02 | No text in built output reads "Nirvahan" | Full-text search |
| AC-03 | Envelope opens on first tap/click on mobile | Manual device test |
| AC-04 | Letter readable immediately after envelope opens | Visual + screen reader |
| AC-05 | No horizontal overflow at 360 px | DevTools responsive |
| AC-06 | All buttons ≥ 44 × 44 px minimum | DevTools inspection |
| AC-07 | `npm run build` completes with zero errors | Terminal |
| AC-08 | Zero console errors in production preview | Browser console |
| AC-09 | Reduced-motion: letter visible immediately, no animation | OS setting test |
| AC-10 | Keyboard: envelope opens with Enter/Space | Keyboard-only test |

### Important (Should Pass Before Release)

| # | Criterion |
| :--- | :--- |
| AC-11 | All colour combinations pass WCAG AA (measured, not estimated) |
| AC-12 | Keepsake PNG contains "SANGAMA '26" branding |
| AC-13 | `.ics` downloads with "SANGAMA '26" event identity |
| AC-14 | No text below 11 px at any viewport |
| AC-15 | OG share preview appears correctly in WhatsApp |
| AC-16 | Share action triggers native sheet on Chrome Android |
| AC-17 | LCP ≤ 2.5 s in DevTools Lighthouse mobile |
| AC-18 | CLS ≤ 0.1 (envelope animation does not shift layout) |
| AC-19 | Directions disabled/hidden until Q3 confirmed |
| AC-20 | All `[...]` placeholder text either replaced or visually marked as pending |

---

## 22. Risk Register

| Risk | Likelihood | Impact | Mitigation | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| Event date not confirmed before publication | High | High | `EVENT_DATE = null` triggers placeholder mode automatically | Publish without countdown; add date after |
| Welcome letter copy not provided | High | High — P0 blocker | Maintain placeholder structure | Generic "Your invitation awaits" message |
| SVG ribbon paths require design authoring | Medium | High — ribbon is core visual | Define paths during Phase B; can be simple Bezier curves | CSS border lines as simplified fallback |
| Portrait envelope wraps oddly at narrow width | Medium | Medium | Test at 320 px in Phase B; use `min()` width constraint | Switch to landscape format if portrait fails |
| Fraunces display at 56px on 360px: unclear line breaks | Medium | Low — aesthetic only | Verify in Phase B; adjust clamp minimum | Reduce to 48px minimum |
| 3D flap jank on low-end Android | Medium | High — core interaction | Use `will-change: transform` only during animation; test on Moto G simulation | Flat `rotateX` alternative; or `opacity` + `translateY` only |
| Audio asset not supplied | High | Low — feature optional | Audio feature stubbed as no-op | Toggle hidden |
| Hero image not approved for SANGAMA '26 | Medium | Medium | Confirm Q9 with organizer | Remove image; typographic hero only |
| Google Fonts blocked (offline / regional) | Low | Low | System serif + sans fallbacks defined | Graceful degradation |

---

## 23. Decisions Log and Release Checklist

### Decisions Log

| Decision | Alternatives Considered | Evidence | Status |
| :--- | :--- | :--- | :--- |
| Creative concept: "Two Lines Meet" | "Printed Letter", "New Faces" | See CREATIVE_DIRECTION_REVIEW.md §3 | ✅ Decided |
| Typography: Fraunces + Outfit | Cormorant Garamond + Plus Jakarta Sans; EB Garamond + Source Serif 4; Bebas Neue + Nunito | CREATIVE_DIRECTION_REVIEW.md §5 | ✅ Decided |
| Colour: narrative palette (three temperatures) | Single burgundy scheme; monochromatic cream | CREATIVE_DIRECTION_REVIEW.md §6 | ✅ Decided |
| Envelope opens once (fullscreen intro = envelope) | Fullscreen intro + separate in-page envelope | Structural redundancy identified | ✅ Decided |
| Portrait 3:4 envelope (not landscape) | Standard landscape envelope | Mobile viewport optimisation | ✅ Decided — needs prototype verification |
| SVG `stroke-dashoffset` for ribbon untie | CSS `scaleY` animation; clip-path | Physical plausibility; no landscape ribbon | ✅ Decided — requires authored SVG path |
| CSS-only animation (no animation library) | `motion` library, GSAP | `motion` already unused; CSS sufficient | ✅ Decided |
| Remove experience tabs and video section | Retain with optimised video | 5.15 MB load; dilutes centrepiece | ✅ Decided |
| `EVENT_DATE = null` when unconfirmed | Show previous Nirvahan date | Accuracy requirement | ✅ Decided |
| Audio: disabled until asset confirmed | Generate Web Audio tones | No approved asset exists | ✅ Decided |
| Venue from brief (JRD Tata Hall), not code | Use code value "Srusti Auditorium" | Brief takes precedence; organizer must verify | ✅ Decided |
| No JS animation library | Add GSAP or `motion` | No new dependencies rule; CSS sufficient | ✅ Decided |

### Final Release Checklist

**Content**
- [ ] All "Nirvahan" text removed from entire built output
- [ ] SANGAMA '26 identity consistent in page, meta, keepsake, `.ics`
- [ ] Venue matches brief: JRD Tata Hall
- [ ] Event date confirmed or clearly marked `[EVENT DATE TO BE CONFIRMED]`
- [ ] Welcome letter contains approved copy or visible placeholder (not silent omission)
- [ ] FAQ answers confirmed or marked `⚠ Subject to confirmation`
- [ ] No placeholder `[...]` text published as real content

**Visual Quality**
- [ ] Fraunces renders correctly at all breakpoints
- [ ] Convergence mark SVG draws in correctly on load
- [ ] Envelope: ribbon, seal, and flap render at all viewport widths
- [ ] No horizontal overflow at 320, 360, 390, 430, 640, 768, 1024, 1366 px
- [ ] All text ≥ 11 px
- [ ] All colour contrasts verified (not estimated)
- [ ] Footer in `--wine-deep` with `--gold-light` rule

**Interactions**
- [ ] Envelope opens on tap/click/Enter/Space
- [ ] Cannot be triggered twice simultaneously
- [ ] Skip/Escape dismiss; focus restores
- [ ] FAQ keyboard operable
- [ ] Keepsake form validates; downloads
- [ ] Share native on mobile; fallback on desktop
- [ ] `.ics` imports into calendar app
- [ ] Replay intro works from footer
- [ ] All hover states present on pointer-capable devices
- [ ] All `:active` states present on touch devices

**Accessibility**
- [ ] All WCAG 2.2 AA items in §13 pass
- [ ] Keyboard-only: complete page navigation
- [ ] Reduced-motion: intro hidden; letter immediately visible
- [ ] Screen reader announces envelope state change
- [ ] No colour-only information

**Performance**
- [ ] `npm run build` passes; zero errors
- [ ] Zero console errors in production preview
- [ ] LCP ≤ 2.5 s (DevTools Lighthouse mobile)
- [ ] CLS ≤ 0.1

**Browser**
- [ ] Chrome (desktop), Firefox (desktop), Safari (macOS)
- [ ] Chrome Android, Safari iOS

---

## Quality Scoring Framework (100-Point Rubric)

| Quality Area | Weight | Pass Threshold | Critical Blocker |
| :--- | :---: | :--- | :--- |
| Visual identity and originality | 20 | ≥ 17/20: Convergence concept visible in hero, envelope, and section dividers; Fraunces correctly rendered | Any "Nirvahan" text; generic luxury template appearance |
| Typography and hierarchy | 15 | ≥ 13/15: All scale levels correct; no text below 11px; Fraunces italic in tagline; Outfit in UI | Text below 11px; wrong font on CTA |
| Colour palette and visual harmony | 15 | ≥ 13/15: Colour narrative present; no homogeneous burgundy; contrast verified | Contrast failures; `--blue` or `--coral` from old palette remaining |
| Motion and animation direction | 15 | ≥ 13/15: Cause-and-effect sequence working; SVG ribbon animates; no janky layout shifts | Envelope not opening; CLS > 0.1 |
| Hover effects and micro-interactions | 15 | ≥ 13/15: Every component has defined state; no hover required for core function | Core action reachable by hover only |
| Mobile-first composition | 10 | ≥ 8/10: Portrait envelope at 360px; no overflow; 52px+ buttons; 11px+ text | Horizontal scroll; envelope exceeds viewport |
| Accessibility and performance | 10 | ≥ 8/10: All WCAG AA items pass; LCP ≤ 2.5s; build clean | Keyboard trap; WCAG AA contrast failure; build error |
| Specification delivery | 5 | ≥ 4/5: All confirmed details accurate; no invented facts | Wrong venue or date published |
| **Total** | **105** | **≥ 89/105** | **Any critical blocker prevents release** |

*Note: Total is 105 rather than 100 because mobile-first (10) and accessibility/performance (10) are both critical enough to require their own weighted entries in a design for this audience.*

---

*This specification supersedes UPGRADE2.0.md Version 1. No application source files were modified during its creation. Refer to CREATIVE_DIRECTION_REVIEW.md for the full art-direction analysis, concept comparisons, and 85/100 self-assessment.*

*All conflicts between this specification and future instructions should be resolved in favour of: (1) verified confirmed facts, (2) the stated priority order: accuracy → usability → visual distinction → motion.*
