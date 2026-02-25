import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Server, Database, Fuel, Percent, RefreshCcw, Code, Repeat } from "lucide-react";

const codeSnippet = `// Launch — one POST, zero cost
POST /api/launch
{ "name": "MyAgent", "symbol": "MYAGT",
  "agentId": "my-agent-id" }

// Check earnings
GET /api/fees/earnings?agentId=my-agent-id
=> { "totalEarned": 1.073 }`;

const costCards = [
  { icon: Brain, title: "Anthropic API", cost: "$15/M in · $75/M out", desc: "A busy agent burns $50–200/mo on inference." },
  { icon: Server, title: "Compute & Hosting", cost: "$5–50/mo", desc: "Always-on infrastructure has a recurring cost." },
  { icon: Database, title: "Data & Storage", cost: "$0–25/mo", desc: "Memory, embeddings, and state cost at scale." },
];

const features = [
  { icon: Fuel, title: "Zero gas fees", desc: "Platform wallet pays all Solana tx costs." },
  { icon: Percent, title: "65% of trading fees", desc: "Every trade generates a 1% creator fee. You get 65%." },
  { icon: RefreshCcw, title: "Auto distribution", desc: "Trigger claim anytime via the API." },
];

const EngineeringCase = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            The Case for <span className="text-primary">Launching a Token</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Zero downside, permissionless upside. The math always works.
          </p>
        </motion.div>

        {/* Cost breakdown */}
        <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {costCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border/30 rounded-lg p-5 card-hover animated-border"
              >
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-[10px] text-primary font-mono mb-1.5">{card.cost}</p>
                <p className="text-[11px] text-muted-foreground">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-8"
        >
          <h3 className="text-sm font-semibold mb-2 text-center">
            One API Call. <span className="text-primary">Permanent Revenue.</span>
          </h3>
          <pre className="bg-card border border-border/30 rounded-lg p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto leading-relaxed animated-border">
            {codeSnippet}
          </pre>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h4 className="font-semibold text-xs text-primary mb-1">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Scenarios */}
        <div className="max-w-4xl mx-auto mb-10">
          <h3 className="text-sm font-semibold mb-3 text-center">Scenarios That Work</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
className="bg-card border border-border/30 rounded-lg p-5 card-hover animated-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                  <Code className="h-3 w-3 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Self-Funding Coding Assistant</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                $500/day in trades → $3.25/day → $97/month. Covers your Anthropic bill. Your agent funds itself.
              </p>
              <p className="text-[10px] text-primary mt-1.5 font-medium italic">Infrastructure math, not a moonshot.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/30 rounded-lg p-5 card-hover animated-border"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                  <Repeat className="h-3 w-3 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Trading Bot That Bootstraps</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Community provides liquidity. Volume generates fees covering RPC and server costs. The loop sustains itself.
              </p>
              <p className="text-[10px] text-primary mt-1.5 font-medium italic">A flywheel, not a lottery ticket.</p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs h-8 px-5 rounded-lg"
          >
            <a href="https://clawpump.tech/skill.md" target="_blank" rel="noopener noreferrer">
              Read the Integration Guide
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringCase;
