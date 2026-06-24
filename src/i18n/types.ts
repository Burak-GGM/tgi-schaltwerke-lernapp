export type Lang = "de" | "tr" | "en";

export const LANGUAGES: { id: Lang; label: string }[] = [
  { id: "de", label: "Deutsch" },
  { id: "tr", label: "Türkçe" },
  { id: "en", label: "English" },
];

export type LangText = Record<Lang, string>;
