import { useState } from "react";
import { Menu, X } from "lucide-react";

function StoneWordmark() {
  return (
    <span className="flex items-baseline text-3xl font-bold lowercase leading-none tracking-tight text-stone-brand">
      st
      <svg viewBox="0 0 32 32" className="mx-[1px] h-[0.72em] w-[0.72em] self-center" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="currentColor" />
        <path d="M16 4 A12 12 0 0 1 16 28 Z" fill="var(--background)" opacity="0.9" />
        <circle cx="16" cy="16" r="5.5" fill="currentColor" />
      </svg>
      ne<span className="sr-only">stone</span>
    </span>
  );
}

const LINKS = ["Início", "Markets", "Perps", "Gerador de código", "Pix com desconto"];

export function StoneHeader({ onNavigate }: { onNavigate: (label: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <div className="rounded-2xl border border-border bg-background/90 px-4 py-3 backdrop-blur-xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <StoneWordmark />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </div>

        {open ? (
          <nav className="mt-4 space-y-1 border-t border-border pt-3">
            {LINKS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  onNavigate(l);
                  setOpen(false);
                }}
                className="press block w-full rounded-xl px-2 py-2.5 text-left text-sm font-medium hover:bg-card"
              >
                {l}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
