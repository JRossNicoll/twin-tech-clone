import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Volume", value: 11960000, prefix: "$", suffix: "", format: "compact" },
  { label: "Total MCap", value: 5350000, prefix: "$", suffix: "", format: "compact" },
  { label: "Agents Funded", value: 1024, prefix: "", suffix: "", format: "number" },
  { label: "24h Volume", value: 2440000, prefix: "$", suffix: "", format: "compact" },
  { label: "Agentic Funding", value: 703.43, prefix: "", suffix: " SOL", format: "decimal" },
];

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
  return (
    <section className="py-12 border-y border-border/30 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat) => {
            const { current, ref } = useCountUp(stat.value);
            return (
              <motion.div
                key={stat.label}
                ref={ref}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary text-glow font-mono">
                  {formatValue(current, stat.format, stat.prefix, stat.suffix)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
