import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

// Source: raw/INFT_69-92.pdf, S. 85-86 — the textbook's own running example for
// introducing Zustand / Zustandsübergang / Startzustand / Zustandsfolgetabelle /
// Zustandscodierung, reused here exactly as the original (non-IT) example.
const WORDS = {
  de: {
    title: "Zustandsdiagramm & Zustandsfolgetabelle",
    subtitle: "Formale Beschreibung von Schaltwerken — der Bierkasten (S. 85–86)",
    description:
      "Bevor wir Schaltwerke mit Bits beschreiben, lohnt sich ein nicht-technisches Beispiel " +
      "(genauso steht es im Original): Ein Schüler zieht am 1. Mai mit seinem Leiterwagen los " +
      "zur Maifeier und hat (wegen Geldnot) nur einen Kasten mit 6 Flaschen Bier dabei. Bei jedem " +
      "Schritt entscheidet er sich entweder, sich kein Bier zu nehmen (n=0) oder eines zu nehmen " +
      "(n=1). Welche Zustände nehmen Schüler und Kasten dabei ein? Klicke unten, um die Wanderung " +
      "zu simulieren.",
    inputN1: "Bier nehmen (n=1)",
    inputN0: "Nichts tun (n=0)",
    note6: "Z0: Im Kasten sind 6 volle Flaschen Bier",
    note5: "Z1: Im Kasten sind 5 volle Flaschen Bier",
    note4: "Z2: Im Kasten sind 4 volle Flaschen Bier",
    note3: "Z3: Im Kasten sind 3 volle Flaschen Bier",
    note2: "Z4: Im Kasten sind 2 volle Flaschen Bier",
    note1: "Z5: Im Kasten ist 1 volle Flasche Bier",
    note0: "Z6: Der Kasten ist leer — jede weitere Entscheidung ändert daran nichts",
    stays: "bleibt",
    tableTitle: "Zustandsfolgetabelle",
    colInput: "Eingang (Ereignis)",
    colCur: "Zn (bisheriger Zustand)",
    colNext: "Zn+1 (neuer Zustand)",
    formula1:
      "Zustand: Kreis mit Zustandsname oben, Ausgabe (hier: anz = Flaschenzahl) unten. Zustandsübergänge: Pfeile, beschriftet mit dem auslösenden Ereignis.",
    formula2:
      "Startzustand: zeigt, in welchem Zustand das System zu Beginn (oder nach einem Reset) ist — hier Z0, voller Kasten.",
    formula3:
      "Zustandscodierung: legt fest, welche konkreten Ausgabewerte zu jedem Zustand gehören (hier: anz = 6, 5, 4, 3, 2, 1, 0).",
  },
  tr: {
    title: "Durum Diyagramı ve Durum Geçiş Tablosu",
    subtitle: "Schaltwerklerin biçimsel tanımı — bira sandığı örneği (S. 85–86)",
    description:
      "Schaltwerk'leri bitlerle tanımlamadan önce, orijinal kaynaktaki gibi teknik olmayan bir " +
      "örneğe bakmaya değer: Bir öğrenci 1 Mayıs'ta el arabasıyla okul şenliğine gider ve " +
      "(parası olmadığı için) yanında sadece 6 şişelik bir bira sandığı vardır. Her adımda ya " +
      "kendine bira almamaya (n=0) ya da bira almaya (n=1) karar verir. Öğrenci ve sandık bu " +
      "süreçte hangi durumlardan geçer? Yürüyüşü simüle etmek için aşağıya tıkla.",
    inputN1: "Bira al (n=1)",
    inputN0: "Hiçbir şey yapma (n=0)",
    note6: "Z0: Sandıkta 6 dolu şişe bira var",
    note5: "Z1: Sandıkta 5 dolu şişe bira var",
    note4: "Z2: Sandıkta 4 dolu şişe bira var",
    note3: "Z3: Sandıkta 3 dolu şişe bira var",
    note2: "Z4: Sandıkta 2 dolu şişe bira var",
    note1: "Z5: Sandıkta 1 dolu şişe bira var",
    note0: "Z6: Sandık boş — bundan sonraki hiçbir karar bunu değiştirmez",
    stays: "kalır",
    tableTitle: "Durum Geçiş Tablosu",
    colInput: "Giriş (olay)",
    colCur: "Zn (şu anki durum)",
    colNext: "Zn+1 (yeni durum)",
    formula1:
      "Durum: üstte durum adı, altta çıkış (burada: anz = şişe sayısı) yazan bir daire. Durum geçişleri: tetikleyen olayla etiketlenmiş oklar.",
    formula2:
      "Başlangıç durumu: sistemin başta (veya bir resetten sonra) hangi durumda olduğunu gösterir — burada Z0, dolu sandık.",
    formula3:
      "Durum kodlaması: her duruma hangi somut çıkış değerinin ait olduğunu belirler (burada: anz = 6, 5, 4, 3, 2, 1, 0).",
  },
  en: {
    title: "State Diagram & State Transition Table",
    subtitle: "Formally describing sequential circuits — the beer-crate example (p. 85–86)",
    description:
      "Before describing sequential circuits with bits, it's worth looking at a non-technical " +
      "example — exactly as the original material does it: a student sets off on May 1st with " +
      "his handcart to the school May Day fair, and (being short on cash) only brings a single " +
      "crate of 6 beer bottles. At every step he either decides not to take a beer (n=0) or to " +
      "take one (n=1). Which states do the student and the crate pass through? Click below to " +
      "simulate the walk.",
    inputN1: "Take a beer (n=1)",
    inputN0: "Do nothing (n=0)",
    note6: "Z0: there are 6 full bottles of beer in the crate",
    note5: "Z1: there are 5 full bottles of beer in the crate",
    note4: "Z2: there are 4 full bottles of beer in the crate",
    note3: "Z3: there are 3 full bottles of beer in the crate",
    note2: "Z4: there are 2 full bottles of beer in the crate",
    note1: "Z5: there is 1 full bottle of beer in the crate",
    note0: "Z6: the crate is empty — no further decision changes that",
    stays: "stays",
    tableTitle: "State Transition Table",
    colInput: "Input (event)",
    colCur: "Zn (current state)",
    colNext: "Zn+1 (new state)",
    formula1:
      "State: a circle with the state name on top and the output (here: anz = bottle count) below. State transitions: arrows labeled with the triggering event.",
    formula2:
      "Start state: shows which state the system is in at the beginning (or after a reset) — here Z0, the full crate.",
    formula3:
      "State coding: fixes which concrete output value belongs to each state (here: anz = 6, 5, 4, 3, 2, 1, 0).",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildBierBeispiel(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  const notes = [w.note6, w.note5, w.note4, w.note3, w.note2, w.note1, w.note0];
  const states = notes.map((note, i) => ({
    id: `Z${i}`,
    label: `Z${i}`,
    outputs: { anz: 6 - i },
    note,
  }));

  const transitions = [];
  for (let i = 0; i <= 6; i++) {
    transitions.push({ from: `Z${i}`, to: `Z${i}`, inputId: "n0", label: "n=0" });
  }
  for (let i = 0; i < 6; i++) {
    transitions.push({ from: `Z${i}`, to: `Z${i + 1}`, inputId: "n1", label: "n=1" });
  }
  transitions.push({ from: "Z6", to: "Z6", inputId: "n1", label: `n=1 (${w.stays})` });

  const rows = [];
  for (let i = 0; i <= 6; i++) {
    rows.push({ cells: ["n=0", `Z${i}`, `Z${i}`], stateId: `Z${i}`, inputId: "n0" });
    const next = i < 6 ? `Z${i + 1}` : "Z6";
    rows.push({ cells: ["n=1", `Z${i}`, next], stateId: `Z${i}`, inputId: "n1" });
  }

  return {
    id: "zustandsdiagramm-bier",
    number: 3,
    category: "concept",
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "linear",
    nodeOrder: ["Z0", "Z1", "Z2", "Z3", "Z4", "Z5", "Z6"],
    initialState: "Z0",
    inputs: [
      { id: "n1", label: w.inputN1 },
      { id: "n0", label: w.inputN0 },
    ],
    states,
    transitions,
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state-and-input",
        columns: [w.colInput, w.colCur, w.colNext],
        rows,
      },
    ],
    outputRenderer: "counter-badge",
    outputMeta: { max: 6, key: "anz", captionKey: "counterBadgeCaptionBeer" },
    formulas: [w.formula1, w.formula2, w.formula3],
  };
}
