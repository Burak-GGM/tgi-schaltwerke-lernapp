import type { ReactNode } from "react";
import type { ExerciseConfig, HistoryEntry } from "../engine/types";
import { useExercise } from "../engine/useExercise";
import { StateDiagram } from "../components/StateDiagram";
import { TruthTable } from "../components/TruthTable";
import { Controls } from "../components/Controls";
import { Waveform } from "../components/Waveform";
import { OutputView } from "../components/outputs/OutputView";
import { getState } from "../engine/fsm";
import { t, useLang } from "../i18n";

interface ViewProps {
  config: ExerciseConfig;
  history: HistoryEntry[];
  current: HistoryEntry;
  fire: (inputId: string) => void;
  reset: () => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
  speedMs: number;
  setSpeedMs: (ms: number) => void;
  children?: ReactNode;
}

/** Renders the full generic FSM-exercise layout from already-running engine state.
 * Split out from ExercisePage so pages with extra local logic (e.g. WaldPage's
 * independent safety-timeout) can drive the same `useExercise` hook themselves
 * and still reuse this exact layout, plus inject an extra panel via `children`. */
export function ExerciseView({
  config,
  history,
  current,
  fire,
  reset,
  playing,
  setPlaying,
  speedMs,
  setSpeedMs,
  children,
}: ViewProps) {
  const state = getState(config, current.stateId);
  const { lang } = useLang();

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>
          {t("exerciseWord", lang)} {config.number} — {config.title}
        </h2>
        {config.subtitle && <p className="exercise-page__subtitle">{config.subtitle}</p>}
        <p className="exercise-page__description">{config.description}</p>
      </header>

      <div className="exercise-page__grid">
        <section className="panel">
          <h3>{t("panelStateDiagram", lang)}</h3>
          <StateDiagram config={config} currentStateId={current.stateId} />
          {state.note && <p className="state-note">{state.note}</p>}
        </section>

        <section className="panel">
          <h3>{t("panelOutput", lang)}</h3>
          <OutputView config={config} outputs={current.outputs} currentStateId={current.stateId} />
          <Controls
            config={config}
            onFire={fire}
            onReset={reset}
            playing={playing}
            setPlaying={setPlaying}
            speedMs={speedMs}
            setSpeedMs={setSpeedMs}
          />
        </section>

        {config.tables.map((t, i) => (
          <section className="panel" key={i}>
            <TruthTable table={t} currentStateId={current.stateId} lastInputId={current.inputId} />
          </section>
        ))}

        <section className="panel panel--wide">
          <Waveform config={config} history={history} />
        </section>

        {config.formulas && config.formulas.length > 0 && (
          <section className="panel panel--wide">
            <h4>{t("panelFormulas", lang)}</h4>
            <ul className="formulas">
              {config.formulas.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {children}
      </div>
    </div>
  );
}

export function ExercisePage({ config }: { config: ExerciseConfig }) {
  const hook = useExercise(config);
  return <ExerciseView config={config} {...hook} />;
}
