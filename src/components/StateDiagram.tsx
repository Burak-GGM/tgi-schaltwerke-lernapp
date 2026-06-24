import { useMemo } from "react";
import type { ExerciseConfig } from "../engine/types";

interface Props {
  config: ExerciseConfig;
  currentStateId: string;
}

interface Pos {
  x: number;
  y: number;
}

const NODE_R = 34;

function polar(cx: number, cy: number, r: number, angleDeg: number): Pos {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

export function StateDiagram({ config, currentStateId }: Props) {
  const order = config.nodeOrder ?? config.states.map((s) => s.id);
  const n = order.length;

  const { positions, width, height } = useMemo(() => {
    if (config.layout === "circular") {
      const cx = 230;
      const cy = 210;
      const r = n <= 4 ? 130 : 165;
      const positions: Record<string, Pos> = {};
      order.forEach((id, i) => {
        positions[id] = polar(cx, cy, r, -90 + (360 * i) / n);
      });
      return { positions, width: 460, height: 420 };
    }
    // linear
    const positions: Record<string, Pos> = {};
    const stepX = 150;
    order.forEach((id, i) => {
      positions[id] = { x: 90 + i * stepX, y: 190 };
    });
    return { positions, width: 90 * 2 + (n - 1) * stepX, height: 320 };
  }, [config.layout, order, n]);

  // group transitions by (from,to) so multiple inputs leading to the same
  // target render as a single labeled edge, e.g. "A / B / C"
  const edgeGroups = useMemo(() => {
    const map = new Map<string, { from: string; to: string; labels: string[] }>();
    for (const t of config.transitions) {
      const key = `${t.from}->${t.to}`;
      const label = t.label ?? t.inputId;
      const existing = map.get(key);
      if (existing) {
        if (!existing.labels.includes(label)) existing.labels.push(label);
      } else {
        map.set(key, { from: t.from, to: t.to, labels: [label] });
      }
    }
    return [...map.values()];
  }, [config.transitions]);

  return (
    <svg
      className="state-diagram"
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label="Zustandsdiagramm"
    >
      <defs>
        <marker id="arrowhead" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--accent)" />
        </marker>
      </defs>
      {edgeGroups.map((edge, idx) => (
        <Edge
          key={idx}
          from={positions[edge.from]}
          to={positions[edge.to]}
          label={edge.labels.join(" / ")}
          isSelfLoop={edge.from === edge.to}
          skip={
            config.layout === "linear" &&
            Math.abs(order.indexOf(edge.to) - order.indexOf(edge.from)) > 1
          }
        />
      ))}
      {order.map((id) => {
        const state = config.states.find((s) => s.id === id)!;
        const pos = positions[id];
        const active = id === currentStateId;
        return (
          <g key={id} transform={`translate(${pos.x},${pos.y})`}>
            <circle
              r={NODE_R}
              className={active ? "state-node state-node--active" : "state-node"}
            />
            <text className="state-node__label" y={-4} textAnchor="middle">
              {state.label}
            </text>
            {state.code && (
              <text className="state-node__code" y={14} textAnchor="middle">
                {state.code}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Edge({
  from,
  to,
  label,
  isSelfLoop,
  skip,
}: {
  from: Pos;
  to: Pos;
  label: string;
  isSelfLoop: boolean;
  skip: boolean;
}) {
  if (isSelfLoop) {
    const loopX = from.x;
    const loopY = from.y - NODE_R;
    const d = `M ${loopX - 14} ${loopY} C ${loopX - 38} ${loopY - 46}, ${loopX + 38} ${loopY - 46}, ${loopX + 14} ${loopY}`;
    return (
      <g>
        <path d={d} className="state-edge" markerEnd="url(#arrowhead)" />
        <text x={loopX} y={loopY - 40} textAnchor="middle" className="state-edge__label">
          {label}
        </text>
      </g>
    );
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const sx = from.x + ux * NODE_R;
  const sy = from.y + uy * NODE_R;
  const ex = to.x - ux * NODE_R;
  const ey = to.y - uy * NODE_R;

  if (skip) {
    const mx = (sx + ex) / 2;
    const my = Math.min(sy, ey) - 70;
    const d = `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
    return (
      <g>
        <path d={d} className="state-edge" markerEnd="url(#arrowhead)" fill="none" />
        <text x={mx} y={my + 14} textAnchor="middle" className="state-edge__label">
          {label}
        </text>
      </g>
    );
  }

  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} className="state-edge" markerEnd="url(#arrowhead)" />
      <text x={mx} y={my - 10} textAnchor="middle" className="state-edge__label">
        {label}
      </text>
    </g>
  );
}
