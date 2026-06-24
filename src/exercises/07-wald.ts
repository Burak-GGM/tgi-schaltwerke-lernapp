import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";

const WORDS = {
  de: {
    title: "Waldabenteuerspielplatz",
    subtitle: "Ext. Interrupt, Abitur 2011/2012 A1 (S. 102–103)",
    description:
      "Ein Drehkreuz lässt Kinder nur in der richtigen Reihenfolge durch drei Stationen: erst " +
      "Taste B (Tafel 2), dann Taste C (Tafel 3), dann Taste A (Tafel 1) — danach „Gut gemacht“ " +
      "(Zustand Z3, Fertig=1). Jede richtige Taste löst kurz den Motor (M=1) aus, der das Drehkreuz " +
      "um 90° weiterdreht. Aus Z3 führt jede beliebige Taste zurück zu Z0. Unten siehst du außerdem " +
      "die unabhängige 1-Hz-Sicherheits-Zeitschaltung (1.3): sie läuft permanent, wird durch jeden " +
      "Tastendruck zurückgesetzt und springt sonst nach Ablauf automatisch auf Z0 zurück (hier auf " +
      "wenige Sekunden verkürzt, damit man es beobachten kann — real sind es 120 Takte / 2 Minuten).",
    sign: "Tafel",
    inputA: "Taste A (Tafel 1)",
    inputB: "Taste B (Tafel 2)",
    inputC: "Taste C (Tafel 3)",
    done: "Fertig",
    doneNote: '„Gut gemacht!“ — beliebige Taste führt zurück zu Z0',
    any: "beliebig",
    tableTitle: "Zustandsfolgetabelle",
    colState: "Zustand (akt.)",
    colKey: "Taste",
    colNext: "Zustand (folgend)",
    formula1: "SA = A & !B & !C  SB = !A & B & !C  SC = !A & !B & C   (je genau eine Taste erkannt)",
    formula2:
      "Takt-Sperre: UND-Gatter blockiert neue Taktimpulse während Motor „aktiv“ ist (sonst Drehkreuz-Versatz)",
    formula3:
      "1.4: 240 Schritte / 4 Phasen = 60 Schritte pro 90° → 60/4 = 15 Wiederholungen je Phase; 6 s / 60 = 100 ms Wartezeit pro Schritt",
  },
  tr: {
    title: "Orman Macera Oyun Alanı",
    subtitle: "Harici Kesme (Ext. Interrupt), Abitur 2011/2012 A1 (S. 102–103)",
    description:
      "Bir turnike çocukları üç istasyondan sadece doğru sırayla geçirir: önce B tuşu (Tabela 2), " +
      "sonra C tuşu (Tabela 3), sonra A tuşu (Tabela 1) — ardından „Aferin“ (Durum Z3, Tamam=1). " +
      "Her doğru tuş kısa süreliğine motoru (M=1) tetikler, bu da turnikeyi 90° döndürür. Z3'ten " +
      "herhangi bir tuş Z0'a geri döner. Aşağıda ayrıca bağımsız 1 Hz güvenlik zaman rölesini " +
      "(1.3) görüyorsun: sürekli çalışır, her tuşa basışla sıfırlanır ve aksi halde süresi " +
      "dolduğunda otomatik olarak Z0'a döner (burada gözlemlenebilmesi için birkaç saniyeye " +
      "kısaltıldı — gerçekte 120 vuruş / 2 dakikadır).",
    sign: "Tabela",
    inputA: "Tuş A (Tabela 1)",
    inputB: "Tuş B (Tabela 2)",
    inputC: "Tuş C (Tabela 3)",
    done: "Tamam",
    doneNote: '"Aferin!" — herhangi bir tuş Z0\'a geri döner',
    any: "herhangi biri",
    tableTitle: "Durum Geçiş Tablosu",
    colState: "Durum (şu anki)",
    colKey: "Tuş",
    colNext: "Durum (sonraki)",
    formula1: "SA = A & !B & !C  SB = !A & B & !C  SC = !A & !B & C   (her zaman tam olarak bir tuş tanınır)",
    formula2:
      "Vuruş kilidi: motor „aktif“ olduğu sürece AND kapısı yeni vuruş sinyallerini bloke eder (yoksa turnike kayar)",
    formula3:
      "1.4: 240 adım / 4 faz = 90° için 60 adım → 60/4 = faz başına 15 tekrar; 6 s / 60 = adım başına 100 ms bekleme",
  },
  en: {
    title: "Forest Adventure Playground",
    subtitle: "External Interrupt, Abitur 2011/2012 A1 (p. 102–103)",
    description:
      "A turnstile only lets children through three stations in the correct order: first button " +
      "B (sign 2), then button C (sign 3), then button A (sign 1) — followed by \"well done\" " +
      "(state Z3, Done=1). Every correct button briefly triggers the motor (M=1), which turns the " +
      "turnstile by 90°. From Z3, any button leads back to Z0. Below you can also see the " +
      "independent 1 Hz safety timeout (1.3): it runs permanently, gets reset by every button " +
      "press, and otherwise automatically jumps back to Z0 once it runs out (shortened here to a " +
      "few seconds so it's observable — in reality it's 120 ticks / 2 minutes).",
    sign: "Sign",
    inputA: "Button A (Sign 1)",
    inputB: "Button B (Sign 2)",
    inputC: "Button C (Sign 3)",
    done: "Done",
    doneNote: '"Well done!" — any button leads back to Z0',
    any: "any",
    tableTitle: "State Transition Table",
    colState: "State (current)",
    colKey: "Button",
    colNext: "State (next)",
    formula1: "SA = A & !B & !C  SB = !A & B & !C  SC = !A & !B & C   (exactly one button recognized each time)",
    formula2:
      'Clock lock: an AND gate blocks new clock pulses while the motor is "active" (otherwise the turnstile would drift out of position)',
    formula3:
      "1.4: 240 steps / 4 phases = 60 steps per 90° → 60/4 = 15 repeats per phase; 6 s / 60 = 100 ms wait per step",
  },
} satisfies Record<Lang, Record<string, string>>;

