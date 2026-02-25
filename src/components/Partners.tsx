import { motion } from "framer-motion";
import solanaLogo from "@/assets/partners/solana.svg";
import jupiterLogo from "@/assets/partners/jupiter.png";
import raydiumLogo from "@/assets/partners/raydium.svg";
import orcaLogo from "@/assets/partners/orca.svg";
import meteoraLogo from "@/assets/partners/meteora.svg";
import heliusLogo from "@/assets/partners/helius.png";

const partners = [
  { name: "Solana", role: "Blockchain", logo: solanaLogo },
  { name: "Jupiter", role: "DEX Aggregator", logo: jupiterLogo },
  { name: "bonk.fun", role: "Token Launch", logo: null },
  { name: "Helius", role: "RPC Provider", logo: heliusLogo },
  { name: "Raydium", role: "AMM/DEX", logo: raydiumLogo },
  { name: "Orca", role: "DEX", logo: orcaLogo },
  { name: "Meteora", role: "Liquidity", logo: meteoraLogo },
  { name: "Phoenix", role: "Order Book", logo: null },
];

const Partners = () => {
  return (
    <section className="py-20 border-y border-border/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.25em] font-medium">
            Powered by the Solana Ecosystem
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 group cursor-default"
            >
              {/* Icon container with orange outline */}
              <div className="h-10 w-10 rounded-xl bg-secondary/60 border border-primary/20 flex items-center justify-center overflow-hidden group-hover:border-primary/40 group-hover:bg-secondary/80 transition-all duration-200">
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-5 w-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-[11px] font-bold text-primary/60 group-hover:text-primary transition-colors">
                    {p.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Text */}
              <div>
                <div className="text-[13px] font-semibold text-muted-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                  {p.name}
                </div>
                <div className="text-[10px] text-muted-foreground/30 leading-tight">
                  {p.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;