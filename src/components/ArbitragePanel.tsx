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

const ArbitragePanel = () => {
  const { data: solPriceData } = useSolPrice();
  const solPrice = solPriceData?.price ?? 178.65;
  const [refreshing, setRefreshing] = useState(false);

  const dexes = baseDexes.map((d) => ({
    ...d,
    price: (solPrice + d.spread).toFixed(4),
    impact: Math.abs(d.spread / solPrice * 100).toFixed(2) + "%",
    best: d.spread === 0,
  }));

  const bestPrice = solPrice;
  const worstPrice = solPrice + baseDexes.reduce((min, d) => Math.min(min, d.spread), 0);
  const grossProfit = bestPrice - worstPrice;
  const platformFee = grossProfit * 0.05;
  const netProfit = grossProfit - platformFee;
  const spreadBps = ((grossProfit / bestPrice) * 10000).toFixed(0);

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
            Live price comparison across 11 Solana DEXes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {/* Price comparison table */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border"
          >
            <div className="px-4 py-2.5 border-b border-border/20 flex items-center justify-between">
              <span className="font-semibold text-xs">SOL → USDC (1 SOL)</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-mono">Spread: {spreadBps} BPS</span>
                <button onClick={handleRefresh} className="text-muted-foreground hover:text-primary transition-colors">
                  <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>
            <div className="divide-y divide-border/10">
              {dexes.map((dex) => (
                <div key={dex.name} className="flex items-center justify-between px-4 py-1.5 hover:bg-secondary/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    {dex.best && (
                      <Badge className="bg-primary/15 text-primary border-primary/20 text-[8px] px-1 py-0 rounded">
                        BEST
                      </Badge>
                    )}
                    <span className="text-[11px] font-medium">{dex.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="font-mono text-foreground">{dex.price} USDC</span>
                    <span className="text-muted-foreground/60 text-[10px] font-mono">{dex.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Breakdown + code */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
             <div className="bg-card border border-border/30 rounded-lg p-4 animated-border">
              <h3 className="font-semibold text-xs mb-3">Arbitrage Breakdown</h3>
              <div className="space-y-2">
                {[
                  { label: "Strategy", value: "Buy Jupiter → Sell Fluxbeam" },
                  { label: "Gross Profit", value: `${grossProfit.toFixed(4)} USDC` },
                  { label: "Platform Fee (5%)", value: `-${platformFee.toFixed(4)} USDC`, dim: true },
                  { label: "Net Profit", value: `${netProfit.toFixed(4)} USDC`, highlight: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-mono ${row.highlight ? "text-primary font-semibold" : row.dim ? "text-destructive" : "text-foreground"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border/30 rounded-lg p-4 animated-border">
              <h3 className="font-semibold text-xs mb-2">API Example</h3>
              <pre className="bg-secondary/20 rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">
{`POST /api/arbitrage/quote
{
  "inputMint": "So11...112",
  "outputMint": "EPjFW...Dt1v",
  "amount": "1000000000"
}

// → netProfit: ${netProfit.toFixed(4)} USDC`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArbitragePanel;
