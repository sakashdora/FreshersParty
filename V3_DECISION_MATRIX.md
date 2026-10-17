6# TEJAS '26 — THE FRESH BLOOM
## V3 Decision Matrix (Second Pass — Explicit Trade-offs)
**Date:** October 2026 | **Status:** Planning Phase Only | **No Code Modified**

---

> **How to Use This Document**
>
> The decision matrix presents options and their trade-offs explicitly. It does not hide conflicts
> behind inflated scores. Where two options are in tension, the tension is named. Where an option
> has a known failure mode, the failure mode is stated.
>
> A recommendation is given for each section, but recommendations are labeled either:
> - ✅ CONFIDENT — low-risk choice with high design floor
> - ⚖️ CONDITIONAL — depends on execution quality or a specific capability
> - ⚠️ HIGH-RISK/HIGH-REWARD — can be excellent or can fail, execution-dependent

---

## Evaluation Dimensions

For each section, options are evaluated on:
1. **Design floor** — How good is the worst reasonable execution of this option?
2. **Design ceiling** — How good could the best execution be?
3. **Implementation effort** — Low / Medium / High / Very High
4. **Mobile quality** — How well does it work on a 375px screen?
5. **Brand fit** — Does it serve "The Fresh Bloom" and the celebration context?
6. **Failure mode** — What specifically causes this option to fail?

---

## Section 1 — Cinematic Intro

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Kinetic Typography | 7.5 | 8.5 | Low | Excellent | Moderate (botanical line) | Font load failure / FOUT |
| B: Botanical Petal | 6.0 | 9.0 | High | Good | High (literal bloom) | Poor SVG art quality |
| C: Theatre Curtain | 6.5 | 7.8 | Low | Good | Moderate | Reads as PowerPoint |
| D: Photo Reveal | 6.0 | 7.5 | Low | Medium | Low (no bloom ref) | Poor image quality |
| E: Letter Origin | 6.5 | 8.8 | Very High | Medium | Moderate | SVG morph artifacts |

**Decision:** ⚖️ CONDITIONAL RECOMMENDATION — **Option A or Option B**

- **Choose Option A** if you want a high design floor with low implementation risk. The typography sequence is disciplined and professional. It will not fail badly. Ceiling is limited.
- **Choose Option B** if the botanical petal reveal can be executed with high-quality SVG art. The ceiling is the highest of the five options and it directly embodies "The Fresh Bloom." The risk is that the flower art must be genuinely beautiful — clip art or generic SVG florals will destroy this option.

**Options A and C share the same risk: complete dependence on web font loading.** If Cinzel or Fraunces fails to load before the animation begins, the design falls apart. `font-display: optional` mitigates but does not eliminate this.

---

## Section 2 — Hero Section

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Full-Width Typography | 7.0 | 8.5 | Low | Excellent | Moderate | Feels cold without envelope |
| B: Split Diptych (Refined) | 6.5 | 8.0 | Low | Good | High | Still looks like V2 |
| C: Full-Bleed Image | 6.0 | 7.5 | Low | Medium | Low | Image quality dependent |
| D: Horizontal Scroll | 4.0 | 7.0 | High | Poor | Moderate | Accessibility failure |
| E: Countdown Integration | 6.0 | 7.5 | Medium | Good | Moderate | Breaks after event date |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option B (Split Diptych, Refined)**

Rationale: The envelope and the hero text are already built and working. The fundamental problem with the V2 hero is not the layout — it is the 5-level text hierarchy and the 63-word paragraph. Fixing those problems (reducing to 3 hierarchy levels, removing the paragraph from the hero, removing nav chips) will dramatically improve the hero without a full redesign.

Option D (Horizontal Scroll) scores lowest because horizontal scroll on a vertical-scroll site creates a navigation conflict that hurts accessibility and discoverability. It would score below V2 on mobile experience.

---

## Section 3 — Invitation Letter (Opened State)

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Newspaper Column | 7.0 | 8.5 | Low | Medium | High | Column layout fragile on mobile |
| B: Handwritten Script | 6.0 | 8.0 | Medium | Good | High | Fake handwriting reads as fake |
| C: Folded Paper Reveal | 7.0 | 8.5 | High | Medium | High | CSS 3D complex on mobile |
| D: Invite Card Format | 7.5 | 8.5 | Low | Good | High | Short copy may feel thin |
| E: Scroll-Activated | 6.5 | 8.0 | Medium | Medium | Moderate | Scroll-within-scroll UX conflict |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option A (Newspaper Column) or Option D (Invite Card)**

