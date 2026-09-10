import { useState } from "react";
import { History, Search, Settings } from "lucide-react";
import { toast } from "sonner";
import { SectionHeader, Sparkline, TokenIcon } from "./ui";
import { perps } from "./data";

export function PerpsTab() {
  const [selected, setSelected] = useState("BTC-40x");

  return (
    <div className="space-y-8 px-4 pb-4">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 pt-1">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => toast("Histórico de posições vazio")}
            aria-label="Histórico"
            className="press flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <History className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => toast("Preferências de trading")}
            aria-label="Configurações"
            className="press flex h-11 w-11 items-center justify-center rounded-full border border-border"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
        <h1 className="truncate text-center text-xl font-bold">Perps</h1>
        <button
          type="button"
          onClick={() => toast("Buscar par de futuros")}
          aria-label="Buscar"
          className="press flex h-11 w-11 items-center justify-center rounded-full border border-border"
        >
          <Search className="h-6 w-6" />
        </button>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="text-2xl font-bold leading-tight">
          Faça um depósito para financiar sua primeira posição
        </h2>
        <span
          className="shrink-0 bg-[linear-gradient(90deg,#3b82f6,#22d3ee,#f472b6)] bg-clip-text text-5xl font-bold text-transparent"
          aria-hidden="true"
        >
          ∞
        </span>
      </div>

      <button
        type="button"
        onClick={() => toast.success("Depósito iniciado — escolha o método")}
        className="press w-full rounded-full bg-primary py-3 text-base font-semibold text-primary-foreground"
      >
        Depósito
      </button>

      <section className="space-y-6">
        <SectionHeader title="Popular" onClick={() => toast("Todos os mercados de futuros")} />
        {perps.map((p, i) => {
          const id = `${p.symbol}-${p.lev}`;
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                setSelected(id);
                toast(`${p.symbol} ${p.lev} selecionado`);
              }}
              className={`press flex w-full items-center gap-3 rounded-2xl p-2 ${
                selected === id ? "bg-card" : ""
              }`}
            >
              <TokenIcon
                symbol={p.symbol}
                bg={p.bg}
                fg={p.fg}
                glyph={p.glyph}
                size={48}
                chip={{ bg: "#0f2f26", glyph: i > 2 ? "◍" : "∞" }}
              />
              <span className="min-w-0 flex-1 text-left">
                <span className="flex items-center gap-2">
                  <span className="font-bold">{p.symbol}</span>
                  <span className="rounded-md bg-elevated px-2 py-0.5 text-xs text-muted-foreground">
                    {p.lev}
                  </span>
                </span>
                <span className="block truncate text-sm text-muted-foreground">{p.vol}</span>
              </span>
              <Sparkline seed={53 + i * 17} up={p.up} width={90} height={34} withDot />
              <span className="shrink-0 text-right">
                <span className="block font-semibold">{p.price}</span>
                <span className={`block text-sm ${p.up ? "text-up" : "text-down"}`}>
                  {p.change}
                </span>
              </span>
            </button>
          );
        })}
      </section>

      <div className="sticky bottom-20 z-10 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => toast.success(`Long em ${selected}`)}
          className="press rounded-full bg-up py-3 text-base font-semibold text-background"
        >
          Long ↗
        </button>
        <button
          type="button"
          onClick={() => toast.error(`Short em ${selected}`)}
          className="press rounded-full bg-down py-3 text-base font-semibold text-background"
        >
          Short ↘
        </button>
      </div>
    </div>
  );
}
