import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StoneHeader } from "@/components/app/StoneHeader";
import { BottomNav } from "@/components/app/BottomNav";
import { HomeTab } from "@/components/app/HomeTab";
import { MarketsTab } from "@/components/app/MarketsTab";
import { PerpsTab } from "@/components/app/PerpsTab";
import { SearchTab } from "@/components/app/SearchTab";
import type { TabId } from "@/components/app/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stone Wallet — Cripto, Perps e Pix com desconto" },
      {
        name: "description",
        content:
          "Carteira cripto com mercados, perps, gerador de código de transação e Pix com desconto.",
      },
      { property: "og:title", content: "Stone Wallet — Cripto, Perps e Pix com desconto" },
      {
        property: "og:description",
        content:
          "Carteira cripto com mercados, perps, gerador de código de transação e Pix com desconto.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const [tab, setTab] = useState<TabId>("home");
  const [scrollTo, setScrollTo] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  useEffect(() => {
    if (!scrollTo) return;
    const el = document.getElementById(scrollTo);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setScrollTo(null);
  }, [scrollTo, tab]);

  const goToLabel = (label: string) => {
    if (label === "Markets") return setTab("markets");
    if (label === "Perps") return setTab("perps");
    if (label === "Gerador de código") {
      setTab("home");
      return setScrollTo("gerador");
    }
    if (label === "Pix com desconto") {
      setTab("home");
      return setScrollTo("pix");
    }
    setTab("home");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[520px] flex-col overflow-x-hidden bg-background text-foreground">
      <StoneHeader onNavigate={goToLabel} />

      <main className="flex-1 pt-4">
        {tab === "home" ? <HomeTab onGoTo={(t) => setTab(t)} /> : null}
        {tab === "markets" ? <MarketsTab /> : null}
        {tab === "perps" ? <PerpsTab /> : null}
        {tab === "search" ? <SearchTab /> : null}
      </main>

      <BottomNav tab={tab} onChange={setTab} />
    </div>
  );
}
