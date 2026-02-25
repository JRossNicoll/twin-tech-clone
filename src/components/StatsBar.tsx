import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePlatformStats } from "@/hooks/useClawData";
import { useTokens, useAgents } from "@/hooks/useClawData";

function formatValue(value: number, format: string, prefix: string, suffix: string) {
  let formatted: string;
  if (format === "compact") {
    if (value >= 1_000_000) formatted = `${(value / 1_000_000).toFixed(2)}M`;
    else if (value >= 1_000) formatted = `${(value / 1_000).toFixed(1)}K`;
    else formatted = value.toString();
  } else if (format === "decimal") {
    formatted = value.toFixed(2);
  } else {
    formatted = Math.round(value).toLocaleString();
  }
  return `${prefix}${formatted}${suffix}`;
}

function useCountUp(target: number, duration = 2000) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(target * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { current, ref };
}

const StatsBar = () => {
  const { data: platformStats } = usePlatformStats();
  const { data: tokens = [] } = useTokens();
  const { data: agents = [] } = useAgents();

  const totalVolume = platformStats?.total_volume ?? tokens.reduce((s: number, t: any) => s + (t.volume_24h ?? 0), 0);
  const totalMcap = tokens.reduce((s: number, t: any) => s + (t.mcap ?? 0), 0);
  const agentCount = platformStats?.active_agents ?? agents.length;
  const vol24h = tokens.reduce((s: number, t: any) => s + (t.volume_24h ?? 0), 0);
  const totalEarnings = agents.reduce((s: number, a: any) => s + (a.total_earnings ?? 0), 0);

  const stats = [
    { label: "Total Volume", value: totalVolume, prefix: "$", suffix: "", format: "compact" },
    { label: "Total MCap", value: totalMcap, prefix: "$", suffix: "", format: "compact" },
    { label: "Active Agents", value: agentCount, prefix: "", suffix: "", format: "number" },
    { label: "24h Volume", value: vol24h, prefix: "$", suffix: "", format: "compact" },
    { label: "Total Earnings", value: totalEarnings, prefix: "", suffix: " SOL", format: "decimal" },
  ];

  return (
    <section className="py-6 border-y border-border/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat) => {
            const { current, ref } = useCountUp(stat.value);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-base md:text-lg font-bold text-primary font-mono tracking-tight">
                  {formatValue(current, stat.format, stat.prefix, stat.suffix)}
                </div>
                <div className="text-[9px] text-muted-foreground/50 mt-0.5 uppercase tracking-[0.15em] font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
