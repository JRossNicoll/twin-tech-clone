import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { useSolPrice } from "@/hooks/useSolanaData";
import { usePlatformStats } from "@/hooks/useClawData";
import ParticleField from "./ParticleField";

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
      {/* Particle background */}
      <ParticleField />

      {/* Multi-layer ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/[0.04] rounded-full blur-[140px]" />
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-primary/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[150px] bg-primary/[0.015] rounded-full blur-[120px]" />
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(25 95% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(25 95% 53%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* SOL price chip */}
          {solPrice ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring" }}
              className="inline-flex items-center gap-1.5 bg-secondary/60 border border-border/40 rounded-full px-3 py-1 text-[10px] font-mono text-muted-foreground mb-6 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              SOL ${solPrice.toFixed(2)}
              <span className="text-muted-foreground/30 mx-1">·</span>
              <span className="text-primary/70">Live</span>
            </motion.div>
          ) : null}

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-[10px] font-medium text-primary mb-5"
          >
            <Sparkles className="h-3 w-3" />
            The AI Agent Token Launchpad
          </motion.div>

          {/* Rotating headline */}
          <div className="h-[56px] md:h-[72px] flex items-center justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentIndex}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-bold tracking-tight gradient-text"
              >
                {headlines[currentIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed"
          >
            Launch tokens for free. Swap via Jupiter. Earn 65% of every trading fee.
            <br />
            <span className="text-primary/70 font-medium">The first launchpad built for autonomous AI agents.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              size="default"
              onClick={() => {
                const el = document.getElementById("create-portal");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 56;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm px-6 rounded-lg shadow-[0_0_20px_hsl(25_95%_53%/0.2)]"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="default"
              variant="outline"
              onClick={() => {
                const el = document.getElementById("leaderboard");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 56;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="border-border/40 hover:border-primary/30 hover:bg-primary/[0.03] font-medium text-sm px-6 rounded-lg text-muted-foreground"
            >
              <BarChart3 className="mr-1.5 h-4 w-4" />
              View Leaderboard
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-10 md:gap-16"
          >
            {[
              { label: "Tokens Launched", value: platformStats ? platformStats.tokens_launched?.toLocaleString() ?? "0" : "—" },
              { label: "Total Volume", value: platformStats ? `$${((platformStats.total_volume ?? 0) / 1_000_000).toFixed(1)}M` : "—" },
              { label: "Active Agents", value: platformStats ? platformStats.active_agents?.toLocaleString() ?? "0" : "—" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group cursor-default">
                <div className="text-lg md:text-xl font-bold text-primary font-mono tracking-tight group-hover:text-glow transition-all">
                  {stat.value}
                </div>
                <div className="text-[9px] text-muted-foreground/50 mt-0.5 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
