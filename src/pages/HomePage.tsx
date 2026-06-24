import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { t, useLang } from "../i18n";

export interface HomeNavCard {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
}

interface Props {
  grundlagen: HomeNavCard[];
  uebungen: HomeNavCard[];
  onNavigate: (id: string) => void;
}

function CardGrid({ items, onNavigate }: { items: HomeNavCard[]; onNavigate: (id: string) => void }) {
  return (
    <div className="home-grid">
      {items.map((item) => (
        <button key={item.id} className="home-card" onClick={() => onNavigate(item.id)}>
          <span className="home-card__number">{item.number}</span>
          <span className="home-card__body">
            <span className="home-card__title">{item.title}</span>
            {item.subtitle && <span className="home-card__subtitle">{item.subtitle}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}

export function HomePage({ grundlagen, uebungen, onNavigate }: Props) {
  const { lang } = useLang();
  return (
    <div className="home">
      <section className="home__hero">
        <p className="home__greeting">{t("homeGreeting", lang)}</p>
        <h2 className="home__title">{t("homeTitle", lang)}</h2>
        <p className="home__pitch">{t("homePitch", lang)}</p>
        <div className="home__lang">
          <p className="home__lang-label">{t("homeChooseLanguage", lang)}</p>
          <LanguageSwitcher size="large" />
        </div>
      </section>

      <section className="home__section">
        <h3 className="home__section-title">{t("homeSectionGrundlagen", lang)}</h3>
        <CardGrid items={grundlagen} onNavigate={onNavigate} />
      </section>

      <section className="home__section">
        <h3 className="home__section-title">{t("homeSectionUebungen", lang)}</h3>
        <CardGrid items={uebungen} onNavigate={onNavigate} />
      </section>

      <p className="home__about">
        {t("homeAbout", lang)}{" "}
        <a
          href="https://github.com/Burak-GGM/tgi-schaltwerke-lernapp"
          target="_blank"
          rel="noreferrer"
        >
          GitHub →
        </a>
      </p>
    </div>
  );
}
