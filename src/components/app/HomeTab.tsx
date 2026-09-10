import { ChevronRight, QrCode, Apple, Sparkles, SlidersHorizontal, Info, Infinity as InfinityIcon } from "lucide-react";
import { toast } from "sonner";
import { Card, SectionHeader, Sparkline, TokenIcon } from "./ui";
import { mainTokens, perps } from "./data";
import { CodeGenerator } from "./CodeGenerator";
import { PixDiscount } from "./PixDiscount";


function ActionTile({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        className="press flex aspect-square w-full items-center justify-center rounded-2xl bg-card hover:bg-elevated"
        aria-label={label}
      >
        {children}
      </button>
      <span className="text-center text-sm font-semibold leading-tight">{label}</span>
    </div>
  );
}

export function HomeTab({ onGoTo }: { onGoTo: (tab: "markets" | "perps" | "search") => void }) {
  return (
    <div className="space-y-8 px-4 pb-4 pt-2">
      {/* promo */}
      <button
        type="button"
        onClick={() => toast.success("0% de taxa aplicada aos swaps de stablecoins")}
        className="press flex w-full items-center gap-3 rounded-2xl border border-border px-4 py-3 text-left"
      >
        <Info className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-up/15 text-up">
          $
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold">
            0% swap fees on selected stables
          </span>
          <span className="block truncate text-sm text-muted-foreground">
            Applicable to same-chain swaps only
          </span>
        </span>
      </button>

      <h1 className="text-3xl font-bold leading-tight tracking-tight">
        Comece adicionando algumas criptomoedas
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <ActionTile label="Receber cripto" onClick={() => toast.success("Endereço de recebimento copiado")}>
          <QrCode className="h-9 w-9" />
        </ActionTile>
        <ActionTile label="Depositar da Binance" onClick={() => toast.info("Conectando à Binance…")}>
          <span className="text-3xl text-warning">◈</span>
        </ActionTile>
        <ActionTile label="Comprar com Apple Pay" onClick={() => toast.info("Abrindo Apple Pay…")}>
          <span className="flex items-center gap-0.5 text-xl font-semibold">
            <Apple className="h-5 w-5 fill-current" />
            Pay
          </span>
        </ActionTile>
      </div>

      <div id="gerador" className="scroll-mt-28">
        <CodeGenerator />
      </div>

      <div id="pix" className="scroll-mt-28">
        <PixDiscount />
      </div>

      {/* tokens */}

      <section className="space-y-5">
        <SectionHeader title="Explorar tokens" onClick={() => onGoTo("markets")} />
        {mainTokens.slice(0, 3).map((t) => (
          <button
            key={t.symbol}
            type="button"
            onClick={() => toast(`${t.name} · ${t.price}`)}
            className="press flex w-full items-center gap-4"
          >
            <TokenIcon symbol={t.symbol} bg={t.bg} fg={t.fg} glyph={t.glyph} />
            <span className="min-w-0 flex-1 truncate text-left text-lg font-semibold">{t.name}</span>
            <span className="text-right">
              <span className="block text-lg font-semibold">{t.price}</span>
              <span className={`block text-sm ${t.up ? "text-up" : "text-down"}`}>{t.change}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => onGoTo("markets")}
          className="press flex items-center gap-2 rounded-full bg-card px-5 py-3 text-[15px] font-medium"
        >
          Ver todos <ChevronRight className="h-4 w-4" />
        </button>
      </section>

      {/* perps carousel */}
      <section className="space-y-4">
        <SectionHeader title="Perps" onClick={() => onGoTo("perps")} />
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4">
          {perps.map((p, i) => (
            <Card
              key={`${p.symbol}-${p.lev}`}
              onClick={() => onGoTo("perps")}
              className="w-[62%] shrink-0 snap-start space-y-4 sm:w-[220px]"
            >
              <TokenIcon
                symbol={p.symbol}
                bg={p.bg}
                fg={p.fg}
                glyph={p.glyph}
                size={52}
                chip={{ bg: "#0f2f26", glyph: i > 2 ? "◍" : "∞" }}
              />
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{p.symbol}</span>
                <span className="rounded-md bg-elevated px-2 py-0.5 text-sm text-muted-foreground">
                  {p.lev}
                </span>
              </div>
              <p className="text-[15px] text-muted-foreground">{p.vol}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* predictions */}
      <section className="space-y-4">
        <SectionHeader title="Predictions" onClick={() => toast.info("Mercados de previsão em breve")} />
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4">
          <Card
            onClick={() => toast("Strait of Hormuz — Dec 30")}
            className="w-[78%] shrink-0 snap-start space-y-5 sm:w-[300px]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1e6f5c,#c2b280)]">
                <span className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs">
                  ∞
                </span>
              </span>
              <span className="flex items-center gap-2 text-[15px] text-muted-foreground">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background">
                  ⚡
                </span>
                Dec 30
              </span>
            </div>
            <p className="text-[17px] font-semibold leading-snug">
              Strait of Hormuz traffic returns to normal by December 31?
            </p>
          </Card>
          <Card
            onClick={() => toast("Previsões: cripto, política, esportes")}
            className="w-[78%] shrink-0 snap-start space-y-6 sm:w-[300px]"
          >
            <span className="block text-4xl">🔮</span>
            <p className="text-[17px] font-semibold leading-snug">
              Ganhe com resultados: cripto, política, esportes e muito mais...
            </p>
          </Card>
        </div>
      </section>

      {/* earn */}
      <section className="space-y-4">
        <SectionHeader title="Earn" onClick={() => toast.info("Staking disponível em breve")} />
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4">
          {[
            { apy: "22.67% APY", on: "on JUNO", bg: "#3b0d17", fg: "#f87171", glyph: "✳" },
            { apy: "15.34% APY", on: "on KSM", bg: "#000000", fg: "#ffffff", glyph: "🐦" },
            { apy: "15.00% APY", on: "on LUNC", bg: "#0b2545", fg: "#facc15", glyph: "🌙" },
          ].map((e) => (
            <Card
              key={e.on}
              onClick={() => toast.success(`Staking ${e.on.replace("on ", "")} — ${e.apy}`)}
              className="w-[62%] shrink-0 snap-start space-y-5 sm:w-[220px]"
            >
              <TokenIcon symbol={e.on} bg={e.bg} fg={e.fg} glyph={e.glyph} size={52} />
              <p className="text-2xl font-bold">{e.apy}</p>
              <p className="text-[15px] text-muted-foreground">{e.on}</p>
            </Card>
          ))}
          <Card
            onClick={() => toast.success("Rendimento diário, saque livre")}
            className="w-[78%] shrink-0 snap-start space-y-5 sm:w-[260px]"
          >
            <span className="block text-4xl">🧊</span>
            <p className="text-[17px] font-semibold leading-snug">
              Ganhe com segura... Saque a qualquer momento.
            </p>
          </Card>
        </div>
      </section>

      {/* AI row */}
      <button
        type="button"
        onClick={() => toast("IA da Stone: pergunte qualquer coisa sobre cripto")}
        className="press flex w-full items-center gap-3 rounded-2xl bg-card p-4"
      >
        <Sparkles className="h-6 w-6 shrink-0" />
        <span className="min-w-0 flex-1 truncate text-left text-[17px] font-semibold">
          IA da Stone Wallet
        </span>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-elevated px-4 py-2.5 text-[15px] text-muted-foreground">
          Pergunte... <ChevronRight className="h-4 w-4" />
        </span>
      </button>

      <SectionHeader title="Lista de acompanhamento" onClick={() => onGoTo("markets")} />

      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={() => toast.success("Painel personalizado salvo")}
          className="press flex items-center gap-2 rounded-full bg-card px-6 py-3.5 text-[17px] font-medium"
        >
          <SlidersHorizontal className="h-5 w-5" /> Personalizar
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-sm text-muted-foreground">
        <InfinityIcon className="h-4 w-4" /> Stone Wallet · v3.1.0
      </div>

      <div className="sr-only">
        <Sparkline seed={1} up />
      </div>
    </div>
  );
}
