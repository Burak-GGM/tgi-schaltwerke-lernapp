import { useEffect, useRef, useState } from "react";
import { t, useLang } from "../i18n";

interface Props {
  /** changes every time the user presses any button, real or no-op */
  activitySignal: number;
  onTimeout: () => void;
  totalSeconds: number;
}

/** Visualizes Aufgabe 7 / 1.3: an independent 1 Hz safety countdown that resets on
 * any key press and forces the machine back to Z0 if nothing happens for 120 s. */
export function SafetyTimer({ activitySignal, onTimeout, totalSeconds }: Props) {
  const { lang } = useLang();
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const secondsRef = useRef(totalSeconds);

  useEffect(() => {
    secondsRef.current = totalSeconds;
    setSecondsLeft(totalSeconds);
  }, [activitySignal, totalSeconds]);

  useEffect(() => {
    // Ref-based countdown with a single top-level setState call per tick —
    // calling onTimeout (which mutates other state) from inside a setState
    // updater would get double-invoked under React StrictMode (see the PWM
    // page fix for the same class of bug).
    const id = window.setInterval(() => {
      const next = secondsRef.current <= 1 ? totalSeconds : secondsRef.current - 1;
      secondsRef.current = next;
      setSecondsLeft(next);
      if (next === totalSeconds) onTimeout();
    }, 1000);
    return () => window.clearInterval(id);
  }, [onTimeout, totalSeconds]);

  const pct = (secondsLeft / totalSeconds) * 100;

  return (
    <section className="panel panel--wide">
      <h4>{t("waldTimerHeading", lang)}</h4>
      <p>{t("waldTimerDescription", lang)}</p>
      <div className="safety-timer__track">
        <div className="safety-timer__fill" style={{ width: `${pct}%` }} />
      </div>
      <p>{t("waldTimerCountdown", lang, { s: secondsLeft, total: totalSeconds })}</p>
    </section>
  );
}
