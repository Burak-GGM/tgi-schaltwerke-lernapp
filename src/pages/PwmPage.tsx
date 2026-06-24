import { useEffect, useRef, useState } from "react";
import { BrightnessBar } from "../components/outputs/BrightnessBar";
import { t, useLang } from "../i18n";

const STEP = 32; // 8 Helligkeitsstufen über den 8-Bit-Zähler verteilt: 0,32,...,224
const MAX_REGISTER = 224;
const MAX_COUNTER = 255;
const HISTORY_LEN = 32;

interface Tick {
  tick: number;
  counter: number;
  licht: boolean;
  lampe: boolean;
}

export function PwmPage() {
  const { lang } = useLang();
  const [counter, setCounter] = useState(0);
  const [register, setRegister] = useState(128); // Stufe 4/7
  const [y, setY] = useState(true); // D-FF Ausgang: Lampe ein/aus geschaltet
  const [playing, setPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(40);
  const [history, setHistory] = useState<Tick[]>([]);
  const tickRef = useRef(0);
  const counterRef = useRef(0);

  const licht = counter < register;
  const lampe = licht && y;

  // Side effects must not live inside a setState updater (React StrictMode
  // double-invokes those) — so `step` computes the next value from a ref,
  // then applies setCounter/setHistory as separate, single, top-level calls.
  const step = () => {
    const next = counterRef.current >= MAX_COUNTER ? 0 : counterRef.current + 1;
    counterRef.current = next;
    const l = next < register;
    const lamp = l && y;
    setCounter(next);
    tickRef.current += 1;
    const tick = tickRef.current;
    setHistory((h) => {
      const updated = [...h, { tick, counter: next, licht: l, lampe: lamp }];
      return updated.length > HISTORY_LEN ? updated.slice(updated.length - HISTORY_LEN) : updated;
    });
  };

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(step, speedMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, speedMs, register, y]);

  const toggleY = () => setY((v) => !v); // D-FF: D = !y, C = Tastendruck-Flanke -> y toggelt

  const reset = () => {
    setPlaying(false);
    setCounter(0);
    counterRef.current = 0;
    tickRef.current = 0;
    setHistory([]);
  };

  const duty = register / 256;
  const stufe = register / STEP;

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("pwmHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("pwmSubtitle", lang)}</p>
        <p className="exercise-page__description">{t("pwmDescription", lang)}</p>
      </header>

      <div className="exercise-page__grid">
        <section className="panel">
          <h3>{t("pwmRamHeading", lang)}</h3>
          <p>{t("pwmStufeLabel", lang, { stufe, register })}</p>
          <div className="pwm-register">
            <button className="btn" onClick={() => setRegister((r) => Math.max(0, r - STEP))}>
              {t("pwmDarker", lang)}
            </button>
            <div className="pwm-register__track">
              <div className="pwm-register__fill" style={{ width: `${(register / 255) * 100}%` }} />
            </div>
            <button
              className="btn"
              onClick={() => setRegister((r) => Math.min(MAX_REGISTER, r + STEP))}
            >
              {t("pwmLighter", lang)}
            </button>
          </div>

          <h3 style={{ marginTop: 24 }}>{t("pwmDffHeading", lang)}</h3>
          <p>{t("pwmDffDescription", lang)}</p>
          <button className="btn btn--primary" onClick={toggleY}>
            {t("pwmToggleButton", lang, { y: y ? "1" : "0" })}
          </button>
        </section>

        <section className="panel">
          <h3>{t("pwmComparatorHeading", lang)}</h3>
          <div className="pwm-counter">
            <div className="pwm-counter__track">
              <div
                className="pwm-counter__marker pwm-counter__marker--register"
                style={{ left: `${(register / 255) * 100}%` }}
              />
              <div
                className="pwm-counter__marker pwm-counter__marker--counter"
                style={{ left: `${(counter / 255) * 100}%` }}
              />
            </div>
            <p>
              {t("pwmComparatorLine", lang, {
                counter,
                cmp: licht ? "< " : "≥ ",
                register,
                licht: licht ? 1 : 0,
              })}
            </p>
          </div>

          <div className="controls">
            <div className="controls__transport">
              <button className="btn btn--primary" onClick={() => setPlaying((p) => !p)}>
                {playing ? t("controlsPause", lang) : t("controlsPlay", lang)}
              </button>
              <button className="btn" onClick={step}>
                {t("controlsStep", lang)}
              </button>
              <button className="btn" onClick={reset}>
                {t("controlsReset", lang)}
              </button>
              <label className="controls__speed">
                {t("controlsSpeed", lang)}
                <input
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={speedMs}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                />
                <span>{t("controlsMsPerClock", lang, { ms: speedMs })}</span>
              </label>
            </div>
          </div>
        </section>

        <section className="panel">
          <h3>{t("pwmLampHeading", lang)}</h3>
          <BrightnessBar perceived={y ? duty : 0} raw={lampe} />
        </section>

        <section className="panel panel--wide">
          <h4>{t("pwmTimingHeading", lang, { n: HISTORY_LEN })}</h4>
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
                  <th className="waveform__rowlabel">{t("pwmRowCounter", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell waveform__cell--value">
                      {h.counter}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="waveform__rowlabel">{t("pwmRowLicht", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell">
                      <span className={`waveform__bit ${h.licht ? "waveform__bit--hi" : ""}`} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="waveform__rowlabel">{t("pwmRowLampe", lang)}</th>
                  {history.map((h) => (
                    <td key={h.tick} className="waveform__cell">
                      <span className={`waveform__bit ${h.lampe ? "waveform__bit--hi" : ""}`} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel panel--wide">
          <h4>{t("panelFormulas", lang)}</h4>
          <ul className="formulas">
            <li>{t("pwmFormula1", lang)}</li>
            <li>{t("pwmFormula2", lang)}</li>
            <li>{t("pwmFormula3", lang)}</li>
            <li>
              (A&gt;B) = (A&gt;B)<sub>ob</sub> + (A=B)<sub>ob</sub>&amp;(A&gt;B)<sub>alt</sub>, (A=B) =
              (A=B)<sub>ob</sub>&amp;(A=B)<sub>alt</sub> — {t("pwmFormula4Prefix", lang)}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
