import { useEffect, useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const HISTORY_KEY = "stone-code-history";


function makeCode(len: number, groups: number) {
  const raw = Array.from({ length: len * groups }, () => {
    const i = Math.floor(Math.random() * ALPHABET.length);
    return ALPHABET.charAt(i);
  }).join("");
  return (raw.match(new RegExp(`.{1,${len}}`, "g")) ?? [raw]).join("-");
}

export function CodeGenerator() {
  const [code, setCode] = useState("STN-4KQ9-P2XM");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(HISTORY_KEY);
      if (saved) setHistory(JSON.parse(saved) as string[]);
    } catch {
      /* sessão indisponível */
    }
  }, []);

  const generate = () => {
    const next = `STN-${makeCode(4, 3)}`;
    setCode(next);
    setCopied(false);
    setHistory((h) => {
      const list = [next, ...h].slice(0, 8);
      try {
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(list));
      } catch {
        /* sessão indisponível */
      }
      return list;
    });
  };


  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Código copiado");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Não foi possível copiar");
    }
  };

  return (
    <section className="space-y-4 rounded-2xl border border-border bg-card/60 p-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-stone-brand">
          Gerador de código
        </p>
        <h2 className="mt-1 text-xl font-bold leading-tight">Código aleatório de transação</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gere um código único para identificar cada recebimento.
        </p>
      </div>

      <div className="rounded-xl bg-background px-4 py-5 text-center">
        <p className="break-all font-mono text-xl font-bold tracking-[0.12em] sm:text-2xl">
          {code}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
        <button
          type="button"
          onClick={generate}
          className="press flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          <RefreshCw className="h-5 w-5" /> Gerar código
        </button>
        <button
          type="button"
          onClick={copy}
          aria-label="Copiar código"
          className="press flex h-11 w-11 items-center justify-center rounded-full bg-elevated"
        >
          {copied ? <Check className="h-5 w-5 text-up" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>

      {history.length > 0 ? (
        <ul className="space-y-2 border-t border-border pt-4">
          {history.map((h) => (
            <li key={h} className="font-mono text-sm text-muted-foreground">
              {h}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
