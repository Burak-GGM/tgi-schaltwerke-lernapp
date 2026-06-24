import type { ExerciseConfig, Outputs } from "../../engine/types";
import { TrafficLight } from "./TrafficLight";
import { LampRow } from "./LampRow";
import { LedMatrix3x3 } from "./LedMatrix3x3";
import { CounterBadge } from "./CounterBadge";
import { BoolPills } from "./BoolPills";
import { RomTable } from "./RomTable";

interface Props {
  config: ExerciseConfig;
  outputs: Outputs;
  currentStateId: string;
}

/** Picks the right output renderer for the exercise's `outputRenderer` kind. */
export function OutputView({ config, outputs, currentStateId }: Props) {
  switch (config.outputRenderer) {
    case "traffic-light":
      return <TrafficLight outputs={outputs} />;
    case "lamp-row-4":
      return <LampRow outputs={outputs} />;
    case "led-matrix-3x3":
      return <LedMatrix3x3 outputs={outputs} />;
    case "counter-badge":
      return <CounterBadge outputs={outputs} meta={config.outputMeta} />;
    case "rom-table":
      return (
        <RomTable table={config.tables[0]} currentStateId={currentStateId} outputs={outputs} />
      );
    case "bool-pills":
    default:
      return <BoolPills outputs={outputs} />;
  }
}
