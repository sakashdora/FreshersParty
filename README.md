# Nirvahan — The Freshers Party

A React + Vite event website for Friday, 30 October 2026, at Srusti Auditorium. Arrival is 10:30 AM IST; the countdown uses the fixed date with an explicit +05:30 offset.

## Run

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Design

Warm ivory, cobalt, and coral; Bricolage Grotesque display lettering, DM Sans body text, and Caveat handwritten accents. The page uses a printed-photo and ticket composition, interactive party tabs, an editorial running order, FAQs, and a personalized keepsake.

The opening animation assembles the event name on a ticket, stamps it, tears the stub, then lifts away. It lasts under 2.5 seconds, appears once per browser session, supports Skip and Escape, and can be replayed from the footer. Reduced-motion preferences bypass the opening animation and disable transitions. While the intro is shown, background content is inert; focus and scrolling are restored on dismissal.

The hero photograph in public/freshers-editorial.png is generated illustrative editorial imagery, not documentary photography of Srusti students or a past event. The existing crowd video remains local and plays only on request. Fonts load from Google Fonts with system fallbacks.

## Features and content

- Keyboard-accessible party tabs, mobile menu with Escape dismissal, FAQ accordion, and focus indicators.
- Fixed-date countdown and an ICS calendar download.
- Clipboard sharing with a manual fallback message.
- A personal PNG invitation generated in the browser. This is a souvenir, not a registration or entry pass. No backend, account, or personal-data storage.
- Programme, venue, start time, and dress theme retain the previous project details; organizers should confirm final arrangements. The user-confirmed date is 30 October 2026.

## Verification

Production build passed. Browser checks covered desktop and 390px mobile layouts, no mobile horizontal overflow, party tabs with arrow-key navigation, video play/pause, FAQ expansion, menu and Escape dismissal, intro automatic exit and skip, session replay behavior, whitespace-only name rejection, personalized keepsake rendering, and clipboard success. The browser download-event tool timed out; the app generated the PNG and showed the completion message, but file delivery was not confirmed through that tool.

Prior source files are retained in artifacts/before-party-refresh. The full-page screenshot is artifacts/nirvahan-party-redesign.png.