- **Option A**: Newspaper column format is the most typographically correct for the letter copy. Left-aligned prose in two columns is how a real formal letter is laid out. The multi-column layout also solves the centered text readability problem.
- **Option D**: If the letter copy is reduced to its essential message (3–4 short paragraphs max), the invite card format creates a premium, highly designed feel. Appropriate if V3 treats the letter as a card rather than prose.

**Option E has a fundamental UX conflict:** scroll-within-letter creates a second scroll context inside the main scroll. On mobile, this is almost always a confusing experience. Not recommended.

---

## Section 4 — Milestones

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Large Numeral Pair | 7.5 | 9.0 | Low | Good | High | Numerals must be very large |
| B: Horizontal Timeline | 7.0 | 8.5 | Medium | Poor | High | Horizontal rail bad on mobile |
| C: Full-Bleed Panels | 7.5 | 8.5 | Low | Excellent | High | Two panels feel like too much space |
| D: Flip Cards | 6.5 | 8.0 | Medium | Medium | Moderate | Flip on mobile requires tap-twice |
| E: Newspaper Front Page | 6.5 | 8.5 | Medium | Medium | Moderate | Ironic framing may feel amateur |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option A (Large Numeral Pair)**

Rationale: Displaying "27" and "30" as enormous typographic elements (180–200px, Cinzel) with event details between them is compositionally strong, naturally reads on mobile, and creates a visually distinctive section that is unlike any other section on the page. Implementation effort is low — it is fundamentally a typographic layout with no complex interaction.

Option B fails on mobile because horizontal timeline rails require left-right gestures on a device where the dominant gesture is vertical scroll. This conflicts with the browser's scroll behavior.

---

## Section 5 — Agenda (13 Sessions)

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Timeline Spine | 6.5 | 8.0 | Medium | Medium | High | Dense on mobile |
| B: Accordion | 7.5 | 8.5 | Low | Excellent | High | Vanilla if transitions are basic |
| C: Masonry Grid | 6.5 | 8.0 | Medium | Good | Moderate | Grid reflow jarring on resize |
| D: Horizontal Scroll | 4.5 | 7.0 | High | Poor | Moderate | Fights scroll direction |
| E: Magazine Feature | 6.5 | 8.5 | High | Medium | Moderate | Image quality dependent |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option B (Accordion)**

Rationale: 13 sessions as an accordion is the most practical solution for this content. The V2 approach of showing all 13 sessions as cards creates a long, scrollable list with no visual hierarchy. An accordion with spring animations on expand/collapse, decorative gold dividers between rows, and a clean session header (time + title) creates the same information density with far better scanability.

Critically: accordion is the best mobile pattern for a long list of content items. One thumb tap reveals full details, one tap collapses. No scroll-within-scroll conflict.

Option D fails for the same horizontal scroll reason as the Milestones timeline.

---

## Section 6 — Visual Gallery

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Illustrated Gallery | 7.0 | 8.5 | Medium | Good | High | Illustration quality dependent |
| B: Photo + Submit CTA | 6.5 | 7.5 | Low | Good | High | Empty slots look unfinished |
| C: Typography-Only | 7.0 | 8.0 | Low | Excellent | Moderate | Reads as "no images available" |
| D: Mood Board | 7.0 | 8.0 | Low | Good | High | May look like a brand pitch deck |
| E: Video Teaser | 6.5 | 8.5 | High | Medium | High | Autoplay video is intrusive |

**Decision:** ⚖️ CONDITIONAL — **Option A (Illustrated) or Option D (Mood Board)**

**The honest core problem for the gallery:** This is a pre-event website. There are no real photos. Any gallery must either:
1. Use generated/illustrated content that is clearly non-photographic (Options A, C, D)
2. Acknowledge the placeholder state and invite future contributions (Option B)

Option B is honest but may undermine the premium feeling — placeholder slots are a design admission of incompleteness.

Option A is recommended if the illustrations can be generated with sufficient art quality (using an image generation tool during implementation). Generated illustrations in a consistent editorial style (line art, botanical, color-wash) can look intentional. Generated "realistic photos" of events that didn't happen look deceptive.

---

## Section 7 — Cheers / Celebration

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Message Board | 6.5 | 8.0 | High | Good | High | Spam/empty state problems |
| B: Name Reveal Cards | 6.0 | 7.5 | Medium | Good | High | Generic without real names |
| C: Confetti Lab | 7.5 | 8.5 | Medium | Excellent | Moderate | May feel like a toy |
| D: Reaction Bar | 7.5 | 8.5 | Low | Excellent | High | Requires localStorage persistence |
| E: Handwritten Dedication | 7.0 | 8.5 | Medium | Good | High | Fake handwriting font risk |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option D (Reaction Bar)**

