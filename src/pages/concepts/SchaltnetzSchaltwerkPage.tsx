import { useRef, useState } from "react";
import { t, useLang } from "../../i18n";

interface Tick {
  tick: number;
  s: boolean;
  r: boolean;
  q: boolean | "undef";
}

export function SchaltnetzSchaltwerkPage() {
  const { lang } = useLang();
  const [s, setS] = useState(false);
  const [r, setR] = useState(false);
  const [q, setQ] = useState<boolean | "undef">(false);
  const [history, setHistory] = useState<Tick[]>([{ tick: 0, s: false, r: false, q: false }]);
  const tickRef = useRef(0);

  const apply = (nextS: boolean, nextR: boolean) => {
    setS(nextS);
    setR(nextR);
    const nextQ: boolean | "undef" = !nextS && !nextR ? q : nextS && nextR ? "undef" : nextS;
    setQ(nextQ);
    tickRef.current += 1;
    setHistory((h) => [...h, { tick: tickRef.current, s: nextS, r: nextR, q: nextQ }]);
  };

  const reset = () => {
    setS(false);
    setR(false);
    setQ(false);
    tickRef.current = 0;
    setHistory([{ tick: 0, s: false, r: false, q: false }]);
  };

  const qBar = q === "undef" ? "undef" : !q;

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("snHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("snSubtitle", lang)}</p>
        <p className="exercise-page__description">{t("snIntro", lang)}</p>
      </header>

      <div className="exercise-page__grid">
        <section className="panel">
          <h3>{t("panelOutput", lang)}</h3>
          <div className="lamp-row">
            <div className="lamp-row__lamp-wrap">
              <div className={`lamp-row__lamp ${q === true ? "is-on" : ""}`} />
              <span className="lamp-row__label">{t("snRowQ", lang)} = {q === "undef" ? "?" : q ? "1" : "0"}</span>
            </div>
            <div className="lamp-row__lamp-wrap">
              <div className={`lamp-row__lamp ${qBar === true ? "is-on" : ""}`} />
              <span className="lamp-row__label">!{t("snRowQ", lang)} = {qBar === "undef" ? "?" : qBar ? "1" : "0"}</span>
            </div>
          </div>
          {q === "undef" && <p className="callout" style={{ marginTop: 12 }}>{t("snUndefined", lang)}</p>}

          <div className="controls" style={{ marginTop: 16 }}>
            <div className="controls__inputs">
              <button className={`btn ${s ? "btn--primary" : ""}`} onClick={() => apply(!s, r)}>
                {t("snSLabel", lang)}: {s ? "1" : "0"}
              </button>
              <button className={`btn ${r ? "btn--primary" : ""}`} onClick={() => apply(s, !r)}>
                {t("snRLabel", lang)}: {r ? "1" : "0"}
              </button>
            </div>
            <div className="controls__transport">
              <button className="btn" onClick={reset}>
                {t("controlsReset", lang)}
              </button>
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>{t("snStepsHeading", lang)}</h3>
          <ol style={{ lineHeight: 1.6, paddingLeft: 18, margin: 0 }}>
            <li>{t("snStep0", lang)}</li>
            <li>{t("snStep1", lang)}</li>
            <li>{t("snStep2", lang)}</li>
            <li>{t("snStep3", lang)}</li>
            <li>{t("snStep4", lang)}</li>
            <li>{t("snStep5", lang)}</li>
          </ol>
          <p className="callout" style={{ marginTop: 10 }}>{t("snContradiction", lang)}</p>
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
              </thead>
              <tbody>
                <tr>
                  <th className="waveform__rowlabel">{t("snRowS", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell">
                      <span className={`waveform__bit ${h.s ? "waveform__bit--hi" : ""}`} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="waveform__rowlabel">{t("snRowR", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell">
                      <span className={`waveform__bit ${h.r ? "waveform__bit--hi" : ""}`} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="waveform__rowlabel">{t("snRowQ", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell waveform__cell--value">
                      {h.q === "undef" ? "?" : h.q ? "1" : "0"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel panel--wide">
          <h3>{t("snDefHeading", lang)}</h3>
          <ul style={{ lineHeight: 1.6, paddingLeft: 18, margin: "0 0 12px" }}>
            <li>{t("snDefSchaltnetz", lang)}</li>
            <li>{t("snDefSchaltwerk", lang)}</li>
          </ul>
          <p className="exercise-page__description">{t("snFormulaNote", lang)}</p>
        </section>
      </div>
    </div>
  );
}
