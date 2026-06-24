import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./types";

const STORAGE_KEY = "schaltwerke-lang";

interface LanguageState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageState>({ lang: "de", setLang: () => {} });

function readInitialLang(): Lang {
  if (typeof localStorage === "undefined") return "de";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "tr" || stored === "en" || stored === "de" ? stored : "de";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
