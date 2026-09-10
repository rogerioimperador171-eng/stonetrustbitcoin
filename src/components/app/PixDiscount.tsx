import { useMemo, useState } from "react";
import { BadgeCheck, ChevronDown, ChevronUp } from "lucide-react";
import comprovante from "@/assets/comprovante.jpeg.asset.json";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function PixDiscount() {
  const [valor, setValor] = useState(2579.2);
  const [desconto, setDesconto] = useState(10);
  const [aberto, setAberto] = useState(true);
  const [erro, setErro] = useState(false);


  const final = useMemo(() => valor * (1 - desconto / 100), [valor, desconto]);
  const economia = valor - final;

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-stone-brand">
          Pix recebido
        </p>
        <h2 className="mt-1 text-xl font-bold leading-tight">Desconto aplicado no pagamento</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Simule o desconto e confira o comprovante do valor efetivamente pago.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Valor original (R$)</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 font-semibold outline-none focus:border-primary"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Desconto: {desconto}%</span>
          <input
            type="range"
            min={0}
            max={50}
            value={desconto}
            onChange={(e) => setDesconto(Number(e.target.value))}
            className="mt-5 w-full accent-[var(--primary)]"
          />
        </label>
      </div>

      <dl className="space-y-3 rounded-2xl bg-background p-4">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Valor original</dt>
          <dd className="font-semibold line-through decoration-down/70">{brl(valor)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">Economia ({desconto}%)</dt>
          <dd className="font-semibold text-up">- {brl(economia)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <dt className="font-semibold">Valor pago via Pix</dt>
          <dd className="text-lg font-bold text-stone-brand">{brl(final)}</dd>
        </div>
      </dl>

      <div className="flex items-start gap-3 rounded-2xl bg-up/10 p-4">
        <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-up" />
        <p className="text-sm leading-relaxed">
          Pagamento confirmado de <strong>Elyse Martins de Biase</strong> para{" "}
          <strong>Pedro Henrique Levoni Vicenti</strong> — instituição destino STONE IP S.A.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
          className="press flex w-full items-center justify-center gap-2 rounded-full bg-elevated py-2.5 text-sm font-medium"
      >
        {aberto ? "Ocultar comprovante" : "Ver comprovante"}
        {aberto ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {aberto ? (
        erro ? (
          <p className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            A imagem do comprovante não veio junto com o código importado. Envie o arquivo
            novamente para exibi-la aqui.
          </p>
        ) : (
          <figure className="overflow-hidden rounded-xl bg-card">
            <img
              src={comprovante.url}
              alt="Comprovante de pagamento Pix no valor de R$ 2.321,28 emitido pelo Nubank"
              loading="lazy"
              onError={() => setErro(true)}
              className="mx-auto block h-auto w-full max-w-[420px]"
            />
          </figure>
        )

      ) : null}
    </section>
  );
}
