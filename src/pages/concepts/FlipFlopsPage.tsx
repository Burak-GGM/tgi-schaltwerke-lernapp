import { useMemo, useState } from "react";
import { FlipFlopLab } from "../../components/ff/FlipFlopLab";
import { buildFlipFlopConfigs } from "../../components/ff/configs";
import { t, useLang } from "../../i18n";

const TAB_KEYS = [
  "ffTabRsLevel",
  "ffTabRsClockLevel",
  "ffTabRsEdge",
  "ffTabDClockLevel",
  "ffTabJkEdge",
  "ffTabTEdge",
  "ffTabMasterSlave",
] as const;

export function FlipFlopsPage() {
  const { lang } = useLang();
  const configs = useMemo(() => buildFlipFlopConfigs(lang), [lang]);
  const [tab, setTab] = useState(0);
  const active = configs[tab];

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("ffPageHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("ffPageSubtitle", lang)}</p>
        <p className="exercise-page__description">{t("ffPageIntro", lang)}</p>
      </header>

      <div className="tabs" style={{ marginTop: 18, flexWrap: "wrap" }}>
        {configs.map((cfg, i) => (
          <button
            key={cfg.id}
            className={`tabs__tab ${i === tab ? "is-active" : ""}`}
            onClick={() => setTab(i)}
          >
            {t(TAB_KEYS[i], lang)}
          </button>
        ))}
      </div>

      <div className="exercise-page__grid">
        <FlipFlopLab key={active.id} config={active} />
      </div>
    </div>
  );
}
