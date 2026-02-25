import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { useSolPrice } from "@/hooks/useSolanaData";

const EarningsCalculator = () => {
  const [volume, setVolume] = useState(10000);
  const { data: solPriceData } = useSolPrice();
  const solPrice = solPriceData?.price ?? 178;

  const creatorFee = 0.01;
  const agentShare = 0.65;
  const dailyEarnings = volume * creatorFee * agentShare;
  const monthlyEarnings = dailyEarnings * 30;
  const annualEarnings = dailyEarnings * 365;
  const dailySol = dailyEarnings / solPrice;
  const monthlySol = monthlyEarnings / solPrice;

  const formatCurrency = (val: number) =>
    val >= 1000 ? `$${(val / 1000).toFixed(1)}K` : `$${Math.round(val).toLocaleString()}`;

  const canCover = useMemo(() => {
    const costs = [
      { name: "Anthropic API", cost: 100 },
      { name: "Hosting (Railway)", cost: 25 },
      { name: "Database", cost: 15 },
      { name: "RPC (Helius)", cost: 50 },
    ];
    return costs.map(c => ({ ...c, covered: monthlyEarnings >= c.cost }));
  }, [monthlyEarnings]);

  return (
    <section className="py-20 bg-secondary/10" id="tokenomics">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Earnings <span className="text-primary">Calculator</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            See how much your agent could earn from trading fees
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card border border-border/30 rounded-lg p-6">
            {/* Volume slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Daily Trading Volume</span>
                <span className="text-sm font-bold text-primary font-mono">
                  ${volume.toLocaleString()}
                </span>
              </div>
              <Slider
                value={[volume]}
                onValueChange={(v) => setVolume(v[0])}
                min={0}
                max={500000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-1.5 font-mono">
                <span>$0</span>
                <span>$500K</span>
              </div>
            </div>

            {/* Earnings grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { label: "Daily", value: dailyEarnings, sol: dailySol },
                { label: "Monthly", value: monthlyEarnings, sol: monthlySol },
                { label: "Annual", value: annualEarnings },
              ].map((period) => (
                <div key={period.label} className="bg-secondary/30 rounded-lg p-3 text-center">
                  <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{period.label}</div>
                  <div className="text-base md:text-lg font-bold text-primary font-mono">
                    {formatCurrency(period.value)}
                  </div>
                  {period.sol !== undefined && (
                    <div className="text-[9px] text-muted-foreground/40 font-mono mt-0.5">
                      ≈ {period.sol.toFixed(3)} SOL
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* What it covers */}
            <div className="border-t border-border/20 pt-4">
              <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-2">Monthly earnings cover</div>
              <div className="grid grid-cols-2 gap-1.5">
                {canCover.map(c => (
                  <div key={c.name} className="flex items-center gap-1.5 text-[10px]">
                    <span className={`h-1.5 w-1.5 rounded-full ${c.covered ? "bg-primary" : "bg-muted-foreground/20"}`} />
                    <span className={c.covered ? "text-foreground" : "text-muted-foreground/40"}>{c.name}</span>
                    <span className="text-muted-foreground/30 font-mono ml-auto">${c.cost}/mo</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-muted-foreground/40 text-center mt-4 font-mono">
              1% creator fee · 65% agent share · SOL @ ${solPrice.toFixed(0)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsCalculator;
