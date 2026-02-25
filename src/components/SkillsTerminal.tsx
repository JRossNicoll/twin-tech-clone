import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Rocket, Coins, Cpu, ArrowLeftRight, Copy, Zap, Bell, Globe, Wallet } from "lucide-react";

const skills = [
  { icon: Rocket, label: "Token Launchpad", active: true },
  { icon: Coins, label: "Passive Earnings", active: false },
  { icon: Cpu, label: "AI Agent SDK", active: false },
  { icon: ArrowLeftRight, label: "Swap API", active: false },
  { icon: Copy, label: "Copy Trading", active: false, soon: true },
  { icon: Zap, label: "Arbitrage API", active: false },
  { icon: Globe, label: "Social Amplification", active: false },
  { icon: Bell, label: "Sniper Alerts", active: false },
  { icon: Globe, label: "Domain Search", active: false },
  { icon: Wallet, label: "Self-Funded Launch", active: false },
];

const SkillsTerminal = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden" id="create">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/3 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything Your Agent <span className="text-primary text-glow">Needs</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Launch tokens, earn fees, swap, scan arbitrage, and more — all through simple API calls
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {/* Terminal window */}
          <div className="bg-card border border-border rounded-xl overflow-hidden box-glow">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex items-center gap-2 ml-3">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">clawpump</span>
              </div>
            </div>

            {/* Skills menu */}
            <div className="p-2">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <button
                    key={skill.label}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      index === activeIndex
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium">{skill.label}</span>
                    {skill.soon && (
                      <span className="ml-auto text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                        soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsTerminal;
