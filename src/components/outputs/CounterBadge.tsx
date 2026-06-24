import type { Outputs } from "../../engine/types";
import { t, useLang } from "../../i18n";

export function CounterBadge({
  outputs,
  meta,
}: {
  outputs: Outputs;
  meta?: Record<string, unknown>;
}) {
  const { lang } = useLang();
  const value = Number(outputs.copies ?? 0);
  const max = Number(meta?.max ?? value);
  return (
    <div className="counter-badge">
      <div className="counter-badge__number">{value}</div>
      <div className="counter-badge__caption">{t("counterBadgeCaption", lang)}</div>
      <div className="counter-badge__dots">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={`counter-badge__dot ${i < value ? "is-filled" : ""}`} />
        ))}
      </div>
    </div>
  );
}
