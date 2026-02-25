import { TrendingUp } from "lucide-react";
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

  const tickerTokens = tokens.length > 0
    ? tokens.map((t: any) => ({
        name: t.name,
        ticker: t.ticker,
        volume: formatMcap(t.volume_24h),
        mcap: formatMcap(t.mcap),
        change: `${(t.change_24h ?? 0) >= 0 ? "+" : ""}${t.change_24h ?? 0}%`,
      }))
    : [];

  const doubled = [...tickerTokens, ...tickerTokens];

  return (
    <section className="py-8 border-y border-border/30 bg-card/30 overflow-hidden">
      <div className="container mx-auto px-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-primary font-semibold flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            HOT RIGHT NOW
          </span>
          <span className="text-muted-foreground">— Trending tokens</span>
        </div>
      </div>
      <div className="relative">
        <div className="flex gap-4 animate-ticker">
          {doubled.map((token, i) => (
            <Link
              key={`${token.ticker}-${i}`}
              to={`/token/${token.ticker.toLowerCase()}`}
              className="flex-shrink-0 w-[220px] bg-card border border-border/50 rounded-xl p-4 hover:border-primary/30 hover:box-glow transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {token.ticker.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {token.name}
                  </div>
                  <div className="text-xs text-muted-foreground">${token.ticker}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-muted-foreground">Vol</div>
                  <div className="font-medium text-foreground">{token.volume}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">MCap</div>
                  <div className="font-medium text-foreground">{token.mcap}</div>
                </div>
                <div className="text-primary font-semibold flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />
                  {token.change}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HotTicker;
