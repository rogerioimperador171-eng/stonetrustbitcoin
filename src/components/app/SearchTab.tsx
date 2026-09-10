import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { toast } from "sonner";
import { Pill, TokenIcon } from "./ui";
import { mainTokens, marketTokens } from "./data";

const all = [...mainTokens, ...marketTokens];

export function SearchTab() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all.slice(0, 8);
    return all.filter(
      (t) => t.name.toLowerCase().includes(term) || t.symbol.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div className="space-y-6 px-4 pb-4">
      <h1 className="pt-1 text-center text-xl font-bold">Buscar</h1>

      <div className="flex items-center gap-3 rounded-full bg-card px-4 py-2.5">
        <SearchIcon className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Token, símbolo ou contrato"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {q ? (
          <button type="button" onClick={() => setQ("")} aria-label="Limpar" className="press">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        ) : null}
      </div>

      <div className="no-scrollbar flex gap-3 overflow-x-auto">
        {["BTC", "ETH", "SOL", "PUMP", "NVDA"].map((s) => (
          <Pill key={s} onClick={() => setQ(s)}>
            {s}
          </Pill>
        ))}
      </div>

      <ul className="space-y-5">
        {results.map((t) => (
          <li key={`${t.symbol}-${t.name}`}>
            <button
              type="button"
              onClick={() => toast(`${t.name} · ${t.price} (${t.change})`)}
              className="press flex w-full items-center gap-4"
            >
              <TokenIcon symbol={t.symbol} bg={t.bg} fg={t.fg} glyph={t.glyph} size={44} />
              <span className="min-w-0 flex-1 text-left">
                <span className="block truncate font-semibold">{t.name}</span>
                <span className="block truncate text-sm text-muted-foreground">{t.symbol}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-semibold">{t.price}</span>
                <span className={`block text-sm ${t.up ? "text-up" : "text-down"}`}>
                  {t.change}
                </span>
              </span>
            </button>
          </li>
        ))}
        {results.length === 0 ? (
          <li className="py-10 text-center text-muted-foreground">Nada encontrado para “{q}”.</li>
        ) : null}
      </ul>
    </div>
  );
}
