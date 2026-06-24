import type { Outputs } from "../../engine/types";

export function LampRow({ outputs }: { outputs: Outputs }) {
  const lamps = ["L1", "L2", "L3", "L4"];
  return (
    <div className="lamp-row">
      {lamps.map((l) => {
        const on = outputs[l] === true || outputs[l] === 1;
        return (
          <div key={l} className="lamp-row__lamp-wrap">
            <div className={`lamp-row__lamp ${on ? "is-on" : ""}`} />
            <span className="lamp-row__label">{l}</span>
          </div>
        );
      })}
    </div>
  );
}
