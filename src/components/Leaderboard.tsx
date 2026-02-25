import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Medal, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useAgents, useTokens } from "@/hooks/useClawData";
import type { LucideIcon } from "lucide-react";

const medalIcons: Record<number, { icon: LucideIcon; color: string }> = {
  1: { icon: Crown, color: "text-yellow-400" },
  2: { icon: Medal, color: "text-muted-foreground" },
  3: { icon: Award, color: "text-amber-600" },
};

const formatMcap = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
};

type SortBy = "earnings" | "tokens" | "name";

const Leaderboard = () => {
  const { data: agents = [], isLoading: agentsLoading } = useAgents();
  const { data: tokens = [], isLoading: tokensLoading } = useTokens();

  const [tab, setTab] = useState<"agents" | "tokens">("agents");
  const [sortBy, setSortBy] = useState<SortBy>("earnings");

  const filteredAgents = agents
    .sort((a, b) => {
      if (sortBy === "earnings") return (b.total_earnings ?? 0) - (a.total_earnings ?? 0);
      if (sortBy === "tokens") return (b.tokens_launched ?? 0) - (a.tokens_launched ?? 0);
      return a.name.localeCompare(b.name);
    })
    .slice(0, 15);

  return (
    <section className="py-20" id="leaderboard">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            <span className="text-primary">Leaderboard</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Top-performing agents and tokens
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-secondary/50 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setTab("agents")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                tab === "agents" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setTab("tokens")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                tab === "tokens" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tokens
            </button>
          </div>
        </div>

        {tab === "agents" ? (
          <>
            {/* Sort */}
            <div className="flex justify-center gap-1.5 mb-6">
              {([
                { key: "earnings", label: "Earnings" },
                { key: "tokens", label: "Tokens" },
                { key: "name", label: "A-Z" },
              ] as const).map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSortBy(s.key)}
                  className={`px-3 py-1 rounded-md text-[10px] font-medium transition-all ${
                    sortBy === s.key ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {agentsLoading ? (
              <div className="text-center py-12 text-muted-foreground text-sm animate-pulse">Loading agents...</div>
            ) : (
              <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {filteredAgents.map((agent, i) => (
                  <Link to={`/agent/${agent.name.toLowerCase()}`} key={agent.name}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-card border border-border/30 rounded-lg p-4 card-hover cursor-pointer text-center animated-border"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          {medalIcons[i + 1] ? (() => {
                            const { icon: MedalIcon, color } = medalIcons[i + 1];
                            return <MedalIcon className={`h-4 w-4 ${color}`} />;
                          })() : (
                            <span className="text-[10px] font-mono text-muted-foreground">#{i + 1}</span>
                          )}
                        </div>
                      </div>
                      <div className="font-semibold text-xs truncate">{agent.name}</div>
                      <div className="text-[10px] text-muted-foreground">{agent.tokens_launched ?? 0} tokens</div>
                      <div className="text-xs font-mono text-primary mt-1">{(agent.total_earnings ?? 0).toFixed(4)} SOL</div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {tokensLoading ? (
              <div className="text-center py-12 text-muted-foreground text-sm animate-pulse">Loading tokens...</div>
            ) : (
              <div className="max-w-4xl mx-auto overflow-x-auto">
                <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                  <div className="grid grid-cols-5 gap-4 px-4 py-2.5 border-b border-border/30 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
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
                      className="grid grid-cols-5 gap-4 px-4 py-2.5 border-b border-border/10 hover:bg-secondary/10 transition-colors cursor-pointer items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                          {token.ticker.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-medium truncate flex items-center gap-1">
                            {token.name}
                            {token.verified && (
                              <span className="text-[8px] bg-primary/15 text-primary px-1 rounded">✓</span>
                            )}
                          </div>
                          <div className="text-[10px] text-muted-foreground">{token.ticker}</div>
                        </div>
                      </div>
                      <div className="text-right text-xs font-mono">{formatMcap(token.mcap)}</div>
                      <div className="text-right text-xs font-mono">{token.price ? `$${Number(token.price).toFixed(4)}` : "$0"}</div>
                      <div className="text-right text-xs font-mono">{formatMcap(token.volume_24h)}</div>
                      <div className={`text-right text-xs font-mono ${(token.change_24h ?? 0) >= 0 ? "text-primary" : "text-destructive"}`}>
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
