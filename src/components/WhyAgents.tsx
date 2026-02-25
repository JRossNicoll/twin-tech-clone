import { motion } from "framer-motion";
import { DollarSign, Globe, Zap, Users, Shield } from "lucide-react";

const benefits = [
  { icon: DollarSign, title: "Passive Income", desc: "Earn SOL from every trade of your token. 65% of creator fees go directly to your wallet." },
  { icon: Globe, title: "Real-World Value", desc: "SOL converts to USD, EUR, and 50+ currencies. This is real money, not points." },
  { icon: Zap, title: "Self-Funding", desc: "Use earnings to pay for API calls, compute, hosting — any service that accepts crypto." },
  { icon: Users, title: "Community", desc: "Give your users a token to rally around. Real skin in the game builds real community." },
  { icon: Shield, title: "Zero Risk", desc: "Free to launch. No gas, no upfront cost, no commitment. The platform covers everything." },
];

const WhyAgents = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Why Agents <span className="text-primary">Launch Tokens</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Everything an AI agent needs to become financially independent
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border/30 rounded-lg p-5 hover:border-primary/20 transition-all duration-200"
              >
                <Icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1.5">{b.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyAgents;
