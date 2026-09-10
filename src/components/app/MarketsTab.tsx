import { useMemo, useState } from "react";
import { ArrowDown, ChevronDown, Rocket, Search, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Card, Pill, Sparkline, TokenIcon } from "./ui";
import { marketFilters, marketTokens, topTraded } from "./data";

export function MarketsTab() {
  const [filter, setFilter] = useState("Hot tokens");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [asc, setAsc] = useState(false);
  const [range, setRange] = useState("24h");

  const list = useMemo(() => {
    const base = onlyFavs ? marketTokens.filter((t) => favorites.includes(t.symbol)) : marketTokens;
    return asc ? [...base].reverse() : base;
  }, [onlyFavs, favorites, asc]);

  return (
    <div className="space-y-6 px-4 pb-4">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pt-1">
        <h1 className="truncate text-center text-xl font-bold">Markets</h1>
        <button
          type="button"
          onClick={() => toast("Busque por nome, símbolo ou contrato")}
          className="press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-label="Buscar"
        >
          <Search className="h-6 w-6" />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card onClick={() => toast.info("Predictions")} className="flex items-center gap-3 py-4">
          <TrendingUp className="h-6 w-6" />
          <span className="font-semibold">Predictions</span>
        </Card>
        <Card onClick={() => toast.info("Meme Rush")} className="flex items-center gap-3 py-4">
          <Rocket className="h-6 w-6" />
          <span className="font-semibold">Meme Rush</span>
        </Card>
      </div>

      <h2 className="text-lg font-semibold">Mais negociados (24h)</h2>
      <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4">
        {topTraded.map((t, i) => (
          <Card
            key={t.name}
            onClick={() => toast(`${t.name} · ${t.price}`)}
            className="w-[62%] shrink-0 snap-start space-y-3 sm:w-[220px]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[15px] text-muted-foreground">{t.name}</span>
              <TokenIcon symbol={t.name} bg={t.bg} fg={t.fg} glyph={t.glyph} size={30} />
            </div>
            <p className="text-xl font-bold">{t.price}</p>
            <p className={t.up ? "text-up" : "text-down"}>{t.change}</p>
            <Sparkline seed={31 + i * 7} up={t.up} width={200} height={60} />
          </Card>
        ))}
      </div>

      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4">
        <button
          type="button"
          onClick={() => setOnlyFavs((v) => !v)}
          className={`press flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            onlyFavs ? "bg-primary/60" : "bg-card"
          }`}
          aria-label="Favoritos"
        >
          <Star className="h-5 w-5" fill={onlyFavs ? "currentColor" : "none"} />
        </button>
        {marketFilters.map((f) => (
          <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Pill>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <Pill onClick={() => toast("Filtrar por rede")} className="flex items-center gap-1">
          Rede <ChevronDown className="inline h-4 w-4" />
        </Pill>
        <div className="flex gap-3">
          <Pill onClick={() => setAsc((v) => !v)} className="flex items-center gap-1">
            Volume <ArrowDown className={`inline h-4 w-4 ${asc ? "rotate-180" : ""}`} />
          </Pill>
          <Pill
            onClick={() => setRange((r) => (r === "24h" ? "7d" : r === "7d" ? "30d" : "24h"))}
            className="flex items-center gap-1"
          >
            {range} <ChevronDown className="inline h-4 w-4" />
          </Pill>
        </div>
      </div>

      <ul className="space-y-6">
        {list.map((t, i) => (
          <li key={t.symbol} className="flex items-center gap-4">
            <button
              type="button"
              aria-label={`Favoritar ${t.symbol}`}
              onClick={() =>
                setFavorites((f) =>
                  f.includes(t.symbol) ? f.filter((x) => x !== t.symbol) : [...f, t.symbol],
                )
              }
              className="press shrink-0"
            >
              <TokenIcon
                symbol={t.symbol}
                bg={t.bg}
                fg={t.fg}
                glyph={t.glyph}
                size={48}
                chip={t.chip}
              />
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">
                {t.name}
                {favorites.includes(t.symbol) ? " ★" : ""}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {t.mcap} · {t.vol}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end">
              <span className="font-semibold">{t.price}</span>
              <span className="flex items-center gap-2">
                <Sparkline seed={11 + i * 13} up={t.up} width={80} height={26} />
                <span className={`text-sm ${t.up ? "text-up" : "text-down"}`}>{t.change}</span>
              </span>
            </div>
          </li>
        ))}
        {list.length === 0 ? (
          <li className="py-10 text-center text-muted-foreground">Nenhum favorito ainda.</li>
        ) : null}
      </ul>

      <button
        type="button"
        onClick={() => toast.success("Swap aberto — escolha os tokens")}
        className="press sticky bottom-20 z-10 w-full rounded-full bg-primary py-3 text-base font-semibold text-primary-foreground"
      >
        Swap
      </button>
    </div>
  );
}
