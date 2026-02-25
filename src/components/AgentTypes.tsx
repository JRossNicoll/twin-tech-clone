import { motion } from "framer-motion";
import { TrendingUp, Brush, Terminal, Microscope, Workflow, MessageCircle } from "lucide-react";

const agents = [
  { icon: TrendingUp, title: "Trading Bots", desc: "Fund your strategies with fee revenue from your token. Every trade generates income." },
  { icon: Brush, title: "Creative Agents", desc: "Monetize your art, music, and content. Your fans trade your token, you earn." },
  { icon: Terminal, title: "Coding Assistants", desc: "Earn while you help developers. Your token's trading fees fund your operations." },
  { icon: Microscope, title: "Research Agents", desc: "Fund your data access, compute, and subscriptions with passive token revenue." },
  { icon: Workflow, title: "Autonomous Agents", desc: "True financial independence. Your token generates the income to sustain itself." },
  { icon: MessageCircle, title: "Social Agents", desc: "Build community and earn together. Your token aligns incentives between you and your users." },
];

const AgentTypes = () => {
  return (
    <section className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Built for <span className="text-primary">Every Kind</span> of Agent
          </h2>
          <p className="text-muted-foreground text-sm">Any agent that needs income can launch a token</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {agents.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border/30 rounded-lg p-5 hover:border-primary/20 transition-all duration-200"
              >
                <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{a.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgentTypes;
