export type FFMode = "level" | "clock-level" | "clock-edge" | "master-slave";

export interface FFTableRow {
  /** display strings, aligned with FFTableDef.columns, copied verbatim from the source */
  cells: string[];
  /** which live input values (by input id, "C" for the clock level) make this row highlight */
  match: Partial<Record<string, 0 | 1>>;
}

export interface FFTableDef {
  columns: string[];
  rows: FFTableRow[];
}

export interface FlipFlopConfig {
  id: string;
  heading: string;
  intro: string;
  noteText?: string;
  mode: FFMode;
  /** data inputs only (S/R, D, J/K, T) — the clock is handled separately by the lab */
  inputs: { id: string; label: string }[];
  /** what Q becomes when the change is allowed to take effect (immediately, on C=1, or on a clock edge) */
  next: (q: boolean, vals: Record<string, boolean>) => boolean | "undef";
  table: FFTableDef;
}
