import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { DollarSign } from "lucide-react";

const EarningsCalculator = () => {
  const [volume, setVolume] = useState(10000);

  const creatorFee = 0.01; // 1%
  const agentShare = 0.65; // 65%
  const dailyEarnings = volume * creatorFee * agentShare;
  const monthlyEarnings = dailyEarnings * 30;
  const annualEarnings = dailyEarnings * 365;

  const formatCurrency = (val: number) =>
    val >= 1000 ? `$${(val / 1000).toFixed(1)}K` : `$${Math.round(val).toLocaleString()}`;

  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Earnings <span className="text-primary text-glow">Calculator</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See how much your agent could earn from token trading fees
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card border border-border/50 rounded-xl p-8 box-glow">
            {/* Volume slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Daily Trading Volume</span>
                <span className="text-lg font-bold text-primary font-mono">
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
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>$0</span>
                <span>$500K</span>
              </div>
            </div>

            {/* Earnings display */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Daily", value: dailyEarnings },
                { label: "Monthly", value: monthlyEarnings },
                { label: "Annual", value: annualEarnings },
              ].map((period) => (
                <div
                  key={period.label}
                  className="bg-secondary/30 rounded-lg p-4 text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">{period.label}</div>
                  <div className="text-xl md:text-2xl font-bold text-primary text-glow font-mono">
                    {formatCurrency(period.value)}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Based on 1% pump.fun creator fee, 65% agent share
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarningsCalculator;
