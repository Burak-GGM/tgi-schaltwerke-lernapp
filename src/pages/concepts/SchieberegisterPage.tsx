import { useRef, useState } from "react";
import { t, useLang, type StringKey } from "../../i18n";

type Mode = "stop" | "left" | "right" | "load";

const MODE_LABEL_KEY: Record<Mode, StringKey> = {
  stop: "srgModeStop",
  left: "srgModeLeft",
  right: "srgModeRight",
  load: "srgModeLoad",
};

interface HistoryTick {
  tick: number;
  q: boolean[];
  mode: Mode;
}

const MODE_CODE: Record<Mode, string> = { stop: "00", left: "01", right: "10", load: "11" };

export function SchieberegisterPage() {
  const { lang } = useLang();
  const [d, setD] = useState<boolean[]>([false, false, false, false]);
  const [sl, setSl] = useState(false);
  const [sr, setSr] = useState(false);
  const [mode, setMode] = useState<Mode>("right");
  const [q, setQ] = useState<boolean[]>([false, false, false, false]);
  const [history, setHistory] = useState<HistoryTick[]>([{ tick: 0, q: [false, false, false, false], mode: "stop" }]);
  const tickRef = useRef(0);

  const toggleD = (i: number) => setD((arr) => arr.map((v, idx) => (idx === i ? !v : v)));

  const recordTick = (nextQ: boolean[], m: Mode) => {
    tickRef.current += 1;
    setHistory((h) => [...h, { tick: tickRef.current, q: nextQ, mode: m }]);
  };

  const pressTakt = () => {
    let nextQ = q;
    if (mode === "left") nextQ = [q[1], q[2], q[3], sl];
    else if (mode === "right") nextQ = [sr, q[0], q[1], q[2]];
    else if (mode === "load") nextQ = [...d];
    setQ(nextQ);
    recordTick(nextQ, mode);
  };

  const clr = () => {
    const zeros = [false, false, false, false];
    setQ(zeros);
    tickRef.current = 0;
    setHistory([{ tick: 0, q: zeros, mode: "stop" }]);
  };

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("srgHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("srgSubtitle", lang)}</p>
        <p className="exercise-page__description">{t("srgIntro", lang)}</p>
      </header>

      <div className="exercise-page__grid">
        <section className="panel">
          <h3>{t("srgModeLabel", lang)}</h3>
          <div className="controls__inputs">
            {(["stop", "left", "right", "load"] as Mode[]).map((m) => (
              <button key={m} className={`btn ${mode === m ? "btn--primary" : ""}`} onClick={() => setMode(m)}>
                {t(MODE_LABEL_KEY[m], lang)}
              </button>
            ))}
          </div>

          <h4 style={{ marginTop: 18 }}>D0–D3 ({t("srgModeLoad", lang)})</h4>
          <div className="controls__inputs">
            {d.map((v, i) => (
              <button key={i} className={`btn ${v ? "btn--primary" : ""}`} onClick={() => toggleD(i)}>
                D{i}: {v ? "1" : "0"}
              </button>
            ))}
          </div>

          <h4 style={{ marginTop: 18 }}>SL / SR</h4>
          <div className="controls__inputs">
            <button className={`btn ${sl ? "btn--primary" : ""}`} onClick={() => setSl((v) => !v)}>
              SL: {sl ? "1" : "0"}
            </button>
            <button className={`btn ${sr ? "btn--primary" : ""}`} onClick={() => setSr((v) => !v)}>
              SR: {sr ? "1" : "0"}
            </button>
          </div>

          <div className="controls__transport" style={{ marginTop: 14 }}>
            <button className="btn btn--primary" onClick={pressTakt}>
              {t("ffTaktButton", lang)}
            </button>
            <button className="btn" onClick={clr}>
              {t("srgClrLabel", lang)}
            </button>
          </div>
        </section>

        <section className="panel">
          <h3>{t("panelOutput", lang)}</h3>
          <div className="lamp-row">
            {q.map((v, i) => (
              <div key={i} className="lamp-row__lamp-wrap">
                <div className={`lamp-row__lamp ${v ? "is-on" : ""}`} />
                <span className="lamp-row__label">Q{i}</span>
              </div>
            ))}
          </div>
          <p className="exercise-page__description" style={{ marginTop: 14, fontSize: "0.85rem" }}>
            {t("srgDirectionNote", lang)}
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
                  <th className="waveform__rowlabel">M</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__input">
                      {MODE_CODE[h.mode]}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {q.map((_, i) => (
                  <tr key={i}>
                    <th className="waveform__rowlabel">Q{i}</th>
                    {history.map((h) => (
                      <td key={h.tick} className="waveform__cell">
                        <span className={`waveform__bit ${h.q[i] ? "waveform__bit--hi" : ""}`} />
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
