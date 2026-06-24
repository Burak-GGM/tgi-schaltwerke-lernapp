import { useMemo } from "react";
import type { ExerciseConfig, HistoryEntry } from "../engine/types";
import { t, useLang } from "../i18n";

interface Props {
  config: ExerciseConfig;
  history: HistoryEntry[];
}

/** Generic Zeitdiagramm / Impulsdiagramm panel: one row per signal, one column per tick. */
export function Waveform({ config, history }: Props) {
  const { lang } = useLang();
  const { signalKeys, booleanKeys } = useMemo(() => {
    const keys: string[] = [];
    // a signal only renders as a bit (filled/empty box) if EVERY value it ever
    // takes across all states/pulses is a real boolean — otherwise (e.g. a
    // counter like "copies" that happens to pass through 0 or 1) it always
    // renders as its actual number/text, never as an ambiguous box.
    const allBoolean = new Map<string, boolean>();
    const visit = (outputs: Record<string, unknown>) => {
      for (const [k, v] of Object.entries(outputs)) {
        if (!keys.includes(k)) keys.push(k);
        const isBool = typeof v === "boolean";
        allBoolean.set(k, (allBoolean.get(k) ?? true) && isBool);
      }
    };
    config.states.forEach((s) => visit(s.outputs));
    config.transitions.forEach((tr) => tr.pulseOutputs && visit(tr.pulseOutputs));
    const booleanKeys = new Set(keys.filter((k) => allBoolean.get(k)));
    return { signalKeys: keys, booleanKeys };
  }, [config]);

  return (
    <div className="waveform">
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
              <th className="waveform__rowlabel">{t("rowState", lang)}</th>
              {history.map((h) => (
                <td key={h.tick} className="waveform__state">
                  {h.stateId}
                </td>
              ))}
            </tr>
            <tr>
              <th className="waveform__rowlabel">{t("rowInput", lang)}</th>
              {history.map((h) => (
                <td key={h.tick} className="waveform__input">
                  {h.inputId ?? "–"}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {signalKeys.map((key) => (
              <tr key={key}>
                <th className="waveform__rowlabel">{key}</th>
                {history.map((h) => {
                  const v = h.outputs[key];
                  const isBool = booleanKeys.has(key);
                  const hi = v === true;
                  if (isBool) {
                    return (
                      <td key={h.tick} className="waveform__cell">
                        <span className={hi ? "waveform__bit waveform__bit--hi" : "waveform__bit"} />
                      </td>
                    );
                  }
                  return (
                    <td key={h.tick} className="waveform__cell waveform__cell--value">
                      {v ?? "–"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
