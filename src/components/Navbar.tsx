import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet } from "lucide-react";
import { useSolPrice } from "@/hooks/useSolanaData";

const navLinks = [
  { label: "Create", href: "#create" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Docs", href: "https://docs.clawpump.tech", external: true },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "FAQ", href: "#faq" },
  { label: "𝕏", href: "https://x.com/clawpump", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: solPriceData } = useSolPrice();
  const solPrice = solPriceData?.price;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
      if (external) return;
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 56;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [],
  );

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/20 shadow-[0_4px_20px_hsl(0_0%_0%/0.3)]" 
        : "bg-background/70 backdrop-blur-xl border-b border-border/10"
    }`}>
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 group">
          <div className="h-6 w-6 rounded bg-primary/90 flex items-center justify-center group-hover:shadow-[0_0_12px_hsl(145_100%_50%/0.4)] transition-shadow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight">
            Claw<span className="text-primary">Pump</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={(e) => handleNavClick(e, link.href, link.external)}
              className="px-3 py-1 rounded text-[12px] font-medium text-muted-foreground hover:text-primary transition-colors duration-150 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover:w-3/4 transition-all duration-200" />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {solPrice && (
            <div className="text-[10px] font-mono text-muted-foreground/60 flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              SOL ${solPrice.toFixed(2)}
            </div>
          )}
          <Button size="sm" className="h-7 px-4 text-[11px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded shadow-[0_0_12px_hsl(145_100%_50%/0.15)]">
            <Wallet className="h-3 w-3 mr-1" />
            Connect
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/10 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.external)}
                className="text-xs text-muted-foreground hover:text-primary transition-colors py-2 px-3 rounded"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-1 w-full h-8 text-[11px] rounded">
              <Wallet className="h-3 w-3 mr-1" />
              Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
