import { LANGUAGES, useLang } from "../i18n";

export function LanguageSwitcher({ size = "default" }: { size?: "default" | "large" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switcher ${size === "large" ? "lang-switcher--large" : ""}`}>
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
