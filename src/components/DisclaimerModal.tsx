import { useState } from "react";
import { t, useLang } from "../i18n";

const STORAGE_KEY = "disclaimer-accepted-v1";

export function DisclaimerModal() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <div className="disclaimer-backdrop" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="disclaimer-modal">
        <div className="disclaimer-modal__icon">⚠</div>
        <h2 className="disclaimer-modal__title" id="disclaimer-title">
          {t("disclaimerTitle", lang)}
        </h2>
        <div className="disclaimer-modal__body">
          <p>{t("disclaimerP1", lang)}</p>
          <p>{t("disclaimerP2", lang)}</p>
          <p className="disclaimer-modal__closing">{t("disclaimerP3", lang)}</p>
        </div>
        <button className="disclaimer-modal__btn" onClick={accept}>
          {t("disclaimerAccept", lang)}
        </button>
      </div>
    </div>
  );
}
