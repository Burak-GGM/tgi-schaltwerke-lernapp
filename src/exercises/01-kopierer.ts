import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

const WORDS = {
  de: {
    title: "Kopierer",
    subtitle: "Kopienzähler als Schaltwerk (S. 96)",
    description:
      "Ein Kopierer hat ein Kontingent von 3 Kopien. Jede Anforderung verbraucht je nach " +
      "Papierformat einen unterschiedlichen Anteil: A4 verbraucht 1 Kopie, A3 verbraucht 2 Kopien " +
      "(da A3 doppelt so groß ist). Reicht das Kontingent nicht mehr aus, bleibt der Zähler stehen " +
      "(„Else: bleibt“). Klicke A3/A4, um Anfragen zu simulieren, und beobachte den Kopienzähler.",
    inputA4: "A4 anfordern (verbraucht 1 Kopie)",
    inputA3: "A3 anfordern (verbraucht 2 Kopien)",
    note3: "3 Kopien Kontingent übrig",
    note2: "2 Kopien übrig",
    note1: "1 Kopie übrig — für A3 (braucht 2) reicht es nicht mehr",
    note0: "Kontingent erschöpft — jede weitere Anfrage bleibt wirkungslos",
    stays: "bleibt",
    a3Stays: "A3 (bleibt)",
    tableTitle: "Codierte Zustandsfolgetabelle",
    col1: "Q1Q0 (akt.)",
    colNext: "Q1⁺Q0⁺ (folgend)",
    storung:
      "Störungssignal A = PA + !A3 & !A4 + A3 & A4 = PA + !(A3 # A4)   (kein Papier ODER Format nicht eindeutig erkannt)",
  },
  tr: {
    title: "Fotokopi Makinesi",
    subtitle: "Schaltwerk olarak kopya sayacı (S. 96)",
    description:
      "Bir fotokopi makinesinin 3 kopyalık bir kontenjanı var. Her istek, kağıt formatına göre " +
      "kontenjandan farklı miktarda düşer: A4 1 kopya, A3 2 kopya tüketir (çünkü A3, A4'ün iki " +
      "katı büyüklüğündedir). Kontenjan yetmediğinde sayaç olduğu yerde kalır („Else: kalır“). " +
      "İstekleri simüle etmek için A3/A4'e tıkla ve kopya sayacını gözlemle.",
    inputA4: "A4 iste (1 kopya tüketir)",
    inputA3: "A3 iste (2 kopya tüketir)",
    note3: "3 kopya hakkı kaldı",
    note2: "2 kopya kaldı",
    note1: "1 kopya kaldı — A3 için (2 gerekir) artık yetmiyor",
    note0: "Kontenjan tükendi — her yeni istek etkisiz kalır",
    stays: "kalır",
    a3Stays: "A3 (kalır)",
    tableTitle: "Kodlanmış Durum Geçiş Tablosu",
    col1: "Q1Q0 (şu anki)",
    colNext: "Q1⁺Q0⁺ (sonraki)",
    storung:
      "Arıza sinyali A = PA + !A3 & !A4 + A3 & A4 = PA + !(A3 # A4)   (kağıt yok VEYA format net tanınmadı)",
  },
  en: {
    title: "Photocopier",
    subtitle: "Copy counter as a sequential circuit (p. 96)",
    description:
      "A photocopier has a quota of 3 copies. Each request consumes a different share of the " +
      "quota depending on the paper format: A4 uses 1 copy, A3 uses 2 copies (since A3 is twice " +
      'the size of A4). Once the quota isn\'t enough, the counter stays put ("else: stays"). ' +
      "Click A3/A4 to simulate requests and watch the copy counter.",
    inputA4: "Request A4 (uses 1 copy)",
    inputA3: "Request A3 (uses 2 copies)",
    note3: "3 copies of quota remaining",
    note2: "2 copies remaining",
    note1: "1 copy remaining — no longer enough for A3 (needs 2)",
    note0: "Quota exhausted — any further request has no effect",
    stays: "stays",
    a3Stays: "A3 (stays)",
    tableTitle: "Coded State Transition Table",
    col1: "Q1Q0 (current)",
    colNext: "Q1⁺Q0⁺ (next)",
    storung:
      "Fault signal A = PA + !A3 & !A4 + A3 & A4 = PA + !(A3 # A4)   (no paper OR format not clearly recognized)",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildKopierer(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  return {
    id: "kopierer",
    number: 1,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "linear",
    nodeOrder: ["Z3", "Z2", "Z1", "Z0"],
    initialState: "Z3",
    inputs: [
      { id: "A4", label: w.inputA4 },
      { id: "A3", label: w.inputA3 },
    ],
    states: [
      { id: "Z3", label: "Z3", code: "11", outputs: { copies: 3 }, note: w.note3 },
      { id: "Z2", label: "Z2", code: "10", outputs: { copies: 2 }, note: w.note2 },
      { id: "Z1", label: "Z1", code: "01", outputs: { copies: 1 }, note: w.note1 },
      { id: "Z0", label: "Z0", code: "00", outputs: { copies: 0 }, note: w.note0 },
    ],
    transitions: [
      { from: "Z3", to: "Z2", inputId: "A4", label: "A4" },
      { from: "Z3", to: "Z1", inputId: "A3", label: "A3" },
      { from: "Z2", to: "Z1", inputId: "A4", label: "A4" },
      { from: "Z2", to: "Z0", inputId: "A3", label: "A3" },
      { from: "Z1", to: "Z0", inputId: "A4", label: "A4" },
      { from: "Z1", to: "Z1", inputId: "A3", label: w.a3Stays },
      { from: "Z0", to: "Z0", inputId: "A4", label: w.stays },
      { from: "Z0", to: "Z0", inputId: "A3", label: w.stays },
    ],
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state-and-input",
        columns: [w.col1, "A3", "A4", w.colNext],
        rows: [
          { cells: ["11", "0", "1", "10"], stateId: "Z3", inputId: "A4" },
          { cells: ["11", "1", "0", "01"], stateId: "Z3", inputId: "A3" },
          { cells: ["10", "0", "1", "01"], stateId: "Z2", inputId: "A4" },
          { cells: ["10", "1", "0", "00"], stateId: "Z2", inputId: "A3" },
          { cells: ["01", "0", "1", "00"], stateId: "Z1", inputId: "A4" },
          { cells: ["01", "1", "0", `01 (${w.stays})`], stateId: "Z1", inputId: "A3" },
          { cells: ["00", "x", "x", `00 (${w.stays})`], stateId: "Z0" },
        ],
      },
    ],
    outputRenderer: "counter-badge",
    outputMeta: { max: 3 },
    formulas: [w.storung],
  };
}
