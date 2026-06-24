import { useCallback, useEffect, useRef, useState } from "react";
import type { ExerciseConfig, HistoryEntry } from "./types";
import { initialHistory, mergedOutputs, step } from "./fsm";

const MAX_HISTORY = 64;

export function useExercise(config: ExerciseConfig) {
  const [history, setHistory] = useState<HistoryEntry[]>(() => initialHistory(config));
  const [playing, setPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(700);
  const intervalRef = useRef<number | undefined>(undefined);

  const current = history[history.length - 1];

  const fire = useCallback(
    (inputId: string) => {
      setHistory((h) => {
        const last = h[h.length - 1];
        const { nextStateId, pulseOutputs } = step(config, last.stateId, inputId);
        const entry: HistoryEntry = {
          tick: last.tick + 1,
          stateId: nextStateId,
          inputId,
          outputs: mergedOutputs(config, nextStateId, pulseOutputs),
        };
        const next = [...h, entry];
        return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
      });
    },
    [config],
  );

  const reset = useCallback(() => {
    setPlaying(false);
    setHistory(initialHistory(config));
  }, [config]);

  /** Forces the machine into an arbitrary state outside the normal transition table
   * (used for things like an independent safety-timeout that isn't input-driven). */
  const forceState = useCallback(
    (stateId: string, inputId = "timeout") => {
      setHistory((h) => {
        const last = h[h.length - 1];
        const entry: HistoryEntry = {
          tick: last.tick + 1,
          stateId,
          inputId,
          outputs: mergedOutputs(config, stateId),
        };
        const next = [...h, entry];
        return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
      });
    },
    [config],
  );

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]);

  useEffect(() => {
    if (!playing || !config.autoplay || !config.defaultInputId) return;
    intervalRef.current = window.setInterval(() => {
      fire(config.defaultInputId!);
    }, speedMs);
    return () => window.clearInterval(intervalRef.current);
  }, [playing, speedMs, fire, config.autoplay, config.defaultInputId]);

  return {
    history,
    current,
    fire,
    reset,
    forceState,
    playing,
    setPlaying,
    speedMs,
    setSpeedMs,
  };
}
