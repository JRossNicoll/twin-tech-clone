import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">
              Claw<span className="text-primary">Pump</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://docs.clawpump.tech" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Docs</a>
            <a href="https://x.com/clawpump" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">𝕏</a>
            <a href="#tokenomics" className="hover:text-foreground transition-colors">Tokenomics</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2025 ClawPump. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
