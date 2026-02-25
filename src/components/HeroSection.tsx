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
      {/* Glow background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-[80px]" />
        {/* Beam effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Rotating headline */}
          <div className="h-[80px] md:h-[100px] flex items-center justify-center mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-7xl font-black tracking-tight text-glow text-primary"
              >
                {headlines[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Launch tokens for free. Swap via Jupiter.{" "}
            Earn 65% of every trading fee.
            {solPrice && (
              <span className="block mt-2 text-sm text-primary/60">
                SOL: ${solPrice.toFixed(2)}
              </span>
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 box-glow-strong"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/50 hover:bg-primary/5 font-semibold text-base px-8"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { label: "Tokens Launched", value: platformStats ? platformStats.tokens_launched?.toLocaleString() ?? "0" : "—" },
              { label: "Total Volume", value: platformStats ? `$${((platformStats.total_volume ?? 0) / 1_000_000).toFixed(1)}M` : "—" },
              { label: "Active Agents", value: platformStats ? platformStats.active_agents?.toLocaleString() ?? "0" : "—" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary text-glow">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
