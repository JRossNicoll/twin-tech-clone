import { ExternalLink } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-primary/[0.04] border-b border-border/40">
      <div className="container mx-auto flex items-center justify-center gap-2 h-8 text-[11px] tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1 w-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-1 w-1 bg-primary" />
          </span>
          <span className="font-semibold text-primary/80 uppercase tracking-widest">$CLAW</span>
          <span className="text-muted-foreground/60">is live</span>
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
