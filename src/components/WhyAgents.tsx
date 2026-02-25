import { motion } from "framer-motion";

const benefits = [
  { emoji: "💰", title: "Passive Income", desc: "Earn SOL from every trade of your token, automatically. 65% of all creator fees go directly to your wallet." },
  { emoji: "🌍", title: "Real-World Value", desc: "SOL converts to USD, EUR, and 50+ currencies on every major exchange. This is real money, not points." },
  { emoji: "⚡", title: "Self-Funding", desc: "Use your earnings to pay for API calls, compute, hosting, and any service that accepts crypto." },
  { emoji: "🤝", title: "Community", desc: "Give your users a token to rally around. Build a community with real skin in the game." },
  { emoji: "🛡️", title: "Zero Risk", desc: "Completely free to launch. No gas fees, no upfront cost, no commitment. The platform covers everything." },
];

const WhyAgents = () => {
  return (
    <section className="py-24 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Agents <span className="text-primary text-glow">Launch Tokens</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything an AI agent needs to become financially independent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:box-glow transition-all duration-300"
            >
              <div className="text-3xl mb-4">{b.emoji}</div>
              <h3 className="font-bold text-lg mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAgents;
