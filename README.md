<div align="right"><a href="README.de.md">🇩🇪 Diese Seite auf Deutsch</a></div>

# TGI Schaltwerke Lernapp

**An interactive study tool for digital sequential logic ("Schaltwerke"), built by a student to study for his own exam.**

> 🇩🇪 You can read this README in German: **[README.de.md](README.de.md)**.

## Why does this project exist?

I'm a student at a German *Technisches Gymnasium* (a technical-track high school), in a class called **TGI** (Technische Informatik / Technical Computer Science). One unit of that class — **Schaltwerke** ("sequential switching circuits") — is about digital circuits that have *memory*: traffic lights, copy-machine counters, running-light displays, dimmer switches, and so on. The exam covers 8 textbook-style exercises built around this topic.

The problem: this material is normally taught through **static diagrams in a PDF** — a state diagram here, a table there, a timing diagram somewhere else — and you're expected to mentally connect all three and imagine how the circuit *behaves over time*. That's hard. It's easy to memorize the diagrams without ever really understanding what "the system moves from state Z2 to state Z3 when this button is pressed" actually *looks like* when it happens.

So instead of just re-reading my notes, I built this: a small web app where every one of the 8 exam exercises is an actual **interactive simulation**. You press a button, and you watch the state diagram light up the new state, the matching row in the table highlight, the timing diagram add a new column, and the actual output (a traffic light, a row of lamps, an LED grid, a dimmer) react — all at once, all linked together. It turns "memorize this diagram" into "watch it happen, then predict it yourself."

It's not a professional product and it's not a generic circuit simulator — it's a personal exam-prep tool. I'm sharing the code publicly in case it's useful to:
- other students with the same exam topic (the exercises follow a standard German *Abitur*/*Technisches Gymnasium* curriculum, so they may show up elsewhere too),
- anyone learning digital logic / state machines for the first time and wanting a visual, hands-on way in,
- or just other people who like seeing how a "study tool I needed but didn't have" gets built from scratch.

### If you have zero background in this topic, here's the 30-second version

A normal digital circuit (called a *Schaltnetz*) is like a calculator: same input, always the same output, no memory. A **Schaltwerk** is a digital circuit that *remembers* something — it has an internal "state," and what it does next depends on **both** the current input **and** what state it's already in. A traffic light is a perfect everyday example: pressing the pedestrian button doesn't *immediately* turn the light green — it depends on what color the light is *currently* showing. That "depends on history" behavior is the whole topic, and it's modeled formally with **state diagrams** (bubbles connected by arrows) and **state tables**. This app lets you click through exactly that, for 8 real exam-style circuits, instead of just reading about it.

## What's in here (the 8 exercises)

| # | Exercise | What you see |
|---|---|---|
| 1 | Photocopier | A linear state diagram (with "skip" arrows) + a live copy counter |
| 2 | Traffic light | An 8-state ring (a binary counter) + a 3-lamp traffic light + a timing diagram |
| 3 | Running-light control I | A 4-state ring + a row of 4 lamps |
| 4 | Running light "Kit-Licht" | A 6-state back-and-forth ring + a row of 4 lamps |
| 5 | ROM code converter | The same traffic-light logic as #2, shown instead as a ROM memory-chip lookup |
| 6 | Pulse-width modulation | Its own page: an 8-bit counter vs. a brightness register, a comparator, a flip-flop switch, a brightness bar |
| 7 | Forest adventure playground | A 4-state ring driven by 3 buttons + an independent 1 Hz safety-reset timer |
| 8 | Running bar / parking garage | Tab 1: a free-form flip-flop timing-diagram simulator; Tab 2: a 6-state ring driving a 3×3 LED grid |

Every exercise shows the same four linked views: a **state diagram**, a **state/output table** (the matching row lights up), the **actual output** (lamps, traffic light, LED grid, etc.), and a **timing diagram** of what just happened — plus Play/Pause/Step/Reset controls.

This is deliberately **not** a gate-level circuit simulator (no AND/OR gate wiring). It works at the same abstraction level the class is taught at: state ↔ table ↔ timing ↔ output.

## Try it yourself

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. It's a static web app — `npm run build` produces a `dist/` folder you can host anywhere, no backend or database needed.

## Languages

The app itself (not just this README) works in **German (default), Turkish, and English** — there's a language switcher in the sidebar, and your choice is remembered. Switching language never resets whatever simulation you're in the middle of.

**Boolean notation:** all switching/logic formulas use the mobile-safe ASCII notation `!` (NOT), `&` (AND) and `#` (XOR) instead of overline/⊕/middle-dot symbols, e.g. `!Q2 & X` instead of `Q̄2 · X`. `+` for OR is unchanged. Variable abbreviations from the course's own notation (R/Ge/Gr, L1–L4, Q1Q0, a–j) are kept as-is — they're used as symbols, not words, in the original material too.

## A known gap, on purpose

Exercise 8's timing-diagram question (2.1.2) is based on a scanned PDF page where the exact clock intervals weren't legible. Rather than guess and present a made-up answer as fact, that section is a **free-form flip-flop timing simulator** instead of a fixed solution: you click the D and !R signals yourself per clock tick and watch Q get computed live from the actual flip-flop rule. If you find the real source values, they can be dropped in.

## Architecture, for anyone who wants to extend it

- **`src/engine/`** — a small, generic, data-driven state-machine core. Every exercise is *just a configuration object* (states, transitions, inputs, tables, which output widget to use) — no exercise-specific UI code.
- **`src/components/`** — the reusable UI pieces every exercise shares: `StateDiagram` (SVG graph), `TruthTable`, `Controls` (Play/Pause/Step/Reset/Speed), `Waveform` (the generic timing-diagram panel), and `outputs/` (the traffic light, lamp row, LED grid, counter badge, ROM chip, generic boolean pills — picked per exercise via `outputRenderer`).
- **`src/exercises/`** — the 8 exercises, each a `build(lang)` function (so all of an exercise's text exists in 3 languages, defined right next to the data it describes).
- **`src/pages/`** — `ExercisePage` renders any state-machine exercise generically; `PwmPage` and the D-FF timing lab are bespoke pages because exercise 6 (PWM) and part of exercise 8 aren't classic state diagrams.
- **`src/i18n/`** — the language switcher, persisted in `localStorage`, and the translation dictionary for everything that isn't part of an exercise config.

To add or edit an exercise: add a `build(lang): ExerciseConfig` function in `src/exercises/` (see `01-kopierer.ts` as a template), wire it into `src/exercises/index.ts` and `src/App.tsx`. No changes to the shared UI components are needed as long as one of the existing output types fits (`traffic-light`, `lamp-row-4`, `led-matrix-3x3`, `counter-badge`, `bool-pills`, `rom-table`).

## Source material

Built from `BPE1 HW – Klasse 11 – Logik SN SW` (Robert-Bosch-Schule Ulm, TGI 11-2), covering the 8 textbook exercises: photocopier, traffic light, two running-light variants, ROM code converter, PWM, forest playground, and running bar/parking garage.
