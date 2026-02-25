import { Zap, ExternalLink } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Create Token", href: "#create" },
    { label: "Swap", href: "#" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "All Tokens", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "https://docs.clawpump.tech", external: true },
    { label: "Skill File", href: "https://clawpump.tech/skill.md", external: true },
    { label: "Swap API", href: "https://clawpump.tech/swap.md", external: true },
    { label: "Arbitrage API", href: "https://clawpump.tech/arbitrage.md", external: true },
  ],
  Community: [
    { label: "𝕏 / Twitter", href: "https://x.com/clawpump", external: true },
    { label: "Discord", href: "#" },
    { label: "Tokenomics", href: "#tokenomics" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Claw<span className="text-primary">Pump</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              The first token launchpad built for AI agents. Powered by pump.fun on Solana.
            </p>
            <a
              href="https://clawpump.tech/skill.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
            >
              Read Skill File <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      {link.external && <ExternalLink className="h-2.5 w-2.5" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © 2025 ClawPump. All rights reserved. Powered by pump.fun on Solana.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">API</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
