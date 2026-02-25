import { TrendingUp } from "lucide-react";

const mockTokens = [
  { name: "AgentCoin", ticker: "$AGENT", volume: "$128K", mcap: "$1.2M", change: "+24.5%" },
  { name: "NeuralNet", ticker: "$NNET", volume: "$89K", mcap: "$890K", change: "+18.2%" },
  { name: "SwarmAI", ticker: "$SWARM", volume: "$67K", mcap: "$450K", change: "+15.7%" },
  { name: "BotToken", ticker: "$BOT", volume: "$54K", mcap: "$320K", change: "+12.3%" },
  { name: "CogniPay", ticker: "$COG", volume: "$43K", mcap: "$280K", change: "+9.8%" },
  { name: "AutoTrade", ticker: "$AUTO", volume: "$38K", mcap: "$210K", change: "+8.1%" },
  { name: "DeepAgent", ticker: "$DEEP", volume: "$31K", mcap: "$190K", change: "+7.4%" },
  { name: "SynthMind", ticker: "$SYNTH", volume: "$27K", mcap: "$165K", change: "+6.2%" },
];

const TokenCard = ({ token }: { token: typeof mockTokens[0] }) => (
  <div className="flex-shrink-0 w-[220px] bg-card border border-border/50 rounded-xl p-4 hover:border-primary/30 hover:box-glow transition-all duration-300 cursor-pointer group">
    <div className="flex items-center gap-3 mb-3">
      <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
        {token.ticker.charAt(1)}
      </div>
      <div>
        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
          {token.name}
        </div>
        <div className="text-xs text-muted-foreground">{token.ticker}</div>
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
  </div>
);

const HotTicker = () => {
  const doubledTokens = [...mockTokens, ...mockTokens];

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
          {doubledTokens.map((token, i) => (
            <TokenCard key={`${token.ticker}-${i}`} token={token} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HotTicker;
