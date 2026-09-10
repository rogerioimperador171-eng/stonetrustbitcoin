export type Token = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  up: boolean;
  bg: string;
  fg?: string;
  glyph?: string;
  chip?: { bg: string; glyph: string };
  mcap?: string;
  vol?: string;
};

export const chipBnb = { bg: "#f0b90b", glyph: "◈" };
export const chipSol = { bg: "#111827", glyph: "≡" };
export const chipEth = { bg: "#1f2937", glyph: "◆" };

export const mainTokens: Token[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$77.997,55",
    change: "-1.04%",
    up: false,
    bg: "#f7931a",
    glyph: "₿",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$2.461,00",
    change: "-1.42%",
    up: false,
    bg: "#627eea",
    glyph: "◆",
  },
  {
    symbol: "BNB",
    name: "BNB Smart Chain",
    price: "$720,90",
    change: "-4.14%",
    up: false,
    bg: "#0b0e11",
    fg: "#f0b90b",
    glyph: "◈",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: "$101,09",
    change: "-2.41%",
    up: false,
    bg: "#0b0e11",
    fg: "#14f195",
    glyph: "≡",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    price: "$1,00",
    change: "+0.01%",
    up: true,
    bg: "#26a17b",
    glyph: "₮",
  },
];

export const perps = [
  { symbol: "BTC", lev: "40x", vol: "$3.1B Vol", bg: "#f7931a", glyph: "₿", price: "$77,947", change: "-1.08%", up: false },
  { symbol: "ETH", lev: "25x", vol: "$1.31B Vol", bg: "#627eea", glyph: "◆", price: "$2,459.7", change: "-1.47%", up: false },
  { symbol: "ZEC", lev: "10x", vol: "$534.55M Vol", bg: "#f4b728", fg: "#111", glyph: "ⓩ", price: "$1,218.6", change: "+2.82%", up: true },
  { symbol: "BTC", lev: "200x", vol: "$10K Vol", bg: "#f7931a", glyph: "₿", price: "$78,100", change: "-0.83%", up: false },
  { symbol: "ETH", lev: "200x", vol: "$213K Vol", bg: "#627eea", glyph: "◆", price: "$2,466.6", change: "-1.15%", up: false },
];

export const marketTokens: Token[] = [
  { symbol: "QQQB", name: "QQQB", price: "$717.75", change: "-0.68%", up: false, bg: "#1d4ed8", glyph: "Q", chip: chipBnb, mcap: "$48.83M MCap", vol: "$917.64M Vol" },
  { symbol: "KII", name: "KII", price: "$0.0823", change: "+14.96%", up: true, bg: "#6d28d9", glyph: "K", chip: chipBnb, mcap: "$21.19M MCap", vol: "$157.25M Vol" },
  { symbol: "BNC4", name: "BNC4", price: "$6.14", change: "+1.82%", up: true, bg: "#65a30d", glyph: "B", chip: chipBnb, mcap: "$6.04M MCap", vol: "$139.20M Vol" },
  { symbol: "STONK", name: "STONK", price: "$0.1869", change: "-3.21%", up: false, bg: "#334155", glyph: "S", chip: chipBnb, mcap: "$12.40M MCap", vol: "$110.02M Vol" },
  { symbol: "PONS", name: "PONS", price: "$0.6270", change: "-17.97%", up: false, bg: "#f8fafc", fg: "#0f172a", glyph: "P", chip: { bg: "#c6f24e", glyph: "✎" }, mcap: "$626.96M MCap", vol: "$100.13M Vol" },
  { symbol: "PUMP", name: "PUMP", price: "$0.004079", change: "-8.48%", up: false, bg: "#0f172a", fg: "#34d399", glyph: "◐", chip: chipSol, mcap: "$3.41B MCap", vol: "$79.32M Vol" },
  { symbol: "4Stock", name: "4Stock", price: "$0.0291", change: "-45.28%", up: false, bg: "#14532d", fg: "#a3e635", glyph: "4", chip: chipBnb, mcap: "$29.06M MCap", vol: "$69.45M Vol" },
  { symbol: "牛来", name: "牛来", price: "$0.0798", change: "-19.27%", up: false, bg: "#d6c39a", fg: "#3f3f46", glyph: "牛", chip: chipBnb, mcap: "$79.76M MCap", vol: "$67.46M Vol" },
  { symbol: "VVV", name: "VVV", price: "$23.05", change: "-7.18%", up: false, bg: "#f8fafc", fg: "#1d4ed8", glyph: "V", chip: { bg: "#2563eb", glyph: "■" }, mcap: "$2.65B MCap", vol: "$58.01M Vol" },
  { symbol: "NVDA", name: "NVDA", price: "$222.99", change: "-1.41%", up: false, bg: "#c6f24e", fg: "#111", glyph: "N", chip: { bg: "#c6f24e", glyph: "✎" }, mcap: "$19.04M MCap", vol: "$49.06M Vol" },
  { symbol: "USELESS", name: "USELESS", price: "$0.2197", change: "-24.93%", up: false, bg: "#f5b942", fg: "#7c2d12", glyph: "U", chip: chipSol, mcap: "$219.46M MCap", vol: "$48.20M Vol" },
];

export const topTraded = [
  { name: "Ethereum", price: "$2,462.56", change: "-1.33%", up: false, bg: "#627eea", glyph: "◆" },
  { name: "BNB Smart...", price: "$721.12", change: "-4.11%", up: false, bg: "#0b0e11", fg: "#f0b90b", glyph: "◈" },
  { name: "Solana", price: "$101.09", change: "-2.41%", up: false, bg: "#0b0e11", fg: "#14f195", glyph: "≡" },
];

export const marketFilters = ["Hot tokens", "bStocks", "Ondo", "Stock Meme", "Pre-IPO", "AI", "DeFi"];
