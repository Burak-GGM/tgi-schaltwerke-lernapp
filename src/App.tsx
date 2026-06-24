import { useState, type ReactElement } from "react";
import {
  buildKopierer,
  buildAmpel,
  buildLauflicht1,
  buildLauflicht2,
  buildRom,
  buildWald,
  buildLaufbalken,
} from "./exercises";
import { buildBierBeispiel } from "./concepts/zustandsdiagramm-bier";
import { ExercisePage } from "./pages/ExercisePage";
import { SchaltnetzSchaltwerkPage } from "./pages/concepts/SchaltnetzSchaltwerkPage";
import { FlipFlopsPage } from "./pages/concepts/FlipFlopsPage";
import { ZaehlerPage } from "./pages/concepts/ZaehlerPage";
import { SchieberegisterPage } from "./pages/concepts/SchieberegisterPage";
import { SpeicherPage } from "./pages/concepts/SpeicherPage";
import { WaldPage } from "./pages/WaldPage";
import { PwmPage } from "./pages/PwmPage";
import { LaufbalkenPage } from "./pages/LaufbalkenPage";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { t, useLang, type Lang } from "./i18n";

const PWM_TITLE: Record<Lang, string> = {
  de: "Pulsweitenmodulation",
  tr: "Darbe Genişlik Modülasyonu",
  en: "Pulse-Width Modulation",
};

interface NavItem {
  id: string;
  number: number;
  title: string;
  render: () => ReactElement;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

function App() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("sn");

  const grundlagenItems: NavItem[] = [
    { id: "sn", number: 1, title: t("snHeading", lang), render: () => <SchaltnetzSchaltwerkPage /> },
    { id: "flipflops", number: 2, title: t("ffPageHeading", lang), render: () => <FlipFlopsPage /> },
    { id: "bier", ...withRender(buildBierBeispiel(lang)) },
    { id: "zaehler", number: 4, title: t("ctrHeading", lang), render: () => <ZaehlerPage /> },
    { id: "srg", number: 5, title: t("srgHeading", lang), render: () => <SchieberegisterPage /> },
    { id: "speicher", number: 6, title: t("memHeading", lang), render: () => <SpeicherPage /> },
  ];

  const uebungenItems: NavItem[] = [
    { id: "kopierer", ...withRender(buildKopierer(lang)) },
    { id: "ampel", ...withRender(buildAmpel(lang)) },
    { id: "lauflicht1", ...withRender(buildLauflicht1(lang)) },
    { id: "lauflicht2", ...withRender(buildLauflicht2(lang)) },
    { id: "rom", ...withRender(buildRom(lang)) },
    { id: "pwm", number: 6, title: PWM_TITLE[lang], render: () => <PwmPage /> },
    { id: "wald", number: 7, title: buildWald(lang).title, render: () => <WaldPage /> },
    {
      id: "laufbalken",
      number: 8,
      title: buildLaufbalken(lang).title,
      render: () => <LaufbalkenPage />,
    },
  ];

  const groups: NavGroup[] = [
    { id: "grundlagen", label: t("navGrundlagen", lang), items: grundlagenItems },
    { id: "uebungen", label: t("navUebungen", lang), items: uebungenItems },
  ];

  const active =
    groups.flatMap((g) => g.items).find((n) => n.id === activeId) ?? grundlagenItems[0];

  return (
    <div className="app">
      <aside className="app__sidebar">
        <h1 className="app__title">Schaltwerke SN/SW</h1>
        <p className="app__subtitle">{t("appSubtitle", lang)}</p>
        <LanguageSwitcher />
        {groups.map((group) => (
          <div key={group.id} className="app__nav-group">
            <h2 className="app__nav-group-label">{group.label}</h2>
            <nav className="app__nav">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`app__nav-item ${item.id === activeId ? "is-active" : ""}`}
                  onClick={() => setActiveId(item.id)}
                >
                  <span className="app__nav-number">{item.number}</span>
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </aside>
      <main className="app__main">{active.render()}</main>
    </div>
  );
}

function withRender(config: ReturnType<typeof buildKopierer>) {
  return {
    number: config.number,
    title: config.title,
    render: () => <ExercisePage config={config} />,
  };
}

export default App;
