<div align="right"><a href="README.md">🇬🇧 This page in English</a></div>

# TGI Schaltwerke Lernapp

**Ein interaktives Lern-Tool für digitale Schaltwerke, gebaut von einem Schüler, um für seine eigene Klausur zu lernen.**

> 🇬🇧 Diese README gibt es auch auf Englisch: **[README.md](README.md)**.

## Warum gibt es dieses Projekt?

Ich besuche ein deutsches Technisches Gymnasium, Fachrichtung **TGI** (Technische Informatik). Eine Unterrichtseinheit in diesem Fach — **Schaltwerke** — behandelt digitale Schaltungen mit *Gedächtnis*: Ampelschaltungen, Kopierer-Zähler, Lauflichter, Dimmer per Pulsweitenmodulation und so weiter. Die Klausur dazu deckt 8 abi-typische Übungsaufgaben rund um dieses Thema ab, zusätzlich zur dahinterliegenden Theorie (Flip-Flops, Zähler, Schieberegister, RAM/ROM).

Das Problem: dieser Stoff wird normalerweise über **statische Diagramme in einem PDF** vermittelt — hier ein Zustandsdiagramm, dort eine Tabelle, woanders ein Zeitdiagramm — und man soll sich im Kopf vorstellen, wie sich die drei zueinander verhalten und wie sich die Schaltung *über die Zeit* verhält. Das ist schwer. Man kann sich die Diagramme einprägen, ohne wirklich zu verstehen, wie es *aussieht*, wenn "das System geht von Zustand Z2 zu Z3, wenn dieser Knopf gedrückt wird" tatsächlich passiert.

Anstatt also nur meine Notizen nochmal durchzulesen, habe ich das hier gebaut: eine kleine Web-App, die die ganze Einheit — die Theorie genauso wie die 8 Klausuraufgaben — in echte **interaktive Simulationen** verwandelt. Man drückt einen Knopf — und sieht gleichzeitig, wie im Zustandsdiagramm der neue Zustand aufleuchtet, die passende Zeile in der Tabelle hervorgehoben wird, das Zeitdiagramm eine neue Spalte bekommt und die tatsächliche Ausgabe (eine Ampel, eine Lampenreihe, ein LED-Raster, ein Dimmer, ein Flip-Flop) reagiert — alles gleichzeitig, alles miteinander verknüpft. Aus "dieses Diagramm einprägen" wird "zusehen, wie es passiert, und es dann selbst vorhersagen können".

Das ist kein professionelles Produkt und kein allgemeiner Schaltkreis-Simulator — es ist ein persönliches Lern-Tool für meine Klausurvorbereitung. Ich veröffentliche den Code, falls er nützlich ist für:
- andere Schüler mit demselben Klausurthema (die Aufgaben folgen einem üblichen Abitur-/TG-Lehrplan, tauchen also vermutlich auch anderswo auf),
- alle, die digitale Logik/Zustandsautomaten zum ersten Mal lernen und einen visuellen, anfassbaren Einstieg suchen,
- oder einfach Leute, die interessiert, wie ein "Lern-Tool, das ich brauchte aber nicht hatte" von Grund auf entsteht.

### Für alle ohne Vorwissen: die 30-Sekunden-Erklärung

Eine normale digitale Schaltung (ein *Schaltnetz*) ist wie ein Taschenrechner: gleiche Eingabe, immer dieselbe Ausgabe, kein Gedächtnis. Ein **Schaltwerk** ist eine digitale Schaltung, die sich etwas *merkt* — sie hat einen inneren "Zustand", und was als Nächstes passiert, hängt **sowohl** von der aktuellen Eingabe **als auch** vom bereits vorhandenen Zustand ab. Eine Ampel ist dafür ein perfektes Alltagsbeispiel: der Druck auf den Fußgänger-Knopf schaltet die Ampel nicht *sofort* auf Grün — es hängt davon ab, welche Farbe sie *gerade* zeigt. Dieses "hängt von der Vorgeschichte ab"-Verhalten ist das gesamte Thema, und es wird formal mit **Zustandsdiagrammen** (Kreise, verbunden durch Pfeile) und **Zustandstabellen** beschrieben. Diese App lässt einen genau das durchklicken, für 8 echte Klausuraufgaben, statt nur darüber zu lesen.

## Was hier drinsteckt

### Grundlagen (die Theorie hinter den Aufgaben)

