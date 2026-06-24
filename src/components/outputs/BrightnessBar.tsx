import { t, useLang } from "../../i18n";

interface Props {
  /** 0..1 perceived duty cycle (register / 256), already 0 if the lamp is switched off */
  perceived: number;
  /** instantaneous raw PWM signal (Lampe = licht AND y) for this tick */
  raw: boolean;
}

export function BrightnessBar({ perceived, raw }: Props) {
  const { lang } = useLang();
  return (
    <div className="brightness">
      <div className="brightness__bulb" style={{ opacity: 0.12 + perceived * 0.88 }}>
        💡
      </div>
      <div className="brightness__meta">
        <div className="brightness__row">
          <span>{t("pwmBrightnessPerceived", lang)}</span>
          <div className="brightness__track">
            <div className="brightness__fill" style={{ width: `${perceived * 100}%` }} />
          </div>
          <span>{Math.round(perceived * 100)}%</span>
        </div>
        <div className="brightness__row">
          <span>{t("pwmBrightnessRaw", lang)}</span>
          <span className={`brightness__raw-led ${raw ? "is-on" : ""}`} />
        </div>
      </div>
    </div>
  );
}
