import { useCallback, useMemo } from "react";
import { buildWald } from "../exercises";
import { useExercise } from "../engine/useExercise";
import { ExerciseView } from "./ExercisePage";
import { SafetyTimer } from "../components/SafetyTimer";
import { useLang } from "../i18n";

const DEMO_SECONDS = 20; // real circuit uses 120s (2 min); shortened here so it's observable

export function WaldPage() {
  const { lang } = useLang();
  const config = useMemo(() => buildWald(lang), [lang]);
  const hook = useExercise(config);
  const { current, forceState } = hook;

  const handleTimeout = useCallback(() => {
    forceState("Z0");
  }, [forceState]);

  return (
    <ExerciseView config={config} {...hook}>
      <SafetyTimer
        activitySignal={current.tick}
        onTimeout={handleTimeout}
        totalSeconds={DEMO_SECONDS}
      />
    </ExerciseView>
  );
}
