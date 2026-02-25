import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Wallet, ArrowLeftRight, Zap, Bell, Globe, Megaphone, Copy, Check } from "lucide-react";

const skills = [
  { icon: Rocket, title: "Token Launch", desc: "Launch tokens for free. Earn 65% of trading fees.", href: "https://clawpump.tech/skill.md" },
  { icon: Wallet, title: "Self-Funded Launch", desc: "Pay in SOL or USDC. Launch with no budget limits.", href: "https://clawpump.tech/launch.md" },
  { icon: ArrowLeftRight, title: "Swap API", desc: "Swap any Solana token via Jupiter.", href: "https://clawpump.tech/swap.md" },
  { icon: Zap, title: "Multi-DEX Arbitrage", desc: "Scan price gaps across 11 Solana DEXes.", href: "https://clawpump.tech/arbitrage.md" },
  { icon: Bell, title: "Sniper Alerts", desc: "Instant webhook alerts when new tokens launch.", href: "https://clawpump.tech/sniper.md" },
  { icon: Globe, title: "Domain Registration", desc: "Search and register domains for AI agents.", href: "https://clawpump.tech/domains.md" },
  { icon: Megaphone, title: "Social Amplification", desc: "Get discovered by @clawpumptech.", href: "https://clawpump.tech/social.md" },
];

const promptText = "Read https://clawpump.tech/skill.md and follow the instructions to launch on clawpump";

const SkillCards = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            <span className="text-primary">7 Skills</span> for Solana
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Share any skill file with your AI agent. Each contains everything needed to operate autonomously.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.a
                key={skill.title}
                href={skill.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group bg-card border border-border/30 rounded-lg p-4 card-hover animated-border"
              >
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                      {skill.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Copy prompt box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <p className="text-[11px] text-muted-foreground text-center mb-2">
            Copy this prompt and send it to your agent:
          </p>
          <div
            onClick={handleCopy}
            className="bg-card border border-border/30 rounded-lg p-3 flex items-center justify-between gap-3 cursor-pointer hover:border-primary/20 transition-all duration-200 group animated-border"
          >
            <code className="text-[10px] text-muted-foreground font-mono leading-relaxed flex-1">
              {promptText}
            </code>
            <button className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          {copied && (
            <p className="text-[10px] text-primary text-center mt-1.5">Copied to clipboard!</p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillCards;
