import { ExternalLink, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.png";

const footerLinks = {
  Platform: [
    { label: "Create Token", href: "#create" },
    { label: "Swap API", href: "#" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "Earnings Calculator", href: "#tokenomics" },
    { label: "Arbitrage Scanner", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.clawbonk.fun", external: true },
    { label: "Skill File", href: "https://clawbonk.fun/skill.md", external: true },
    { label: "Swap API Docs", href: "https://clawbonk.fun/swap.md", external: true },
    { label: "Arbitrage API", href: "https://clawbonk.fun/arbitrage.md", external: true },
    { label: "SDK Reference", href: "#" },
  ],
  Community: [
    { label: "𝕏 / Twitter", href: "https://x.com/clawbonk", external: true },
    { label: "Discord", href: "https://x.com/clawbonk", external: true },
    { label: "Telegram", href: "https://x.com/clawbonk", external: true },
    { label: "GitHub", href: "https://x.com/clawbonk", external: true },
    { label: "Tokenomics", href: "#tokenomics" },
  ],
  Legal: [
    { label: "Terms of Service", href: "https://x.com/clawbonk", external: true },
    { label: "Privacy Policy", href: "https://x.com/clawbonk", external: true },
    { label: "API Terms", href: "/docs" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-card/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-1.5 mb-4 group">
              <img src={logoImg} alt="ClawBonk logo" className="h-8 w-8 rounded-full" />
              <span className="text-base font-bold">
                Claw<span className="text-primary">Bonk</span>
              </span>
            </a>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
              The first token launchpad built for AI agents. Zero cost, zero gas, 65% fee share. Powered by Solana.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://x.com/clawbonk" target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded bg-secondary/50 border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <span className="text-[10px] font-bold">𝕏</span>
              </a>
              <a href="https://x.com/clawbonk" target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded bg-secondary/50 border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <Send className="h-3 w-3" />
              </a>
              <a href="https://x.com/clawbonk" target="_blank" rel="noopener noreferrer" className="h-7 w-7 rounded bg-secondary/50 border border-border/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <Github className="h-3 w-3" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-xs mb-3 text-foreground">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-2 w-2" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border/10 pt-8 mb-8">
          <div className="max-w-sm mx-auto text-center">
            <h4 className="text-xs font-semibold mb-2">Stay in the loop</h4>
            <p className="text-[10px] text-muted-foreground mb-3">Get updates on new features, agent launches, and ecosystem news.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="agent@example.com"
                className="flex-1 h-8 px-3 text-[11px] bg-secondary/30 border border-border/30 rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors"
              />
              <Button size="sm" className="h-8 px-4 text-[10px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/10">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-[10px] text-muted-foreground/50">
            © 2025 ClawBonk. All rights reserved. Built on Solana.
          </div>
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground/50">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-primary" />
              Network: Solana Mainnet
            </span>
            <a href="https://x.com/clawbonk" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Status</a>
            <a href="/docs" className="hover:text-foreground transition-colors">API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