| Seite | Was man sieht |
|---|---|
| Schaltnetz vs. Schaltwerk | Ein Zwei-NOR-Gatter-Latch zum Durchklicken — live der Beweis, dass dieselbe Eingangskombination je nach Vorgeschichte ein anderes Ergebnis liefert |
| Flip-Flops | Ein Simulator, 7 Tabs: zustandsgesteuertes / taktzustandsgesteuertes / taktflankengesteuertes RS-FF, taktzustandsgesteuertes D-FF, taktflankengesteuerte JK-FF und T-FF, sowie ein JK-Master-Slave-FF, der sichtbar einen Takt hinterherhängt |
| Zustandsdiagramm & Zustandsfolgetabelle | Das Originalbeispiel aus dem Lehrmaterial (ein Schüler, der auf dem Weg zur Maifeier seinen Bierkasten leert) als klickbarer 7-Zustands-Automat |
| Zähler (CTR) | Ein 2-/4-Bit-Binärzähler — Synchron- vs. Asynchron-Modus umschalten und beobachten, wie die Bits zeitverzögert statt gleichzeitig kippen; CLR (synchron) vs. AR (asynchron); die Bit-Zeilen sind gleichzeitig eine Live-Demo des Frequenzteilers |
| Schieberegister (SRG) | Ein 4-Bit-Schieberegister mit den Modi Stop / links schieben / rechts schieben / parallel laden |
| RAM & ROM | Ein 8×4-Schreib-Lese-Speicher (Adresse, Daten, WR/OE/EN) plus ein 8×4-Festwertspeicher mit einem echten Schrittmotor-Halbschrittmuster |

### Die 8 Klausuraufgaben

| # | Aufgabe | Was man sieht |
|---|---|---|
| 1 | Kopierer | Ein lineares Zustandsdiagramm (mit "Skip"-Pfeilen) + ein live mitlaufender Kopienzähler |
| 2 | Ampelschaltung | Ein 8-Zustands-Ring (ein Binärzähler) + eine 3-Lampen-Ampel + ein Zeitdiagramm |
| 3 | Lauflichtsteuerung I | Ein 4-Zustands-Ring + eine Reihe aus 4 Lampen |
| 4 | Lauflicht „Kit-Licht" | Ein 6-Zustands-Ring mit Hin- und Rücklauf + eine Reihe aus 4 Lampen |
| 5 | ROM-Codewandler | Dieselbe Ampel-Logik wie bei #2, aber als ROM-Speicherabfrage dargestellt |
| 6 | Pulsweitenmodulation | Eigene Seite: ein 8-Bit-Zähler gegen ein Helligkeitsregister, ein Komparator, ein Flip-Flop-Schalter, ein Helligkeitsbalken |
| 7 | Waldabenteuerspielplatz | Ein 4-Zustands-Ring, gesteuert über 3 Tasten + eine unabhängige 1-Hz-Sicherheits-Rücksetzung |
| 8 | Laufbalken / Parkhaus | Tab 1: ein freier Flip-Flop-Zeitdiagramm-Simulator; Tab 2: ein 6-Zustands-Ring, der ein 3×3-LED-Raster steuert |

Jede Aufgabe zeigt dieselben vier verknüpften Ansichten: ein **Zustandsdiagramm**, eine **Zustands-/Wertetabelle** (die passende Zeile leuchtet auf), die **tatsächliche Ausgabe** (Lampen, Ampel, LED-Raster usw.) und ein **Zeitdiagramm** des gerade Passierten — dazu Play/Pause/Step/Reset-Steuerung.

Das ist bewusst **kein** Gate-Level-Schaltkreis-Simulator (keine AND/OR-Gatter-Verdrahtung). Es arbeitet auf derselben Abstraktionsebene, auf der der Unterricht stattfindet: Zustand ↔ Tabelle ↔ Zeitdiagramm ↔ Ausgabe.

## Selbst ausprobieren

```bash
npm install
npm run dev
```

Dann `http://localhost:5173` im Browser öffnen. Es ist eine statische Web-App — `npm run build`
erzeugt einen `dist/`-Ordner, der überall gehostet werden kann, kein Backend oder Datenbank nötig.

## Sprachen

Die App selbst (nicht nur diese README) funktioniert auf **Deutsch (Standard), Türkisch und Englisch** — ein Sprachumschalter sitzt in der Sidebar, die Auswahl wird gespeichert. Ein Sprachwechsel setzt eine laufende Simulation nicht zurück.

