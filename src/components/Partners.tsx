import { motion } from "framer-motion";

const partners = [
  { name: "Solana", role: "Blockchain" },
  { name: "Jupiter", role: "DEX Aggregator" },
  { name: "pump.fun", role: "Token Launch" },
  { name: "Helius", role: "RPC Provider" },
  { name: "Raydium", role: "AMM/DEX" },
  { name: "Orca", role: "DEX" },
  { name: "Meteora", role: "Liquidity" },
  { name: "Phoenix", role: "Order Book" },
];

const Partners = () => {
  return (
    <section className="py-16 border-y border-border/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.2em] font-medium">
            Powered by the Solana Ecosystem
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 max-w-3xl mx-auto">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 group cursor-default"
            >
              <div className="h-8 w-8 rounded-lg bg-secondary/50 border border-border/20 flex items-center justify-center text-[10px] font-bold text-primary/60 group-hover:text-primary group-hover:border-primary/20 transition-all">
                {p.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{p.name}</div>
                <div className="text-[9px] text-muted-foreground/40">{p.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
