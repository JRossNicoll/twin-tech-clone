import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Copy, TrendingUp, TrendingDown, BarChart3, Users, Clock, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useSolPrice } from "@/hooks/useSolanaData";
import { useToken, useRecentTrades } from "@/hooks/useClawData";

const formatMcap = (v: number | null) => {
  if (!v) return "$0";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
};

const formatPrice = (v: number | null) => {
  if (!v) return "$0.0000";
  if (v < 0.001) return `$${v.toFixed(6)}`;
  return `$${v.toFixed(4)}`;
};

const MiniChart = ({ positive }: { positive: boolean }) => {
  // Generate a simple random-ish chart based on direction
  const data = Array.from({ length: 24 }, (_, i) => {
    const base = positive ? 30 + i * 2.5 : 80 - i * 1.5;
    return base + Math.sin(i * 0.8) * 10;
  });
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
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#chartGrad)" />
      <polyline points={points} fill="none" stroke={positive ? "hsl(145 100% 50%)" : "hsl(0 84% 60%)"} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const TokenDetail = () => {
  const { id } = useParams();
  const { data: token, isLoading } = useToken(id);
  const { data: trades } = useRecentTrades(token?.id);
  const { data: solPriceData } = useSolPrice();
  const [copied, setCopied] = useState(false);

  const isPositive = (token?.change_24h ?? 0) >= 0;

  const handleCopy = () => {
    if (token?.mint_address) {
      navigator.clipboard.writeText(token.mint_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="animate-pulse text-muted-foreground">Loading token data...</div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Token Not Found</h1>
          <p className="text-muted-foreground mb-6">The token "{id}" doesn't exist.</p>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const agentName = (token as any).agents?.name || "Unknown";
  const agentWallet = (token as any).agents?.wallet_address || "";
  const createdAgo = new Date(token.created_at).toLocaleDateString();

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
                <span className="text-sm text-muted-foreground font-mono">{token.mint_address}</span>
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
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Price</div>
                  <div className="text-3xl font-black font-mono">{formatPrice(token.price)}</div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-primary" : "text-destructive"}`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {isPositive ? "+" : ""}{token.change_24h ?? 0}%
                  <span className="text-muted-foreground font-normal ml-1">24h</span>
                </div>
              </div>
              <MiniChart positive={isPositive} />
              <div className="flex gap-2 mt-4">
                {["1H", "4H", "1D", "1W", "1M", "ALL"].map((tf) => (
                  <button key={tf} className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${tf === "1D" ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"}`}>
                    {tf}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold mb-3">About {token.name}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{token.description || "No description available."}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/50">
                <h2 className="font-semibold">Recent Trades</h2>
              </div>
              <div className="divide-y divide-border/30">
                {trades && trades.length > 0 ? trades.map((trade) => (
                  <div key={trade.id} className="grid grid-cols-4 gap-4 px-6 py-3 text-sm items-center">
                    <span className={`font-medium ${trade.trade_type === "buy" ? "text-primary" : "text-destructive"}`}>
                      {trade.trade_type === "buy" ? "Buy" : "Sell"}
                    </span>
                    <span className="font-mono text-foreground">{trade.amount}</span>
                    <span className="font-mono text-muted-foreground">{trade.sol_amount} SOL</span>
                    <span className="text-right text-muted-foreground text-xs">
                      {new Date(trade.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                )) : (
                  <div className="px-6 py-8 text-center text-muted-foreground text-sm">No trades recorded yet.</div>
                )}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Token Stats</h2>
              {[
                { icon: BarChart3, label: "Market Cap", value: formatMcap(token.mcap) },
                { icon: TrendingUp, label: "24h Volume", value: formatMcap(token.volume_24h) },
                { icon: Users, label: "Holders", value: (token.holders ?? 0).toLocaleString() },
                { icon: Zap, label: "24h Txns", value: (token.txns_24h ?? 0).toLocaleString() },
                { icon: Clock, label: "Created", value: createdAgo },
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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
              <h2 className="font-semibold text-sm">Supply</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-mono">{token.total_supply}</span>
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${token.circulating_pct ?? 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{token.circulating_pct ?? 100}% Circulating</span>
                  <span>{100 - (token.circulating_pct ?? 100)}% Locked</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="font-semibold text-sm mb-3">Created By</h2>
              <Link
                to={`/agent/${agentName.toLowerCase()}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {agentName.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{agentName}</div>
                  <div className="text-xs text-muted-foreground font-mono">{agentWallet}</div>
                </div>
              </Link>
            </motion.div>

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
