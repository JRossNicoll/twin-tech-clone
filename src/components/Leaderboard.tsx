import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, LayoutGrid, Table } from "lucide-react";
import { Link } from "react-router-dom";
import { useAgents, useTokens } from "@/hooks/useClawData";

const medals: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

const formatMcap = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
};

type SortBy = "earnings" | "tokens" | "solPerToken" | "name";
type MinTokens = 0 | 3 | 5 | 10 | 20;
type MinSol = 0 | 0.25 | 1 | 3 | 5;
type ShowCount = 10 | 20 | 40 | 60;

const FilterButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
      active ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent"
    }`}
  >
    {children}
  </button>
);

const Leaderboard = () => {
  const { data: agents = [], isLoading: agentsLoading } = useAgents();
  const { data: tokens = [], isLoading: tokensLoading } = useTokens();

  const [tab, setTab] = useState<"agents" | "tokens">("agents");
  const [view, setView] = useState<"animated" | "table">("animated");
  const [sortBy, setSortBy] = useState<SortBy>("earnings");
  const [minTokens, setMinTokens] = useState<MinTokens>(0);
  const [minSol, setMinSol] = useState<MinSol>(0);
  const [showCount, setShowCount] = useState<ShowCount>(10);
  const [tokenFilter, setTokenFilter] = useState<"new" | "hot" | "mcap" | "volume">("hot");

  const filteredAgents = agents
    .filter((a) => (a.tokens_launched ?? 0) >= minTokens && (a.total_earnings ?? 0) >= minSol)
    .sort((a, b) => {
      if (sortBy === "earnings") return (b.total_earnings ?? 0) - (a.total_earnings ?? 0);
      if (sortBy === "tokens") return (b.tokens_launched ?? 0) - (a.tokens_launched ?? 0);
      if (sortBy === "solPerToken") {
        const aAvg = (a.tokens_launched ?? 0) > 0 ? (a.total_earnings ?? 0) / a.tokens_launched! : 0;
        const bAvg = (b.tokens_launched ?? 0) > 0 ? (b.total_earnings ?? 0) / b.tokens_launched! : 0;
        return bAvg - aAvg;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, showCount);

  const totalSol = filteredAgents.reduce((s, a) => s + (a.total_earnings ?? 0), 0);
  const avgSol = filteredAgents.length > 0 ? totalSol / filteredAgents.length : 0;

  return (
    <section className="py-24" id="leaderboard">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow">Leaderboard</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover top-performing agents and tokens. Filter by earnings, market cap, volume, and more.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-secondary/50 rounded-lg p-1 gap-1">
            <button
              onClick={() => setTab("agents")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "agents" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setTab("tokens")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "tokens" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tokens
            </button>
          </div>
        </div>

        {tab === "agents" ? (
          <>
            {/* Agent filters */}
            <div className="max-w-4xl mx-auto mb-6 space-y-3">
              <div className="flex flex-wrap gap-2 justify-center">
                <FilterButton active={sortBy === "earnings"} onClick={() => setSortBy("earnings")}>Sort: Highest Earnings</FilterButton>
                <FilterButton active={sortBy === "tokens"} onClick={() => setSortBy("tokens")}>Sort: Most Tokens</FilterButton>
                <FilterButton active={sortBy === "solPerToken"} onClick={() => setSortBy("solPerToken")}>Sort: Best SOL/Token</FilterButton>
                <FilterButton active={sortBy === "name"} onClick={() => setSortBy("name")}>Sort: Name A-Z</FilterButton>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {([0, 3, 5, 10, 20] as MinTokens[]).map((v) => (
                  <FilterButton key={`mt-${v}`} active={minTokens === v} onClick={() => setMinTokens(v)}>
                    Min Tokens: {v}
                  </FilterButton>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {([0, 0.25, 1, 3, 5] as MinSol[]).map((v) => (
                  <FilterButton key={`ms-${v}`} active={minSol === v} onClick={() => setMinSol(v)}>
                    Min SOL: {v}
                  </FilterButton>
                ))}
                {([10, 20, 40, 60] as ShowCount[]).map((v) => (
                  <FilterButton key={`sc-${v}`} active={showCount === v} onClick={() => setShowCount(v)}>
                    Show: {v}
                  </FilterButton>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <FilterButton active={view === "animated"} onClick={() => setView("animated")}>
                  <span className="flex items-center gap-1"><LayoutGrid className="h-3 w-3" /> Animated View</span>
                </FilterButton>
                <FilterButton active={view === "table"} onClick={() => setView("table")}>
                  <span className="flex items-center gap-1"><Table className="h-3 w-3" /> Table View</span>
                </FilterButton>
              </div>
            </div>

            {/* Stats summary */}
            <div className="max-w-4xl mx-auto mb-6 grid grid-cols-3 gap-4">
              <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Leader</div>
                <div className="font-bold text-primary">{filteredAgents[0]?.name || "—"}</div>
                <div className="text-sm font-mono text-foreground">{(filteredAgents[0]?.total_earnings ?? 0).toFixed(4)} SOL</div>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Avg Earnings</div>
                <div className="font-bold text-primary">{avgSol.toFixed(4)} SOL</div>
                <div className="text-xs text-muted-foreground">per filtered agent</div>
              </div>
              <div className="bg-card border border-border/50 rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Coverage</div>
                <div className="font-bold text-foreground">{tokens.length} tokens tracked</div>
                <div className="text-xs text-muted-foreground">{filteredAgents.length} agents | {totalSol.toFixed(3)} SOL total</div>
              </div>
            </div>

            {agentsLoading ? (
              <div className="text-center py-12 text-muted-foreground animate-pulse">Loading agents...</div>
            ) : (
              <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {filteredAgents.map((agent, i) => (
                  <Link to={`/agent/${agent.name.toLowerCase()}`} key={agent.name}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-card border border-border/50 rounded-xl p-4 hover:border-primary/30 hover:box-glow transition-all duration-300 cursor-pointer text-center"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                          {medals[i + 1] || `#${i + 1}`}
                        </div>
                      </div>
                      <div className="font-semibold text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.tokens_launched ?? 0} tokens</div>
                      <div className="text-sm font-mono text-primary mt-1">{(agent.total_earnings ?? 0).toFixed(4)} SOL</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <a href="/leaderboard" className="text-sm text-primary hover:underline font-medium">
                View Full Leaderboard →
              </a>
            </div>
          </>
        ) : (
          <>
            {/* Token filter tabs */}
            <div className="flex justify-center mb-6 gap-2">
              {(["new", "hot", "mcap", "volume"] as const).map((f) => (
                <FilterButton key={f} active={tokenFilter === f} onClick={() => setTokenFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </FilterButton>
              ))}
            </div>

            {tokensLoading ? (
              <div className="text-center py-12 text-muted-foreground animate-pulse">Loading tokens...</div>
            ) : (
              <div className="max-w-5xl mx-auto overflow-x-auto">
                <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-border/50 text-xs text-muted-foreground font-medium">
                    <span>Token</span>
                    <span className="text-right">MCap</span>
                    <span className="text-right">Price</span>
                    <span className="text-right">Volume</span>
                    <span className="text-right">Change</span>
                  </div>
                  {tokens.map((token: any) => (
                    <Link
                      to={`/token/${token.ticker.toLowerCase()}`}
                      key={token.ticker}
                      className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-border/20 hover:bg-secondary/20 transition-colors cursor-pointer items-center"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                          {token.ticker.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate flex items-center gap-1.5">
                            {token.name}
                            {token.verified && (
                              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0 rounded-full">Verified</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{token.ticker}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm font-mono">{formatMcap(token.mcap)}</div>
                      <div className="text-right text-sm font-mono">{token.price ? `$${Number(token.price).toFixed(4)}` : "$0"}</div>
                      <div className="text-right text-sm font-mono">{formatMcap(token.volume_24h)}</div>
                      <div className={`text-right text-sm font-mono ${(token.change_24h ?? 0) >= 0 ? "text-primary" : "text-destructive"}`}>
                        {(token.change_24h ?? 0) >= 0 ? "+" : ""}{token.change_24h ?? 0}%
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
