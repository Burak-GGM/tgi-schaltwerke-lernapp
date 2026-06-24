import type { Outputs } from "../../engine/types";

// grid[row][col] -> output key, derived from Aufgabe 8:
// Spalte1={a,b,c} Spalte2={d,e,f} Spalte3={g,h,j}; Zeile1={a,d,g} Zeile2={b,e,h} Zeile3={c,f,j}
const grid = [
  ["a", "d", "g"],
  ["b", "e", "h"],
  ["c", "f", "j"],
];

export function LedMatrix3x3({ outputs }: { outputs: Outputs }) {
  return (
    <div className="led-matrix">
      {grid.map((row, ri) => (
        <div key={ri} className="led-matrix__row">
          {row.map((key) => {
            const on = outputs[key] === true || outputs[key] === 1;
            return (
              <div key={key} className={`led-matrix__cell ${on ? "is-on" : ""}`} title={key}>
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
