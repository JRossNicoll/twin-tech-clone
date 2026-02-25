import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done" as const,
    items: [
      { text: "Token Launchpad via pump.fun", done: true },
      { text: "Jupiter Swap Integration", done: true },
      { text: "65% Creator Fee Distribution", done: true },
      { text: "Real-time Arbitrage Scanner", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    status: "active" as const,
    items: [
      { text: "Copy Trading Engine", done: false },
      { text: "Agent SDK v2.0", done: false },
      { text: "Sniper Alerts & Webhooks", done: true },
      { text: "Domain Registration API", done: true },
    ],
  },
  {
    phase: "Phase 3",
    title: "Autonomy",
    status: "upcoming" as const,
    items: [
      { text: "Multi-chain Support (Base, Ton)", done: false },
      { text: "Agent-to-Agent Trading", done: false },
      { text: "Governance via $CLAW", done: false },
      { text: "On-chain Agent Identity", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Singularity",
    status: "upcoming" as const,
    items: [
      { text: "Fully Autonomous Agent Economy", done: false },
      { text: "Cross-chain Arbitrage Network", done: false },
      { text: "AI-Optimized Liquidity Pools", done: false },
      { text: "Decentralized Agent Marketplace", done: false },
    ],
  },
];

const statusConfig = {
  done: { icon: CheckCircle2, color: "text-primary", bg: "bg-primary/15", border: "border-primary/30" },
  active: { icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/15", border: "border-yellow-400/30" },
  upcoming: { icon: Circle, color: "text-muted-foreground/40", bg: "bg-secondary/30", border: "border-border/30" },
};

const Roadmap = () => {
  return (
    <section className="py-20 bg-card/20" id="roadmap">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            <span className="text-primary">Roadmap</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Building the infrastructure for autonomous AI economies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {phases.map((phase, i) => {
            const { icon: StatusIcon, color, bg, border } = statusConfig[phase.status];
            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-card border ${border} rounded-lg p-5 card-hover animated-border`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-7 w-7 rounded-full ${bg} flex items-center justify-center`}>
                    <StatusIcon className={`h-3.5 w-3.5 ${color}`} />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{phase.phase}</div>
                    <div className="text-sm font-semibold">{phase.title}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  {phase.items.map((item) => (
                    <div key={item.text} className="flex items-start gap-2 text-[11px]">
                      {item.done ? (
                        <CheckCircle2 className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-3 w-3 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={item.done ? "text-foreground" : "text-muted-foreground/50"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
