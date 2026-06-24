import type { Outputs } from "../../engine/types";

export function BoolPills({ outputs }: { outputs: Outputs }) {
  return (
    <div className="bool-pills">
      {Object.entries(outputs).map(([key, value]) => {
        const on = value === true;
        const isBoolLike = typeof value === "boolean";
        return (
          <div
            key={key}
            className={`bool-pill ${isBoolLike ? (on ? "is-on" : "is-off") : "is-value"}`}
          >
            <span className="bool-pill__label">{key}</span>
            <span className="bool-pill__value">{isBoolLike ? (on ? "1" : "0") : String(value)}</span>
          </div>
        );
      })}
    </div>
  );
}
