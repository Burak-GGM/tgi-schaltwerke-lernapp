import type { ExerciseConfig } from "../engine/types";
import type { Lang } from "../i18n/types";
import { buildKopierer } from "./01-kopierer";
import { buildAmpel } from "./02-ampel";
import { buildLauflicht1 } from "./03-lauflicht1";
import { buildLauflicht2 } from "./04-lauflicht2";
import { buildRom } from "./05-rom";
import { buildWald } from "./07-wald";
import { buildLaufbalken } from "./08-laufbalken";

/** FSM-mode exercises that run through the generic ExercisePage. Aufgabe 6 (PWM) and the
 * D-FF-Zeitdiagramm part of Aufgabe 8 (2.1.1/2.1.2) are custom pages — see App.tsx. */
export function buildFsmExercises(lang: Lang): ExerciseConfig[] {
  return [
    buildKopierer(lang),
    buildAmpel(lang),
    buildLauflicht1(lang),
    buildLauflicht2(lang),
    buildRom(lang),
    buildWald(lang),
    buildLaufbalken(lang),
  ];
}

export {
  buildKopierer,
  buildAmpel,
  buildLauflicht1,
  buildLauflicht2,
  buildRom,
  buildWald,
  buildLaufbalken,
};