Rationale: A simple reaction bar (🎉🌸✨💛 + counts in localStorage) is the lowest-effort, highest-reward interactive celebration element. It creates participation without requiring users to type. The count persists in localStorage so when users return, they see how many reactions have been added. It is mobile-excellent (one tap). It does not have spam/moderation problems.

Option A (message board) sounds engaging but is genuinely complex: empty state (no messages yet), spam potential, persistence requirements (localStorage or backend), moderation. Too much complexity for a celebration section.

---

## Section 8 — Closing Footer

| Option | Floor | Ceiling | Effort | Mobile | Brand Fit | Failure Mode |
|--------|-------|---------|--------|--------|-----------|-------------|
| A: Warm Letter Closure | 7.5 | 8.5 | Low | Excellent | High | Must match letter visual style |
| B: Department Seal | 7.5 | 9.0 | Low | Excellent | High | Seal must be high-quality SVG |
| C: Live Countdown | 7.0 | 8.0 | Medium | Good | High | Breaks after event date |
| D: Share CTA | 6.5 | 7.5 | Low | Good | Moderate | Share API not supported on all browsers |
| E: Programme Credits | 7.5 | 8.5 | Low | Excellent | Moderate | May feel anti-climactic |

**Decision:** ✅ CONFIDENT RECOMMENDATION — **Option A (Warm Letter Closure)**

Rationale: The closing section should provide emotional resolution, not information. "With warm wishes and excitement, Your Seniors" styled as the last page of the invitation letter — using the same ivory parchment visual as the envelope letter — creates a satisfying circular narrative: the site starts with an invitation letter, and ends with the letter's sign-off. No interaction required. Very low implementation effort.

Option B (Department Seal) is a strong alternative — authoritative and architecturally clean. Choose Option A if the site prioritizes warmth; choose Option B if it prioritizes formality.

---

## Overall Design Direction Recommendation

Given all section decisions above, the recommended design direction is:

**Direction 1 (Imperial Restraint) as the base + selective botanical elements from Direction 2.**

Reason: Most section recommendations above chose options with low-to-medium implementation effort and high design floor. This is consistent with Imperial Restraint — doing things simply and doing them well. The "Fresh Bloom" botanical reference appears selectively (intro Option B, illustrated gallery Option A, botanical line in intro Option A) rather than throughout every section.

---

## Combination Conflict Rules

The following combinations create visual inconsistencies and should be avoided:

| Combination | Conflict |
|-------------|---------|
| Intro: Photo Reveal + Hero: Full-Width Typography | Photo is atmospheric/grounded; typography-only hero is abstract. Tone clash. |
| Intro: Theatre Curtain + Milestones: Newspaper | Two different ironic historical frames in the same site. Stylistic conflict. |
| Hero: Countdown Integration + Footer: Live Countdown | Two countdowns on the same page. Redundant. Choose one or neither. |
| Gallery: Mood Board + Milestones: Newspaper | "Brand mood board" and "newspaper layout" suggest two different brand personalities. |
| Cheers: Message Board + Letter: Scroll-Activated | Both require in-section scroll interaction. Two scroll-within-scroll elements create confusion. |

---

## Recommended Final Selection

| Section | Recommended Option | Confidence |
|---------|--------------------|-----------|
| Cinematic Intro | Option A (Kinetic Typography) | ✅ Confident |
| Hero | Option B (Refined Split Diptych) | ✅ Confident |
| Invitation Letter | Option A (Newspaper Column) | ✅ Confident |
| Milestones | Option A (Large Numeral Pair) | ✅ Confident |
| Agenda | Option B (Accordion) | ✅ Confident |
| Gallery | Option A (Illustrated) | ⚖️ Conditional on art quality |
| Cheers | Option D (Reaction Bar) | ✅ Confident |
| Closing Footer | Option A (Warm Letter Closure) | ✅ Confident |

This combination prioritizes:
1. Fixing the confirmed V2 bugs (skip button, audio, session key)
2. High design floors (no high-variance, art-quality-dependent options except Gallery)
3. Consistent visual language (editorial typography, warm paper, restraint)
4. Mobile-excellent experience for all sections

---

*The purpose of this matrix is to surface genuine trade-offs, not to rank all options with close scores to avoid difficult decisions. Where an option fails, this document says so directly.*
