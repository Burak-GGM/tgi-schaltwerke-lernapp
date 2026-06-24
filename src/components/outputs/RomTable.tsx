import type { Outputs, TableDef } from "../../engine/types";
import { TrafficLight } from "./TrafficLight";

interface Props {
  table: TableDef;
  currentStateId: string;
  outputs: Outputs;
}

/** Chip-style ROM visualization: address in -> memory array -> data out -> Ampel. */
export function RomTable({ table, currentStateId, outputs }: Props) {
  return (
    <div className="rom-chip">
      <div className="rom-chip__array">
        <div className="rom-chip__header">
          <span>Adresse</span>
          <span>{table.columns.slice(1).join(" ")}</span>
        </div>
        {table.rows.map((row) => {
          const active = row.stateId === currentStateId;
          return (
            <div key={row.stateId} className={`rom-chip__row ${active ? "is-active" : ""}`}>
              <span className="rom-chip__addr">{row.cells[0]}</span>
              <span className="rom-chip__data">{row.cells.slice(1).join(" · ")}</span>
            </div>
          );
        })}
      </div>
      <div className="rom-chip__output">
        <span className="rom-chip__arrow">→</span>
        <TrafficLight outputs={outputs} />
      </div>
    </div>
  );
}
