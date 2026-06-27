import { useState } from "react";
import { t, useLang } from "../../i18n";

// ── Logic helpers ────────────────────────────────────────────────────────────

function xor(a: boolean, b: boolean): boolean {
  return a !== b;
}

function fullAdder(a: boolean, b: boolean, cin: boolean): { sum: boolean; cout: boolean } {
  const sum = xor(xor(a, b), cin);
  const cout = (a && b) || (cin && xor(a, b));
  return { sum, cout };
}

// ── Shared mini-components ───────────────────────────────────────────────────

function BitBtn({
  value,
  label,
  onClick,
}: {
  value: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button className={`adder-bit-btn ${value ? "is-on" : ""}`} onClick={onClick}>
      <span className="adder-bit-btn__label">{label}</span>
      <span className="adder-bit-btn__value">{value ? "1" : "0"}</span>
    </button>
  );
}

function BitDisplay({ value, label }: { value: boolean; label?: string }) {
  return (
    <span className={`adder-bit-display ${value ? "is-on" : ""}`}>
      {label && <span className="adder-bit-display__label">{label}</span>}
      <span className="adder-bit-display__value">{value ? "1" : "0"}</span>
    </span>
  );
}

// ── Section 1: XOR Gate ──────────────────────────────────────────────────────

function XorDemo() {
  const { lang } = useLang();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const s = xor(a, b);

  const rows: [number, number, number][] = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ];

  return (
    <div className="adder-section">
      <h3 className="adder-section__heading">{t("addXorHeading", lang)}</h3>
      <p className="adder-section__intro">{t("addXorIntro", lang)}</p>

      <div className="adder-demo">
        <div className="adder-demo__controls">
          <BitBtn value={a} label="A" onClick={() => setA((v) => !v)} />
          <span className="adder-demo__op"># (XOR)</span>
          <BitBtn value={b} label="B" onClick={() => setB((v) => !v)} />
          <span className="adder-demo__eq">=</span>
          <BitDisplay value={s} label="S" />
        </div>
        <code className="adder-formula">S = A # B</code>
        <table className="truth-table adder-section__table">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>S = A # B</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([ra, rb, rs], i) => (
              <tr
                key={i}
                className={ra === (a ? 1 : 0) && rb === (b ? 1 : 0) ? "is-active" : ""}
              >
                <td>{ra}</td>
                <td>{rb}</td>
                <td>{rs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Section 2: Half Adder ────────────────────────────────────────────────────

function HalfAdderDemo() {
  const { lang } = useLang();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const s = xor(a, b);
  const cout = a && b;

  const rows: [number, number, number, number][] = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 1, 0],
    [1, 1, 0, 1],
  ];

  return (
    <div className="adder-section">
      <h3 className="adder-section__heading">{t("addHalfHeading", lang)}</h3>
      <p className="adder-section__intro">{t("addHalfIntro", lang)}</p>

      <div className="adder-demo">
        <div className="adder-demo__controls">
          <BitBtn value={a} label="A" onClick={() => setA((v) => !v)} />
          <span className="adder-demo__op">+</span>
          <BitBtn value={b} label="B" onClick={() => setB((v) => !v)} />
        </div>
        <div className="adder-demo__outputs">
          <div className="adder-demo__out-row">
            <code className="adder-formula">S = A # B</code>
            <BitDisplay value={s} label="S" />
          </div>
          <div className="adder-demo__out-row">
            <code className="adder-formula">Cout = A & B</code>
            <BitDisplay value={cout} label="Cout" />
          </div>
        </div>
        <table className="truth-table adder-section__table">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>S</th>
              <th>Cout</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([ra, rb, rs, rc], i) => (
              <tr
                key={i}
                className={ra === (a ? 1 : 0) && rb === (b ? 1 : 0) ? "is-active" : ""}
              >
                <td>{ra}</td>
                <td>{rb}</td>
                <td>{rs}</td>
                <td>{rc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Section 3: Full Adder ────────────────────────────────────────────────────

function FullAdderDemo() {
  const { lang } = useLang();
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [cin, setCin] = useState(false);
  const { sum, cout } = fullAdder(a, b, cin);

  const rows: [number, number, number, number, number][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ];

  return (
    <div className="adder-section">
      <h3 className="adder-section__heading">{t("addFullHeading", lang)}</h3>
      <p className="adder-section__intro">{t("addFullIntro", lang)}</p>

      <div className="adder-demo">
        <div className="adder-demo__controls">
          <BitBtn value={a} label="A" onClick={() => setA((v) => !v)} />
          <span className="adder-demo__op">+</span>
          <BitBtn value={b} label="B" onClick={() => setB((v) => !v)} />
          <span className="adder-demo__op">+</span>
          <BitBtn value={cin} label="Cin" onClick={() => setCin((v) => !v)} />
        </div>
        <div className="adder-demo__outputs">
          <div className="adder-demo__out-row">
            <code className="adder-formula">S = A # B # Cin</code>
            <BitDisplay value={sum} label="S" />
          </div>
          <div className="adder-demo__out-row">
            <code className="adder-formula">Cout = A&B + Cin&(A#B)</code>
            <BitDisplay value={cout} label="Cout" />
          </div>
        </div>
        <table className="truth-table adder-section__table">
          <thead>
            <tr>
              <th>A</th>
              <th>B</th>
              <th>Cin</th>
              <th>S</th>
              <th>Cout</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([ra, rb, rc, rs, rco], i) => (
              <tr
                key={i}
                className={
                  ra === (a ? 1 : 0) && rb === (b ? 1 : 0) && rc === (cin ? 1 : 0)
                    ? "is-active"
                    : ""
                }
              >
                <td>{ra}</td>
                <td>{rb}</td>
                <td>{rc}</td>
                <td>{rs}</td>
                <td>{rco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Section 4: 4-Bit Ripple-Carry Adder ─────────────────────────────────────

// State: a[0]=bit3(MSB), a[1]=bit2, a[2]=bit1, a[3]=bit0(LSB)
function FourBitAdder() {
  const { lang } = useLang();
  const [a, setA] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);
  const [b, setB] = useState<[boolean, boolean, boolean, boolean]>([false, false, false, false]);

  const toggleA = (col: number) =>
    setA((prev) => prev.map((v, i) => (i === col ? !v : v)) as typeof prev);
  const toggleB = (col: number) =>
    setB((prev) => prev.map((v, i) => (i === col ? !v : v)) as typeof prev);

  // Compute carry chain: start C0=0 at LSB (col 3), carry ripples to MSB (col 0).
  const c0 = false;
  const fa0 = fullAdder(a[3], b[3], c0); // bit 0 (LSB)
  const fa1 = fullAdder(a[2], b[2], fa0.cout); // bit 1
  const fa2 = fullAdder(a[1], b[1], fa1.cout); // bit 2
  const fa3 = fullAdder(a[0], b[0], fa2.cout); // bit 3 (MSB)

  // Display order: col 0 = bit3(MSB), col 1 = bit2, col 2 = bit1, col 3 = bit0(LSB)
  const carries = [fa2.cout, fa1.cout, fa0.cout, false]; // carry INTO each column
  const sums = [fa3.sum, fa2.sum, fa1.sum, fa0.sum];
  const overflow = fa3.cout; // C4

  const aVal = (a[0] ? 8 : 0) + (a[1] ? 4 : 0) + (a[2] ? 2 : 0) + (a[3] ? 1 : 0);
  const bVal = (b[0] ? 8 : 0) + (b[1] ? 4 : 0) + (b[2] ? 2 : 0) + (b[3] ? 1 : 0);
  const total = aVal + bVal;
  const sumVal = sums.reduce((acc, v, i) => acc + (v ? 1 << (3 - i) : 0), 0);

  const bitLabels = ["Bit 3", "Bit 2", "Bit 1", "Bit 0"];

  return (
    <div className="adder-section">
      <h3 className="adder-section__heading">{t("add4BitHeading", lang)}</h3>
      <p className="adder-section__intro">{t("add4BitIntro", lang)}</p>

      <div className="adder-4bit">
        {/* Bit position headers */}
        <div className="adder-4bit__grid">
          <span className="adder-4bit__row-label" />
          {bitLabels.map((l) => (
            <span key={l} className="adder-4bit__col-header">
              {l}
            </span>
          ))}
          <span className="adder-4bit__decimal-col" />
        </div>

        {/* Row A */}
        <div className="adder-4bit__grid">
          <span className="adder-4bit__row-label adder-4bit__row-label--A">A</span>
          {[0, 1, 2, 3].map((col) => (
            <BitBtn key={col} value={a[col]} label="" onClick={() => toggleA(col)} />
          ))}
          <span className="adder-4bit__decimal">= {aVal}</span>
        </div>

        {/* Row B */}
        <div className="adder-4bit__grid">
          <span className="adder-4bit__row-label adder-4bit__row-label--B">B</span>
          {[0, 1, 2, 3].map((col) => (
            <BitBtn key={col} value={b[col]} label="" onClick={() => toggleB(col)} />
          ))}
          <span className="adder-4bit__decimal">= {bVal}</span>
        </div>

        {/* Carry chain divider */}
        <div className="adder-4bit__carry-row">
          <span className="adder-4bit__carry-arrow">
            <span className={`adder-4bit__carry-val ${overflow ? "is-on" : ""}`}>
              C4={overflow ? 1 : 0}
            </span>
            <span className="adder-4bit__carry-dir">←</span>
            {carries.map((c, col) => (
              <span key={col} className={`adder-4bit__carry-val ${c ? "is-on" : ""}`}>
                C{3 - col}={c ? 1 : 0}
                {col < 3 && <span className="adder-4bit__carry-dir">←</span>}
              </span>
            ))}
          </span>
        </div>

        {/* Divider */}
        <div className="adder-4bit__divider">
          <span className="adder-4bit__plus">+</span>
          <span className="adder-4bit__line" />
        </div>

        {/* Row S (sum) */}
        <div className="adder-4bit__grid">
          <span className="adder-4bit__row-label adder-4bit__row-label--S">S</span>
          {sums.map((s, col) => (
            <BitDisplay key={col} value={s} />
          ))}
          <span className="adder-4bit__decimal">= {sumVal}</span>
        </div>

        {/* Overflow / result summary */}
        <div className="adder-4bit__summary">
          <span>
            {aVal} + {bVal} = <strong>{total}</strong>
            {overflow && (
              <span className="adder-4bit__overflow">
                {" "}
                ⚠ {t("addOverflow", lang)}: {total} &gt; 15
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function AddiererPage() {
  const { lang } = useLang();
  return (
    <div className="concept-page">
      <h2>{t("addHeading", lang)}</h2>
      <p className="subtitle">{t("addSubtitle", lang)}</p>
      <p>{t("addIntro", lang)}</p>
      <XorDemo />
      <HalfAdderDemo />
      <FullAdderDemo />
      <FourBitAdder />
    </div>
  );
}
