import { ExternalLink, Zap } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary/[0.06] via-primary/[0.03] to-primary/[0.06] border-b border-border/40 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.05] to-transparent animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" />
      
      <div className="container mx-auto flex items-center justify-center gap-2 h-8 text-[11px] tracking-wide relative z-10">
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-primary/60" />
          <span className="font-semibold text-primary/80 uppercase tracking-widest">$CLAW</span>
          <span className="text-muted-foreground/60">is live on Solana</span>
          <span className="text-muted-foreground/20 mx-1">·</span>
          <span className="text-[10px] text-muted-foreground/40 font-mono">65% fee share</span>
          <span className="text-muted-foreground/20 mx-1">·</span>
          <a
            href="#tokenomics"
            className="text-primary/70 hover:text-primary inline-flex items-center gap-0.5 font-medium transition-colors"
          >
            Tokenomics
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