**Boolesche Notation:** alle Schaltfunktionen verwenden die mobil-sichere ASCII-Notation `!` (NICHT), `&` (UND) und `#` (XOR) statt Überstrich/⊕/Mittelpunkt-Symbolen, z. B. `!Q2 & X` statt `Q̄2 · X`. Das `+` für ODER bleibt unverändert. Variablen-Abkürzungen aus der Fachnotation (R/Ge/Gr, L1–L4, Q1Q0, a–j) bleiben unverändert — sie werden auch im Originalmaterial als Symbole benutzt, nicht als Wörter.

## Eine bewusste Lücke

Die Zeitdiagramm-Frage in Aufgabe 8 (2.1.2) basiert auf einer gescannten PDF-Seite, auf der die genauen Takt-Intervalle nicht lesbar waren. Statt zu raten und eine erfundene Antwort als Fakt darzustellen, ist dieser Teil ein **freier Flip-Flop-Zeitdiagramm-Simulator** statt einer festen Lösung: man klickt D und !R selbst pro Takt an und sieht Q live nach der echten Flip-Flop-Regel berechnet. Findet sich die echte Quelle, lassen sich die echten Werte dort eintragen.

## Architektur, für alle, die es erweitern möchten

- **`src/engine/`** — ein kleiner, generischer, datengetriebener Zustandsautomat-Kern. Jede Aufgabe ist *nur ein Konfigurationsobjekt* (Zustände, Übergänge, Eingaben, Tabellen, welches Ausgabe-Widget benutzt wird) — kein aufgabenspezifischer UI-Code.
- **`src/components/`** — die wiederverwendbaren UI-Bausteine, die sich alle Aufgaben teilen: `StateDiagram` (SVG-Graph), `TruthTable`, `Controls` (Play/Pause/Step/Reset/Geschwindigkeit), `Waveform` (das generische Zeitdiagramm-Panel) und `outputs/` (Ampel, Lampenreihe, LED-Raster, Kopienzähler, ROM-Chip, generische Bool-Pills — je Aufgabe über `outputRenderer` ausgewählt).
- **`src/exercises/`** — die 8 Aufgaben, jede als `build(lang)`-Funktion (sodass aller Text einer Aufgabe in 3 Sprachen direkt neben den Daten steht, die er beschreibt).
- **`src/concepts/`** — Grundlagen-Inhalte, die in denselben Zustandsautomat-Kern passen (aktuell das Bierkasten-Beispiel).
- **`src/components/ff/`** — der generische Flip-Flop-Simulator (`FlipFlopLab`) und die 7 Wertetabellen-/Verhaltens-Konfigurationen, die ihn steuern.
- **`src/pages/`** — `ExercisePage` rendert jede Zustandsautomat-Aufgabe generisch; `PwmPage`, das D-FF-Zeitdiagramm-Labor und die Grundlagen-Seiten (`src/pages/concepts/`) sind eigene Seiten, weil die Interaktion dort kein klassisches Zustandsdiagramm ist (PWM, Zähler, Schieberegister, RAM/ROM, das NOR-Latch-Intro).
- **`src/i18n/`** — der Sprachumschalter (gespeichert in `localStorage`) und das Übersetzungswörterbuch für alles, was nicht Teil einer Aufgaben-Konfiguration ist.

Um eine Aufgabe hinzuzufügen/zu ändern: eine `build(lang): ExerciseConfig`-Funktion in `src/exercises/` anlegen (siehe `01-kopierer.ts` als Vorlage), in `src/exercises/index.ts` und `src/App.tsx` einbinden. Die gemeinsamen UI-Komponenten müssen dafür nicht angefasst werden, solange einer der bestehenden Ausgabe-Typen passt (`traffic-light`, `lamp-row-4`, `led-matrix-3x3`, `counter-badge`, `bool-pills`, `rom-table`).

## Quellmaterial

Gebaut auf Basis von `BPE1 HW – Klasse 11 – Logik SN SW` (Robert-Bosch-Schule Ulm, TGI 11-2): das Grundlagenkapitel (Schaltnetz/Schaltwerk, Flip-Flops, Zustandsdiagramme, Zähler, Schieberegister, RAM/ROM) plus die 8 Übungsaufgaben — Kopierer, Ampelschaltung, zwei Lauflicht-Varianten, ROM-Codewandler, PWM, Waldabenteuerspielplatz und Laufbalken/Parkhaus.
