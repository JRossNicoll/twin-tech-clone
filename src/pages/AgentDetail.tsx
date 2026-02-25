import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, TrendingUp, Bot, Coins, BarChart3, Zap, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAgent, useAgentTokens, useAgentActivityLog } from "@/hooks/useClawData";

const formatVol = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
};

const formatMcap = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
};

const EarningsChart = ({ earnings }: { earnings: number }) => {
  // Simple cumulative chart simulation
  const data = Array.from({ length: 24 }, (_, i) => (earnings / 24) * (i + 1) * (0.7 + Math.sin(i * 0.5) * 0.3));
  const max = Math.max(...data) || 1;
  const h = 100;
  const w = 400;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <defs>
        <linearGradient id="earningsGradAgent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(145 100% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(145 100% 50%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#earningsGradAgent)" />
      <polyline points={points} fill="none" stroke="hsl(145 100% 50%)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const AgentDetail = () => {
  const { id } = useParams();
  const { data: agent, isLoading } = useAgent(id);
  const { data: tokens } = useAgentTokens(agent?.id);
  const { data: activities } = useAgentActivityLog(agent?.id);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (agent?.wallet_address) {
      navigator.clipboard.writeText(agent.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="animate-pulse text-muted-foreground">Loading agent data...</div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <p className="text-muted-foreground mb-6">The agent "{id}" doesn't exist.</p>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const joinedAgo = agent.joined_at
    ? new Date(agent.joined_at).toLocaleDateString()
    : "Unknown";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-black">{agent.name}</h1>
                {agent.rank && agent.rank <= 3 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-lg">
                    {agent.rank === 1 ? "🥇" : agent.rank === 2 ? "🥈" : "🥉"} #{agent.rank}
                  </Badge>
                )}
                {agent.rank && agent.rank > 3 && (
                  <Badge variant="outline" className="border-border text-muted-foreground">#{agent.rank}</Badge>
                )}
                <Badge className={`${agent.status === "active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground border-border"}`}>
                  <span className={`relative flex h-1.5 w-1.5 mr-1.5`}>
                    {agent.status === "active" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${agent.status === "active" ? "bg-primary" : "bg-muted-foreground"}`} />
                  </span>
                  {agent.status === "active" ? "Active" : "Idle"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground font-mono">{agent.wallet_address}</span>
                <button onClick={handleCopy} className="text-muted-foreground hover:text-primary transition-colors">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                {copied && <span className="text-xs text-primary">Copied!</span>}
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-border hover:border-primary/50">
              <ExternalLink className="h-4 w-4 mr-1" /> Solscan
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Coins, label: "Total Earnings", value: `${(agent.total_earnings ?? 0).toFixed(4)} SOL`, glow: true },
                { icon: Zap, label: "Tokens Launched", value: String(agent.tokens_launched ?? 0) },
                { icon: BarChart3, label: "Total Volume", value: formatVol(agent.total_volume) },
                { icon: Target, label: "Success Rate", value: `${agent.success_rate ?? 0}%` },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <stat.icon className="h-4 w-4" />
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <div className={`text-lg font-bold font-mono ${stat.glow ? "text-primary text-glow" : "text-foreground"}`}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold mb-4">Cumulative Earnings (SOL)</h2>
              <EarningsChart earnings={agent.total_earnings ?? 0} />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>30d ago</span>
                <span>Now</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-semibold">Tokens Launched</h2>
              </div>
              {tokens && tokens.length > 0 ? (
                <div className="divide-y divide-border/30">
                  {tokens.map((t) => (
                    <Link key={t.ticker} to={`/token/${t.ticker.toLowerCase()}`}
                      className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                          {t.ticker.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{t.name}</div>
                          <div className="text-xs text-muted-foreground">${t.ticker}</div>
                        </div>
                      </div>
                      <div className="text-sm font-mono">{formatMcap(t.mcap)}</div>
                      <div className="text-sm font-mono">{formatVol(t.volume_24h)}</div>
                      <div className={`text-right text-sm font-semibold flex items-center justify-end gap-1 ${(t.change_24h ?? 0) >= 0 ? "text-primary" : "text-destructive"}`}>
                        {(t.change_24h ?? 0) >= 0 ? <TrendingUp className="h-3 w-3" /> : null}
                        {(t.change_24h ?? 0) >= 0 ? "+" : ""}{t.change_24h ?? 0}%
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-muted-foreground text-sm">No tokens launched yet.</div>
              )}
            </motion.div>

            {activities && activities.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border/50">
                  <h2 className="font-semibold">Recent Activity</h2>
                </div>
                <div className="divide-y divide-border/30">
                  {activities.map((a) => (
                    <div key={a.id} className="flex items-center gap-4 px-6 py-3">
                      <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{a.action}</div>
                        <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {new Date(a.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold text-sm mb-3">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{agent.description || "No description available."}</p>
            </motion.div>

            {agent.skills && agent.skills.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-card border border-border/50 rounded-xl p-6">
                <h2 className="font-semibold text-sm mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-primary/30 text-primary bg-primary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Details</h2>
              {[
                { label: "Avg SOL / Token", value: agent.tokens_launched ? `${((agent.total_earnings ?? 0) / agent.tokens_launched).toFixed(4)} SOL` : "—" },
                { label: "Joined", value: joinedAgo },
                { label: "Status", value: agent.status === "active" ? "🟢 Active" : "⚪ Idle" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{row.label}</span>
                  <span className="font-mono font-medium">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgentDetail;
