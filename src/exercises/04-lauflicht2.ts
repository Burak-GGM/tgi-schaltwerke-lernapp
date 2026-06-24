import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

interface Row {
  code: string;
  L1: boolean;
  L2: boolean;
  L3: boolean;
  L4: boolean;
}

const rows: Row[] = [
  { code: "000", L1: true, L2: false, L3: false, L4: false },
  { code: "001", L1: false, L2: true, L3: false, L4: false },
  { code: "010", L1: false, L2: false, L3: true, L4: false },
  { code: "011", L1: false, L2: false, L3: false, L4: true },
  { code: "100", L1: false, L2: false, L3: true, L4: false },
  { code: "101", L1: false, L2: true, L3: false, L4: false },
];

const WORDS = {
  de: {
    title: 'Lauflicht Teil II — „Kit-Licht“',
    subtitle: "Mod-6-Folge mit Hin- und Rücklauf (S. 99)",
    description:
      "Statt nur vorwärts zu laufen, läuft das Licht hin und her: L1 → L2 → L3 → L4 → L3 → L2 → " +
      "(zurück zu L1) … Das sind 6 unterschiedliche Zustände (Periode 6), also minimal 3 Flip-Flops " +
      "(Mod-6-Zähler; die Codes 110 und 111 werden nicht benutzt).",
    clk: "Takt ⏭",
    tableTitle: "Zustandsfolgetabelle",
    zustand: "Zustand",
  },
  tr: {
    title: 'Akan Işık Bölüm II — "Kit-Licht"',
    subtitle: "Gidiş-dönüşlü Mod-6 dizisi (S. 99)",
    description:
      "Işık sadece ileri gitmek yerine ileri geri akar: L1 → L2 → L3 → L4 → L3 → L2 → " +
      "(tekrar L1'e) … Bu 6 farklı durum demektir (periyot 6), yani minimal 3 flip-flop " +
      "(Mod-6 sayaç; 110 ve 111 kodları kullanılmaz).",
    clk: "Vuruş ⏭",
    tableTitle: "Durum Geçiş Tablosu",
    zustand: "Durum",
  },
  en: {
    title: 'Running Light Part II — "Kit-Licht"',
    subtitle: "Mod-6 sequence with forward and back travel (p. 99)",
    description:
      "Instead of only running forward, the light runs back and forth: L1 → L2 → L3 → L4 → L3 → " +
      "L2 → (back to L1) … That's 6 distinct states (period 6), so minimally 3 flip-flops " +
      "(mod-6 counter; the codes 110 and 111 are unused).",
    clk: "Clock ⏭",
    tableTitle: "State Transition Table",
    zustand: "State",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildLauflicht2(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "lauflicht2",
    number: 4,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "circular",
    nodeOrder: rows.map((_, i) => `Z${i}`),
    initialState: "Z0",
    autoplay: true,
    defaultInputId: "clk",
    inputs: [{ id: "clk", label: w.clk }],
    states: rows.map((r, i) => ({
      id: `Z${i}`,
      label: `Z${i}`,
      code: r.code,
      outputs: { L1: r.L1, L2: r.L2, L3: r.L3, L4: r.L4 },
    })),
    transitions: rows.map((_, i) => ({
      from: `Z${i}`,
      to: `Z${(i + 1) % rows.length}`,
      inputId: "clk",
      label: w.clk.replace(" ⏭", ""),
    })),
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state",
        columns: [w.zustand, "Q2Q1Q0", "L1", "L2", "L3", "L4"],
        rows: rows.map((r, i) => ({
          stateId: `Z${i}`,
          cells: [`Z${i}`, r.code, r.L1 ? 1 : 0, r.L2 ? 1 : 0, r.L3 ? 1 : 0, r.L4 ? 1 : 0],
        })),
      },
    ],
    outputRenderer: "lamp-row-4",
    formulas: [
      "L1 = !Q2 & !Q1 & !Q0",
      "L2 = !Q1 & Q0",
      "L4 = !Q2 & Q1 & Q0",
      "L3 = !Q2 & Q1 & !Q0 + Q2 & !Q1 & !Q0",
    ],
  };
}
