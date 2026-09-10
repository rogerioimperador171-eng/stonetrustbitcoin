import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  onClick,
}: {
  title: string;
  onClick?: (() => void) | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="press flex items-center gap-1.5 text-left font-semibold text-foreground"
    >
      {title}
      <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

/** Circular token badge with an optional small overlay chip. */
export function TokenIcon({
  symbol,
  bg,
  fg,
  glyph,
  size = 44,
  chip,
}: {
  symbol: string;
  bg: string;
  fg?: string | undefined;
  glyph?: string | undefined;
  size?: number | undefined;
  chip?: { bg: string; glyph: string } | undefined;
}) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      <span
        className="flex h-full w-full items-center justify-center rounded-full font-bold"
        style={{
          background: bg,
          color: fg ?? "#fff",
          fontSize: size * 0.44,
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {glyph ?? symbol.slice(0, 1)}
      </span>
      {chip ? (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-md border-2 border-background"
          style={{
            width: size * 0.42,
            height: size * 0.42,
            background: chip.bg,
            fontSize: size * 0.2,
          }}
          aria-hidden="true"
        >
          {chip.glyph}
        </span>
      ) : null}
      <span className="sr-only">{symbol}</span>
    </span>
  );
}

/** Deterministic pseudo-random sparkline. */
export function Sparkline({
  seed,
  up,
  width = 120,
  height = 40,
  withDot = false,
}: {
  seed: number;
  up: boolean;
  width?: number;
  height?: number;
  withDot?: boolean;
}) {
  const points: Array<[number, number]> = [];
  let value = 0.5;
  let s = seed;
  const n = 34;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    value += (rnd - 0.5) * 0.28;
    value += up ? 0.012 : -0.012;
    value = Math.min(0.95, Math.max(0.05, value));
    points.push([(i / (n - 1)) * width, height - value * height]);
  }
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
  const last = points[points.length - 1] ?? [width, height / 2];
  const color = up ? "var(--up)" : "var(--down)";
  const gid = `spark-${seed}-${up ? "u" : "d"}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L${width},${height} L0,${height} Z`} fill={`url(#${gid})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      {withDot ? <circle cx={last[0]} cy={last[1]} r="3" fill={color} /> : null}
    </svg>
  );
}

export function Pill({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press shrink-0 rounded-full px-3.5 py-2 text-sm font-medium",
        active
          ? "bg-primary/60 text-foreground"
          : "bg-card text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className={cn(
        "rounded-2xl bg-card p-3.5 text-left",
        onClick ? "press hover:bg-elevated" : "",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
