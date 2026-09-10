import { Home, Infinity as InfinityIcon, Search, TrendingUp } from "lucide-react";
import type { TabId } from "./types";

const TABS: Array<{ id: TabId; label: string; Icon: typeof Home }> = [
  { id: "home", label: "Início", Icon: Home },
  { id: "markets", label: "Markets", Icon: TrendingUp },
  { id: "perps", label: "Perps", Icon: InfinityIcon },
];

export function BottomNav({
  tab,
  onChange,
}: {
  tab: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <nav className="pointer-events-none sticky bottom-0 z-30 flex justify-center gap-2 px-3 pb-3 pt-2">
      <div className="pointer-events-auto flex flex-1 items-center justify-around rounded-full border border-border bg-background/85 px-2 py-2 backdrop-blur-xl">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-label={label}
            aria-current={tab === id ? "page" : undefined}
            className={`press flex h-10 flex-1 items-center justify-center rounded-full ${
              tab === id ? "bg-accent" : ""
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange("search")}
        aria-label="Buscar"
        className={`press pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border backdrop-blur-xl ${
          tab === "search" ? "bg-accent" : "bg-background/85"
        }`}

      >
        <Search className="h-5 w-5" />
      </button>
    </nav>
  );
}
