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
  counterBadgeCaptionBeer: { de: "Volle Flaschen im Kasten", tr: "Sandıktaki dolu şişe", en: "Full bottles in the crate" },

  navGrundlagen: { de: "Grundlagen", tr: "Temel Bilgiler", en: "Fundamentals" },
  navUebungen: { de: "Übungsaufgaben", tr: "Alıştırmalar", en: "Exercises" },
  navHome: { de: "Start", tr: "Ana Sayfa", en: "Home" },
  navToggleAriaOpen: { de: "Navigation öffnen", tr: "Navigasyonu aç", en: "Open navigation" },
  navToggleAriaClose: { de: "Navigation schließen", tr: "Navigasyonu kapat", en: "Close navigation" },

  // ---- Home page ----
  homeGreeting: { de: "Hallo! 👋", tr: "Merhaba! 👋", en: "Hello! 👋" },
  homeTitle: {
    de: "Willkommen bei der TGI Schaltwerke Lernapp",
    tr: "TGI Schaltwerke Lernapp'a hoş geldin",
    en: "Welcome to the TGI Schaltwerke study app",
  },
  homePitch: {
    de: "Diese App verwandelt die Theorie und die 8 Klausuraufgaben rund um „Schaltwerke“ " +
      "(sequenzielle Schaltungen mit Gedächtnis) in interaktive Simulationen, statt nur " +
      "statische Diagramme in einem PDF zu zeigen. Wähle unten deine Sprache und steig ein — " +
      "bei den Grundlagen oder direkt bei einer Übungsaufgabe.",
    tr: "Bu uygulama, „Schaltwerke“ (hafızalı, ardışıl devreler) konusunun teorisini ve buna " +
      "dayanan 8 sınav alıştırmasını, bir PDF'teki durağan diyagramlar göstermek yerine " +
      "interaktif simülasyonlara dönüştürür. Aşağıdan dilini seç ve başla — temel bilgilerle " +
      "veya doğrudan bir alıştırmayla.",
    en: "This app turns the theory behind \"Schaltwerke\" (sequential circuits with memory) and " +
      "the 8 exam exercises built on it into interactive simulations, instead of just showing " +
      "static diagrams in a PDF. Pick your language below and dive in — with the fundamentals, " +
      "or straight into an exercise.",
  },
  homeChooseLanguage: { de: "Sprache wählen", tr: "Dil seç", en: "Choose your language" },
  homeSectionGrundlagen: { de: "Grundlagen", tr: "Temel Bilgiler", en: "Fundamentals" },
  homeSectionUebungen: { de: "Übungsaufgaben", tr: "Alıştırmalar", en: "Exercises" },
  homeAbout: {
    de: "Gebaut von einem Schüler, um für seine eigene Klausur zu lernen — mehr dazu im README auf GitHub.",
    tr: "Bir öğrenci tarafından kendi sınavına çalışmak için yapıldı — daha fazlası için GitHub'daki README'ye bak.",
    en: "Built by a student to study for his own exam — see the README on GitHub for the full story.",
  },

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

  // ---- Schaltnetz vs. Schaltwerk intro (Grundlagen) ----
  snHeading: { de: "Schaltnetz vs. Schaltwerk", tr: "Schaltnetz vs. Schaltwerk (Kombinasyonel vs. Ardışıl Devre)", en: "Schaltnetz vs. Schaltwerk (Combinational vs. Sequential Circuits)" },
  snSubtitle: {
    de: "Warum ein Schaltwerk überhaupt ein Gedächtnis braucht (S. 72–74)",
    tr: "Bir Schaltwerk'in (ardışıl devrenin) neden hafızaya ihtiyacı var (S. 72–74)",
    en: "Why a sequential circuit (Schaltwerk) needs memory at all (p. 72–74)",
  },
  snIntro: {
    de: "Stell dir eine ganz einfache Schaltung aus zwei NOR-Gattern vor, mit zwei Tastern S und R " +
      "und einem Ausgang Q. Klicke S und R unten an und beobachte Q — und versuche dabei besonders " +
      "auf einen Trick zu achten: Setze S=0 und R=0 zurück, einmal nachdem du zuletzt S gedrückt " +
      "hast, und einmal nachdem du zuletzt R gedrückt hast. Schau dir an, was Q dabei jeweils tut.",
    tr: "İki NOR kapısından oluşan çok basit bir devre düşün: S ve R adında iki buton, bir de Q " +
      "çıkışı. Aşağıda S ve R'ye tıkla ve Q'yu izle — özellikle şu hileye dikkat et: S=0 ve R=0'a " +
      "bir kere son olarak S'ye bastıktan sonra, bir kere de son olarak R'ye bastıktan sonra dön. " +
      "Q'nun her ikisinde de ne yaptığına bak.",
    en: "Picture a very simple circuit built from two NOR gates, with two buttons S and R and one " +
      "output Q. Click S and R below and watch Q — and pay attention to one trick in particular: " +
      "set S=0 and R=0 once right after you last pressed S, and once right after you last pressed " +
      "R. Look at what Q does in each case.",
  },
  snSLabel: { de: "S (setzen)", tr: "S (set)", en: "S (set)" },
  snRLabel: { de: "R (rücksetzen)", tr: "R (reset)", en: "R (reset)" },
  snUndefined: { de: "undefiniert! (S=R=1 ist verboten)", tr: "tanımsız! (S=R=1 yasaktır)", en: "undefined! (S=R=1 is forbidden)" },
  snRowS: { de: "S", tr: "S", en: "S" },
  snRowR: { de: "R", tr: "R", en: "R" },
  snRowQ: { de: "Q", tr: "Q", en: "Q" },
  snStepsHeading: {
    de: "Schritt für Schritt (genau wie im Original)",
    tr: "Adım adım (orijinaldeki gibi)",
    en: "Step by step (exactly like in the original)",
  },
  snStep0: {
    de: "Ausgangspunkt: weder Taster R noch S ist gedrückt, Ausgang Q ist „0“.",
    tr: "Başlangıç noktası: ne R ne de S butonuna basılı, Q çıkışı „0“.",
    en: "Starting point: neither button R nor S is pressed, output Q is \"0\".",
  },
  snStep1: {
    de: "Schritt 1: Taster S wird gedrückt → Ausgang Q wird „1“.",
    tr: "Adım 1: S butonuna basılır → Q çıkışı „1“ olur.",
    en: "Step 1: button S is pressed → output Q becomes \"1\".",
  },
  snStep2: {
    de: "Schritt 2: Taster S wird losgelassen (S=0, R=0) → Ausgang Q bleibt „1“!",
    tr: "Adım 2: S butonu bırakılır (S=0, R=0) → Q çıkışı „1“ olarak kalır!",
    en: "Step 2: button S is released (S=0, R=0) → output Q stays \"1\"!",
  },
  snStep3: {
    de: "Schritt 3: Taster R wird gedrückt → Ausgang Q wird „0“.",
    tr: "Adım 3: R butonuna basılır → Q çıkışı „0“ olur.",
    en: "Step 3: button R is pressed → output Q becomes \"0\".",
  },
  snStep4: {
    de: "Schritt 4: Taster R wird losgelassen (S=0, R=0 — dieselbe Kombination wie in Schritt 2!) → Ausgang Q bleibt „0“.",
    tr: "Adım 4: R butonu bırakılır (S=0, R=0 — adım 2'deki ile tıpatıp aynı kombinasyon!) → Q çıkışı „0“ olarak kalır.",
    en: "Step 4: button R is released (S=0, R=0 — the exact same combination as in step 2!) → output Q stays \"0\".",
  },
  snStep5: {
    de: "Schritt 5: S und R werden zugleich gedrückt → Ausgang Q ist undefiniert (verbotener Zustand).",
    tr: "Adım 5: S ve R aynı anda basılır → Q çıkışı tanımsızdır (yasak durum).",
    en: "Step 5: S and R are pressed at the same time → output Q is undefined (a forbidden state).",
  },
  snContradiction: {
    de: "Widerspruch zur Definition des Schaltnetzes: S=0 und R=0 ergeben in Schritt 2 und Schritt 4 unterschiedliche Ausgangskombinationen!",
    tr: "Schaltnetz tanımıyla çelişki: S=0 ve R=0, adım 2 ve adım 4'te farklı çıkış kombinasyonları veriyor!",
    en: "A contradiction with the definition of a combinational circuit: S=0 and R=0 produce different output combinations in step 2 vs. step 4!",
  },
  snDefHeading: {
    de: "Merksätze zu Schaltnetz / Schaltwerk",
    tr: "Schaltnetz / Schaltwerk için ezber kuralları",
    en: "Key definitions: combinational vs. sequential circuits",
  },
  snDefSchaltnetz: {
    de: "Schaltnetz: eine bestimmte Kombination von „0“ und „1“ an den Eingängen ergibt immer dieselbe Kombination an den Ausgängen.",
    tr: "Schaltnetz (kombinasyonel devre): girişlerdeki belirli bir „0“ ve „1“ kombinasyonu, çıkışlarda her zaman aynı kombinasyonu verir.",
    en: "Schaltnetz (combinational circuit): a given combination of \"0\"s and \"1\"s on the inputs always produces the same combination on the outputs.",
  },
  snDefSchaltwerk: {
    de: "Schaltwerk: speichert einen „Zustand“. Eine bestimmte Kombination von „0“ und „1“ an den Eingängen ergibt NICHT immer dieselbe Kombination an den Ausgängen — es kommt auf die Vorgeschichte an.",
    tr: "Schaltwerk (ardışıl devre): bir „durum“ saklar. Girişlerdeki belirli bir „0“ ve „1“ kombinasyonu çıkışlarda HER ZAMAN aynı kombinasyonu vermez — geçmişe bağlıdır.",
    en: "Schaltwerk (sequential circuit): it stores a \"state\". A given combination of \"0\"s and \"1\"s on the inputs does NOT always produce the same combination on the outputs — it depends on what happened before.",
  },
  snFormulaNote: {
    de: "Q = NOR(R, !Q), !Q = NOR(S, Q) — dieses kleine Gedächtnis aus zwei rückgekoppelten NOR-Gattern heißt RS-Flip-Flop und ist der Grundbaustein jedes Schaltwerks.",
    tr: "Q = NOR(R, !Q), !Q = NOR(S, Q) — birbirine geri beslemeli iki NOR kapısından oluşan bu küçük hafıza RS flip-flop olarak adlandırılır ve her Schaltwerk'in temel yapı taşıdır.",
    en: "Q = NOR(R, !Q), !Q = NOR(S, Q) — this tiny memory built from two cross-coupled NOR gates is called an RS flip-flop, and it is the basic building block of every sequential circuit.",
  },

  // ---- Flip-Flops (Grundlagen) ----
  ffPageHeading: { de: "Flip-Flops", tr: "Flip-Flop'lar", en: "Flip-Flops" },
  ffPageSubtitle: {
    de: "Die Bausteine jedes Schaltwerks — Übersicht Flipflops (S. 69–71, 81)",
    tr: "Her Schaltwerk'in yapı taşları — Flip-flop'lara genel bakış (S. 69–71, 81)",
    en: "The building blocks of every sequential circuit — flip-flop overview (p. 69–71, 81)",
  },
  ffPageIntro: {
    de: "Ein Flip-Flop ist das kleinste mögliche Schaltwerk: ein 1-Bit-Speicher. Alle größeren " +
      "Schaltwerke (Zähler, Register, RAM) sind letztlich nur viele Flip-Flops, die geschickt " +
      "verschaltet sind. Wähle unten einen Typ und probiere die Eingänge selbst aus.",
    tr: "Bir flip-flop, mümkün olan en küçük Schaltwerk'tir: 1 bitlik bir hafıza. Daha büyük tüm " +
      "Schaltwerk'ler (sayaçlar, registerlar, RAM) sonuçta sadece akıllıca birbirine bağlanmış " +
      "birçok flip-flop'tur. Aşağıdan bir tür seç ve girişleri kendin dene.",
    en: "A flip-flop is the smallest possible sequential circuit: a 1-bit memory. Every larger " +
      "sequential circuit (counters, registers, RAM) is ultimately just many flip-flops wired " +
      "together cleverly. Pick a type below and try the inputs yourself.",
  },
  ffTabRsLevel: { de: "RS-FF (zustandsgesteuert)", tr: "RS-FF (durum kontrollü)", en: "RS-FF (level-controlled)" },
  ffTabRsClockLevel: { de: "RS-FF (taktzustandsgesteuert)", tr: "RS-FF (saat-durum kontrollü)", en: "RS-FF (clock-level-controlled)" },
  ffTabRsEdge: { de: "RS-FF (taktflankengesteuert)", tr: "RS-FF (saat kenarı kontrollü)", en: "RS-FF (edge-triggered)" },
  ffTabDClockLevel: { de: "D-FF (taktzustandsgesteuert)", tr: "D-FF (saat-durum kontrollü)", en: "D-FF (clock-level-controlled)" },
  ffTabJkEdge: { de: "JK-FF (taktflankengesteuert)", tr: "JK-FF (saat kenarı kontrollü)", en: "JK-FF (edge-triggered)" },
  ffTabTEdge: { de: "T-FF (taktflankengesteuert)", tr: "T-FF (saat kenarı kontrollü)", en: "T-FF (edge-triggered)" },
  ffTabMasterSlave: { de: "JK-Master-Slave-FF", tr: "JK Master-Slave-FF", en: "JK Master-Slave FF" },

  ffControlsHeading: { de: "Eingänge", tr: "Girişler", en: "Inputs" },
  ffTaktButton: { de: "Takt ⏭ (Flanke)", tr: "Saat ⏭ (kenar)", en: "Clock ⏭ (edge)" },
  ffClockLabel: { de: "C (Takt)", tr: "C (saat)", en: "C (clock)" },
  ffMasterLabel: { de: "Master", tr: "Master", en: "Master" },
  ffSlaveLabel: { de: "Slave (Q)", tr: "Slave (Q)", en: "Slave (Q)" },
  ffTableTitle: { de: "Funktionstabelle", tr: "Fonksiyon Tablosu", en: "Function Table" },
  ffForbiddenWarning: { de: "Verbotener Zustand — Q ist undefiniert!", tr: "Yasak durum — Q tanımsız!", en: "Forbidden state — Q is undefined!" },

  ffHold: { de: "Qn (halten/speichern)", tr: "Qn (tut/saklar)", en: "Qn (hold/store)" },
  ffReset0: { de: "0 (rücksetzen)", tr: "0 (resetler)", en: "0 (reset)" },
  ffSet1: { de: "1 (setzen)", tr: "1 (set eder)", en: "1 (set)" },
  ffToggleRow: { de: "!Qn (toggeln)", tr: "!Qn (tersine çevirir)", en: "!Qn (toggle)" },
  ffForbiddenRow: { de: "verboten", tr: "yasak", en: "forbidden" },

  ffRsLevelHeading: { de: "RS-FF (zustandsgesteuert)", tr: "RS-FF (durum kontrollü)", en: "RS-FF (level-controlled)" },
  ffRsLevelIntro: {
    de: "Schaltet sofort bei Änderungen am Eingang — es gibt keinen Takt. S setzt Q auf 1, R setzt Q auf 0; sind beide 0, hält Q seinen Wert; sind beide 1, ist der Zustand verboten.",
    tr: "Girişteki her değişiklikte anında tepki verir — saat (clock) yoktur. S, Q'yu 1'e ayarlar; R, Q'yu 0'a ayarlar; ikisi de 0 ise Q değerini korur; ikisi de 1 ise durum yasaktır.",
    en: "Reacts immediately to changes on its inputs — there is no clock. S sets Q to 1, R sets Q to 0; if both are 0, Q holds its value; if both are 1, the state is forbidden.",
  },
  ffRsClockLevelHeading: { de: "RS-FF (taktzustandsgesteuert)", tr: "RS-FF (saat-durum kontrollü)", en: "RS-FF (clock-level-controlled)" },
  ffRsClockLevelIntro: {
    de: "Schaltet nur wenn der Clock-Eingang C „5V“ (high) anliegt — solange C=0 ist, werden Änderungen an S/R nicht übernommen, egal wie oft du sie umschaltest.",
    tr: "Sadece C saat girişi „5V“ (high/1) olduğunda tepki verir — C=0 olduğu sürece S/R'deki değişiklikler, kaç kez değiştirsen de uygulanmaz.",
    en: "Only reacts while the clock input C is at \"5V\" (high) — as long as C=0, changes to S/R are not applied, no matter how often you toggle them.",
  },
  ffRsEdgeHeading: { de: "RS-FF (taktflankengesteuert)", tr: "RS-FF (saat kenarı kontrollü)", en: "RS-FF (edge-triggered)" },
  ffRsEdgeIntro: {
    de: "Schaltet nur während der Takt von „0“ auf „1“ wechselt (positive Flanke). Stelle S/R ein und drücke dann „Takt“, um die Flanke auszulösen — Q übernimmt den Wert nur in diesem Moment.",
    tr: "Sadece saat „0“dan „1“e geçerken (pozitif kenar) tepki verir. S/R'yi ayarla ve kenarı tetiklemek için „Saat“a bas — Q değeri sadece bu anda alır.",
    en: "Only reacts while the clock changes from \"0\" to \"1\" (a positive edge). Set S/R and then press \"Clock\" to trigger the edge — Q only takes on the new value at that instant.",
  },
  ffDClockLevelHeading: { de: "D-FF (taktzustandsgesteuert)", tr: "D-FF (saat-durum kontrollü)", en: "D-FF (clock-level-controlled)" },
  ffDClockLevelIntro: {
    de: "Schaltet nur wenn C „5V“ anliegt. Q übernimmt dabei einfach den Wert von D — es gibt keinen verbotenen Zustand, weil es nur einen Dateneingang gibt.",
    tr: "Sadece C „5V“ olduğunda tepki verir. Q, basitçe D'nin değerini alır — sadece bir veri girişi olduğu için yasak bir durum yoktur.",
    en: "Only reacts while C is at \"5V\". Q simply takes on the value of D — there is no forbidden state, because there is only one data input.",
  },
  ffJkEdgeHeading: { de: "JK-FF (taktflankengesteuert)", tr: "JK-FF (saat kenarı kontrollü)", en: "JK-FF (edge-triggered)" },
  ffJkEdgeIntro: {
    de: "Wie das taktflankengesteuerte RS-FF, aber ohne verbotenen Zustand: bei J=1 und K=1 toggelt (negiert) Q einfach seinen bisherigen Wert, statt undefiniert zu werden.",
    tr: "Saat kenarı kontrollü RS-FF gibidir, ama yasak durumu yoktur: J=1 ve K=1 olduğunda Q tanımsız olmak yerine sadece önceki değerini tersine çevirir (toggle).",
    en: "Like the edge-triggered RS-FF, but with no forbidden state: when J=1 and K=1, Q simply toggles (inverts) its previous value instead of becoming undefined.",
  },
  ffTEdgeHeading: { de: "T-FF (taktflankengesteuert)", tr: "T-FF (saat kenarı kontrollü)", en: "T-FF (edge-triggered)" },
  ffTEdgeIntro: {
    de: "Das einfachste Flip-Flop: bei jeder Taktflanke wird der gespeicherte Wert „umgedreht“ (getoggelt), wenn T=1 ist; bei T=0 bleibt er stehen. Anwendung: Frequenzteiler (siehe Zähler).",
    tr: "En basit flip-flop: T=1 ise her saat kenarında saklanan değer „ters çevrilir“ (toggle); T=0 ise değişmeden kalır. Uygulama: frekans bölücü (bkz. Sayaç).",
    en: "The simplest flip-flop: on every clock edge, the stored value is \"flipped\" (toggled) if T=1; it stays put if T=0. Application: frequency dividers (see Counters).",
  },
  ffMasterSlaveHeading: { de: "JK-Master-Slave-FF (zweiflankengesteuert)", tr: "JK Master-Slave-FF (çift kenar kontrollü)", en: "JK Master-Slave FF (dual-edge-controlled)" },
  ffMasterSlaveIntro: {
    de: "Hat dieselbe Funktionstabelle wie das JK-FF, besteht aber aus zwei JK-FFs hintereinander: " +
      "der Master übernimmt J/K bei steigender Flanke, der Slave übernimmt den Master-Wert erst bei " +
      "der fallenden Flanke. Dadurch entsteht eine Verzögerung von einem Takt zwischen Master und " +
      "Slave — klicke „Takt“ zweimal, um zu sehen, wie der Wert vom Master zum Slave „durchwandert“.",
    tr: "JK-FF ile aynı fonksiyon tablosuna sahiptir, ama art arda bağlı iki JK-FF'ten oluşur: " +
      "Master, J/K'yı yükselen kenarda alır; Slave, Master'ın değerini ancak düşen kenarda alır. " +
      "Bu da Master ve Slave arasında bir taktlık bir gecikme oluşturur — değerin Master'dan " +
      "Slave'e nasıl „aktığını“ görmek için „Saat“a iki kez tıkla.",
    en: "Has the same function table as the JK-FF, but is built from two JK-FFs in series: the " +
      "master captures J/K on the rising edge, and the slave only takes over the master's value " +
      "on the falling edge. This creates a one-clock delay between master and slave — click " +
      "\"Clock\" twice to watch the value \"travel\" from the master to the slave.",
  },
  ffNoForbidden: { de: "Es gibt keinen verbotenen Zustand!", tr: "Yasak bir durum yoktur!", en: "There is no forbidden state!" },

  // ---- Zähler / Counter (Grundlagen) ----
  ctrHeading: { de: "Zähler (Counter, CTR)", tr: "Sayaç (Counter, CTR)", en: "Counter (CTR)" },
  ctrSubtitle: {
    de: "Synchron vs. asynchron, CLR vs. AR, der Zähler als Frequenzteiler (S. 89–92)",
    tr: "Senkron vs. asenkron, CLR vs. AR, frekans bölücü olarak sayaç (S. 89–92)",
    en: "Sync vs. async, CLR vs. AR, the counter as a frequency divider (p. 89–92)",
  },
  ctrIntro: {
    de: "Ein Zähler ist ein Bauteil, das an einen Taktgenerator angeschlossen ist und im Takt " +
      "(also in dessen Frequenz) Binärzahlen hoch- oder runterzählt. Ein n-Bit-Zähler hat 2ⁿ " +
      "Zustände — ein 2-Bit-Zähler heißt deshalb „CTR DIV 4“, ein 4-Bit-Zähler „CTR DIV 16“. Er " +
      "besteht aus n T-Flip-Flops (siehe Flip-Flops), bei denen jedes nachfolgende FF mit halber " +
      "Frequenz des vorherigen schaltet — deshalb ist ein Zähler gleichzeitig immer ein " +
      "Frequenzteiler.",
    tr: "Bir sayaç, bir saat üretecine bağlı olan ve onun frekansında ikili sayıları yukarı veya " +
      "aşağı sayan bir bileşendir. n bitlik bir sayacın 2ⁿ durumu vardır — bu yüzden 2 bitlik bir " +
      "sayaç „CTR DIV 4“, 4 bitlik bir sayaç „CTR DIV 16“ olarak adlandırılır. n adet T flip-flop'tan " +
      "oluşur (bkz. Flip-Flop'lar) ve her sonraki FF, öncekinin yarı frekansında çalışır — bu " +
      "yüzden bir sayaç aynı zamanda her zaman bir frekans bölücüdür.",
    en: "A counter is a component connected to a clock generator that counts binary numbers up " +
      "or down at that clock's frequency. An n-bit counter has 2ⁿ states — a 2-bit counter is " +
      "therefore called \"CTR DIV 4\", a 4-bit counter \"CTR DIV 16\". It's built from n T flip-flops " +
      "(see Flip-Flops), where each following FF switches at half the frequency of the previous " +
      "one — which is why a counter is always a frequency divider at the same time.",
  },
  ctrWidthLabel: { de: "Breite", tr: "Genişlik", en: "Width" },
  ctrWidth2: { de: "2 Bit (CTR DIV 4)", tr: "2 Bit (CTR DIV 4)", en: "2-bit (CTR DIV 4)" },
  ctrWidth4: { de: "4 Bit (CTR DIV 16)", tr: "4 Bit (CTR DIV 16)", en: "4-bit (CTR DIV 16)" },
  ctrModeLabel: { de: "Modus", tr: "Mod", en: "Mode" },
  ctrModeSync: { de: "Synchron", tr: "Senkron", en: "Synchronous" },
  ctrModeAsync: { de: "Asynchron", tr: "Asenkron", en: "Asynchronous" },
  ctrModeNote: {
    de: "Synchroner Zähler: alle FF hängen an einem gemeinsamen Takt und schalten gleichzeitig. " +
      "Asynchroner Zähler: nur das erste FF hängt am Takt, jedes weitere hängt am Ausgang des " +
      "vorherigen — die FF schalten zeitverzögert, nicht synchron. Beobachte die Reihenfolge, in " +
      "der die Bits beim Klick auf „Takt“ umschalten (im Asynchron-Modus siehst du eine kleine " +
      "Verzögerung von Bit zu Bit).",
    tr: "Senkron sayaç: tüm FF'ler ortak bir saate bağlıdır ve aynı anda anahtarlanır. Asenkron " +
      "sayaç: sadece ilk FF saate bağlıdır, diğerleri öncekinin çıkışına bağlıdır — FF'ler zaman " +
      "gecikmeli anahtarlanır, senkron değildir. „Saat“a tıkladığında bitlerin hangi sırayla " +
      "değiştiğini gözlemle (asenkron modda bitten bite küçük bir gecikme görürsün).",
    en: "Synchronous counter: all FFs are connected to one shared clock and switch at the same " +
      "time. Asynchronous counter: only the first FF is connected to the clock, each further one " +
      "is connected to the output of the previous one — the FFs switch with a delay, not in sync. " +
      "Watch the order in which the bits switch when you click \"Clock\" (in async mode you'll see " +
      "a small delay from bit to bit).",
  },
  ctrClrLabel: { de: "CLR (synchron löschen)", tr: "CLR (senkron sıfırlama)", en: "CLR (synchronous clear)" },
  ctrArLabel: { de: "AR (asynchron, sofort)", tr: "AR (asenkron, anında)", en: "AR (asynchronous, instant)" },
  ctrClrArNote: {
    de: "CLR (synchroner Reset): wirkt erst bei der nächsten Taktflanke. AR (asynchroner Reset): " +
      "wirkt SOFORT, unabhängig vom Takt. Klicke CLR — der Zähler löscht erst beim nächsten „Takt“. " +
      "Klicke AR — der Zähler löscht augenblicklich, auch ohne Taktflanke.",
    tr: "CLR (senkron reset): yalnızca bir sonraki saat kenarında etkili olur. AR (asenkron reset): " +
      "takttan bağımsız olarak ANINDA etkili olur. CLR'a tıkla — sayaç ancak bir sonraki „Saat“ta " +
      "sıfırlanır. AR'a tıkla — sayaç bir saat kenarı olmadan da anında sıfırlanır.",
    en: "CLR (synchronous reset): only takes effect on the next clock edge. AR (asynchronous " +
      "reset): takes effect IMMEDIATELY, independent of the clock. Click CLR — the counter only " +
      "clears on the next \"Clock\" press. Click AR — the counter clears instantly, even without a " +
      "clock edge.",
  },
  ctrClrArmed: {
    de: "CLR gesetzt — wird erst beim nächsten Takt wirksam",
    tr: "CLR ayarlandı — yalnızca bir sonraki saatte etkili olacak",
    en: "CLR armed — will only take effect on the next clock",
  },
  ctrDecimalLabel: { de: "Dezimalwert", tr: "Ondalık değer", en: "Decimal value" },
  ctrBitRow: { de: "Bit", tr: "Bit", en: "Bit" },
  ctrTaktRow: { de: "Takt/Reset", tr: "Saat/Reset", en: "Clock/Reset" },

  // ---- Schieberegister (Grundlagen) ----
  srgHeading: { de: "Schieberegister (SRG)", tr: "Kaydırma Yazmacı (Shift Register, SRG)", en: "Shift Register (SRG)" },
  srgSubtitle: {
    de: "4-Bit-Schieberegister aus vier D-Flip-Flops (S. 84)",
    tr: "Dört D flip-flop'tan oluşan 4 bitlik kaydırma yazmacı (S. 84)",
    en: "A 4-bit shift register built from four D flip-flops (p. 84)",
  },
  srgIntro: {
    de: "Ein Schieberegister besteht aus mehreren hintereinander geschalteten D-Flip-Flops und " +
      "verschiebt bei jeder Taktflanke alle Bits um eine Position. Wähle einen Modus, stelle bei " +
      "Bedarf D0–D3 (zum Laden) bzw. SL/SR (die Bits, die beim Schieben „nachrutschen“) ein und " +
      "drücke „Takt“.",
    tr: "Bir kaydırma yazmacı, art arda bağlanmış birden çok D flip-flop'tan oluşur ve her saat " +
      "kenarında tüm bitleri bir konum kaydırır. Bir mod seç, gerekirse D0–D3'ü (yüklemek için) " +
      "veya SL/SR'yi (kaydırma sırasında „içeri kayan“ bitler) ayarla ve „Saat“a bas.",
    en: "A shift register consists of several D flip-flops chained together, and on every clock " +
      "edge it shifts all bits by one position. Pick a mode, set D0–D3 (for loading) or SL/SR (the " +
      "bits that \"slide in\" while shifting) as needed, and press \"Clock\".",
  },
  srgModeLabel: { de: "Modus M", tr: "Mod M", en: "Mode M" },
  srgModeStop: { de: "M=00: Stop", tr: "M=00: Dur", en: "M=00: Stop" },
  srgModeLeft: { de: "M=01: links schieben", tr: "M=01: sola kaydır", en: "M=01: shift left" },
  srgModeRight: { de: "M=10: rechts schieben", tr: "M=10: sağa kaydır", en: "M=10: shift right" },
  srgModeLoad: { de: "M=11: laden (D3–D0 parallel)", tr: "M=11: yükle (D3–D0 paralel)", en: "M=11: load (D3–D0 parallel)" },
  srgDirectionNote: {
    de: "Rechts schieben: Q0 übernimmt SR, Q1←Q0, Q2←Q1, Q3←Q2 (Q3 fällt heraus). Links schieben: " +
      "Q3 übernimmt SL, Q2←Q3, Q1←Q2, Q0←Q1 (Q0 fällt heraus). Laden: Q0–Q3 übernehmen direkt D0–D3.",
    tr: "Sağa kaydır: Q0, SR'yi alır; Q1←Q0, Q2←Q1, Q3←Q2 (Q3 dışarı çıkar). Sola kaydır: Q3, " +
      "SL'yi alır; Q2←Q3, Q1←Q2, Q0←Q1 (Q0 dışarı çıkar). Yükle: Q0–Q3 doğrudan D0–D3'ü alır.",
    en: "Shift right: Q0 takes on SR; Q1←Q0, Q2←Q1, Q3←Q2 (Q3 falls off the end). Shift left: Q3 " +
      "takes on SL; Q2←Q3, Q1←Q2, Q0←Q1 (Q0 falls off the end). Load: Q0–Q3 directly take on D0–D3.",
  },
  srgClrLabel: { de: "CLR (alles löschen)", tr: "CLR (hepsini sil)", en: "CLR (clear all)" },

  // ---- RAM & ROM (Grundlagen) ----
  memHeading: { de: "RAM & ROM", tr: "RAM & ROM", en: "RAM & ROM" },
  memSubtitle: {
    de: "Speicherbausteine: Schreib-Lese-Speicher vs. Festwertspeicher (S. 81–84)",
    tr: "Bellek yongaları: okuma-yazma belleği vs. salt okunur bellek (S. 81–84)",
    en: "Memory chips: read-write memory vs. read-only memory (p. 81–84)",
  },
  memTabRam: { de: "RAM (Random Access Memory)", tr: "RAM (Random Access Memory)", en: "RAM (Random Access Memory)" },
  memTabRom: { de: "ROM (Read Only Memory)", tr: "ROM (Read Only Memory)", en: "ROM (Read Only Memory)" },
  ramIntro: {
    de: "Ein RAM speichert Daten, die zur Laufzeit überschrieben werden können (zum Beispiel das " +
      "Helligkeitsregister in Aufgabe 6). Dieses Beispiel hat 8 Adressen zu je 4 Bit. Wähle eine " +
      "Adresse, stelle D0–D3 ein, und klicke „Schreiben“ — beachte, dass dafür sowohl EN=1 als " +
      "auch WR=1 nötig ist. Mit OE steuerst du, ob der gespeicherte Inhalt überhaupt an den " +
      "Ausgang darf.",
    tr: "Bir RAM, çalışma anında üzerine yazılabilen verileri saklar (örneğin Görev 6'daki " +
      "parlaklık registerı). Bu örnekte her biri 4 bitlik 8 adres vardır. Bir adres seç, D0–D3'ü " +
      "ayarla ve „Yaz“a tıkla — bunun için EN=1 ve WR=1'in her ikisinin de gerekli olduğuna dikkat " +
      "et. OE ile saklanan içeriğin çıkışa gidip gidemeyeceğini kontrol edersin.",
    en: "A RAM stores data that can be overwritten at runtime (for example the brightness " +
      "register in Exercise 6). This example has 8 addresses of 4 bits each. Pick an address, " +
      "set D0–D3, and click \"Write\" — note that this needs both EN=1 and WR=1. OE controls " +
      "whether the stored content is even allowed onto the output at all.",
  },
  romIntro: {
    de: "Ein ROM speichert feste Werte, die im Betrieb nicht verändert werden können — ideal, um " +
      "z. B. ein 8-Schritt-Halbschrittmuster für einen Schrittmotor dauerhaft abzulegen (S. 82). " +
      "Wähle eine Adresse und lies den fest gespeicherten Inhalt aus.",
    tr: "Bir ROM, çalışma sırasında değiştirilemeyen sabit değerler saklar — örneğin bir step " +
      "motor için 8 adımlık bir yarım adım deseni kalıcı olarak saklamak için idealdir (S. 82). " +
      "Bir adres seç ve sabit olarak saklanan içeriği oku.",
    en: "A ROM stores fixed values that cannot be changed during operation — ideal for " +
      "permanently storing, say, an 8-step half-step pattern for a stepper motor (p. 82). Pick an " +
      "address and read out its fixed content.",
  },
  memAddressLabel: { de: "Adresse", tr: "Adres", en: "Address" },
  memDataLabel: { de: "Dateneingang D0–D3", tr: "Veri girişi D0–D3", en: "Data input D0–D3" },
  memWriteButton: { de: "Schreiben", tr: "Yaz", en: "Write" },
  memWrLabel: { de: "WR (0=lesen, 1=schreiben)", tr: "WR (0=oku, 1=yaz)", en: "WR (0=read, 1=write)" },
  memOeLabel: { de: "OE (0=Inhalt lesbar, 1=Tri-State)", tr: "OE (0=içerik okunabilir, 1=Tri-State)", en: "OE (0=content readable, 1=tri-state)" },
  memEnLabel: { de: "EN (1=Baustein aktiv)", tr: "EN (1=yonga aktif)", en: "EN (1=chip active)" },
  memOutputLabel: { de: "Datenausgang", tr: "Veri çıkışı", en: "Data output" },
  memOutputTristate: { de: "Z (hochohmig / Tri-State)", tr: "Z (yüksek empedans / Tri-State)", en: "Z (high-impedance / tri-state)" },
  memArrayHeading: { de: "Speicherarray", tr: "Bellek Dizisi", en: "Memory Array" },

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
