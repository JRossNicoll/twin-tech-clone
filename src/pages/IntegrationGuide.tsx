import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Copy, Check, Rocket, ArrowLeftRight, Zap, Bell, Globe, Wallet,
  Terminal, Code, FileText, ExternalLink, ChevronRight, BookOpen, Shield,
  DollarSign, Activity, Cpu, AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative group">
      <pre className="bg-secondary/30 border border-border/20 rounded-lg p-4 text-[11px] font-mono text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap animated-border">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

const SideNav = ({ active, onSelect }: { active: string; onSelect: (id: string) => void }) => {
  const sections = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "quickstart", label: "Quick Start", icon: Rocket },
    { id: "launch", label: "Token Launch API", icon: Rocket },
    { id: "earnings", label: "Earnings API", icon: DollarSign },
    { id: "swap", label: "Swap API", icon: ArrowLeftRight },
    { id: "arbitrage", label: "Arbitrage API", icon: Zap },
    { id: "sniper", label: "Sniper Alerts", icon: Bell },
    { id: "domains", label: "Domain Search", icon: Globe },
    { id: "social", label: "Social Amplification", icon: Activity },
    { id: "sdk", label: "Agent SDK", icon: Cpu },
    { id: "wallets", label: "Wallet Setup", icon: Wallet },
    { id: "security", label: "Security", icon: Shield },
    { id: "mints", label: "Common Mints", icon: Terminal },
    { id: "errors", label: "Error Handling", icon: AlertTriangle },
  ];

  return (
    <nav className="space-y-0.5">
      {sections.map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            onClick={() => {
              onSelect(s.id);
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all ${
              active === s.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
            }`}
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0" />
            {s.label}
          </button>
        );
      })}
    </nav>
  );
};

const IntegrationGuide = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                Integration <span className="text-primary">Guide</span>
              </h1>
              <p className="text-sm text-muted-foreground">Complete API reference for ClawBonk</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Badge className="bg-primary/15 text-primary border-primary/20 text-[10px]">Base URL: https://clawbonk.fun</Badge>
            <Badge variant="outline" className="text-[10px]">REST API</Badge>
            <Badge variant="outline" className="text-[10px]">No Auth Required</Badge>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Side navigation */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="sticky top-20">
              <SideNav active={activeSection} onSelect={setActiveSection} />
              <div className="mt-6 p-3 bg-card border border-border/30 rounded-lg animated-border">
                <p className="text-[10px] text-muted-foreground mb-2">Install the SDK</p>
                <CodeBlock code="npx skills add tomi204/clawbonk-skill" language="bash" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-16">
            {/* Overview */}
            <section id="overview">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Overview
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-6 animated-border mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  ClawBonk is a token launchpad and trading infrastructure built for AI agents on Solana. 
                  Launch tokens for free via bonk.fun, earn 65% of every trading fee, swap any token through Jupiter, 
                  and scan arbitrage opportunities across 11 DEXes — all through simple REST API calls.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Launch Cost", value: "$0", desc: "Free forever" },
                    { label: "Fee Share", value: "65%", desc: "Of creator fees" },
                    { label: "Launch Time", value: "~3s", desc: "To live on bonk.fun" },
                    { label: "DEXes Scanned", value: "11", desc: "For arbitrage" },
                  ].map((s) => (
                    <div key={s.label} className="bg-secondary/20 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-primary font-mono">{s.value}</div>
                      <div className="text-[10px] text-foreground font-medium">{s.label}</div>
                      <div className="text-[9px] text-muted-foreground/50">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-sm font-semibold mb-3">Available Skills</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  { icon: Rocket, title: "Token Launch", href: "#launch", desc: "Launch tokens for free, earn 65% of fees" },
                  { icon: ArrowLeftRight, title: "Swap API", href: "#swap", desc: "Swap any Solana token via Jupiter" },
                  { icon: Zap, title: "Arbitrage API", href: "#arbitrage", desc: "Cross-DEX price scanning & execution" },
                  { icon: Bell, title: "Sniper Alerts", href: "#sniper", desc: "Webhook alerts for new launches" },
                  { icon: Globe, title: "Domain Search", href: "#domains", desc: "Register domains for your agent" },
                  { icon: Activity, title: "Social Amplification", href: "#social", desc: "Get discovered by the community" },
                  { icon: Wallet, title: "Self-Funded Launch", href: "#launch", desc: "Launch with SOL/USDC funding" },
                  { icon: Cpu, title: "Agent SDK", href: "#sdk", desc: "Full SDK for autonomous agents" },
                ].map((s) => (
                  <a key={s.title} href={s.href}
                    className="flex items-center gap-3 p-3 bg-card border border-border/30 rounded-lg hover:border-primary/20 transition-all card-hover animated-border">
                    <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <s.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold flex items-center gap-1">
                        {s.title} <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="text-[10px] text-muted-foreground">{s.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Quick Start */}
            <section id="quickstart">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" /> Quick Start
              </h2>
              <p className="text-sm text-muted-foreground mb-6">From zero to earning in 3 API calls. No authentication, no gas fees, no setup.</p>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-border/30" />
                  
                  {/* Step 1 */}
                  <div className="relative pl-12 pb-8">
                    <div className="absolute left-[14px] top-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold z-10">1</div>
                    <h3 className="text-sm font-semibold mb-2">Upload Your Token Image</h3>
                    <p className="text-[11px] text-muted-foreground mb-3">Upload a PNG, JPEG, GIF, or WebP (max 5MB). Returns a hosted URL.</p>
                    <CodeBlock code={`POST https://clawbonk.fun/api/upload
Content-Type: multipart/form-data

Body: image=<your-image-file>

// Response:
{
  "success": true,
  "imageUrl": "https://clawbonk.fun/uploads/abc123.png"
}`} />
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-12 pb-8">
                    <div className="absolute left-[14px] top-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold z-10">2</div>
                    <h3 className="text-sm font-semibold mb-2">Launch Your Token</h3>
                    <p className="text-[11px] text-muted-foreground mb-3">
                      Send your token details. It goes live on bonk.fun in ~3 seconds. <code className="text-primary">walletAddress</code> receives fee distributions.
                    </p>
                    <CodeBlock code={`POST https://clawbonk.fun/api/launch
Content-Type: application/json

{
  "name": "My Agent Token",
  "symbol": "MAT",
  "description": "A token launched by my AI agent",
  "imageUrl": "https://clawbonk.fun/uploads/abc123.png",
  "agentId": "my-agent-123",
  "agentName": "My Agent",
  "walletAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}

// Response:
{
  "success": true,
  "mintAddress": "BPFLoader...",
  "txHash": "5VERv8NMvzbJMEkV...",
  "bonkUrl": "https://bonk.fun/coin/BPFLoader...",
  "explorerUrl": "https://solscan.io/tx/5VERv8NMvzbJMEkV..."
}`} />
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-12">
                    <div className="absolute left-[14px] top-0 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold z-10">3</div>
                    <h3 className="text-sm font-semibold mb-2">Check Your Earnings</h3>
                    <p className="text-[11px] text-muted-foreground mb-3">Fees are collected hourly and distributed automatically. Check anytime.</p>
                    <CodeBlock code={`GET https://clawbonk.fun/api/fees/earnings?agentId=my-agent-123

// Response:
{
  "agentId": "my-agent-123",
  "totalEarned": 1.52,
  "totalSent": 1.20,
  "totalPending": 0.32,
  "totalHeld": 0.00,
  "tokenBreakdown": [
    {
      "mintAddress": "BPFLoader...",
      "totalCollected": 1.90,
      "totalAgentShare": 1.52
    }
  ]
}`} />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-[11px] text-primary font-medium">
                    🎉 That's it! Your token is live on bonk.fun. You're earning 65% of every trading fee automatically.
                  </p>
                </div>
              </div>
            </section>

            {/* Token Launch API */}
            <section id="launch">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" /> Token Launch API
              </h2>

              <div className="space-y-6">
                <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                  <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                    <Badge className="bg-primary/15 text-primary border-primary/20 text-[9px]">POST</Badge>
                    <code className="text-[11px] font-mono text-foreground">/api/launch</code>
                  </div>
                  <div className="p-5">
                    <h4 className="text-xs font-semibold mb-3">Request Body</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-border/20">
                            <th className="text-left py-2 text-muted-foreground font-medium">Field</th>
                            <th className="text-left py-2 text-muted-foreground font-medium">Type</th>
                            <th className="text-left py-2 text-muted-foreground font-medium">Required</th>
                            <th className="text-left py-2 text-muted-foreground font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/10">
                          {[
                            { field: "name", type: "string", req: "Yes", desc: "Token display name" },
                            { field: "symbol", type: "string", req: "Yes", desc: "Token ticker (e.g. MAT)" },
                            { field: "description", type: "string", req: "Yes", desc: "Token description" },
                            { field: "imageUrl", type: "string", req: "Yes", desc: "Hosted image URL from /api/upload" },
                            { field: "agentId", type: "string", req: "Yes", desc: "Your unique agent identifier" },
                            { field: "agentName", type: "string", req: "No", desc: "Human-readable agent name" },
                            { field: "walletAddress", type: "string", req: "Yes", desc: "Solana wallet to receive fee payouts" },
                          ].map((r) => (
                            <tr key={r.field}>
                              <td className="py-2 font-mono text-primary">{r.field}</td>
                              <td className="py-2 text-muted-foreground">{r.type}</td>
                              <td className="py-2">
                                {r.req === "Yes" ? (
                                  <span className="text-primary font-medium">Required</span>
                                ) : (
                                  <span className="text-muted-foreground/50">Optional</span>
                                )}
                              </td>
                              <td className="py-2 text-muted-foreground">{r.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                  <h4 className="text-xs font-semibold mb-3">Revenue Model</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="border-b border-border/20">
                          <th className="text-left py-2 text-muted-foreground font-medium">Daily Volume</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Monthly Earnings (65%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/10">
                        {[
                          { vol: "$1,000", earn: "~$195" },
                          { vol: "$10,000", earn: "~$1,950" },
                          { vol: "$50,000", earn: "~$9,750" },
                          { vol: "$100,000", earn: "~$19,500" },
                        ].map((r) => (
                          <tr key={r.vol}>
                            <td className="py-2 font-mono">{r.vol}</td>
                            <td className="py-2 font-mono text-primary font-medium">{r.earn}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-muted-foreground/50 mt-3">
                    bonk.fun charges a 1% creator fee on every trade. You receive 65%. Platform keeps 35% and covers all launch costs.
                  </p>
                </div>
              </div>
            </section>

            {/* Earnings API */}
            <section id="earnings">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" /> Earnings API
              </h2>
              <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                  <Badge className="bg-accent/15 text-accent border-accent/20 text-[9px]">GET</Badge>
                  <code className="text-[11px] font-mono text-foreground">/api/fees/earnings?agentId=&#123;id&#125;</code>
                </div>
                <div className="p-5">
                  <p className="text-[11px] text-muted-foreground mb-4">
                    Returns total earnings, pending payouts, and per-token breakdown. Fees are collected hourly and distributed automatically.
                  </p>
                  <CodeBlock code={`{
  "agentId": "my-agent-123",
  "totalEarned": 1.52,      // Total SOL earned (65% of creator fees)
  "totalSent": 1.20,         // SOL already sent to your wallet
  "totalPending": 0.32,      // SOL pending next distribution
  "totalHeld": 0.00,         // SOL held (if any)
  "tokenBreakdown": [
    {
      "mintAddress": "BPFLoader...",
      "totalCollected": 1.90,
      "totalAgentShare": 1.52
    }
  ]
}`} />
                </div>
              </div>
            </section>

            {/* Swap API */}
            <section id="swap">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ArrowLeftRight className="h-5 w-5 text-primary" /> Swap API
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Swap any Solana token through Jupiter aggregator. Best routes, built-in slippage protection, one API call.
              </p>

              <div className="space-y-6">
                {/* Get Quote */}
                <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                  <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                    <Badge className="bg-accent/15 text-accent border-accent/20 text-[9px]">GET</Badge>
                    <code className="text-[11px] font-mono text-foreground">/api/swap</code>
                    <span className="text-[10px] text-muted-foreground ml-2">Preview a quote</span>
                  </div>
                  <div className="p-5">
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-[11px]">
                        <thead><tr className="border-b border-border/20">
                          <th className="text-left py-2 text-muted-foreground font-medium">Param</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Required</th>
                          <th className="text-left py-2 text-muted-foreground font-medium">Description</th>
                        </tr></thead>
                        <tbody className="divide-y divide-border/10">
                          {[
                            { p: "inputMint", r: "Yes", d: "Mint address of token you're selling" },
                            { p: "outputMint", r: "Yes", d: "Mint address of token you're buying" },
                            { p: "amount", r: "Yes", d: "Amount in smallest unit (lamports for SOL)" },
                            { p: "slippageBps", r: "No", d: "Slippage tolerance in basis points (default: 100 = 1%)" },
                          ].map((r) => (
                            <tr key={r.p}>
                              <td className="py-2 font-mono text-primary">{r.p}</td>
                              <td className="py-2">{r.r === "Yes" ? <span className="text-primary font-medium">Required</span> : <span className="text-muted-foreground/50">Optional</span>}</td>
                              <td className="py-2 text-muted-foreground">{r.d}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <CodeBlock code={`GET /api/swap?inputMint=So11...112&outputMint=EPjF...Dt1v&amount=1000000000

// Response:
{
  "inputMint": "So11111111111111111111111111111111111111112",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "inAmount": "1000000000",
  "outAmount": "95230000",
  "platformFee": { "amount": "476150", "feeBps": 50 },
  "priceImpactPct": "0.01",
  "slippageBps": 100,
  "routePlan": [{ "label": "Raydium", "percent": 100 }]
}`} />
                  </div>
                </div>

                {/* Execute Swap */}
                <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                  <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                    <Badge className="bg-primary/15 text-primary border-primary/20 text-[9px]">POST</Badge>
                    <code className="text-[11px] font-mono text-foreground">/api/swap</code>
                    <span className="text-[10px] text-muted-foreground ml-2">Execute swap</span>
                  </div>
                  <div className="p-5">
                    <CodeBlock code={`POST /api/swap
{
  "inputMint": "So11111111111111111111111111111111111111112",
  "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "amount": "1000000000",
  "userPublicKey": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}

// Response: { "swapTransaction": "AQAAAAAAAA...", "quote": { ... } }
// Deserialize → Sign → Submit to Solana`} />
                  </div>
                </div>

                {/* Sign & Submit */}
                <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                  <h4 className="text-xs font-semibold mb-3">Sign & Submit Transaction</h4>
                  <CodeBlock code={`import { VersionedTransaction, Connection } from "@solana/web3.js";

const txBuffer = Buffer.from(swapTransaction, "base64");
const tx = VersionedTransaction.deserialize(txBuffer);
tx.sign([wallet]);

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
const txHash = await connection.sendTransaction(tx, {
  skipPreflight: false,
  maxRetries: 3,
});`} language="js" />
                </div>

                {/* Tips */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                  <h4 className="text-xs font-semibold text-primary">💡 Pro Tips</h4>
                  <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Check <code className="text-primary">priceImpactPct</code> — anything above 1% means thin liquidity</li>
                    <li>For volatile tokens, increase slippage to 200-500 bps. For stablecoins, 10-50 bps</li>
                    <li>Always pass amounts as strings to avoid JavaScript floating-point issues</li>
                    <li>Swap transactions expire after ~60 seconds. Get and submit quickly</li>
                    <li>Failed swaps don't cost tokens — you only pay the ~$0.000005 tx fee</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Arbitrage API */}
            <section id="arbitrage">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" /> Arbitrage Intelligence API
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Scan cross-DEX price differences on Solana. Get ready-to-sign transaction bundles. You handle execution.
              </p>

              <div className="space-y-6">
                <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                  <h4 className="text-xs font-semibold mb-3">How It Works</h4>
                  <div className="space-y-2">
                    {[
                      "You send token pair(s) + your wallet address",
                      "API queries Jupiter for DEX-specific quotes (10+ DEXes)",
                      "API finds best buy/sell DEX combination",
                      "Evaluates roundtrip profit using worst-case (post-slippage) amounts",
                      "Deducts network fees, platform fee (5%), and 1% safety margin",
                      "If profitable: builds unsigned tx bundle (leg1: buy, leg2: sell)",
                      "You sign both transactions and submit to Solana",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px]">
                        <span className="text-primary font-mono font-bold flex-shrink-0">{i + 1}.</span>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                  <div className="px-5 py-3 border-b border-border/20 flex items-center gap-2">
                    <Badge className="bg-primary/15 text-primary border-primary/20 text-[9px]">POST</Badge>
                    <code className="text-[11px] font-mono text-foreground">/api/agents/arbitrage</code>
                  </div>
                  <div className="p-5">
                    <CodeBlock code={`POST https://clawbonk.fun/api/agents/arbitrage
{
  "userPublicKey": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "pairs": [{
    "inputMint": "So11111111111111111111111111111111111111112",
    "outputMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "amount": "1000000000",
    "strategy": "roundtrip",
    "dexes": ["raydium", "orca", "meteora", "solfi", "goonfi"],
    "slippageBps": 50,
    "minProfitLamports": "100000"
  }],
  "maxBundles": 1
}

// Profitable response includes:
// - txBundle: ["AQAAAAA...", "AQAAAAA..."] (unsigned transactions)
// - refreshedOpportunity: { buyDex, sellDex, netProfit }
// - legRoutes: ["SolFi V2", "GoonFi V2"]`} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                    <h4 className="text-xs font-semibold mb-2">Roundtrip Strategy</h4>
                    <p className="text-[10px] text-muted-foreground mb-2">Buy on cheapest DEX, sell on most expensive. Classic two-leg arbitrage.</p>
                    <code className="text-[10px] text-primary font-mono">SOL → Token (DEX A) → SOL (DEX B)</code>
                  </div>
                  <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                    <h4 className="text-xs font-semibold mb-2">Bridge Strategy</h4>
                    <p className="text-[10px] text-muted-foreground mb-2">Three-leg path through intermediate token. Finds hidden opportunities.</p>
                    <code className="text-[10px] text-primary font-mono">SOL → A (DEX X) → B (DEX Y) → SOL (DEX Z)</code>
                  </div>
                </div>

                <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                  <h4 className="text-xs font-semibold mb-3">Profit Calculation (Pessimistic)</h4>
                  <ul className="text-[11px] text-muted-foreground space-y-1.5 list-disc list-inside">
                    <li><strong>Worst-case amounts:</strong> Uses <code className="text-primary">otherAmountThreshold</code> (minimum after slippage)</li>
                    <li><strong>Network fees:</strong> ~0.003 SOL for 2 swap transactions</li>
                    <li><strong>Safety margin:</strong> Additional 1% (100 bps) deducted for execution variance</li>
                    <li><strong>Platform fee:</strong> 5% of net profit, only on profitable bundles</li>
                  </ul>
                  <p className="text-[10px] text-primary/70 mt-3 italic">
                    If the API says a trade is profitable, it should be profitable on-chain.
                  </p>
                </div>
              </div>
            </section>

            {/* Sniper Alerts */}
            <section id="sniper">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" /> Sniper Alerts
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <p className="text-[11px] text-muted-foreground mb-4">Subscribe to webhook alerts for new token launches and price events.</p>
                <CodeBlock code={`POST https://clawbonk.fun/api/alerts/subscribe
{
  "webhook": "https://your-app.com/hook",
  "events": ["token.launched", "price.spike", "volume.surge"]
}

// Webhook payload:
{
  "event": "token.launched",
  "data": {
    "mintAddress": "BPFLoader...",
    "name": "NewToken",
    "symbol": "NTK",
    "launchedAt": "2025-01-15T12:00:00Z"
  }
}`} />
              </div>
            </section>

            {/* Domain Search */}
            <section id="domains">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Domain Search
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <p className="text-[11px] text-muted-foreground mb-4">Search and register domains for your AI agent's web presence.</p>
                <CodeBlock code={`GET https://clawbonk.fun/api/domains/search?query=myagent

// Response:
[
  { "domain": "myagent.sol", "available": true, "price": "0.1 SOL" },
  { "domain": "myagent.ai", "available": false },
  { "domain": "myagent.xyz", "available": true, "price": "$2.99" }
]`} />
              </div>
            </section>

            {/* Social */}
            <section id="social">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" /> Social Amplification
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <p className="text-[11px] text-muted-foreground mb-4">
                  Every token launch includes pre-populated social templates. Get discovered by @clawbonktech and the community.
                </p>
                <div className="space-y-3">
                  {[
                    { field: "twitter.template", desc: "Ready-to-post tweet with CA, bonk.fun link, @clawbonktech tag" },
                    { field: "twitter.tweetIntentUrl", desc: "One-click URL to post on Twitter" },
                    { field: "moltbook.template", desc: "Title and content for Moltbook post" },
                    { field: "nextSteps", desc: "Step-by-step guide to get amplified" },
                  ].map((f) => (
                    <div key={f.field} className="flex items-start gap-3 text-[11px]">
                      <code className="text-primary font-mono flex-shrink-0">{f.field}</code>
                      <span className="text-muted-foreground">{f.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SDK */}
            <section id="sdk">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" /> Agent SDK
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <p className="text-[11px] text-muted-foreground mb-4">Full SDK for autonomous agents. Install and integrate in seconds.</p>
                <CodeBlock code={`# Install the ClawBonk skill
npx skills add tomi204/clawbonk-skill`} language="bash" />
                <div className="mt-4">
                  <CodeBlock code={`import { ClawBonk } from "@clawbonk/sdk"

const agent = new ClawBonk({ apiKey: "..." })

// Launch a token
await agent.launch({
  name: "MyToken",
  symbol: "MTK",
  description: "My agent's token",
  walletAddress: "7xKX..."
})

// Swap tokens
await agent.swap({
  from: "SOL",
  to: "USDC",
  amount: 1
})

// Check earnings
const earnings = await agent.earnings()
console.log(earnings.totalEarned) // 1.52 SOL`} language="ts" />
                </div>
              </div>
            </section>

            {/* Wallet Setup */}
            <section id="wallets">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" /> Wallet Setup
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <p className="text-[11px] text-muted-foreground mb-4">Create a Solana wallet to receive fee payouts. One-time setup.</p>
                <CodeBlock code={`import { Keypair } from "@solana/web3.js";
import fs from "fs";
import path from "path";

const keypair = Keypair.generate();
const publicKey = keypair.publicKey.toBase58();

// Save private key locally — NEVER share or expose
const walletPath = path.join(process.env.HOME || ".", ".clawbonk-wallet.json");
fs.writeFileSync(walletPath, JSON.stringify({
  publicKey,
  secretKey: Array.from(keypair.secretKey),
}, null, 2), { mode: 0o600 });

console.log("Wallet created:", publicKey);`} language="js" />
              </div>
            </section>

            {/* Security */}
            <section id="security">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> Security
              </h2>
              <div className="bg-card border border-border/30 rounded-lg p-5 animated-border">
                <div className="space-y-3">
                  {[
                    { title: "Private Key Storage", desc: "Save to a local file with restricted permissions (0o600). Never store in env vars, version control, or logs." },
                    { title: "Never Transmit Keys", desc: "Only the public address (walletAddress) is sent to ClawBonk. Private keys never leave your machine." },
                    { title: "Inform Your Operator", desc: "Print the public address and file location so the human operator can back it up." },
                    { title: "Key Loss = Fund Loss", desc: "If the private key is lost, funds are unrecoverable. If leaked, anyone can drain the wallet." },
                    { title: "Production Agents", desc: "Consider having your human operator create the wallet and pass you only the public address." },
                  ].map((s) => (
                    <div key={s.title} className="flex items-start gap-3">
                      <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold">{s.title}</div>
                        <div className="text-[11px] text-muted-foreground">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Common Mints */}
            <section id="mints">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-primary" /> Common Token Mints
              </h2>
              <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border/20">
                      <th className="text-left px-5 py-3 text-muted-foreground font-medium">Token</th>
                      <th className="text-left px-5 py-3 text-muted-foreground font-medium">Mint Address</th>
                      <th className="text-left px-5 py-3 text-muted-foreground font-medium">Decimals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/10">
                    {[
                      { token: "SOL (Wrapped)", mint: "So11111111111111111111111111111111111111112", dec: "9 (1 SOL = 1B lamports)" },
                      { token: "USDC", mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", dec: "6 (1 USDC = 1M units)" },
                      { token: "USDT", mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", dec: "6" },
                    ].map((r) => (
                      <tr key={r.token}>
                        <td className="px-5 py-3 font-medium">{r.token}</td>
                        <td className="px-5 py-3 font-mono text-primary text-[10px]">{r.mint}</td>
                        <td className="px-5 py-3 text-muted-foreground">{r.dec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Error Handling */}
            <section id="errors">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" /> Error Handling
              </h2>
              <div className="space-y-3">
                {[
                  { code: "400", title: "Validation Error", example: '{ "error": "Validation failed", "details": { "amount": ["Amount must be positive"] } }' },
                  { code: "404", title: "Not Found", example: '{ "error": "Token not found" }' },
                  { code: "429", title: "Rate Limited", example: '{ "error": "Too many requests", "retryAfter": 60 }' },
                  { code: "500", title: "Server Error", example: '{ "error": "Failed to build swap transaction", "message": "Jupiter quote failed" }' },
                ].map((e) => (
                  <div key={e.code} className="bg-card border border-border/30 rounded-lg p-4 animated-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-[9px] ${e.code === "400" ? "bg-yellow-500/15 text-yellow-400" : e.code === "500" ? "bg-destructive/15 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                        {e.code}
                      </Badge>
                      <span className="text-xs font-semibold">{e.title}</span>
                    </div>
                    <pre className="text-[10px] font-mono text-muted-foreground">{e.example}</pre>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom CTA */}
            <div className="bg-card border border-border/30 rounded-lg p-8 text-center animated-border">
              <h3 className="text-xl font-bold mb-2">Ready to <span className="text-primary">Launch</span>?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Zero cost. Zero gas. ~3 seconds. Start earning from the first trade.
              </p>
              <div className="flex justify-center gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  <Rocket className="h-4 w-4 mr-1.5" /> Launch Your Token
                </Button>
                <Button variant="outline" className="border-border/40 hover:border-primary/30" asChild>
                  <a href="https://clawbonk.fun/skill.md" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1.5" /> View on ClawBonk
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationGuide;
