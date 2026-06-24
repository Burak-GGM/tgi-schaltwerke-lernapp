import type { ExerciseConfig } from "../engine/types";
import { t, useLang } from "../i18n";

interface Props {
  config: ExerciseConfig;
  onFire: (inputId: string) => void;
  onReset: () => void;
  playing: boolean;
  setPlaying: (p: boolean) => void;
  speedMs: number;
  setSpeedMs: (ms: number) => void;
}

export function Controls({
  config,
  onFire,
  onReset,
  playing,
  setPlaying,
  speedMs,
  setSpeedMs,
}: Props) {
  const { lang } = useLang();
  return (
    <div className="controls">
      <div className="controls__inputs">
        {config.inputs.map((inp) => (
          <button key={inp.id} className="btn" onClick={() => onFire(inp.id)}>
            {inp.label}
          </button>
        ))}
      </div>
      <div className="controls__transport">
        {config.autoplay && (
          <button className="btn btn--primary" onClick={() => setPlaying(!playing)}>
            {playing ? t("controlsPause", lang) : t("controlsPlay", lang)}
          </button>
        )}
        <button className="btn" onClick={onReset}>
          {t("controlsReset", lang)}
        </button>
        {config.autoplay && (
          <label className="controls__speed">
            {t("controlsSpeed", lang)}
            <input
              type="range"
              min={150}
              max={1500}
              step={50}
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
            />
            <span>{t("controlsMsPerClock", lang, { ms: speedMs })}</span>
          </label>
        )}
      </div>
    </div>
  );
}
