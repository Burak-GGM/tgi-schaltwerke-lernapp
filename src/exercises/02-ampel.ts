import type { ExerciseConfig, TableDef } from "../engine/types";
import type { Lang } from "../i18n/types";

const codes = ["000", "001", "010", "011", "100", "101", "110", "111"];

export function ampelOutputs(code: string): { R: boolean; Ge: boolean; Gr: boolean } {
  const n = parseInt(code, 2);
  if (n <= 2) return { R: true, Ge: false, Gr: false };   // Rot
  if (n === 3) return { R: true, Ge: true, Gr: false };   // Rot+Gelb
  if (n <= 6) return { R: false, Ge: false, Gr: true };   // Grün
  return { R: false, Ge: true, Gr: false };               // Gelb
}

const WORDS = {
  de: {
    title: "Ampelschaltung",
    subtitle: "Minimal codierter Zähler, CTR DIV8 (S. 97)",
    description:
      "Eine Verkehrsampel durchläuft pro Periode 8 Takte: Rot (3 Takte) → Rot+Gelb (1) → Grün (3) → " +
      "Gelb (1) → von vorn. 8 Zustände lassen sich minimal mit 3 D-Flip-Flops codieren (CTR DIV8). " +
      "Drücke Takt oder Play, um den Zähler laufen zu lassen, und beobachte, wie Q2Q1Q0 über das " +
      "Ausgangsschaltnetz auf Rot/Gelb/Grün abgebildet wird.",
    clk: "Takt ⏭",
    tableTitle: "Wertetabelle S* (Zustand → Ausgänge)",
  },
  tr: {
    title: "Trafik Lambası Devresi",
    subtitle: "Minimal kodlanmış sayaç, CTR DIV8 (S. 97)",
    description:
      "Bir trafik lambası bir periyotta 8 vuruş geçirir: Kırmızı (3 vuruş) → Kırmızı+Sarı (1) → Yeşil (3) → " +
      "Sarı (1) → baştan. 8 durum, minimal olarak 3 D flip-flop ile kodlanabilir (CTR DIV8). " +
      "Sayacı çalıştırmak için Vuruş veya Play'e bas ve Q2Q1Q0'nın çıkış devresi üzerinden " +
      "Kırmızı/Sarı/Yeşil'e nasıl eşlendiğini gözlemle.",
    clk: "Vuruş ⏭",
    tableTitle: "Değer Tablosu S* (Durum → Çıkışlar)",
  },
  en: {
    title: "Traffic Light Circuit",
    subtitle: "Minimally coded counter, CTR DIV8 (p. 97)",
    description:
      "A traffic light goes through 8 clock ticks per period: Red (3 ticks) → Red+Yellow (1) → " +
      "Green (3) → Yellow (1) → back to the start. 8 states can be minimally coded with 3 D " +
      "flip-flops (CTR DIV8). Press Clock or Play to run the counter, and watch how Q2Q1Q0 maps " +
      "to Red/Yellow/Green through the output network.",
    clk: "Clock ⏭",
    tableTitle: "Output Table S* (State → Outputs)",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildAmpelTable(lang: Lang): TableDef {
  return {
    title: WORDS[lang].tableTitle,
    highlightBy: "state",
    columns: ["Q2Q1Q0", "R", "Ge", "Gr"],
    rows: codes.map((code, i) => {
      const o = ampelOutputs(code);
      return {
        stateId: `Z${i}`,
        cells: [code, o.R ? 1 : 0, o.Ge ? 1 : 0, o.Gr ? 1 : 0],
      };
    }),
  };
}

export function buildAmpel(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "ampel",
    number: 2,
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
      label: `Z${i}`,
      code,
      outputs: ampelOutputs(code),
    })),
    transitions: codes.map((_, i) => ({
      from: `Z${i}`,
      to: `Z${(i + 1) % codes.length}`,
      inputId: "clk",
      label: w.clk.replace(" ⏭", ""),
    })),
    tables: [buildAmpelTable(lang)],
    outputRenderer: "traffic-light",
    formulas: ["X = Q1 & Q0", "Ge = X", "R = !Q2", "Gr = Q2 & !X"],
  };
}
