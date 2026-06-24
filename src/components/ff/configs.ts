import { t, type Lang } from "../../i18n";
import type { FlipFlopConfig } from "./types";

function rsNext(q: boolean, vals: Record<string, boolean>): boolean | "undef" {
  const { S, R } = vals;
  if (!S && !R) return q;
  if (!S && R) return false;
  if (S && !R) return true;
  return "undef";
}

function jkNext(q: boolean, vals: Record<string, boolean>): boolean {
  const { J, K } = vals;
  if (!J && !K) return q;
  if (!J && K) return false;
  if (J && !K) return true;
  return !q;
}

function tNext(q: boolean, vals: Record<string, boolean>): boolean {
  return vals.T ? !q : q;
}

function dNext(_q: boolean, vals: Record<string, boolean>): boolean {
  return vals.D;
}

/** All 7 Flip-Flop variants from the source (S. 69-71, 81), built once per language.
 * Truth tables are transcribed verbatim from the scanned pages. */
export function buildFlipFlopConfigs(lang: Lang): FlipFlopConfig[] {
  const hold = t("ffHold", lang);
  const reset0 = t("ffReset0", lang);
  const set1 = t("ffSet1", lang);
  const toggleRow = t("ffToggleRow", lang);
  const forbidden = t("ffForbiddenRow", lang);

  return [
    {
      id: "rs-level",
      heading: t("ffRsLevelHeading", lang),
      intro: t("ffRsLevelIntro", lang),
      mode: "level",
      inputs: [
        { id: "S", label: "S" },
        { id: "R", label: "R" },
      ],
      next: rsNext,
      table: {
        columns: ["S", "R", "Q+"],
        rows: [
          { cells: ["0", "0", hold], match: { S: 0, R: 0 } },
          { cells: ["0", "1", reset0], match: { S: 0, R: 1 } },
          { cells: ["1", "0", set1], match: { S: 1, R: 0 } },
          { cells: ["1", "1", forbidden], match: { S: 1, R: 1 } },
        ],
      },
    },
    {
      id: "rs-clock-level",
      heading: t("ffRsClockLevelHeading", lang),
      intro: t("ffRsClockLevelIntro", lang),
      mode: "clock-level",
      inputs: [
        { id: "S", label: "S" },
        { id: "R", label: "R" },
      ],
      next: rsNext,
      table: {
        columns: ["C", "S", "R", "Q+"],
        rows: [
          { cells: ["0", "x", "x", hold], match: { C: 0 } },
          { cells: ["1", "0", "0", hold], match: { C: 1, S: 0, R: 0 } },
          { cells: ["1", "0", "1", reset0], match: { C: 1, S: 0, R: 1 } },
          { cells: ["1", "1", "0", set1], match: { C: 1, S: 1, R: 0 } },
          { cells: ["1", "1", "1", forbidden], match: { C: 1, S: 1, R: 1 } },
        ],
      },
    },
    {
      id: "rs-edge",
      heading: t("ffRsEdgeHeading", lang),
      intro: t("ffRsEdgeIntro", lang),
      mode: "clock-edge",
      inputs: [
        { id: "S", label: "S" },
        { id: "R", label: "R" },
      ],
      next: rsNext,
      table: {
        columns: ["C", "S", "R", "Q+"],
        rows: [
          { cells: ["x", "0", "0", hold], match: { S: 0, R: 0 } },
          { cells: ["↑", "0", "1", reset0], match: { S: 0, R: 1 } },
          { cells: ["↑", "1", "0", set1], match: { S: 1, R: 0 } },
          { cells: ["↑", "1", "1", forbidden], match: { S: 1, R: 1 } },
        ],
      },
    },
    {
      id: "d-clock-level",
      heading: t("ffDClockLevelHeading", lang),
      intro: t("ffDClockLevelIntro", lang),
      mode: "clock-level",
      inputs: [{ id: "D", label: "D" }],
      next: dNext,
      table: {
        columns: ["C", "D", "Q+"],
        rows: [
          { cells: ["0", "x", hold], match: { C: 0 } },
          { cells: ["1", "0", reset0], match: { C: 1, D: 0 } },
          { cells: ["1", "1", set1], match: { C: 1, D: 1 } },
        ],
      },
    },
    {
      id: "jk-edge",
      heading: t("ffJkEdgeHeading", lang),
      intro: t("ffJkEdgeIntro", lang),
      noteText: t("ffNoForbidden", lang),
      mode: "clock-edge",
      inputs: [
        { id: "J", label: "J" },
        { id: "K", label: "K" },
      ],
      next: jkNext,
      table: {
        columns: ["C", "J", "K", "Q+"],
        rows: [
          { cells: ["x", "0", "0", hold], match: { J: 0, K: 0 } },
          { cells: ["↑", "0", "1", reset0], match: { J: 0, K: 1 } },
          { cells: ["↑", "1", "0", set1], match: { J: 1, K: 0 } },
          { cells: ["↑", "1", "1", toggleRow], match: { J: 1, K: 1 } },
        ],
      },
    },
    {
      id: "t-edge",
      heading: t("ffTEdgeHeading", lang),
      intro: t("ffTEdgeIntro", lang),
      mode: "clock-edge",
      inputs: [{ id: "T", label: "T" }],
      next: tNext,
      table: {
        columns: ["C", "T", "Q+"],
        rows: [
          { cells: ["x", "0", hold], match: { T: 0 } },
          { cells: ["↑", "1", toggleRow], match: { T: 1 } },
        ],
      },
    },
    {
      id: "master-slave",
      heading: t("ffMasterSlaveHeading", lang),
      intro: t("ffMasterSlaveIntro", lang),
      noteText: t("ffNoForbidden", lang),
      mode: "master-slave",
      inputs: [
        { id: "J", label: "J" },
        { id: "K", label: "K" },
      ],
      next: jkNext,
      table: {
        columns: ["C", "J", "K", "Q+"],
        rows: [
          { cells: ["x", "0", "0", hold], match: { J: 0, K: 0 } },
          { cells: ["↑", "0", "1", reset0], match: { J: 0, K: 1 } },
          { cells: ["↑", "1", "0", set1], match: { J: 1, K: 0 } },
          { cells: ["↑", "1", "1", toggleRow], match: { J: 1, K: 1 } },
        ],
      },
    },
  ];
}
