import { useMemo, useState } from "react";
import { buildLaufbalken } from "../exercises";
import { ExercisePage } from "./ExercisePage";
import { DffTimingLab } from "./DffTimingLab";
import { t, useLang } from "../i18n";

export function LaufbalkenPage() {
  const { lang } = useLang();
  const [tab, setTab] = useState<"dff" | "fsm">("fsm");
  const config = useMemo(() => buildLaufbalken(lang), [lang]);

  return (
    <div>
      <div className="tabs">
        <button
          className={`tabs__tab ${tab === "fsm" ? "is-active" : ""}`}
          onClick={() => setTab("fsm")}
        >
          {t("laufbalkenTabFsm", lang)}
        </button>
        <button
          className={`tabs__tab ${tab === "dff" ? "is-active" : ""}`}
          onClick={() => setTab("dff")}
        >
          {t("laufbalkenTabDff", lang)}
        </button>
      </div>
      {tab === "fsm" ? <ExercisePage config={config} /> : <DffTimingLab />}
    </div>
  );
}
