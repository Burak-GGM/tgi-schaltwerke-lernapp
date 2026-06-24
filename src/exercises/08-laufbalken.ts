import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

// Spalte1={a,b,c} Spalte2={d,e,f} Spalte3={g,h,j}; Zeile1={a,d,g} Zeile2={b,e,h} Zeile3={c,f,j}
const groups: Record<string, string[]> = {
  Z0: ["a", "b", "c"],
  Z1: ["d", "e", "f"],
  Z2: ["g", "h", "j"],
  Z3: ["a", "d", "g"],
  Z4: ["b", "e", "h"],
  Z5: ["c", "f", "j"],
};
const allCells = ["a", "b", "c", "d", "e", "f", "g", "h", "j"];
const codes = ["000", "001", "010", "011", "100", "101"];

function outputsFor(stateId: string) {
  const lit = new Set(groups[stateId]);
  const o: Record<string, boolean> = {};
  for (const c of allCells) o[c] = lit.has(c);
  return o;
}

const WORDS = {
  de: {
    title: "Laufbalken und Parkhaus",
    subtitle: "Zustandsautomat (2.1.3–2.1.5), Abitur 2008/2009 A1 (S. 104)",
    description:
      "Eine 3×3-LED-Matrix zeigt abwechselnd die 3 Spalten und die 3 Zeilen an: Spalte1 → Spalte2 → " +
      "Spalte3 → Zeile1 → Zeile2 → Zeile3 → von vorn. 6 Zustände → minimal 3 Flip-Flops, Codierung " +
      "000→001→010→011→100→101→000.",
    clk: "Takt ⏭",
    tableTitle: "Codierte Zustandsfolgetabelle",
    zustand: "Zustand",
    col1: "Q2Q1Q0 (akt.)",
    colNext: "Q2⁺Q1⁺Q0⁺ (folgend)",
    labels: [
      "Z0 (Spalte 1)",
      "Z1 (Spalte 2)",
      "Z2 (Spalte 3)",
      "Z3 (Zeile 1)",
      "Z4 (Zeile 2)",
      "Z5 (Zeile 3)",
    ],
  },
  tr: {
    title: "Akan Çubuk ve Otopark",
    subtitle: "Durum Otomatı (2.1.3–2.1.5), Abitur 2008/2009 A1 (S. 104)",
    description:
      "3×3 LED matrisi sırayla 3 sütunu ve 3 satırı gösterir: Sütun1 → Sütun2 → Sütun3 → Satır1 → " +
      "Satır2 → Satır3 → baştan. 6 durum → minimal 3 flip-flop, kodlama 000→001→010→011→100→101→000.",
    clk: "Vuruş ⏭",
    tableTitle: "Kodlanmış Durum Geçiş Tablosu",
    zustand: "Durum",
    col1: "Q2Q1Q0 (şu anki)",
    colNext: "Q2⁺Q1⁺Q0⁺ (sonraki)",
    labels: [
      "Z0 (Sütun 1)",
      "Z1 (Sütun 2)",
      "Z2 (Sütun 3)",
      "Z3 (Satır 1)",
      "Z4 (Satır 2)",
      "Z5 (Satır 3)",
    ],
  },
  en: {
    title: "Running Bar and Parking Garage",
    subtitle: "State Machine (2.1.3–2.1.5), Abitur 2008/2009 A1 (p. 104)",
    description:
      "A 3×3 LED matrix alternately shows the 3 columns and the 3 rows: Column1 → Column2 → " +
      "Column3 → Row1 → Row2 → Row3 → back to the start. 6 states → minimally 3 flip-flops, " +
      "coding 000→001→010→011→100→101→000.",
    clk: "Clock ⏭",
    tableTitle: "Coded State Transition Table",
    zustand: "State",
    col1: "Q2Q1Q0 (current)",
    colNext: "Q2⁺Q1⁺Q0⁺ (next)",
    labels: [
      "Z0 (Column 1)",
      "Z1 (Column 2)",
      "Z2 (Column 3)",
      "Z3 (Row 1)",
      "Z4 (Row 2)",
      "Z5 (Row 3)",
    ],
  },
} satisfies Record<Lang, Record<string, string | string[]>>;

export function buildLaufbalken(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "laufbalken",
    number: 8,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "circular",
    nodeOrder: codes.map((_, i) => `Z${i}`),
    initialState: "Z0",
    autoplay: true,
    defaultInputId: "clk",
    inputs: [{ id: "clk", label: w.clk }],
    states: codes.map((code, i) => ({
      id: `Z${i}`,
      label: w.labels[i],
      code,
      outputs: outputsFor(`Z${i}`),
    })),
    transitions: codes.map((_, i) => ({
      from: `Z${i}`,
      to: `Z${(i + 1) % codes.length}`,
      inputId: "clk",
      label: w.clk.replace(" ⏭", ""),
    })),
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state",
        columns: [w.zustand, w.col1, w.colNext],
        rows: codes.map((code, i) => ({
          stateId: `Z${i}`,
          cells: [w.labels[i], code, codes[(i + 1) % codes.length]],
        })),
      },
    ],
    outputRenderer: "led-matrix-3x3",
    formulas: ["a = !Q2 & !Q1 & !Q0 + !Q2 & Q1 & Q0 = !Q2 & (!Q1 & !Q0 + Q1 & Q0)"],
  };
}
