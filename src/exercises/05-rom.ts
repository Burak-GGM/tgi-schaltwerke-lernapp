import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";
import { ampelOutputs, buildAmpelTable } from "./02-ampel";

const codes = ["000", "001", "010", "011", "100", "101", "110", "111"];

const WORDS = {
  de: {
    title: "ROM-Codewandler",
    subtitle: "Ampelschaltung mit ROM statt KV-Minimierung (S. 100)",
    description:
      "Alternative zu Aufgabe 2: statt das Ausgangsschaltnetz per KV-Tafel zu minimieren, nutzt man " +
      "einen ROM 8×3-Baustein. Der Zählerstand Q2Q1Q0 dient direkt als Adresse; der ROM liefert an " +
      "den 3 Datenleitungen die fertigen R/Ge/Gr-Werte — exakt dieselbe Wertetabelle wie in Aufgabe 2, " +
      "nur als Speicherabfrage statt als Schaltnetz realisiert.",
    clk: "Takt ⏭",
    tableTitle: "ROM-Tabelle (Adresse → Daten)",
  },
  tr: {
    title: "ROM Kod Çevirici",
    subtitle: "KV minimizasyonu yerine ROM ile trafik lambası devresi (S. 100)",
    description:
      "Görev 2'ye alternatif: çıkış devresini KV tablosuyla minimize etmek yerine bir ROM 8×3 " +
      "modülü kullanılır. Sayaç değeri Q2Q1Q0 doğrudan adres olarak kullanılır; ROM, 3 veri " +
      "hattında hazır R/Ge/Gr değerlerini verir — Görev 2'deki ile tamamen aynı değer tablosu, " +
      "sadece bir bellek sorgusu olarak gerçekleştirilmiş.",
    clk: "Vuruş ⏭",
    tableTitle: "ROM Tablosu (Adres → Veri)",
  },
  en: {
    title: "ROM Code Converter",
    subtitle: "Traffic light circuit using ROM instead of KV minimization (p. 100)",
    description:
      "An alternative to Exercise 2: instead of minimizing the output network with a KV map, a " +
      "ROM 8×3 chip is used. The counter value Q2Q1Q0 directly serves as the address; the ROM " +
      "delivers the finished R/Ge/Gr values on the 3 data lines — exactly the same output table " +
      "as in Exercise 2, just implemented as a memory lookup instead of a logic network.",
    clk: "Clock ⏭",
    tableTitle: "ROM Table (Address → Data)",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildRom(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "rom",
    number: 5,
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
    tables: [{ ...buildAmpelTable(lang), title: w.tableTitle }],
    outputRenderer: "rom-table",
  };
}
