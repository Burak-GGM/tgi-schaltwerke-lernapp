import type { ExerciseConfig, HistoryEntry, Outputs } from "./types";

/** Finds the state definition by id, throws if the config is malformed. */
export function getState(config: ExerciseConfig, stateId: string) {
  const s = config.states.find((s) => s.id === stateId);
  if (!s) throw new Error(`Unknown state "${stateId}" in exercise ${config.id}`);
  return s;
}

/**
 * Advances the state machine by one input event.
 * If no transition matches (from, inputId), the state stays the same —
 * this is the "ELSE = bleibt" convention used throughout the source material.
 */
export function step(
  config: ExerciseConfig,
  currentStateId: string,
  inputId: string,
): { nextStateId: string; pulseOutputs?: Outputs } {
  const t = config.transitions.find(
    (t) => t.from === currentStateId && t.inputId === inputId,
  );
  if (!t) return { nextStateId: currentStateId };
  return { nextStateId: t.to, pulseOutputs: t.pulseOutputs };
}

/** Builds the merged outputs (steady state outputs + any one-tick pulse outputs) for the history log. */
export function mergedOutputs(config: ExerciseConfig, stateId: string, pulse?: Outputs): Outputs {
  const state = getState(config, stateId);
  return { ...state.outputs, ...(pulse ?? {}) };
}

export function initialHistory(config: ExerciseConfig): HistoryEntry[] {
  return [
    {
      tick: 0,
      stateId: config.initialState,
      outputs: getState(config, config.initialState).outputs,
    },
  ];
}