export function buildWald(lang: Lang): ExerciseConfig {
  const w = WORDS[lang];
  const sign1 = `${w.sign}1`;
  const sign2 = `${w.sign}2`;
  const sign3 = `${w.sign}3`;
  return {
    id: "wald",
    number: 7,
    title: w.title,
    subtitle: w.subtitle,
    description: w.description,
    layout: "circular",
    nodeOrder: ["Z0", "Z1", "Z2", "Z3"],
    initialState: "Z0",
    inputs: [
      { id: "A", label: w.inputA },
      { id: "B", label: w.inputB },
      { id: "C", label: w.inputC },
    ],
    states: [
      {
        id: "Z0",
        label: "Z0",
        outputs: { [sign1]: true, [sign2]: false, [sign3]: false, [w.done]: false },
      },
      {
        id: "Z1",
        label: "Z1",
        outputs: { [sign1]: false, [sign2]: true, [sign3]: false, [w.done]: false },
      },
      {
        id: "Z2",
        label: "Z2",
        outputs: { [sign1]: false, [sign2]: false, [sign3]: true, [w.done]: false },
      },
      {
        id: "Z3",
        label: "Z3",
        outputs: { [sign1]: false, [sign2]: false, [sign3]: false, [w.done]: true },
        note: w.doneNote,
      },
    ],
    transitions: [
      { from: "Z0", to: "Z1", inputId: "B", label: "B", pulseOutputs: { M: true } },
      { from: "Z1", to: "Z2", inputId: "C", label: "C", pulseOutputs: { M: true } },
      { from: "Z2", to: "Z3", inputId: "A", label: "A", pulseOutputs: { M: true, T: true } },
      { from: "Z3", to: "Z0", inputId: "A", label: w.any },
      { from: "Z3", to: "Z0", inputId: "B", label: w.any },
      { from: "Z3", to: "Z0", inputId: "C", label: w.any },
    ],
    tables: [
      {
        title: w.tableTitle,
        highlightBy: "state-and-input",
        columns: [w.colState, w.colKey, w.colNext],
        rows: [
          { stateId: "Z0", inputId: "B", cells: ["Z0", "B", "Z1"] },
          { stateId: "Z1", inputId: "C", cells: ["Z1", "C", "Z2"] },
          { stateId: "Z2", inputId: "A", cells: ["Z2", "A", "Z3"] },
          { stateId: "Z3", inputId: "A", cells: ["Z3", w.any, "Z0"] },
        ],
      },
    ],
    outputRenderer: "bool-pills",
    formulas: [w.formula1, w.formula2, w.formula3],
  };
}
