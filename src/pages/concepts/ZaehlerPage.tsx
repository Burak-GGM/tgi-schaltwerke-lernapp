import { useRef, useState } from "react";
import { t, useLang } from "../../i18n";

type Mode = "sync" | "async";

interface HistoryTick {
  tick: number;
  bits: boolean[];
  label: string;
}

/** Binary increment, LSB first, returning one intermediate bit-array per FF that
 * actually toggles (ripple-carry order) — this single sequence is both the correct
 * final count AND the correct async ripple-propagation order: each FF only toggles
 * if the previous one just fell from 1 to 0. */
function incrementSteps(bits: boolean[]): boolean[][] {
  const steps: boolean[][] = [];
  const cur = [...bits];
  let carry = true;
  for (let i = 0; i < cur.length && carry; i++) {
    const before = cur[i];
    cur[i] = !cur[i];
    steps.push([...cur]);
    carry = before;
  }
  return steps.length > 0 ? steps : [cur];
}

function toDecimal(bits: boolean[]): number {
  return bits.reduce((acc, b, i) => acc + (b ? 2 ** i : 0), 0);
}

const RIPPLE_DELAY_MS = 220;

export function ZaehlerPage() {
  const { lang } = useLang();
  const [width, setWidth] = useState<2 | 4>(2);
  const [mode, setMode] = useState<Mode>("sync");
  const [bits, setBits] = useState<boolean[]>(() => Array(2).fill(false));
  const [pendingClr, setPendingClr] = useState(false);
  const [history, setHistory] = useState<HistoryTick[]>([{ tick: 0, bits: Array(2).fill(false), label: "" }]);
  const [busy, setBusy] = useState(false);
  const tickRef = useRef(0);

  const recordTick = (nextBits: boolean[], label: string) => {
    tickRef.current += 1;
    setHistory((h) => {
      const updated = [...h, { tick: tickRef.current, bits: nextBits, label }];
      return updated.length > 24 ? updated.slice(updated.length - 24) : updated;
    });
  };

  const changeWidth = (w: 2 | 4) => {
    setWidth(w);
    setMode("sync");
    setPendingClr(false);
    setBits(Array(w).fill(false));
    tickRef.current = 0;
    setHistory([{ tick: 0, bits: Array(w).fill(false), label: "" }]);
  };

  const reset = () => {
    setPendingClr(false);
    setBits(Array(width).fill(false));
    tickRef.current = 0;
    setHistory([{ tick: 0, bits: Array(width).fill(false), label: "" }]);
  };

  const pressAr = () => {
    setPendingClr(false);
    const zeros = Array(width).fill(false);
    setBits(zeros);
    recordTick(zeros, "AR");
  };

  const armClr = () => setPendingClr(true);

  const pressTakt = () => {
    if (busy) return;
    if (pendingClr) {
      const zeros = Array(width).fill(false);
      setPendingClr(false);
      setBits(zeros);
      recordTick(zeros, "CLR");
      return;
    }
    const steps = incrementSteps(bits);
    if (mode === "sync") {
      const final = steps[steps.length - 1];
      setBits(final);
      recordTick(final, "");
    } else {
      setBusy(true);
      let idx = 0;
      const reveal = () => {
        setBits(steps[idx]);
        idx += 1;
        if (idx < steps.length) {
          window.setTimeout(reveal, RIPPLE_DELAY_MS);
        } else {
          recordTick(steps[steps.length - 1], "");
          setBusy(false);
        }
      };
      reveal();
    }
  };

  const decimal = toDecimal(bits);
  const maxVal = 2 ** width - 1;

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("ctrHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("ctrSubtitle", lang)}</p>
        <p className="exercise-page__description">{t("ctrIntro", lang)}</p>
      </header>

      <div className="exercise-page__grid">
        <section className="panel">
          <h3>{t("ctrWidthLabel", lang)} / {t("ctrModeLabel", lang)}</h3>
          <div className="controls__inputs">
            <button className={`btn ${width === 2 ? "btn--primary" : ""}`} onClick={() => changeWidth(2)}>
              {t("ctrWidth2", lang)}
            </button>
            <button className={`btn ${width === 4 ? "btn--primary" : ""}`} onClick={() => changeWidth(4)}>
              {t("ctrWidth4", lang)}
            </button>
          </div>
          <div className="controls__inputs" style={{ marginTop: 8 }}>
            <button className={`btn ${mode === "sync" ? "btn--primary" : ""}`} onClick={() => setMode("sync")}>
              {t("ctrModeSync", lang)}
            </button>
            <button className={`btn ${mode === "async" ? "btn--primary" : ""}`} onClick={() => setMode("async")}>
              {t("ctrModeAsync", lang)}
            </button>
          </div>
          <p className="exercise-page__description" style={{ marginTop: 10, fontSize: "0.85rem" }}>
            {t("ctrModeNote", lang)}
          </p>
        </section>

        <section className="panel">
          <h3>{t("panelOutput", lang)}</h3>
          <div className="lamp-row">
            {Array.from({ length: width }, (_, i) => width - 1 - i).map((bitIdx) => (
              <div key={bitIdx} className="lamp-row__lamp-wrap">
                <div className={`lamp-row__lamp ${bits[bitIdx] ? "is-on" : ""}`} />
                <span className="lamp-row__label">Q{bitIdx}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 10 }}>
            {t("ctrDecimalLabel", lang)}: <strong>{decimal}</strong> / {maxVal}
          </p>
          {pendingClr && <p className="callout">{t("ctrClrArmed", lang)}</p>}

          <div className="controls" style={{ marginTop: 12 }}>
            <div className="controls__transport">
              <button className="btn btn--primary" onClick={pressTakt} disabled={busy}>
                {t("ffTaktButton", lang)}
              </button>
              <button className="btn" onClick={armClr}>
                {t("ctrClrLabel", lang)}
              </button>
              <button className="btn" onClick={pressAr}>
                {t("ctrArLabel", lang)}
              </button>
              <button className="btn" onClick={reset}>
                {t("controlsReset", lang)}
              </button>
            </div>
          </div>
          <p className="exercise-page__description" style={{ marginTop: 10, fontSize: "0.85rem" }}>
            {t("ctrClrArNote", lang)}
          </p>
        </section>

        <section className="panel panel--wide">
          <h4>{t("panelTiming", lang)}</h4>
          <div className="waveform__scroll">
            <table>
              <thead>
                <tr>
                  <th className="waveform__rowlabel">{t("rowClock", lang)}</th>
                  {history.map((h) => (
                    <th key={h.tick}>{h.tick}</th>
                  ))}
                </tr>
                <tr>
                  <th className="waveform__rowlabel">{t("ctrTaktRow", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__input">
                      {h.label || "↑"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: width }, (_, i) => width - 1 - i).map((bitIdx) => (
                  <tr key={bitIdx}>
                    <th className="waveform__rowlabel">
                      {t("ctrBitRow", lang)} {bitIdx}
                    </th>
                    {history.map((h) => (
                      <td key={h.tick} className="waveform__cell">
                        <span className={`waveform__bit ${h.bits[bitIdx] ? "waveform__bit--hi" : ""}`} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
