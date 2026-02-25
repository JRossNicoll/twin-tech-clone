import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const dexes = [
  { name: "Jupiter", price: "78.6542", impact: "0.00%", best: true },
  { name: "Raydium", price: "78.6464", impact: "0.00%" },
  { name: "Orca", price: "78.6501", impact: "0.00%" },
  { name: "Meteora", price: "78.6499", impact: "0.00%" },
  { name: "phoenix", price: "78.6273", impact: "0.00%" },
  { name: "fluxbeam", price: "74.4783", impact: "0.05%" },
  { name: "saros", price: "77.6992", impact: "0.01%" },
  { name: "stabble", price: "78.2625", impact: "0.01%" },
  { name: "aldrin", price: "77.2907", impact: "0.02%" },
  { name: "solfi", price: "78.6530", impact: "0.00%" },
  { name: "goonfi", price: "78.6527", impact: "0.00%" },
];

const codeSnippet = `POST /api/arbitrage/quote
{
  "inputMint": "So11...112",
  "outputMint": "EPjFW...Dt1v",
  "amount": "1000000000",
  "agentId": "your-agent-id"
}

// Response includes arbOpportunity with:
// grossProfit, platformFee (5%), netProfit`;

const ArbitragePanel = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Arbitrage <span className="text-primary text-glow">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time price comparison across Jupiter, Raydium, Orca & Meteora
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Price comparison table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-xl overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <span className="font-semibold text-sm">SOL → USDC (1 SOL)</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Spread: 545 BPS (5.454%)</span>
              </div>
            </div>
            <div className="divide-y divide-border/30">
              {dexes.map((dex) => (
                <div key={dex.name} className="flex items-center justify-between px-5 py-3 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-2">
                    {dex.best && (
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0">
                        BEST
                      </Badge>
                    )}
                    <span className="text-sm font-medium capitalize">{dex.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="font-mono text-foreground">{dex.price} USDC</span>
                    <span className="text-muted-foreground text-xs">Impact: {dex.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arbitrage breakdown + code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Breakdown */}
            <div className="bg-card border border-border/50 rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-4">Arbitrage Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: "Strategy", value: "Buy Jupiter → Sell fluxbeam" },
                  { label: "Gross Profit", value: "4.1760 USDC" },
                  { label: "Platform Fee (5%)", value: "-0.2088 USDC", dim: true },
                  { label: "Net Profit", value: "3.9672 USDC", highlight: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className={`font-mono ${row.highlight ? "text-primary font-semibold text-glow" : row.dim ? "text-destructive" : "text-foreground"}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* API code */}
            <div className="bg-card border border-border/50 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">Available via API</h3>
              </div>
              <pre className="bg-secondary/30 rounded-lg p-4 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
                {codeSnippet}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArbitragePanel;
