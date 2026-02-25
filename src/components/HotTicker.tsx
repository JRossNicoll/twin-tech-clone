import { TrendingUp, TrendingDown, Flame, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTokens } from "@/hooks/useClawData";

const formatMcap = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
};

const HotTicker = () => {
  const { data: tokens = [] } = useTokens();

  const tickerTokens = tokens.map((t: any) => ({
    name: t.name,
    ticker: t.ticker,
    volume: formatMcap(t.volume_24h),
    mcap: formatMcap(t.mcap),
    change: t.change_24h ?? 0,
    holders: t.holders ?? 0,
    txns: t.txns_24h ?? 0,
  }));

  if (tickerTokens.length === 0) return null;

  // Triple for seamless loop
  const tripled = [...tickerTokens, ...tickerTokens, ...tickerTokens];

  return (
    <section className="py-4 border-y border-border/30 bg-gradient-to-r from-secondary/30 via-card/40 to-secondary/30 overflow-hidden relative">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[60px] bg-primary/[0.03] rounded-full blur-[60px]" />
      </div>

      <div className="container mx-auto px-4 mb-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em]">
            <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1">
              <Flame className="h-3 w-3 text-primary animate-pulse" />
              <span className="text-primary font-bold">Trending Now</span>
            </div>
            <span className="text-muted-foreground/40 hidden sm:inline">·</span>
            <span className="text-muted-foreground/40 text-[9px] hidden sm:inline font-mono">
              {tickerTokens.length} tokens live
            </span>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-muted-foreground/40 font-mono">
            <span className="hidden sm:flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse" />
              Real-time
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-3 animate-ticker">
          {tripled.map((token, i) => (
            <Link
              key={`${token.ticker}-${i}`}
              to={`/token/${token.ticker.toLowerCase()}`}
              className="flex-shrink-0 w-[220px] bg-card/80 backdrop-blur-sm border border-border/30 rounded-xl px-3.5 py-3 hover:border-primary/30 hover:bg-card transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                {/* Top row: icon + name + change badge */}
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    {token.ticker.slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                      {token.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground/60 font-mono">${token.ticker}</div>
                  </div>
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    token.change >= 0
                      ? "bg-primary/10 text-primary"
                      : "bg-destructive/10 text-destructive"
                  }`}>
                    {token.change >= 0 ? "+" : ""}{token.change.toFixed(1)}%
                  </div>
                </div>

                {/* Bottom stats row */}
                <div className="flex items-center justify-between text-[9px] text-muted-foreground/50 font-mono border-t border-border/20 pt-1.5 mt-0.5">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-2.5 w-2.5" />
                    {token.mcap}
                  </span>
                  <span>Vol {token.volume}</span>
                  {token.holders > 0 && (
                    <span className="flex items-center gap-0.5">
                      <Users className="h-2.5 w-2.5" />
                      {token.holders}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stronger edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default HotTicker;
