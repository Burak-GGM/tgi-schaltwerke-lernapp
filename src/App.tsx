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
import { ExercisePage } from "./pages/ExercisePage";
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

function App() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("kopierer");

  const nav: NavItem[] = [
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

  const active = nav.find((n) => n.id === activeId) ?? nav[0];

  return (
    <div className="app">
      <aside className="app__sidebar">
        <h1 className="app__title">Schaltwerke SN/SW</h1>
        <p className="app__subtitle">{t("appSubtitle", lang)}</p>
        <LanguageSwitcher />
        <nav className="app__nav">
          {nav.map((item) => (
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
