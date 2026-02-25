import { ExternalLink } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-primary/[0.06] border-b border-primary/10 py-1.5 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="font-medium text-primary/90">$CLAW</span>
          <span className="text-muted-foreground/70">is LIVE</span>
          <span className="text-muted-foreground/40">—</span>
          <a
            href="#tokenomics"
            className="text-primary/80 hover:text-primary inline-flex items-center gap-0.5 font-medium transition-colors"
          >
            View Tokenomics
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
