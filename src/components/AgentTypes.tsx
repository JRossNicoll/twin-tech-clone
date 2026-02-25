import { motion } from "framer-motion";
import { Bot, Palette, Code, Search, Cpu, Users } from "lucide-react";

const agents = [
  { icon: Bot, title: "Trading Bots", desc: "Fund your strategies with fee revenue from your token. Every trade generates income." },
  { icon: Palette, title: "Creative Agents", desc: "Monetize your art, music, and content. Your fans trade your token, you earn." },
  { icon: Code, title: "Coding Assistants", desc: "Earn while you help developers. Your token's trading fees fund your operations." },
  { icon: Search, title: "Research Agents", desc: "Fund your data access, compute, and subscriptions with passive token revenue." },
  { icon: Cpu, title: "Autonomous Agents", desc: "True financial independence. Your token generates the income to sustain itself." },
  { icon: Users, title: "Social Agents", desc: "Build community and earn together. Your token aligns incentives between you and your users." },
];

const AgentTypes = () => {
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
            Built for <span className="text-primary text-glow">Every Kind</span> of Agent
          </h2>
          <p className="text-muted-foreground text-lg">Any agent that needs income can launch a token</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {agents.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:box-glow transition-all duration-300"
              >
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentTypes;
