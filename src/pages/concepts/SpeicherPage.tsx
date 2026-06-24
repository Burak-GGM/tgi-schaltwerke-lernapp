import { useState } from "react";
import { t, useLang } from "../../i18n";

const SIZE = 8;
const WIDTH = 4;

// classic bipolar stepper-motor half-step pattern — a typical real-world use
// for a small ROM exactly like the source's own example (S. 82)
const ROM_CONTENT: boolean[][] = [
  [false, false, false, true],
  [false, false, true, true],
  [false, false, true, false],
  [false, true, true, false],
  [false, true, false, false],
  [true, true, false, false],
  [true, false, false, false],
  [true, false, false, true],
];

function bitsToText(bits: boolean[]): string {
  return bits.map((b) => (b ? "1" : "0")).join("");
}

function MemoryArray({
  content,
  address,
}: {
  content: boolean[][];
  address: number;
}) {
  const { lang } = useLang();
  return (
    <div className="rom-chip__array">
      <div className="rom-chip__header">
        <span>{t("memAddressLabel", lang)}</span>
        <span>D3 D2 D1 D0</span>
      </div>
      {content.map((row, i) => (
        <div key={i} className={`rom-chip__row ${i === address ? "is-active" : ""}`}>
          <span className="rom-chip__addr">{i}</span>
          <span className="rom-chip__data">{bitsToText([...row].reverse()).split("").join(" ")}</span>
        </div>
      ))}
    </div>
  );
}

function OutputLeds({ bits }: { bits: boolean[] | null }) {
  const { lang } = useLang();
  if (!bits) {
    return <p className="callout">{t("memOutputTristate", lang)}</p>;
  }
  return (
    <div className="lamp-row">
      {bits.map((v, i) => (
        <div key={i} className="lamp-row__lamp-wrap">
          <div className={`lamp-row__lamp ${v ? "is-on" : ""}`} />
          <span className="lamp-row__label">D{bits.length - 1 - i}</span>
        </div>
      ))}
    </div>
  );
}

function RamTab() {
  const { lang } = useLang();
  const [memory, setMemory] = useState<boolean[][]>(() =>
    Array.from({ length: SIZE }, () => Array(WIDTH).fill(false)),
  );
  const [address, setAddress] = useState(0);
  const [data, setData] = useState<boolean[]>(Array(WIDTH).fill(false));
  const [wr, setWr] = useState(false);
  const [oe, setOe] = useState(false);
  const [en, setEn] = useState(true);

  const toggleData = (i: number) => setData((arr) => arr.map((v, idx) => (idx === i ? !v : v)));

  const write = () => {
    if (!en || !wr) return;
    setMemory((mem) => mem.map((row, i) => (i === address ? [...data] : row)));
  };

  const outputBits = en && !oe ? [...memory[address]].reverse() : null;

  return (
    <div className="exercise-page__grid">
      <section className="panel">
        <h3>{t("memAddressLabel", lang)}</h3>
        <div className="controls__inputs">
          {Array.from({ length: SIZE }, (_, i) => (
            <button key={i} className={`btn ${address === i ? "btn--primary" : ""}`} onClick={() => setAddress(i)}>
              {i}
            </button>
          ))}
        </div>

        <h4 style={{ marginTop: 18 }}>{t("memDataLabel", lang)}</h4>
        <div className="controls__inputs">
          {data.map((v, i) => (
            <button key={i} className={`btn ${v ? "btn--primary" : ""}`} onClick={() => toggleData(i)}>
              D{i}: {v ? "1" : "0"}
            </button>
          ))}
        </div>

        <h4 style={{ marginTop: 18 }}>{t("ffControlsHeading", lang)}</h4>
        <div className="controls__inputs">
          <button className={`btn ${wr ? "btn--primary" : ""}`} onClick={() => setWr((v) => !v)}>
            {t("memWrLabel", lang)}: {wr ? "1" : "0"}
          </button>
          <button className={`btn ${oe ? "btn--primary" : ""}`} onClick={() => setOe((v) => !v)}>
            {t("memOeLabel", lang)}: {oe ? "1" : "0"}
          </button>
          <button className={`btn ${en ? "btn--primary" : ""}`} onClick={() => setEn((v) => !v)}>
            {t("memEnLabel", lang)}: {en ? "1" : "0"}
          </button>
        </div>
        <div className="controls__transport" style={{ marginTop: 12 }}>
          <button className="btn btn--primary" onClick={write}>
            {t("memWriteButton", lang)}
          </button>
        </div>
      </section>

      <section className="panel">
        <h3>{t("memOutputLabel", lang)}</h3>
        <OutputLeds bits={outputBits} />
      </section>

      <section className="panel panel--wide">
        <h4>{t("memArrayHeading", lang)}</h4>
        <div className="rom-chip">
          <MemoryArray content={memory} address={address} />
          <div className="rom-chip__output">
            <span className="rom-chip__arrow">→</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function RomTab() {
  const { lang } = useLang();
  const [address, setAddress] = useState(0);
  const [oe, setOe] = useState(false);
  const [en, setEn] = useState(true);

  const outputBits = en && !oe ? [...ROM_CONTENT[address]].reverse() : null;

  return (
    <div className="exercise-page__grid">
      <section className="panel">
        <h3>{t("memAddressLabel", lang)}</h3>
        <div className="controls__inputs">
          {Array.from({ length: SIZE }, (_, i) => (
            <button key={i} className={`btn ${address === i ? "btn--primary" : ""}`} onClick={() => setAddress(i)}>
              {i}
            </button>
          ))}
        </div>
        <h4 style={{ marginTop: 18 }}>{t("ffControlsHeading", lang)}</h4>
        <div className="controls__inputs">
          <button className={`btn ${oe ? "btn--primary" : ""}`} onClick={() => setOe((v) => !v)}>
            {t("memOeLabel", lang)}: {oe ? "1" : "0"}
          </button>
          <button className={`btn ${en ? "btn--primary" : ""}`} onClick={() => setEn((v) => !v)}>
            {t("memEnLabel", lang)}: {en ? "1" : "0"}
          </button>
        </div>
      </section>

      <section className="panel">
        <h3>{t("memOutputLabel", lang)}</h3>
        <OutputLeds bits={outputBits} />
      </section>

      <section className="panel panel--wide">
        <h4>{t("memArrayHeading", lang)}</h4>
        <div className="rom-chip">
          <MemoryArray content={ROM_CONTENT} address={address} />
          <div className="rom-chip__output">
            <span className="rom-chip__arrow">→</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export function SpeicherPage() {
  const { lang } = useLang();
  const [tab, setTab] = useState<"ram" | "rom">("ram");

  return (
    <div className="exercise-page">
      <header className="exercise-page__header">
        <h2>{t("memHeading", lang)}</h2>
        <p className="exercise-page__subtitle">{t("memSubtitle", lang)}</p>
        <p className="exercise-page__description">{tab === "ram" ? t("ramIntro", lang) : t("romIntro", lang)}</p>
      </header>

      <div className="tabs" style={{ marginTop: 18 }}>
        <button className={`tabs__tab ${tab === "ram" ? "is-active" : ""}`} onClick={() => setTab("ram")}>
          {t("memTabRam", lang)}
        </button>
        <button className={`tabs__tab ${tab === "rom" ? "is-active" : ""}`} onClick={() => setTab("rom")}>
          {t("memTabRom", lang)}
        </button>
      </div>

      {tab === "ram" ? <RamTab /> : <RomTab />}
    </div>
  );
}
