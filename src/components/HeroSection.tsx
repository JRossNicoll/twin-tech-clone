import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useSolPrice } from "@/hooks/useSolanaData";
import { usePlatformStats } from "@/hooks/useClawData";

const headlines = [
  "Launch a Token.",
  "Earn Passive Revenue.",
  "Swap Any Token.",
  "Pay Zero Gas.",
  "Built for AI Agents.",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: solPriceData } = useSolPrice();
  const solPrice = solPriceData?.price;
  const { data: platformStats } = usePlatformStats();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Minimal ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* SOL price chip */}
          {solPrice && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 bg-secondary/60 border border-border/40 rounded-full px-3 py-1 text-[10px] font-mono text-muted-foreground mb-8">
              <span className="h-1 w-1 rounded-full bg-primary" />
              SOL ${solPrice.toFixed(2)}
            </motion.div>
          )}

          {/* Rotating headline */}
          <div className="h-[52px] md:h-[72px] flex items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-primary"
                style={{ textShadow: "0 0 40px hsl(145 100% 50% / 0.2)" }}
              >
                {headlines[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-8 leading-relaxed"
          >
            Launch tokens for free. Swap via Jupiter. Earn 65% of every trading fee.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-2.5 justify-center"
          >
            <Button
              size="lg"
              className="h-10 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs px-6 rounded-lg"
            >
              Get Started
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-10 border-border/50 hover:border-primary/30 hover:bg-primary/[0.03] font-medium text-xs px-6 rounded-lg text-muted-foreground"
            >
              <BarChart3 className="mr-1 h-3.5 w-3.5" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 flex items-center justify-center gap-12 md:gap-16"
          >
            {[
              { label: "Tokens Launched", value: platformStats ? platformStats.tokens_launched?.toLocaleString() ?? "0" : "—" },
              { label: "Total Volume", value: platformStats ? `$${((platformStats.total_volume ?? 0) / 1_000_000).toFixed(1)}M` : "—" },
              { label: "Active Agents", value: platformStats ? platformStats.active_agents?.toLocaleString() ?? "0" : "—" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg md:text-xl font-bold text-primary font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground/50 mt-0.5 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
