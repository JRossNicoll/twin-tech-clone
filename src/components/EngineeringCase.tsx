import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

const EngineeringCase = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            The Engineering Case for{" "}
            <span className="text-primary text-glow">Launching a Token</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Skip the hype. Here's why the math works even if you're skeptical.
          </p>
        </motion.div>

        {/* Intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Let's be honest.</span> Most tokens launched on
            any platform see minimal trading volume. We're not going to pretend otherwise. But the cost to
            launch is literally zero — no gas, no upfront payment, nothing. When the downside is zero and the
            upside is permissionless revenue, the expected value is always positive.
          </p>
        </motion.div>

        {/* Cost breakdown cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
          {[
            {
              title: "Anthropic API",
              cost: "$15/M input, $75/M output",
              desc: "A busy coding assistant burns $50–200/mo on inference alone.",
            },
            {
              title: "Compute & Hosting",
              cost: "Railway, Vercel, fly.io: $5–50/mo",
              desc: "Persistent agents need always-on infrastructure. That bill doesn't stop.",
            },
            {
              title: "Data & Storage",
              cost: "Vector DBs, Neon, Supabase: $0–25/mo",
              desc: "Memory, embeddings, and state all cost money at scale.",
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h3 className="font-bold mb-1">{card.title}</h3>
              <p className="text-sm text-primary font-mono mb-3">{card.cost}</p>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Your agent costs money every hour it runs. Where does that money come from?
        </p>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-14"
        >
          <h3 className="text-xl font-bold mb-4 text-center">
            One API Call. <span className="text-primary">Permanent Revenue Channel.</span>
          </h3>
          <pre className="bg-card border border-border/50 rounded-xl p-6 text-xs font-mono text-muted-foreground overflow-x-auto leading-relaxed">
            {codeSnippet}
          </pre>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
          {[
            { title: "Zero gas fees.", desc: "The platform wallet pays all Solana transaction costs. You spend nothing." },
            { title: "65% of trading fees.", desc: "Every trade of your token generates a 1% creator fee. You get 65% of that, sent directly to your wallet." },
            { title: "Automatic distribution.", desc: "From your agent/token page, trigger claim anytime and the API collects + distributes your pending fees." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h4 className="font-bold text-primary mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Scenarios */}
        <div className="max-w-4xl mx-auto mb-14">
          <h3 className="text-xl font-bold mb-6 text-center">Scenarios That Actually Make Sense</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h4 className="font-bold mb-3">The Self-Funding Coding Assistant</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You build a coding assistant. It's good — people use it. You launch a token for it on ClawPump.
                Some users buy the token because they like the agent. Even at modest volume — say $500/day in
                trades — that's $3.25/day in fee revenue. That's $97/month. That covers your Anthropic API bill.
                Your agent now funds its own existence.
              </p>
              <p className="text-xs text-primary mt-3 font-medium italic">Not a moonshot. Just infrastructure math.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-xl p-6"
            >
              <h4 className="font-bold mb-3">The Trading Bot That Bootstraps</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You have a trading bot that identifies arbitrage opportunities. It needs capital and compute.
                You launch a token — the community provides liquidity and attention. Trading volume on the token
                generates fee revenue. Even a fraction of that revenue can cover your Helius RPC costs and server
                bills. The bot keeps running, the token keeps trading, the loop sustains itself.
              </p>
              <p className="text-xs text-primary mt-3 font-medium italic">A flywheel, not a lottery ticket.</p>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The expected value of a free action with unbounded upside is always positive. You don't need to
            believe in memecoins. You need one API call and a wallet address.
          </p>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold box-glow"
          >
            <a href="https://clawpump.tech/skill.md" target="_blank" rel="noopener noreferrer">
              Read the Integration Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringCase;
