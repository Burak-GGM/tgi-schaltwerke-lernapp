import { LANGUAGES, useLang } from "../i18n";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-switcher">
      {LANGUAGES.map((l) => (
        <button
          key={l.id}
          className={`lang-switcher__btn ${l.id === lang ? "is-active" : ""}`}
          onClick={() => setLang(l.id)}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
