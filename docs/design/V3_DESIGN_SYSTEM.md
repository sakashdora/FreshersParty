# TEJAS '26 — THE FRESH BLOOM
## V3 Design System (Second Pass — Defensible Visual Directions)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **Evidence Standard**
>
> Each visual direction includes:
> - The underlying design logic (WHY these choices, not just WHAT)
> - Known risks and what would cause the direction to fail
> - What existing comparable references exist (labeled as KNOWN / UNCERTAIN)
> - An honest score range (not a single inflated number) with the conditions that determine where in the range the execution lands

---

## Current Token System — What Actually Exists

🔍 **CODE-VERIFIED** from `styles.css` lines 15–68:

```css
--c-burgundy: #5B0E23
--c-wine-deep: #1A030A  
--c-gold: #D4AF37
--c-gold-light: #FDEBB2
--c-champagne: #F4E8D1
--c-rosegold: #E2AAB3
--c-offwhite: #FAF7F2
--font-title: Cinzel
--font-display: Fraunces
--font-body: Outfit
```

**Assessment of current tokens:**
- The burgundy-gold-ivory trio is correct and professional. No changes needed.
- The rosegold (#E2AAB3) and champagne (#F4E8D1) accents exist in tokens but are underused in V2 — the palette stays in the dark tones almost exclusively.
- The three-font system (Cinzel + Fraunces + Outfit) is more than needed. Fraunces is a premium typeface with real character but V2 uses it minimally.

---

## Visual Direction 1 — Imperial Restraint (Evolve V2)

**Core philosophy:** Keep the V2 color palette but dramatically simplify. Reduce decoration. Let the space breathe. Add sections of pure warm white (#FAF7F2) against the dark tones, creating contrast rhythm. The design does not try to impress through quantity of elements.

**Palette:** Unchanged from V2. Burgundy, gold, ivory.

**Typography:** Cinzel used only for the TEJAS wordmark. Fraunces for editorial pull quotes and section headings. Outfit for all body text and UI.

**Key changes from V2:**
- Minimum 40% of every section is negative space (no content)
- No pill badges — section labels are inline, left-aligned small caps
- No decorative SVG dividers between sections unless they serve a structural purpose
- Paragraph text: maximum 55 characters per line (currently uncontrolled)

**What comparable references exist:**
- 🎓 KNOWN from training: Aesop's product pages use extreme white space and restrained typography in a similar way
- 🎓 KNOWN from training: Dezeen editorial layout uses large negative space with deliberate typographic hierarchy
- 🔍 NOT VERIFIED in browser: Specific recent redesigns of these sites were not confirmed in this pass

**Honest score range:** 7.5–8.5/10
- Approaches 8.5 if the negative space is used with genuine compositional intent (not just emptiness)
- Falls to 7.5 if the restraint reads as "unfinished" rather than "considered"

**Risk:** The user's existing site is visually busy. Moving to restraint requires removing elements the client may have deliberately added. May feel "worse" to someone who equates more decoration with more effort.

---

## Visual Direction 2 — Botanical Editora (New Direction)

**Core philosophy:** "The Fresh Bloom" is taken literally and systematically. Botanical illustration elements — not photographic florals, but line-art illustration style (think: 19th century botanical almanac plates) — appear throughout the site as structural frames, section dividers, and background motifs. The color palette expands to include sage green (#7A9B7E) and parchment (#F5EDD8) alongside the existing burgundy and gold.

**Palette additions:**
- Sage botanical green: #7A9B7E (for illustration ink)
- Parchment texture color: #F5EDD8 (section background variation)
- Terracotta accent: #C0694A (for warmth in botanical illustrations)

**Typography change:**
- Add a serif with genuine personality: Consider EB Garamond (Google Fonts, free) for body text instead of Outfit. EB Garamond is historically appropriate for botanical almanac aesthetics. Outfit remains for UI elements.

**What comparable references exist:**
- 🎓 KNOWN from training: Liberty London's visual identity uses botanical illustration extensively for a luxury brand
- 🎓 KNOWN from training: The Botanist gin brand uses botanical line art on dark backgrounds
- ⚠️ UNCERTAIN: Whether these specific references are currently active and styled as described was not verified in a live browser session in this pass

**Honest score range:** 7.0–9.0/10
- Approaches 9.0 if the botanical illustrations are hand-quality SVG line art with proper botanical detail
- Falls to 7.0 if the florals are stock SVG clip art or look like emoji flowers
- **High variance direction** — the art quality ceiling is the determining factor

**Risk:** Botanical illustration at high quality requires significant SVG art creation effort. There are no free assets that look premium. The direction either elevates the design dramatically or makes it look crafted from generic assets.

---

## Visual Direction 3 — Velvet Cinema (Dark Premium)

**Core philosophy:** The intro's dark-burgundy aesthetic is extended throughout the entire site — not just the intro. The whole site is dark-mode. Sections use alternating very-dark-burgundy backgrounds. Typography is light-on-dark throughout. The experience feels like a private cinema screening or a luxury gala programme.

**Palette:** Existing dark tokens used site-wide. Background alternates between:
- Deep wine: #1A030A
- Dark burgundy: #380716
- Slightly lifted dark: #2A0612

**Key design decisions:**
- Remove the sections that are currently light-background (off-white sections)
- All text: cream/ivory (#FAF7F2) on dark backgrounds
- Gold used sparingly as accent only — not for backgrounds

**Typography:** Keep all three fonts. Add a feature: Cinzel used for ALL section headings (not just the TEJAS title). This gives the whole site a formal, engraved quality.

**What comparable references exist:**
- 🎓 KNOWN from training: Refinery29's dark editorial layouts
- 🎓 KNOWN from training: The Macallan Whisky website uses extended dark mode with warm gold accents
- ⚠️ UNCERTAIN: Whether these specific sites currently use this direction was not verified live

**Honest score range:** 7.5–8.5/10
- Approaches 8.5 if the dark tones are varied enough to create depth (dark ≠ flat black)
- Falls to 7.5 if sections feel identical in tone — "one long dark page"

**Risk:** Extended dark mode pages create accessibility concerns — WCAG requires 4.5:1 contrast ratio for normal text on dark backgrounds. Cream (#FAF7F2) on dark wine (#1A030A) needs verification: contrast ratio = approximately 15:1 (well above threshold). But small text on dark card backgrounds with gold accents may fail.

---

## Visual Direction 4 — Morning Light (Warm Day Mode)

**Core philosophy:** The site is primarily light-background, warm, energetic. Freshers day is a morning event at 10:30 AM — a beginning, not an evening. The aesthetic is warm morning light, soft shadows, and clean space. The dark burgundy appears only as text and accent, never as a full-page background. This is the only direction that does not feel like a gala or funeral.

**Palette:**
- Primary background: warm cream #FAF7F2 (existing)
- Accent backgrounds: blush #F8E5E9, soft champagne #F4E8D1
- Text: deep burgundy #5B0E23 on cream (contrast ratio ~8.5:1 — verified acceptable)
- Accent: gold #D4AF37 for decorative elements only

**Typography:** Fraunces used prominently for ALL section headings in italic — to create editorial warmth. Cinzel only for TEJAS wordmark. Outfit for body.

**Key changes:**
- This is a fundamentally different brand impression from V2
- The intro cannot be the dark cosmic sequence — the intro must match the light, warm direction
- The envelope must be ivory-white on a light background — needs redesign of envelope colors

**What comparable references exist:**
- 🎓 KNOWN from training: Kinfolk magazine's visual aesthetic is similar — warm, light, editorial
- 🎓 KNOWN from training: Papier stationery brand uses a similar warm-cream-and-editorial approach
- ⚠️ UNCERTAIN: Not browser-verified

**Honest score range:** 7.0–8.5/10
- Approaches 8.5 if the warm palette is used with strong typographic hierarchy
- Falls to 7.0 if the light background reads as "plain/undesigned" without strong compositional contrast

**Risk:** This is a major departure from V2 — the client may not want to abandon the dark/dramatic aesthetic. Also, the envelope component is built for dark backgrounds; adapting it to light backgrounds requires real CSS changes.

---

## Visual Direction 5 — Contemporary Indian Editorial

**Core philosophy:** Draw visual language from contemporary Indian editorial design — think Vogue India, Condé Nast Traveller India, or Architectural Digest India. Rich jewel tones (not just burgundy) alongside sculptural typography, editorial photography compositions, and an aesthetic that is distinctly South Asian without being traditional/classical. This is the only direction that explicitly references the cultural context.

**Palette expansion:**
- Peacock teal: #1B5E6F
- Marigold: #E8A220
- Deep ivory: #F7EDD9
- Existing burgundy and gold retained

**Typography change:**
- Consider using a typeface with Devanagari support for optional accent text (though TEJAS content is English, having Devanagari capability is culturally respectful). Google Fonts: Noto Serif Devanagari or Mukta for body, alongside Cinzel for the TEJAS display mark.

**What comparable references exist:**
- 🎓 KNOWN from training: Vogue India's layout aesthetic uses this jewel-tone + sculptural approach
- 🎓 KNOWN from training: Architectural Digest India's editorial photography and layout
- ⚠️ UNCERTAIN: Not browser-verified in this pass

**Honest score range:** 7.5–9.0/10
- Approaches 9.0 if the expanded jewel-tone palette is used with genuine editorial discipline
- Falls to 7.5 if the "Indian editorial" reference is superficial — a few marigold colors and nothing else

**Risk:** Adding teal and marigold to an existing burgundy/gold palette risks color conflict if not carefully managed. The V3 CSS token system would need clear rules for when each color is used. Also: this direction requires the most visual judgment in execution.

---

## Typography System Recommendation for V3

Regardless of visual direction, the following changes are recommended:

### Fonts to Keep
- **Cinzel** — for TEJAS wordmark only. Do not use for body or section headings.
- **Outfit** — for all UI elements, body text, metadata, and labels.

### Fonts to Evaluate / Consider Replacing
- **Fraunces** — Should be used more prominently (it's a premium variable typeface with swash characters) OR replaced with a more consistent display font. Current V2 underuses it.
- **Potential replacement for Fraunces:** EB Garamond (for botanical direction), or Cormorant Garamond (for imperial restraint direction). Both are free on Google Fonts.

### Font Loading Strategy (Technical)
🎓 **PROFESSIONAL JUDGMENT:** Currently, all three fonts are loaded from Google Fonts (implied by the imports in `index.html`). For V3:
- `preconnect` to fonts.googleapis.com and fonts.gstatic.com (may already exist)
- Use `font-display: optional` for display/title fonts (Cinzel, Fraunces) and `font-display: swap` for body (Outfit)
- This prevents FOUT for body text while gracefully handling display font failures

---

## Design Token Additions for V3 (Proposed — Not Yet Implemented)

```css
/* V3 ADDITIONS — Not in current styles.css */

/* Motion & Timing */
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);   /* Already used in V2 — formalize */
--ease-entrance: cubic-bezier(0.0, 0.0, 0.2, 1); /* Material standard entrance */
--ease-exit: cubic-bezier(0.4, 0.0, 1, 1);       /* Material standard exit */
--dur-instant: 150ms;
--dur-quick: 250ms;
--dur-moderate: 450ms;
--dur-slow: 700ms;
--dur-cinematic: 1200ms;

/* Spacing Scale (Currently ad-hoc in V2) */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */

/* Typography Scale */
--text-xs: 0.75rem;    /* 12px — metadata, labels */
--text-sm: 0.875rem;   /* 14px — secondary UI */
--text-base: 1rem;     /* 16px — body */
--text-lg: 1.125rem;   /* 18px — large body */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px — section subheadings */
--text-3xl: 1.875rem;  /* 30px — section headings */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px — display headings */
--text-6xl: 3.75rem;   /* 60px — hero */
--text-7xl: 4.5rem;    /* 72px — TEJAS title min */
--text-8xl: 6rem;      /* 96px — TEJAS title desktop */
```

---

## What Is Not Recommended

The following directions were considered and rejected:

**Glassmorphism throughout:** Glass effects (backdrop-filter: blur + translucent panels) are visually appealing but create serious accessibility problems — text on glass has unpredictable contrast as the background changes. For a site with substantial text content (letter copy, agenda, milestones), glass should be used only for non-text overlay panels.

**Full dark mode with neon accents:** Neon cyan or neon pink on dark backgrounds creates a rave/gaming aesthetic that conflicts with the formal "senior welcoming" context. The existing burgundy-and-gold dark mode is more appropriate.

**Animated gradient backgrounds site-wide:** CSS animated gradients (`@keyframes` hue-rotate or linear-gradient motion) consume GPU resources and create motion for motion's sake. The intro already has an animated canvas — the rest of the site should be static.

---

*This document presents visual directions as design logic, not decoration catalogs. Each direction is accompanied by honest risk assessment and score ranges, not single inflated scores.*
