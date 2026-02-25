import { TrendingUp, TrendingDown } from "lucide-react";
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
  }));

  if (tickerTokens.length === 0) return null;

  const doubled = [...tickerTokens, ...tickerTokens];

  return (
    <section className="py-3 border-y border-border/20 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4 mb-2">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="text-primary font-semibold">Trending</span>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-2.5 animate-ticker">
          {doubled.map((token, i) => (
            <Link
              key={`${token.ticker}-${i}`}
              to={`/token/${token.ticker.toLowerCase()}`}
              className="flex-shrink-0 w-[180px] bg-card/60 border border-border/30 rounded-lg px-3 py-2.5 hover:border-primary/20 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="h-6 w-6 rounded bg-primary/15 flex items-center justify-center text-primary font-bold text-[10px]">
                  {token.ticker.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-[11px] text-foreground group-hover:text-primary transition-colors truncate">
                    {token.name}
                  </div>
                  <div className="text-[9px] text-muted-foreground font-mono">${token.ticker}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground font-mono">{token.mcap}</span>
                <span className={`font-semibold flex items-center gap-0.5 ${token.change >= 0 ? "text-primary" : "text-destructive"}`}>
                  {token.change >= 0 ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  {token.change >= 0 ? "+" : ""}{token.change}%
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HotTicker;
