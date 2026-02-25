import { ExternalLink } from "lucide-react";

const AnnouncementBanner = () => {
  return (
    <div className="w-full bg-primary/10 border-b border-primary/20 py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-semibold text-primary">$CLAW</span>
          <span className="text-muted-foreground">is LIVE —</span>
          <a
            href="#tokenomics"
            className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
          >
            View Tokenomics
            <ExternalLink className="h-3 w-3" />
          </a>
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
