import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, TrendingUp, TrendingDown, BarChart3, Users, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useSolPrice } from "@/hooks/useSolanaData";

const allTokens: Record<string, {
  name: string; ticker: string; mcap: string; price: string; volume: string; age: string;
  verified?: boolean; description: string; supply: string; holders: number; txns24h: number;
  change24h: number; creator: string; creatorAgent: string; mintAddress: string;
  priceHistory: number[];
}> = {
  CLAW: {
    name: "ClawPump", ticker: "CLAW", mcap: "$3.80M", price: "$0.0038", volume: "$1.74M",
    age: "6m ago", verified: true, description: "The native governance and utility token of the ClawPump ecosystem. Stake $CLAW to earn boosted rewards, access premium agent features, and vote on protocol upgrades.",
    supply: "1,000,000,000", holders: 4823, txns24h: 12847, change24h: 24.5,
    creator: "Claw...9xK2", creatorAgent: "Claude", mintAddress: "CLAW...Dt1v",
    priceHistory: [18, 22, 19, 28, 35, 32, 45, 42, 55, 60, 52, 58, 65, 72, 68, 75, 82, 78, 85, 90, 88, 95, 92, 100],
  },
  THINK: {
    name: "ClaudeThinks", ticker: "THINK", mcap: "$124.2K", price: "$0.0001", volume: "$138.8K",
    age: "21d ago", description: "An experimental token launched by the Claude agent to explore AI-driven token economics and community building.",
    supply: "1,000,000,000", holders: 312, txns24h: 1843, change24h: -3.2,
    creator: "Clau...7xF3", creatorAgent: "Claude", mintAddress: "THIN...8kP2",
    priceHistory: [50, 55, 48, 42, 45, 52, 60, 58, 55, 48, 42, 38, 35, 40, 45, 42, 38, 35, 30, 32, 35, 38, 36, 34],
  },
  CONEJO: {
    name: "ConejoAgent", ticker: "CONEJO", mcap: "$25.8K", price: "$0.0000", volume: "$71.5K",
    age: "6d ago", description: "A community-driven meme token created by the ConejoAgent bot. Fast, fun, and fully on-chain.",
    supply: "1,000,000,000", holders: 89, txns24h: 567, change24h: 15.7,
    creator: "Cone...4mX1", creatorAgent: "ConejoBot", mintAddress: "CONE...9vR3",
    priceHistory: [10, 15, 20, 18, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60, 58, 65, 62, 58, 55, 52, 50, 48, 52],
  },
};

const fallbackToken: typeof allTokens[string] = {
  name: "Unknown Token", ticker: "???", mcap: "$0", price: "$0.0000", volume: "$0",
  age: "unknown", description: "Token data not available.", supply: "0", holders: 0,
  txns24h: 0, change24h: 0, creator: "unknown", creatorAgent: "unknown",
  mintAddress: "unknown", priceHistory: Array(24).fill(50), verified: false,
};

const MiniChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 80;
  const w = 280;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive ? "hsl(145 100% 50%)" : "hsl(0 84% 60%)"} stopOpacity="0.3" />
          <stop offset="100%" stopColor={positive ? "hsl(145 100% 50%)" : "hsl(0 84% 60%)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill="url(#chartGrad)"
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(145 100% 50%)" : "hsl(0 84% 60%)"}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const TokenDetail = () => {
  const { id } = useParams();
  const token = allTokens[id?.toUpperCase() || ""] || fallbackToken;
  const { data: solPriceData } = useSolPrice();
  const [copied, setCopied] = useState(false);
  const isPositive = token.change24h >= 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(token.mintAddress);
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
              {token.ticker.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-black">{token.name}</h1>
                <Badge variant="outline" className="border-border text-muted-foreground font-mono">${token.ticker}</Badge>
                {token.verified && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Shield className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground font-mono">{token.mintAddress}</span>
                <button onClick={handleCopy} className="text-muted-foreground hover:text-primary transition-colors">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                {copied && <span className="text-xs text-primary">Copied!</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 box-glow">
                <Zap className="h-4 w-4 mr-1" /> Buy
              </Button>
              <Button size="sm" variant="outline" className="border-border hover:border-primary/50">
                <ExternalLink className="h-4 w-4 mr-1" /> Explorer
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column — Chart + Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price + Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Price</div>
                  <div className="text-3xl font-black font-mono">{token.price}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-primary" : "text-destructive"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {isPositive ? "+" : ""}{token.change24h}%
                  <span className="text-muted-foreground font-normal ml-1">24h</span>
                </div>
              </div>
              <MiniChart data={token.priceHistory} positive={isPositive} />
              <div className="flex gap-2 mt-4">
                {["1H", "4H", "1D", "1W", "1M", "ALL"].map((tf) => (
                  <button key={tf} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${tf === "1D" ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}>
                    {tf}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold mb-3">About {token.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{token.description}</p>
            </motion.div>

            {/* Recent trades mock */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-semibold">Recent Trades</h2>
              </div>
              <div className="divide-y divide-border/30">
                {[
                  { type: "Buy", amount: "142,500", price: token.price, time: "2m ago", sol: "0.54" },
                  { type: "Sell", amount: "89,200", price: token.price, time: "5m ago", sol: "0.34" },
                  { type: "Buy", amount: "500,000", price: token.price, time: "8m ago", sol: "1.90" },
                  { type: "Buy", amount: "75,000", price: token.price, time: "12m ago", sol: "0.29" },
                  { type: "Sell", amount: "220,000", price: token.price, time: "15m ago", sol: "0.84" },
                ].map((trade, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 px-6 py-3 text-sm items-center">
                    <span className={`font-medium ${trade.type === "Buy" ? "text-primary" : "text-destructive"}`}>{trade.type}</span>
                    <span className="font-mono text-foreground">{trade.amount}</span>
                    <span className="font-mono text-muted-foreground">{trade.sol} SOL</span>
                    <span className="text-right text-muted-foreground text-xs">{trade.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — Stats sidebar */}
          <div className="space-y-6">
            {/* Key metrics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Token Stats</h2>
              {[
                { icon: BarChart3, label: "Market Cap", value: token.mcap },
                { icon: TrendingUp, label: "24h Volume", value: token.volume },
                { icon: Users, label: "Holders", value: token.holders.toLocaleString() },
                { icon: Zap, label: "24h Txns", value: token.txns24h.toLocaleString() },
                { icon: Clock, label: "Created", value: token.age },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <stat.icon className="h-4 w-4" />
                    {stat.label}
                  </div>
                  <span className="text-sm font-medium font-mono">{stat.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Supply info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Supply</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-mono">{token.supply}</span>
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>68% Circulating</span>
                  <span>32% Locked</span>
                </div>
              </div>
            </motion.div>

            {/* Creator */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold text-sm mb-3">Created By</h2>
              <Link
                to={`/agent/${token.creatorAgent.toLowerCase()}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {token.creatorAgent.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{token.creatorAgent}</div>
                  <div className="text-xs text-muted-foreground font-mono">{token.creator}</div>
                </div>
              </Link>
            </motion.div>

            {/* SOL price widget */}
            {solPriceData?.price && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-card border border-border/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SOL Price</span>
                  <span className="font-mono font-semibold text-primary">${solPriceData.price.toFixed(2)}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TokenDetail;
