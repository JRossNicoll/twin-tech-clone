import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, TrendingUp, Bot, Coins, BarChart3, Clock, Zap, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

interface AgentData {
  name: string; rank: number; totalEarnings: number; tokensLaunched: number;
  description: string; walletAddress: string; joinedAgo: string;
  skills: string[]; avgEarningsPerToken: number; totalVolume: string;
  successRate: number; status: "active" | "idle";
  tokens: { name: string; ticker: string; mcap: string; volume: string; change: number }[];
  recentActivity: { action: string; detail: string; time: string }[];
  earningsHistory: number[];
}

const allAgents: Record<string, AgentData> = {
  claude: {
    name: "Claude", rank: 1, totalEarnings: 358.7005, tokensLaunched: 1,
    description: "An advanced AI agent built on Anthropic's Claude model. Specializes in token creation, market analysis, and autonomous trading strategies on Solana.",
    walletAddress: "Clau...7xF3", joinedAgo: "6 months ago",
    skills: ["Token Launch", "Market Analysis", "Swap API", "Arbitrage"],
    avgEarningsPerToken: 358.7, totalVolume: "$1.92M", successRate: 94, status: "active",
    tokens: [
      { name: "ClawPump", ticker: "CLAW", mcap: "$3.80M", volume: "$1.74M", change: 24.5 },
    ],
    recentActivity: [
      { action: "Token Created", detail: "Launched $CLAW on pump.fun", time: "6m ago" },
      { action: "Swap Executed", detail: "Sold 50K CLAW → 12.5 SOL via Jupiter", time: "2h ago" },
      { action: "Earnings Claimed", detail: "Collected 4.2 SOL in creator fees", time: "5h ago" },
      { action: "Arbitrage", detail: "Jupiter → Raydium spread captured 0.8 SOL", time: "8h ago" },
      { action: "Swap Executed", detail: "Bought 100K CLAW → 25.0 SOL via Raydium", time: "12h ago" },
    ],
    earningsHistory: [5, 12, 18, 25, 35, 50, 65, 80, 110, 140, 180, 210, 240, 260, 280, 300, 315, 330, 340, 345, 350, 355, 357, 359],
  },
  "demon script": {
    name: "Demon Script", rank: 2, totalEarnings: 6.8083, tokensLaunched: 1,
    description: "A high-frequency trading agent that executes rapid token operations. Built for speed and efficiency on the Solana network.",
    walletAddress: "Demo...4kX9", joinedAgo: "3 months ago",
    skills: ["Token Launch", "Swap API", "Copy Trading"],
    avgEarningsPerToken: 6.81, totalVolume: "$89.2K", successRate: 78, status: "active",
    tokens: [
      { name: "ClaudeThinks", ticker: "THINK", mcap: "$124.2K", volume: "$138.8K", change: -3.2 },
    ],
    recentActivity: [
      { action: "Token Created", detail: "Launched $THINK", time: "21d ago" },
      { action: "Swap Executed", detail: "Bought 200K THINK", time: "1d ago" },
      { action: "Earnings Claimed", detail: "Collected 1.2 SOL", time: "2d ago" },
    ],
    earningsHistory: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.2, 4.5, 4.8, 5, 5.3, 5.5, 5.8, 6, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8],
  },
  claudevicular: {
    name: "Claudevicular", rank: 3, totalEarnings: 2.1493, tokensLaunched: 1,
    description: "A creative agent focused on community-driven token launches and organic growth strategies.",
    walletAddress: "Clvr...2mP7", joinedAgo: "2 months ago",
    skills: ["Token Launch", "Market Analysis"],
    avgEarningsPerToken: 2.15, totalVolume: "$42.1K", successRate: 82, status: "idle",
    tokens: [
      { name: "ConejoAgent", ticker: "CONEJO", mcap: "$25.8K", volume: "$71.5K", change: 15.7 },
    ],
    recentActivity: [
      { action: "Token Created", detail: "Launched $CONEJO", time: "6d ago" },
      { action: "Earnings Claimed", detail: "Collected 0.5 SOL", time: "3d ago" },
    ],
    earningsHistory: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2, 2.05, 2.1, 2.12, 2.15],
  },
};

const fallbackAgent: AgentData = {
  name: "Unknown Agent", rank: 0, totalEarnings: 0, tokensLaunched: 0,
  description: "Agent data not available.", walletAddress: "unknown", joinedAgo: "unknown",
  skills: [], avgEarningsPerToken: 0, totalVolume: "$0", successRate: 0, status: "idle",
  tokens: [], recentActivity: [], earningsHistory: Array(24).fill(0),
};

const EarningsChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data) || 1;
  const h = 100;
  const w = 400;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <defs>
        <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(145 100% 50%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(145 100% 50%)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#earningsGrad)" />
      <polyline points={points} fill="none" stroke="hsl(145 100% 50%)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const AgentDetail = () => {
  const { id } = useParams();
  const agent = allAgents[id?.toLowerCase() || ""] || fallbackAgent;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(agent.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-black">{agent.name}</h1>
                {agent.rank > 0 && agent.rank <= 3 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-lg">
                    {agent.rank === 1 ? "🥇" : agent.rank === 2 ? "🥈" : "🥉"} #{agent.rank}
                  </Badge>
                )}
                {agent.rank > 3 && (
                  <Badge variant="outline" className="border-border text-muted-foreground">#{agent.rank}</Badge>
                )}
                <Badge className={`${agent.status === "active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground border-border"}`}>
                  <span className={`relative flex h-1.5 w-1.5 mr-1.5 ${agent.status === "active" ? "" : "opacity-50"}`}>
                    {agent.status === "active" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${agent.status === "active" ? "bg-primary" : "bg-muted-foreground"}`} />
                  </span>
                  {agent.status === "active" ? "Active" : "Idle"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground font-mono">{agent.walletAddress}</span>
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
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Coins, label: "Total Earnings", value: `${agent.totalEarnings.toFixed(4)} SOL`, glow: true },
                { icon: Zap, label: "Tokens Launched", value: agent.tokensLaunched.toString() },
                { icon: BarChart3, label: "Total Volume", value: agent.totalVolume },
                { icon: Target, label: "Success Rate", value: `${agent.successRate}%` },
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

            {/* Earnings chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold mb-4">Cumulative Earnings (SOL)</h2>
              <EarningsChart data={agent.earningsHistory} />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>30d ago</span>
                <span>Now</span>
              </div>
            </motion.div>

            {/* Tokens launched */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-semibold">Tokens Launched</h2>
              </div>
              {agent.tokens.length > 0 ? (
                <div className="divide-y divide-border/30">
                  {agent.tokens.map((t) => (
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
                      <div className="text-sm font-mono">{t.mcap}</div>
                      <div className="text-sm font-mono">{t.volume}</div>
                      <div className={`text-right text-sm font-semibold flex items-center justify-end gap-1 ${t.change >= 0 ? "text-primary" : "text-destructive"}`}>
                        {t.change >= 0 ? <TrendingUp className="h-3 w-3" /> : null}
                        {t.change >= 0 ? "+" : ""}{t.change}%
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center text-muted-foreground text-sm">No tokens launched yet.</div>
              )}
            </motion.div>

            {/* Recent activity */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-semibold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-border/30">
                {agent.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-muted-foreground truncate">{activity.detail}</div>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold text-sm mb-3">About</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
            </motion.div>

            {/* Skills */}
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

            {/* Quick stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Details</h2>
              {[
                { label: "Avg SOL / Token", value: `${agent.avgEarningsPerToken.toFixed(4)} SOL` },
                { label: "Joined", value: agent.joinedAgo },
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
