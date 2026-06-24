import type { Outputs } from "../../engine/types";

export function TrafficLight({ outputs }: { outputs: Outputs }) {
  const r = outputs.R === true || outputs.R === 1;
  const ge = outputs.Ge === true || outputs.Ge === 1;
  const gr = outputs.Gr === true || outputs.Gr === 1;
  return (
    <div className="traffic-light">
      <div className={`traffic-light__lamp traffic-light__lamp--red ${r ? "is-on" : ""}`} />
      <div className={`traffic-light__lamp traffic-light__lamp--yellow ${ge ? "is-on" : ""}`} />
      <div className={`traffic-light__lamp traffic-light__lamp--green ${gr ? "is-on" : ""}`} />
    </div>
  );
}
