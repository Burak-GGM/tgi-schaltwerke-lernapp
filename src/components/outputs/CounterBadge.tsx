import type { Outputs } from "../../engine/types";
import { t, useLang, type StringKey } from "../../i18n";

export function CounterBadge({
  outputs,
  meta,
}: {
  outputs: Outputs;
  meta?: Record<string, unknown>;
}) {
  const { lang } = useLang();
  const key = (meta?.key as string) ?? "copies";
  const captionKey = (meta?.captionKey as StringKey) ?? "counterBadgeCaption";
  const value = Number(outputs[key] ?? 0);
  const max = Number(meta?.max ?? value);
  return (
    <div className="counter-badge">
      <div className="counter-badge__number">{value}</div>
      <div className="counter-badge__caption">{t(captionKey, lang)}</div>
      <div className="counter-badge__dots">
        {Array.from({ length: max }, (_, i) => (
          <span key={i} className={`counter-badge__dot ${i < value ? "is-filled" : ""}`} />
        ))}
      </div>
    </div>
  );
}
