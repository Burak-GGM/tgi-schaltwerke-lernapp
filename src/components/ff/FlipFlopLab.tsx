import { useRef, useState } from "react";
import { t, useLang } from "../../i18n";
import type { FlipFlopConfig } from "./types";

interface HistoryTick {
  tick: number;
  vals: Record<string, boolean>;
  c: boolean;
  q: boolean | "undef";
  qm: boolean;
}

/** Generic interactive Flip-Flop simulator, parameterized by FlipFlopConfig.
 * Covers all 4 trigger styles taught in the course (level / clock-level /
 * clock-edge / master-slave) with one shared component instead of 7 near-duplicates. */
export function FlipFlopLab({ config }: { config: FlipFlopConfig }) {
  const { lang } = useLang();
  const { inputs, mode, next, table, heading, intro, noteText } = config;

  const initVals = () => Object.fromEntries(inputs.map((i) => [i.id, false]));
  const [vals, setVals] = useState<Record<string, boolean>>(initVals);
  const [c, setC] = useState(false);
  const [q, setQ] = useState<boolean | "undef">(false);
  const [qm, setQm] = useState(false);
  const [history, setHistory] = useState<HistoryTick[]>([
    { tick: 0, vals: initVals(), c: false, q: false, qm: false },
  ]);
  const tickRef = useRef(0);

  const pushHistory = (
    nextVals: Record<string, boolean>,
    nextC: boolean,
    nextQ: boolean | "undef",
    nextQm: boolean,
  ) => {
    tickRef.current += 1;
    setHistory((h) => [...h, { tick: tickRef.current, vals: nextVals, c: nextC, q: nextQ, qm: nextQm }]);
  };

  const toggleInput = (id: string) => {
    const nextVals = { ...vals, [id]: !vals[id] };
    setVals(nextVals);
    if (mode === "level") {
      const nextQ = next(q === "undef" ? false : q, nextVals);
      setQ(nextQ);
      pushHistory(nextVals, c, nextQ, qm);
    } else if (mode === "clock-level") {
      const nextQ = c ? next(q === "undef" ? false : q, { ...nextVals, C: c }) : q;
      setQ(nextQ);
      pushHistory(nextVals, c, nextQ, qm);
    } else {
      // clock-edge / master-slave: input changes are only "pending" until the next clock edge
      pushHistory(nextVals, c, q, qm);
    }
  };

  const toggleClock = () => {
    const nextC = !c;
    setC(nextC);
    const nextQ = nextC ? next(q === "undef" ? false : q, { ...vals, C: nextC }) : q;
    setQ(nextQ);
    pushHistory(vals, nextC, nextQ, qm);
  };

  const pressTakt = () => {
    if (mode === "master-slave") {
      const newQmRaw = next(q === "undef" ? false : q, vals);
      const newQm = newQmRaw === "undef" ? false : newQmRaw;
      const newQ = qm; // slave only takes over the PREVIOUS master value (one clock of delay)
      setQ(newQ);
      setQm(newQm);
      pushHistory(vals, c, newQ, newQm);
    } else {
      const newQ = next(q === "undef" ? false : q, vals);
      setQ(newQ);
      pushHistory(vals, c, newQ, qm);
    }
  };

  const reset = () => {
    setVals(initVals());
    setC(false);
    setQ(false);
    setQm(false);
    tickRef.current = 0;
    setHistory([{ tick: 0, vals: initVals(), c: false, q: false, qm: false }]);
  };

  const rowMatches = (row: FFTableDef_Row) =>
    Object.entries(row.match).every(([k, v]) => (k === "C" ? c === (v === 1) : vals[k] === (v === 1)));

  const qBar = q === "undef" ? "undef" : !q;

  return (
    <div className="panel panel--wide">
      <h3>{heading}</h3>
      <p className="exercise-page__description">{intro}</p>
      {noteText && (
        <p className="callout" style={{ marginBottom: 12 }}>
          {noteText}
        </p>
      )}

      <div className="exercise-page__grid" style={{ marginTop: 12 }}>
        <section className="panel">
          <h4>{t("ffControlsHeading", lang)}</h4>
          <div className="controls__inputs">
            {inputs.map((inp) => (
              <button
                key={inp.id}
                className={`btn ${vals[inp.id] ? "btn--primary" : ""}`}
                onClick={() => toggleInput(inp.id)}
              >
                {inp.label}: {vals[inp.id] ? "1" : "0"}
              </button>
            ))}
            {mode === "clock-level" && (
              <button className={`btn ${c ? "btn--primary" : ""}`} onClick={toggleClock}>
                {t("ffClockLabel", lang)}: {c ? "1" : "0"}
              </button>
            )}
            {(mode === "clock-edge" || mode === "master-slave") && (
              <button className="btn btn--primary" onClick={pressTakt}>
                {t("ffTaktButton", lang)}
              </button>
            )}
          </div>
          <div className="controls__transport" style={{ marginTop: 10 }}>
            <button className="btn" onClick={reset}>
              {t("controlsReset", lang)}
            </button>
          </div>
        </section>

        <section className="panel">
          <h4>{t("panelOutput", lang)}</h4>
          {mode === "master-slave" && (
            <div className="lamp-row" style={{ marginBottom: 10 }}>
              <div className="lamp-row__lamp-wrap">
                <div className={`lamp-row__lamp ${qm ? "is-on" : ""}`} />
                <span className="lamp-row__label">
                  {t("ffMasterLabel", lang)} Qm = {qm ? "1" : "0"}
                </span>
              </div>
            </div>
          )}
          <div className="lamp-row">
            <div className="lamp-row__lamp-wrap">
              <div className={`lamp-row__lamp ${q === true ? "is-on" : ""}`} />
              <span className="lamp-row__label">
                {mode === "master-slave" ? t("ffSlaveLabel", lang) : "Q"} = {q === "undef" ? "?" : q ? "1" : "0"}
              </span>
            </div>
            <div className="lamp-row__lamp-wrap">
              <div className={`lamp-row__lamp ${qBar === true ? "is-on" : ""}`} />
              <span className="lamp-row__label">!Q = {qBar === "undef" ? "?" : qBar ? "1" : "0"}</span>
            </div>
          </div>
          {q === "undef" && (
            <p className="callout" style={{ marginTop: 12 }}>
              {t("ffForbiddenWarning", lang)}
            </p>
          )}
        </section>

        <section className="panel panel--wide">
          <h4>{t("ffTableTitle", lang)}</h4>
          <div className="truth-table__scroll">
            <table>
              <thead>
                <tr>
                  {table.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className={rowMatches(row) ? "truth-table__row--active" : ""}>
                    {row.cells.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                {mode === "clock-level" && (
                  <tr>
                    <th className="waveform__rowlabel">C</th>
                    {history.map((h) => (
                      <td key={h.tick} className="waveform__cell">
                        <span className={`waveform__bit ${h.c ? "waveform__bit--hi" : ""}`} />
                      </td>
                    ))}
                  </tr>
                )}
                {inputs.map((inp) => (
                  <tr key={inp.id}>
                    <th className="waveform__rowlabel">{inp.id}</th>
                    {history.map((h) => (
                      <td key={h.tick} className="waveform__cell">
                        <span className={`waveform__bit ${h.vals[inp.id] ? "waveform__bit--hi" : ""}`} />
                      </td>
                    ))}
                  </tr>
                ))}
                {mode === "master-slave" && (
                  <tr>
                    <th className="waveform__rowlabel">Qm</th>
                    {history.map((h) => (
                      <td key={h.tick} className="waveform__cell">
                        <span className={`waveform__bit ${h.qm ? "waveform__bit--hi" : ""}`} />
                      </td>
                    ))}
                  </tr>
                )}
                <tr>
                  <th className="waveform__rowlabel">Q</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell waveform__cell--value">
                      {h.q === "undef" ? "?" : <span className={`waveform__bit ${h.q ? "waveform__bit--hi" : ""}`} />}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

type FFTableDef_Row = FlipFlopConfig["table"]["rows"][number];
