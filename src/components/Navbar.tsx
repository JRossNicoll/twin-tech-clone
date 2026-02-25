import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const navLinks = [
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Docs", href: "/docs" },
  { label: "bonk.fun", href: "https://bonk.fun", external: true },
  { label: "𝕏", href: "https://x.com/clawbonk", external: true },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { publicKey, connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const shortAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
      if (external) return;
      if (href.startsWith("/")) {
        e.preventDefault();
        navigate(href);
        setMobileOpen(false);
        return;
      }
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
    [navigate],
  );

  const handleWalletClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-[0_1px_0_hsl(25_95%_53%/0.08),0_4px_24px_hsl(0_0%_0%/0.4)]"
          : "bg-card/80 backdrop-blur-xl"
      }`}
      style={{
        borderBottom: "1px solid",
        borderImage: `linear-gradient(90deg, transparent 0%, hsl(25 95% 53% / ${scrolled ? 0.2 : 0.1}) 30%, hsl(25 95% 53% / ${scrolled ? 0.25 : 0.12}) 50%, hsl(25 95% 53% / ${scrolled ? 0.2 : 0.1}) 70%, transparent 100%) 1`,
      }}
    >
      <div className="container mx-auto flex h-12 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img src={logoImg} alt="ClawBonk logo" className="h-6 w-6 rounded-full" />
          <span className="text-[14px] font-bold tracking-tight">
            claw <span className="text-primary font-extrabold">bonk</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={(e) => handleNavClick(e, link.href, link.external)}
              className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground/70 hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}

          <Button
            size="sm"
            onClick={handleWalletClick}
            variant={connected ? "outline" : "default"}
            className={`ml-3 h-[30px] px-5 text-[11px] font-semibold rounded-full transition-all ${
              connected
                ? "border-primary/25 hover:border-primary/40 text-muted-foreground hover:text-foreground bg-transparent"
                : "bg-transparent border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60"
            }`}
          >
            {connected ? (
              <>
                <LogOut className="h-3 w-3 mr-1.5" />
                {shortAddress}
              </>
            ) : (
              "Connect"
            )}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/10 bg-card/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={(e) => handleNavClick(e, link.href, link.external)}
                className="text-[13px] text-muted-foreground hover:text-primary transition-colors py-2.5 px-3 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              onClick={handleWalletClick}
              className="border border-primary/40 bg-transparent text-primary hover:bg-primary/10 font-semibold mt-2 w-full h-9 text-[12px] rounded-full"
            >
              {connected ? (
                <>
                  <LogOut className="h-3 w-3 mr-1.5" />
                  {shortAddress}
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;