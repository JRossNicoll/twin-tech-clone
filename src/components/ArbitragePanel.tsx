import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useSolPrice } from "@/hooks/useSolanaData";
import { RefreshCw } from "lucide-react";

const baseDexes = [
  { name: "Jupiter", spread: 0 },
  { name: "Raydium", spread: -0.0078 },
  { name: "Orca", spread: -0.0041 },
  { name: "Meteora", spread: -0.0043 },
  { name: "Phoenix", spread: -0.0269 },
  { name: "Fluxbeam", spread: -4.176 },
  { name: "Saros", spread: -0.955 },
  { name: "Stabble", spread: -0.392 },
  { name: "Aldrin", spread: -1.364 },
  { name: "SolFi", spread: -0.0012 },
  { name: "GoonFi", spread: -0.0015 },
];

const dotColors = [
  "bg-primary",
  "bg-violet-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-rose-400",
  "bg-teal-400",
  "bg-fuchsia-400",
  "bg-lime-400",
  "bg-cyan-400",
  "bg-indigo-400",
];

const ArbitragePanel = () => {
  const { data: solPriceData } = useSolPrice();
  const solPrice = solPriceData?.price ?? 178.65;
  const [refreshing, setRefreshing] = useState(false);

  const dexes = baseDexes.map((d, i) => ({
    ...d,
    price: (solPrice + d.spread).toFixed(4),
    impact: (Math.abs(d.spread / solPrice) * 100).toFixed(2) + "%",
    best: d.spread === 0,
    color: dotColors[i % dotColors.length],
  }));

  const bestPrice = solPrice;
  const worstPrice = solPrice + baseDexes.reduce((min, d) => Math.min(min, d.spread), 0);
  const grossProfit = bestPrice - worstPrice;
  const platformFee = grossProfit * 0.05;
  const netProfit = grossProfit - platformFee;
  const spreadBps = ((grossProfit / bestPrice) * 10000).toFixed(0);
  const spreadPct = ((grossProfit / bestPrice) * 100).toFixed(4);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Arbitrage <span className="text-primary">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Real-time price comparison across Jupiter, Raydium, Orca & Meteora
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-4"
        >
          {/* Main price grid card */}
          <div className="bg-card border border-border/30 rounded-xl p-5 md:p-6 animated-border">
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">SOL → USDC (1 SOL)</span>
                <button
                  onClick={handleRefresh}
                  className="text-muted-foreground hover:text-primary transition-colors ml-1"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>
              <Badge className="bg-primary/15 text-primary border-primary/25 text-[10px] font-mono px-3 py-1 rounded-full">
                Spread: {spreadBps} BPS ({spreadPct}%)
              </Badge>
            </div>

            {/* DEX price grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {dexes.map((dex, i) => (
                <div
                  key={dex.name}
                  className={`relative bg-secondary/30 border rounded-lg p-3.5 transition-all duration-200 hover:bg-secondary/50 ${
                    dex.best
                      ? "border-primary/30 bg-primary/[0.04]"
                      : "border-border/20"
                  }`}
                >
                  {dex.best && (
                    <Badge className="absolute -top-2.5 right-3 bg-primary text-primary-foreground text-[8px] font-bold px-2 py-0.5 rounded-md">
                      BEST
                    </Badge>
                  )}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className={`h-2 w-2 rounded-full ${dex.color}`} />
                    <span className="text-xs font-medium text-muted-foreground">{dex.name}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold font-mono tracking-tight">{dex.price}</span>
                    <span className="text-[10px] text-muted-foreground/60 font-medium">USDC</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground/40 font-mono mt-0.5">
                    Impact: {dex.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arbitrage Breakdown */}
          <div className="bg-card border border-border/30 rounded-xl p-5 md:p-6 animated-border">
            <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-4">
              Arbitrage Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Strategy", value: "Buy Jupiter → Sell Fluxbeam", mono: false },
                { label: "Gross Profit", value: `${grossProfit.toFixed(4)} USDC`, mono: true },
                { label: "Platform Fee (5%)", value: `-${platformFee.toFixed(4)} USDC`, mono: true, destructive: true },
                { label: "Net Profit", value: `${netProfit.toFixed(4)} USDC`, mono: true, highlight: true },
              ].map((row) => (
                <div key={row.label}>
                  <div className="text-[10px] text-muted-foreground/60 mb-1">{row.label}</div>
                  <div
                    className={`text-sm font-semibold ${
                      row.mono !== false ? "font-mono" : ""
                    } ${
                      row.highlight
                        ? "text-primary"
                        : row.destructive
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Code Block */}
          <div className="bg-card border border-border/30 rounded-xl p-5 md:p-6 animated-border">
            <h3 className="text-[10px] uppercase tracking-[0.15em] font-bold text-primary mb-4">
              Available via API
            </h3>
            <pre className="bg-secondary/20 border border-border/10 rounded-lg p-4 text-[11px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">
{`POST /api/arbitrage/quote
{
  "inputMint": "So11...112",
  "outputMint": "EPjFW...Dt1v",
  "amount": "1000000000",
  "agentId": "your-agent-id"
}

// Response includes arbOpportunity with:
// grossProfit, platformFee (5%), netProfit`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArbitragePanel;