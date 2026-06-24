import type { Lang } from "./types";

type Params = Record<string, string | number>;

// Generic UI chrome + custom-page text that isn't part of a per-exercise config.
// Exercise content itself (title/description/labels/tables/formulas) lives next
// to each exercise in src/exercises/*.ts so it stays close to the data it describes.
const dict = {
  appSubtitle: {
    de: "Interaktive Übungsaufgaben — TGI 11-2",
    tr: "İnteraktif Alıştırmalar — TGI 11-2",
    en: "Interactive Exercises — TGI 11-2",
  },
  exerciseWord: { de: "Aufgabe", tr: "Görev", en: "Exercise" },
  panelStateDiagram: { de: "Zustandsdiagramm", tr: "Durum Diyagramı", en: "State Diagram" },
  panelOutput: { de: "Ausgabe", tr: "Çıkış", en: "Output" },
  panelFormulas: { de: "Schaltfunktionen", tr: "Anahtarlama Fonksiyonları", en: "Switching Functions" },
  panelTiming: { de: "Zeitdiagramm", tr: "Zaman Diyagramı", en: "Timing Diagram" },
  rowClock: { de: "Takt", tr: "Vuruş", en: "Clock" },
  rowState: { de: "Zustand", tr: "Durum", en: "State" },
  rowInput: { de: "Eingabe", tr: "Giriş", en: "Input" },
  controlsPlay: { de: "Play", tr: "Başlat", en: "Play" },
  controlsPause: { de: "Pause", tr: "Duraklat", en: "Pause" },
  controlsStep: { de: "Step", tr: "Adım", en: "Step" },
  controlsReset: { de: "Reset", tr: "Sıfırla", en: "Reset" },
  controlsSpeed: { de: "Geschwindigkeit", tr: "Hız", en: "Speed" },
  controlsMsPerClock: { de: "{ms} ms/Takt", tr: "{ms} ms/vuruş", en: "{ms} ms/clock" },
  counterBadgeCaption: { de: "Kopien übrig", tr: "Kalan kopya", en: "Copies remaining" },

  // ---- PWM page (Aufgabe 6) ----
  pwmHeading: { de: "Aufgabe 6 — Pulsweitenmodulation", tr: "Görev 6 — Darbe Genişlik Modülasyonu", en: "Exercise 6 — Pulse-Width Modulation" },
  pwmSubtitle: {
    de: "PWM-Dimmer mit RAM-Helligkeitsregister (S. 101)",
    tr: "RAM parlaklık registerlı PWM dimmer (S. 101)",
    en: "PWM dimmer with a RAM brightness register (p. 101)",
  },
  pwmDescription: {
    de: 'Ein 8-Bit-Zähler läuft frei von 0 bis 255 und beginnt dann wieder bei 0 (Periode T = 256 / 1 kHz = 0,256 s, hier stark verlangsamt zum Beobachten). Ein 8-Bit-Komparator vergleicht den Zählerstand laufend mit einem im RAM gespeicherten Helligkeitsregister (RAM, nicht ROM — weil „heller"/„dunkler" den Wert zur Laufzeit überschreiben). Solange Zähler < Register ist das Vergleichssignal „licht" = 1 → die Lampe leuchtet kurz; ist der Zähler größer, bleibt sie aus. Dieses schnelle An/Aus mit variabler Pulsbreite wird vom Auge als kontinuierliche Helligkeit wahrgenommen (Duty Cycle = Register / 256). Ein D-Flip-Flop (D = !y, Takt = Tastendruck) schaltet die Lampe per AND-Gatter komplett ein oder aus.',
    tr: '8 bitlik bir sayaç 0\'dan 255\'e kadar serbestçe sayar ve sonra tekrar 0\'dan başlar (periyot T = 256 / 1 kHz = 0,256 s; burada gözlemleyebilmen için çok yavaşlatıldı). 8 bitlik bir karşılaştırıcı, sayaç değerini sürekli olarak RAM\'de saklanan bir parlaklık registerı ile karşılaştırır (ROM değil RAM — çünkü "daha açık"/"daha koyu" butonları değeri çalışma anında üzerine yazar). Sayaç < register olduğu sürece karşılaştırma sinyali "licht" = 1 olur → lamba kısa süreliğine yanar; sayaç daha büyük olduğunda lamba kapalı kalır. Bu hızlı açma/kapama ile değişken darbe genişliği, göz tarafından sürekli bir parlaklık olarak algılanır (Duty Cycle = Register / 256). Bir D flip-flop (D = !y, Takt = tuşa basma) lambayı bir AND kapısı üzerinden tamamen açar veya kapatır.',
    en: 'An 8-bit counter runs freely from 0 to 255 and then starts again at 0 (period T = 256 / 1 kHz = 0.256 s, slowed down a lot here so you can observe it). An 8-bit comparator continuously compares the counter value with a brightness register stored in RAM (RAM, not ROM — because "lighter"/"darker" overwrite the value at runtime). As long as counter < register, the comparison signal "licht" = 1 → the lamp lights up briefly; once the counter is larger, it stays off. This fast on/off switching with a variable pulse width is perceived by the eye as continuous brightness (duty cycle = register / 256). A D flip-flop (D = !y, clock = button press) switches the lamp completely on or off via an AND gate.',
  },
  pwmRamHeading: { de: "RAM-Helligkeitsregister", tr: "RAM Parlaklık Registerı", en: "RAM Brightness Register" },
  pwmStufeLabel: {
    de: "Stufe {stufe} / 7 (Register = {register}/255)",
    tr: "Kademe {stufe} / 7 (Register = {register}/255)",
    en: "Level {stufe} / 7 (register = {register}/255)",
  },
  pwmDarker: { de: "dunkler", tr: "daha koyu", en: "darker" },
  pwmLighter: { de: "heller", tr: "daha açık", en: "lighter" },
  pwmDffHeading: { de: "D-FF Ein/Aus-Schalter (1.1.3)", tr: "D-FF Açma/Kapama Anahtarı (1.1.3)", en: "D-FF On/Off Switch (1.1.3)" },
  pwmDffDescription: {
    de: "D = !y, C = Tastendruck-Flanke → y kippt bei jedem Druck um. AND-Gatter (1.1.4): Lampe = licht & y.",
    tr: "D = !y, C = tuşa basma kenarı → her basışta y tersine döner. AND kapısı (1.1.4): Lampe = licht & y.",
    en: "D = !y, C = button-press edge → y toggles on every press. AND gate (1.1.4): Lampe = licht & y.",
  },
  pwmToggleButton: { de: "Ein/Aus-Taste (y = {y})", tr: "Açma/Kapama tuşu (y = {y})", en: "On/off button (y = {y})" },
  pwmComparatorHeading: {
    de: "8-Bit-Zähler vs. Register (Komparator)",
    tr: "8 Bit Sayaç vs. Register (Karşılaştırıcı)",
    en: "8-Bit Counter vs. Register (Comparator)",
  },
  pwmComparatorLine: {
    de: "Zähler = {counter} {cmp} Register = {register} → licht = {licht}",
    tr: "Sayaç = {counter} {cmp} Register = {register} → licht = {licht}",
    en: "Counter = {counter} {cmp} Register = {register} → licht = {licht}",
  },
  pwmLampHeading: { de: "Lampe", tr: "Lamba", en: "Lamp" },
  pwmTimingHeading: {
    de: "Zeitdiagramm (letzte {n} Takte)",
    tr: "Zaman Diyagramı (son {n} vuruş)",
    en: "Timing Diagram (last {n} clocks)",
  },
  pwmRowCounter: { de: "Zähler", tr: "Sayaç", en: "Counter" },
  pwmRowLicht: { de: "licht", tr: "licht", en: "licht" },
  pwmRowLampe: { de: "Lampe", tr: "Lamba", en: "Lamp" },
  pwmFormula1: { de: "T = 256 / 1 kHz = 0,256 s (1.1.1)", tr: "T = 256 / 1 kHz = 0,256 s (1.1.1)", en: "T = 256 / 1 kHz = 0.256 s (1.1.1)" },
  pwmFormula2: {
    de: "D = !y, C = Ein-Aus-Taste (1.1.3, D-FF als Toggle)",
    tr: "D = !y, C = açma-kapama tuşu (1.1.3, D-FF toggle olarak)",
    en: "D = !y, C = on/off button (1.1.3, D-FF as a toggle)",
  },
  pwmFormula3: { de: "Lampe = licht & y (1.1.4, UND-Gatter)", tr: "Lampe = licht & y (1.1.4, AND kapısı)", en: "Lampe = licht & y (1.1.4, AND gate)" },
  pwmFormula4Prefix: {
    de: "Kaskade aus zwei 4-Bit-Komparatoren (1.1.5)",
    tr: "İki 4 bitlik karşılaştırıcının kaskadı (1.1.5)",
    en: "Cascade of two 4-bit comparators (1.1.5)",
  },
  pwmBrightnessPerceived: {
    de: "Wahrgenommene Helligkeit",
    tr: "Algılanan Parlaklık",
    en: "Perceived Brightness",
  },
  pwmBrightnessRaw: { de: "Lampe (roh, PWM-Signal)", tr: "Lamba (ham, PWM sinyali)", en: "Lamp (raw, PWM signal)" },

  // ---- Wald safety timer (Aufgabe 7, 1.3) ----
  waldTimerHeading: {
    de: "1.3 — Unabhängige Sicherheits-Zeitschaltung",
    tr: "1.3 — Bağımsız Güvenlik Zaman Rölesi",
    en: "1.3 — Independent Safety Timeout",
  },
  waldTimerDescription: {
    de: "Läuft permanent mit 1 Hz, unabhängig vom Spielablauf. Jeder Tastendruck (A/B/C, auch ein „falscher\") setzt sie zurück. Erreicht sie 0, springt das Schaltwerk automatisch auf Z0 zurück.",
    tr: "Oyunun gidişatından bağımsız olarak sürekli 1 Hz ile çalışır. Her tuşa basış (A/B/C, \"yanlış\" bir basış dahil) onu sıfırlar. 0'a ulaşırsa, devre otomatik olarak Z0'a geri döner.",
    en: 'Runs permanently at 1 Hz, independent of the game flow. Any button press (A/B/C, even a "wrong" one) resets it. Once it reaches 0, the circuit automatically jumps back to Z0.',
  },
  waldTimerCountdown: {
    de: "{s}s bis Auto-Reset (von {total}s = 2 Min., hier verkürzt anschaulich)",
    tr: "Otomatik sıfırlamaya {s}s ({total}s = 2 dk'nın kısaltılmış, gözlemlenebilir hâli)",
    en: "{s}s until auto-reset (shortened here from {total}s = 2 min. for observability)",
  },

  // ---- D-FF timing lab (Aufgabe 8, 2.1.1-2.1.2) ----
  dffHeading: { de: "2.1.1 – 2.1.2: D-FF und sein Zeitdiagramm", tr: "2.1.1 – 2.1.2: D-FF ve Zaman Diyagramı", en: "2.1.1 – 2.1.2: The D-FF and Its Timing Diagram" },
  dffIntro: {
    de: "Das D-Flip-Flop hat drei Eingänge: D (Daten, synchron), C (Takt, dreieckiges Flankensymbol — steigende Flanke löst aus) und !R (asynchroner, low-aktiver Reset, Kreis-Symbol ohne Dreieck — wirkt sofort, unabhängig vom Takt) (2.1.1).",
    tr: "D flip-flop'un üç girişi vardır: D (veri, senkron), C (saat, üçgen kenar sembolü — yükselen kenar tetikler) ve !R (asenkron, low-aktif reset, üçgensiz daire sembolü — takttan bağımsız anında etki eder) (2.1.1).",
    en: "The D flip-flop has three inputs: D (data, synchronous), C (clock, triangular edge symbol — triggers on the rising edge) and !R (asynchronous, low-active reset, circle symbol without a triangle — acts immediately, independent of the clock) (2.1.1).",
  },
  dffCalloutLabel: { de: "Hinweis zu 2.1.2:", tr: "2.1.2 ile ilgili not:", en: "Note on 2.1.2:" },
  dffCalloutBefore: {
    de: "Im Originalmaterial (gescanntes PDF) waren die genauen Takt-Intervalle, in denen Q = 1 ist, nicht zuverlässig lesbar — diese Stelle ist in",
    tr: "Orijinal materyalde (taranan PDF), Q = 1 olduğu kesin vuruş aralıkları güvenilir biçimde okunamıyordu — bu nokta",
    en: "In the original material (a scanned PDF), the exact clock intervals where Q = 1 weren't reliably readable — this spot is deliberately marked as",
  },
  dffCalloutAfter: {
    de: "bewusst als ___ markiert, statt einen Wert zu erfinden. Stattdessen kannst du hier D und !R pro Takt selbst anklicken (Felder umschalten) und siehst Q live nach der D-FF-Regel berechnet. Trage dein eigenes/das echte Diagramm nach, sobald du die Originalvorlage nachgeprüft hast.",
    tr: "dosyasında bilerek ___ olarak işaretlendi, bir değer icat etmek yerine. Onun yerine burada D ve !R'yi her vuruş için kendin tıklayarak değiştirebilir ve Q'nun D-FF kuralına göre canlı hesaplandığını görebilirsin. Orijinal kaynağı kontrol ettiğinde kendi/gerçek diyagramını buraya işleyebilirsin.",
    en: "instead of inventing a value. Instead, you can click D and !R for each clock tick yourself (toggle the cells) and watch Q get computed live according to the D-FF rule. Fill in your own/the real diagram once you've checked the original source.",
  },
  dffRowD: { de: "D (klickbar)", tr: "D (tıklanabilir)", en: "D (clickable)" },
  dffRowR: { de: "!R (klickbar)", tr: "!R (tıklanabilir)", en: "!R (clickable)" },
  dffRowQ: { de: "Q (berechnet)", tr: "Q (hesaplanan)", en: "Q (computed)" },
  dffFooterNote: {
    de: "Regel: Q wird bei jeder (impliziten) steigenden C-Flanke gleich D — außer !R ist gerade 0 (low), dann erzwingt der asynchrone Reset Q = 0, egal was D oder C tun.",
    tr: "Kural: Q, her (örtük) yükselen C kenarında D'ye eşit olur — !R o anda 0 (low) değilse. !R 0 ise, asenkron reset D veya C ne yaparsa yapsın Q = 0'ı zorlar.",
    en: "Rule: Q becomes equal to D on every (implicit) rising C edge — unless !R is currently 0 (low), in which case the asynchronous reset forces Q = 0 no matter what D or C do.",
  },

  // ---- Laufbalken tabs (Aufgabe 8) ----
  laufbalkenTabFsm: { de: "2.1.3–2.1.5 Zustandsautomat", tr: "2.1.3–2.1.5 Durum Otomatı", en: "2.1.3–2.1.5 State Machine" },
  laufbalkenTabDff: { de: "2.1.1–2.1.2 D-FF Zeitdiagramm", tr: "2.1.1–2.1.2 D-FF Zaman Diyagramı", en: "2.1.1–2.1.2 D-FF Timing Diagram" },
} satisfies Record<string, LangText>;

type LangText = Record<Lang, string>;

export type StringKey = keyof typeof dict;

export function t(key: StringKey, lang: Lang, params?: Params): string {
  const template = dict[key]?.[lang] ?? dict[key]?.de ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
}
