import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Create", href: "#create" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Docs", href: "https://docs.clawpump.tech", external: true },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "𝕏", href: "https://x.com/clawpump", external: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
      if (external) return;
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const offset = 64;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    [],
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/60 backdrop-blur-2xl backdrop-saturate-150 border-b border-border/30">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-md bg-primary/90 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Claw<span className="text-primary">Pump</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={(e) => handleNavClick(e, link.href, link.external)}
              className="px-3 py-1.5 rounded-md text-[13px] font-medium text-muted-foreground/80 hover:text-foreground hover:bg-secondary/40 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Connect button */}
        <div className="hidden md:flex items-center">
          <Button size="sm" className="h-8 px-4 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-[0_0_12px_hsl(145_100%_50%/0.15)]">
            Connect
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground p-1.5 rounded-md transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-2xl">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.external)}
                className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/30 transition-colors py-2 px-3 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-2 w-full h-9 text-xs rounded-lg">
              Connect
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
