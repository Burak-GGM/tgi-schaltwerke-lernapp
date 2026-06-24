import type { TableDef } from "../engine/types";

interface Props {
  table: TableDef;
  currentStateId: string;
  lastInputId?: string;
}

export function TruthTable({ table, currentStateId, lastInputId }: Props) {
  return (
    <div className="truth-table">
      <h4>{table.title}</h4>
      <div className="truth-table__scroll">
        <table>
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => {
              const stateMatch = row.stateId === currentStateId;
              const inputMatch =
                table.highlightBy === "state" ||
                row.inputId === undefined ||
                row.inputId === lastInputId;
              const active = stateMatch && inputMatch;
              return (
                <tr key={i} className={active ? "truth-table__row--active" : ""}>
                  {row.cells.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
