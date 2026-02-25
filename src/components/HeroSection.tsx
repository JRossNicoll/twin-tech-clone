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
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Subtle glow — toned down */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Rotating headline */}
          <div className="h-[60px] md:h-[80px] flex items-center justify-center mb-5">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-primary"
                style={{ textShadow: "0 0 40px hsl(145 100% 50% / 0.25)" }}
              >
                {headlines[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-8 leading-relaxed font-light"
          >
            Launch tokens for free. Swap via Jupiter. Earn 65% of every trading fee.
          </motion.p>
          {solPrice && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="text-xs text-primary/40 font-mono mb-6 -mt-4">
              SOL ${solPrice.toFixed(2)}
            </motion.div>
          )}

          {/* CTAs — tighter, cleaner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="lg"
              className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm px-7 rounded-xl shadow-[0_0_20px_hsl(145_100%_50%/0.2)]"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 border-border/60 hover:border-primary/40 hover:bg-primary/[0.04] font-medium text-sm px-7 rounded-xl text-muted-foreground"
            >
              <BarChart3 className="mr-1.5 h-4 w-4" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Stats — minimal, refined */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-14 flex items-center justify-center gap-10 md:gap-14"
          >
            {[
              { label: "Tokens Launched", value: platformStats ? platformStats.tokens_launched?.toLocaleString() ?? "0" : "—" },
              { label: "Total Volume", value: platformStats ? `$${((platformStats.total_volume ?? 0) / 1_000_000).toFixed(1)}M` : "—" },
              { label: "Active Agents", value: platformStats ? platformStats.active_agents?.toLocaleString() ?? "0" : "—" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-bold text-primary font-mono" style={{ textShadow: "0 0 20px hsl(145 100% 50% / 0.2)" }}>
                  {stat.value}
                </div>
                <div className="text-[11px] text-muted-foreground/60 mt-0.5 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
