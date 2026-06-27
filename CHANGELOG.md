# Changelog

All notable changes to this project are documented here, newest first. Dates and
times are in `Europe/Berlin` time (CEST, UTC+2) and match the actual commit
timestamps in git history (`git log`).

## [0.4.1] — 2026-06-27 CEST

### Fixed
- **Traffic-light exercise (Aufgabe 2) and ROM code converter (Aufgabe 5)**:
  state Z3 (Q2Q1Q0 = 011) now correctly lights **both Red and Yellow**
  simultaneously (German traffic-light sequence: Rot → Rot+Gelb → Grün → Gelb).
  The previous code returned `R=false` for Z3, showing Yellow-only — which is
  wrong. The corrected formula is `R = !Q2` (Red active for all states 0–3),
  not the incorrect `R = !Q2 & !X`. The `ampelOutputs` function is now shared
  between the two exercises instead of being duplicated.
- Description text in Aufgabe 2 updated from "Gelb (1)" to "Rot+Gelb (1)" for
  the pre-green phase (DE/TR/EN).

## [0.4.0] — 2026-06-25 00:41 CEST

### Added
- New **home page**: a greeting, a short pitch explaining what the app is and
  why it exists, a large language picker, and a clickable card for every
  Grundlagen and Übungsaufgaben page so you can jump straight in without
  using the nav. It's now the default view on load.
- **Hamburger menu**: the sidebar is now a collapsible drawer toggled by a
  hamburger button in a new top bar. On phones/tablets it defaults closed and
  slides in as an overlay with a dimmed backdrop; on desktop it defaults open
  and pushes the content (toggle it closed for a wider reading area). Picking
  a page auto-closes the drawer on mobile.
- A "Start" link at the top of the drawer and a clickable app title in the
  top bar both return to the home page.

### Changed
- General visual polish: a gradient page title on the home page, card hover
  states, a large variant of the language switcher for the home page.

Verified via Playwright: all 14 pages reachable both via the drawer and via
home-page cards, no horizontal overflow and no console errors across desktop,
iPhone, iPad portrait, and small-phone viewports, correct rendering in all 3
languages.

## [0.3.0] — 2026-06-25 00:18 CEST

### Added
- New **Grundlagen** (fundamentals) section in the sidebar, alongside the 8 exam
  exercises, covering the theory behind them (source: scanned textbook pages,
  S. 69–92):
  - **Schaltnetz vs. Schaltwerk** — a clickable two-NOR-gate latch reproducing
    the textbook's own step-by-step proof that sequential circuits need memory.
  - **Flip-Flops** — one generic simulator, 7 tabs: RS-FF (level-controlled,
    clock-level-controlled, edge-triggered), D-FF (clock-level), JK-FF and T-FF
    (edge-triggered), and a JK master-slave FF whose slave output visibly lags
    the master by one clock.
  - **Zustandsdiagramm & Zustandsfolgetabelle** — the textbook's own
    non-technical example (a student's beer crate emptying on the way to a
    school party) as a clickable 7-state machine.
  - **Zähler** — a 2-/4-bit binary counter with a synchronous/asynchronous mode
    toggle (async mode visibly ripples each bit with a delay instead of
    switching all at once), CLR (synchronous reset) vs. AR (asynchronous
    reset), and a live frequency-divider waveform.
  - **Schieberegister** — a 4-bit shift register with Stop / shift-left /
    shift-right / parallel-load modes.
  - **RAM & ROM** — an interactive 8×4 read-write memory (address, data,
    WR/OE/EN) plus an 8×4 read-only memory preloaded with a real stepper-motor
    half-step pattern.
- All new content ships in German, Turkish, and English, like the rest of the
  app.

### Changed
- `CounterBadge` generalized to read its output key and caption from
  `outputMeta` instead of being hardcoded to the photocopier exercise, so it
  can be reused by other counters (e.g. the beer-crate example).
- Sidebar navigation now groups items under "Grundlagen" and
  "Übungsaufgaben" headers instead of one flat list.
- READMEs (English + German) updated to describe the new Grundlagen section.

## [0.2.1] — 2026-06-24 23:27 CEST

### Fixed
- State-diagram SVG no longer breaks its aspect ratio on narrow screens (it
  set a fixed pixel height alongside `width="100%"`).
- Sidebar now collapses into a wrapping top nav bar below ~880px width instead
  of staying a fixed 250px column with no responsive fallback.
- A CSS grid `1fr`-without-`minmax(0, …)` regression (introduced and caught
  within this same change) that caused real horizontal overflow on phone-sized
  viewports was fixed back to `minmax(0, 1fr)`.
- Circular (ring) state diagrams now shrink to fit so the whole cycle stays
  visible at once on small screens; linear diagrams (with skip-arcs) keep a
  horizontal scroll instead, since shrinking those too far would make them
  unreadable.
- Truth tables gained a horizontal-scroll wrapper for narrow screens.
- Touch target sizing increased on buttons and nav items.

Verified with Playwright across iPhone, iPad portrait/landscape, and
small-phone viewports: no horizontal overflow, no console errors.

## [0.2.0] — 2026-06-24 23:03 CEST

### Added
- Live deployment to GitHub Pages via a GitHub Actions workflow
  (`.github/workflows/deploy.yml`), triggered on every push to `main`.
- `vite.config.ts` `base` path configured for the GitHub Pages project
  subpath.

## [0.1.0] — 2026-06-24 18:39 CEST

### Added
- Initial release: interactive study tool for the 8 "Schaltwerke" exam
  exercises (photocopier, traffic light, two running-light variants, ROM code
  converter, PWM dimmer, forest playground, running bar/parking garage),
  built on a generic data-driven state-machine engine (state diagram ↔ state
  table ↔ timing diagram ↔ output, all linked and live).
- Full German/Turkish/English language support with a persisted language
  switcher.
- Mobile-safe ASCII boolean notation (`!`, `&`, `#`, `+`) used throughout
  instead of Unicode overline/⊕/middle-dot symbols.
- Public GitHub repository with bilingual (English/German) READMEs explaining
  the project's purpose.
