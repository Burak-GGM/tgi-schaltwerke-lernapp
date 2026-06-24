import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

const codes = ["00", "01", "10", "11"];
const lamps = ["L1", "L2", "L3", "L4"];

function lauflichtOutputs(i: number) {
  const o: Record<string, boolean> = { L1: false, L2: false, L3: false, L4: false };
  o[lamps[i]] = true;
  return o;
}

const WORDS = {
  de: {
    title: "Lauflichtsteuerung Teil I",
    subtitle: "Minimal codierter Mod-4-Zähler (S. 99)",
    description:
      "4 Lampen sollen nacheinander aufleuchten: L1 → L2 → L3 → L4 → L1 … Das Schaltwerk besteht " +
      "aus zwei Teilen: einem Zähler (mod-4, 2 D-Flip-Flops) und einem Codewandler/Ausgangsschaltnetz, " +
      "das den 2-Bit-Zustand auf genau eine von 4 Lampen abbildet. RESET springt jederzeit zu Z0 zurück.",
    clk: "Takt ⏭",
    reset: "RESET",
    tableTitle: "Wertetabelle (Zustand → Lampen)",
    zustand: "Zustand",
  },
  tr: {
    title: "Akan Işık Kontrolü Bölüm I",
    subtitle: "Minimal kodlanmış Mod-4 sayaç (S. 99)",
    description:
      "4 lamba sırayla yanmalı: L1 → L2 → L3 → L4 → L1 … Schaltwerk iki parçadan oluşur: bir sayaç " +
      "(mod-4, 2 D flip-flop) ve 2 bitlik durumu 4 lambadan tam olarak birine eşleyen bir " +
      "kod çevirici/çıkış devresi. RESET her an Z0'a geri döner.",
    clk: "Vuruş ⏭",
    reset: "RESET",
    tableTitle: "Değer Tablosu (Durum → Lambalar)",
    zustand: "Durum",
  },
  en: {
    title: "Running Light Control Part I",
    subtitle: "Minimally coded mod-4 counter (p. 99)",
    description:
      "4 lamps should light up one after another: L1 → L2 → L3 → L4 → L1 … The circuit has two " +
      "parts: a counter (mod-4, 2 D flip-flops) and a code converter/output network that maps the " +
      "2-bit state to exactly one of the 4 lamps. RESET jumps back to Z0 at any time.",
    clk: "Clock ⏭",
    reset: "RESET",
    tableTitle: "Output Table (State → Lamps)",
    zustand: "State",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildLauflicht1(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "lauflicht1",
    number: 3,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "circular",
    nodeOrder: ["Z0", "Z1", "Z2", "Z3"],
    initialState: "Z0",
    autoplay: true,
    defaultInputId: "clk",
    inputs: [
      { id: "clk", label: w.clk },
      { id: "reset", label: w.reset },
    ],
    states: codes.map((code, i) => ({
      id: `Z${i}`,
      label: `Z${i}`,
      code,
      outputs: lauflichtOutputs(i),
    })),
    transitions: [
      ...codes.map((_, i) => ({
        from: `Z${i}`,
        to: `Z${(i + 1) % codes.length}`,
        inputId: "clk",
        label: w.clk.replace(" ⏭", ""),
      })),
      ...codes.map((_, i) => ({ from: `Z${i}`, to: "Z0", inputId: "reset", label: w.reset })),
    ],
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state",
        columns: [w.zustand, "Q1Q0", "L1", "L2", "L3", "L4"],
        rows: codes.map((code, i) => ({
          stateId: `Z${i}`,
          cells: [`Z${i}`, code, ...lamps.map((l) => (lauflichtOutputs(i)[l] ? 1 : 0))],
        })),
      },
    ],
    outputRenderer: "lamp-row-4",
  };
}
