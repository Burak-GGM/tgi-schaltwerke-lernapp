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
import { HomePage } from "./pages/HomePage";
import { SchaltnetzSchaltwerkPage } from "./pages/concepts/SchaltnetzSchaltwerkPage";
import { FlipFlopsPage } from "./pages/concepts/FlipFlopsPage";
import { ZaehlerPage } from "./pages/concepts/ZaehlerPage";
import { SchieberegisterPage } from "./pages/concepts/SchieberegisterPage";
import { SpeicherPage } from "./pages/concepts/SpeicherPage";
import { AddiererPage } from "./pages/concepts/AddiererPage";
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

const MOBILE_QUERY = "(max-width: 880px)";

interface NavItem {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  render: () => ReactElement;
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

function App() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState("home");
  const [navOpen, setNavOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia(MOBILE_QUERY).matches;
  });

  const grundlagenItems: NavItem[] = [
    {
      id: "sn",
      number: 1,
      title: t("snHeading", lang),
      subtitle: t("snSubtitle", lang),
      render: () => <SchaltnetzSchaltwerkPage />,
    },
    {
      id: "flipflops",
      number: 2,
      title: t("ffPageHeading", lang),
      subtitle: t("ffPageSubtitle", lang),
      render: () => <FlipFlopsPage />,
    },
    { id: "bier", ...withRender(buildBierBeispiel(lang)) },
    {
      id: "zaehler",
      number: 4,
      title: t("ctrHeading", lang),
      subtitle: t("ctrSubtitle", lang),
      render: () => <ZaehlerPage />,
    },
    {
      id: "srg",
      number: 5,
      title: t("srgHeading", lang),
      subtitle: t("srgSubtitle", lang),
      render: () => <SchieberegisterPage />,
    },
    {
      id: "speicher",
      number: 6,
      title: t("memHeading", lang),
      subtitle: t("memSubtitle", lang),
      render: () => <SpeicherPage />,
    },
    {
      id: "addierer",
      number: 7,
      title: t("addHeading", lang),
      subtitle: t("addSubtitle", lang),
      render: () => <AddiererPage />,
    },
  ];

  const uebungenItems: NavItem[] = [
    { id: "kopierer", ...withRender(buildKopierer(lang)) },
    { id: "ampel", ...withRender(buildAmpel(lang)) },
    { id: "lauflicht1", ...withRender(buildLauflicht1(lang)) },
    { id: "lauflicht2", ...withRender(buildLauflicht2(lang)) },
    { id: "rom", ...withRender(buildRom(lang)) },
    {
      id: "pwm",
      number: 6,
      title: PWM_TITLE[lang],
      subtitle: t("pwmSubtitle", lang),
      render: () => <PwmPage />,
    },
    { id: "wald", ...bespokeNav(buildWald(lang), () => <WaldPage />) },
    { id: "laufbalken", ...bespokeNav(buildLaufbalken(lang), () => <LaufbalkenPage />) },
  ];

  const groups: NavGroup[] = [
    { id: "grundlagen", label: t("navGrundlagen", lang), items: grundlagenItems },
    { id: "uebungen", label: t("navUebungen", lang), items: uebungenItems },
  ];

  const allItems = groups.flatMap((g) => g.items);
  const active = allItems.find((n) => n.id === activeId);

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches) {
      setNavOpen(false);
    }
  };

  const navigate = (id: string) => {
    setActiveId(id);
    closeOnMobile();
  };

  return (
    <div className="app">
      <div className={`app__drawer ${navOpen ? "is-open" : ""}`}>
        <div className="app__drawer-inner">
          <button className="app__home-link" onClick={() => navigate("home")}>
            {t("navHome", lang)}
          </button>
          <LanguageSwitcher />
          {groups.map((group) => (
            <div key={group.id} className="app__nav-group">
              <h2 className="app__nav-group-label">{group.label}</h2>
              <nav className="app__nav">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    className={`app__nav-item ${item.id === activeId ? "is-active" : ""}`}
                    onClick={() => navigate(item.id)}
                  >
                    <span className="app__nav-number">{item.number}</span>
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`app__backdrop ${navOpen ? "is-open" : ""}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setNavOpen(false)}
      />

      <div className="app__content">
        <header className="app__topbar">
          <button
            className="app__hamburger"
            aria-label={t(navOpen ? "navToggleAriaClose" : "navToggleAriaOpen", lang)}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <button className="app__topbar-title" onClick={() => navigate("home")}>
            Schaltwerke SN/SW
          </button>
        </header>
        <main className="app__main">
          {active ? (
            active.render()
          ) : (
            <HomePage grundlagen={grundlagenItems} uebungen={uebungenItems} onNavigate={navigate} />
          )}
        </main>
      </div>
    </div>
  );
}

function withRender(config: ReturnType<typeof buildKopierer>) {
  return {
    number: config.number,
    title: config.title,
    subtitle: config.subtitle,
    render: () => <ExercisePage config={config} />,
  };
}

function bespokeNav(config: { number: number; title: string; subtitle?: string }, render: () => ReactElement) {
  return { number: config.number, title: config.title, subtitle: config.subtitle, render };
}

export default App;
