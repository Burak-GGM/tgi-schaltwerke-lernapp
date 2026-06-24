import { useMemo, useState } from "react";
import { t, useLang } from "../i18n";

const N = 20;

function initD() {
  // small example pattern so the lab isn't blank on first load
  return Array.from({ length: N }, (_, i) => [1, 0, 1, 1, 0, 0, 1, 0].includes(i % 8) && i % 3 !== 0);
}

export function DffTimingLab() {
  const { lang } = useLang();
  const [d, setD] = useState<boolean[]>(() => initD());
  const [rBar, setRBar] = useState<boolean[]>(() => Array.from({ length: N }, () => true));

  const q = useMemo(() => {
    const out: boolean[] = [];
    for (let i = 0; i < N; i++) {
      out.push(rBar[i] ? d[i] : false); // !R asynchron, low-aktiv: !R=0 -> Q sofort 0
    }
    return out;
  }, [d, rBar]);

  const toggle = (arr: boolean[], setArr: (a: boolean[]) => void, i: number) => {
    const next = [...arr];
    next[i] = !next[i];
    setArr(next);
  };

  return (
    <div className="panel panel--wide">
      <h3>{t("dffHeading", lang)}</h3>
      <p className="exercise-page__description">{t("dffIntro", lang)}</p>
      <p className="callout">
        <strong>{t("dffCalloutLabel", lang)}</strong> {t("dffCalloutBefore", lang)}{" "}
        <code>Schaltwerke Übungsaufgaben.md</code> {t("dffCalloutAfter", lang)}
      </p>

      <div className="waveform__scroll">
        <table>
          <thead>
            <tr>
              <th className="waveform__rowlabel">{t("rowClock", lang)}</th>
              {Array.from({ length: N }, (_, i) => (
                <th key={i}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="waveform__rowlabel">{t("dffRowD", lang)}</th>
              {d.map((v, i) => (
                <td key={i} className="waveform__cell">
                  <button
                    className={`waveform__bit waveform__bit--btn ${v ? "waveform__bit--hi" : ""}`}
                    onClick={() => toggle(d, setD, i)}
                    aria-label={`D[${i}]`}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th className="waveform__rowlabel">{t("dffRowR", lang)}</th>
              {rBar.map((v, i) => (
                <td key={i} className="waveform__cell">
                  <button
                    className={`waveform__bit waveform__bit--btn ${v ? "waveform__bit--hi" : "waveform__bit--reset"}`}
                    onClick={() => toggle(rBar, setRBar, i)}
                    aria-label={`!R[${i}]`}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <th className="waveform__rowlabel">{t("dffRowQ", lang)}</th>
              {q.map((v, i) => (
                <td key={i} className="waveform__cell">
                  <span className={`waveform__bit ${v ? "waveform__bit--hi" : ""}`} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="exercise-page__description" style={{ marginTop: 8 }}>
        {t("dffFooterNote", lang)}
      </p>
    </div>
  );
}
