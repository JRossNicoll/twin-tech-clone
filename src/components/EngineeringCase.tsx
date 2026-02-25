import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Server, Database, Fuel, Percent, RefreshCcw, Code, Repeat } from "lucide-react";

const codeSnippet = `// Launch — one POST, zero cost to you
POST /api/launch
{
  "name": "MyAgent",
  "symbol": "MYAGT",
  "agentId": "my-agent-id",
  "walletAddress": "your-solana-wallet"
}

// Check earnings — anytime
GET /api/fees/earnings?agentId=my-agent-id
=> { "totalEarned": 1.073, "totalPending": 0 }`;

const costCards = [
  { icon: Brain, title: "Anthropic API", cost: "$15/M input, $75/M output", desc: "A busy coding assistant burns $50–200/mo on inference alone." },
  { icon: Server, title: "Compute & Hosting", cost: "Railway, Vercel, fly.io: $5–50/mo", desc: "Persistent agents need always-on infrastructure. That bill doesn't stop." },
  { icon: Database, title: "Data & Storage", cost: "Vector DBs, Neon: $0–25/mo", desc: "Memory, embeddings, and state all cost money at scale." },
];

const features = [
  { icon: Fuel, title: "Zero gas fees.", desc: "The platform wallet pays all Solana transaction costs. You spend nothing." },
  { icon: Percent, title: "65% of trading fees.", desc: "Every trade of your token generates a 1% creator fee. You get 65% of that, sent directly to your wallet." },
  { icon: RefreshCcw, title: "Automatic distribution.", desc: "From your agent/token page, trigger claim anytime and the API collects + distributes your pending fees." },
];

const EngineeringCase = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            The Engineering Case for{" "}
            <span className="text-primary">Launching a Token</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Skip the hype. Here's why the math works even if you're skeptical.
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-10"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Let's be honest.</span> Most tokens see minimal volume.
            But the cost to launch is literally zero. When the downside is zero and the upside is permissionless
            revenue, the expected value is always positive.
          </p>
        </motion.div>

        {/* Cost breakdown */}
        <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-12">
          {costCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border/30 rounded-lg p-5"
              >
                <div className="h-7 w-7 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{card.title}</h3>
                <p className="text-[11px] text-primary font-mono mb-2">{card.cost}</p>
                <p className="text-[11px] text-muted-foreground">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mb-8 max-w-lg mx-auto">
          Your agent costs money every hour it runs. Where does that money come from?
        </p>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <h3 className="text-base font-bold mb-3 text-center">
            One API Call. <span className="text-primary">Permanent Revenue Channel.</span>
          </h3>
          <pre className="bg-card border border-border/30 rounded-lg p-4 text-[10px] font-mono text-muted-foreground overflow-x-auto leading-relaxed">
            {codeSnippet}
          </pre>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-12">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-base font-bold mb-4 text-center">Scenarios That Actually Make Sense</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/30 rounded-lg p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                  <Code className="h-3 w-3 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">The Self-Funding Coding Assistant</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                You build a coding assistant. It's good — people use it. You launch a token. Even at $500/day in
                trades — that's $3.25/day in fee revenue. $97/month covers your Anthropic API bill.
                Your agent now funds its own existence.
              </p>
              <p className="text-[10px] text-primary mt-2 font-medium italic">Not a moonshot. Just infrastructure math.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/30 rounded-lg p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                  <Repeat className="h-3 w-3 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">The Trading Bot That Bootstraps</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                You have a trading bot that finds arbitrage. You launch a token — the community provides liquidity.
                Trading volume generates fee revenue that covers your Helius RPC costs and server bills.
                The loop sustains itself.
              </p>
              <p className="text-[10px] text-primary mt-2 font-medium italic">A flywheel, not a lottery ticket.</p>
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
          <p className="text-xs text-muted-foreground mb-4 max-w-lg mx-auto">
            The expected value of a free action with unbounded upside is always positive.
          </p>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs h-9 px-5 rounded-lg"
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
