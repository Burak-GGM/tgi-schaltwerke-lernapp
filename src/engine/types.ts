// Generic data-driven types shared by every Schaltwerke-Übung visualization.
// Each exercise is just a value of type ExerciseConfig — the UI components
// (StateDiagram, TruthTable, Output renderers, Waveform, Controls) are 100%
// generic and read everything from this config.

export type OutputValue = number | string | boolean;
export type Outputs = Record<string, OutputValue>;

export interface InputDef {
  id: string;
  label: string;
  /** optional grouping hint for the Controls panel, e.g. "Sensor" vs "Steuerung" */
  group?: string;
}

export interface StateDef {
  id: string;
  label: string;
  /** binary code shown next to the state, e.g. "11" */
  code?: string;
  outputs: Outputs;
  /** short explanatory note shown when this state is active */
  note?: string;
}

export interface TransitionDef {
  from: string;
  to: string;
  inputId: string;
  /** overrides the auto-generated edge label (defaults to the input's label) */
  label?: string;
  /**
   * Outputs that exist only for the single tick in which this transition fires
   * (e.g. a one-shot motor pulse "M=1"). Merged on top of the destination
   * state's steady outputs for that tick only — does not change StateDiagram
   * highlighting, only the live output view / Waveform for that one tick.
   */
  pulseOutputs?: Outputs;
}

export type TableHighlight = "state" | "state-and-input";

export interface TableRow {
  cells: (string | number)[];
  stateId: string;
  /** omit to match this row whenever stateId matches, regardless of input (wildcard / "x") */
  inputId?: string;
}

export interface TableDef {
  title: string;
  columns: string[];
  rows: TableRow[];
  highlightBy: TableHighlight;
}

export type OutputRendererKind =
  | "traffic-light"
  | "lamp-row-4"
  | "led-matrix-3x3"
  | "counter-badge"
  | "bool-pills"
  | "rom-table";

export type DiagramLayout = "circular" | "linear";

export interface ExerciseConfig {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  /** plain-text/markdown-ish description shown above the visualization */
  description: string;
  states: StateDef[];
  transitions: TransitionDef[];
  inputs: InputDef[];
  initialState: string;
  /** if true, Controls shows a Play/Pause auto-advance using defaultInputId */
  autoplay?: boolean;
  defaultInputId?: string;
  tables: TableDef[];
  outputRenderer: OutputRendererKind;
  /** renderer-specific extra parameters, e.g. { max: 3 } for counter-badge */
  outputMeta?: Record<string, unknown>;
  layout: DiagramLayout;
  /** explicit left-to-right (linear) or ring (circular) node order; defaults to states order */
  nodeOrder?: string[];
  /** extra footnote formulas shown under the tables, e.g. KV-minimized output functions */
  formulas?: string[];
}

export interface HistoryEntry {
  tick: number;
  stateId: string;
  inputId?: string;
  outputs: Outputs;
}
