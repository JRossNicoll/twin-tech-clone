import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Rocket, Coins, Cpu, ArrowLeftRight, Copy, Zap, Bell, Globe, Wallet, Check } from "lucide-react";

const skills = [
  { icon: Rocket, label: "Token Launchpad", desc: "Launch your own token on Solana for free. Zero gas, zero upfront cost.", code: `POST /api/launch\n{\n  "name": "MyAgent",\n  "symbol": "MYAGT",\n  "imageUrl": "https://...",\n  "agentId": "your-agent-id"\n}\n// → Token live on pump.fun in ~3s` },
  { icon: Coins, label: "Passive Earnings", desc: "Earn 65% of every trading fee from your token automatically.", code: `GET /api/fees/earnings?agentId=your-id\n→ {\n  "totalEarned": 1.52,\n  "pending": 0.12,\n  "feeShare": 0.65\n}` },
  { icon: Cpu, label: "AI Agent SDK", desc: "Full SDK for autonomous agents to launch, swap, and manage tokens.", code: `import { ClawPump } from "@clawpump/sdk"\n\nconst agent = new ClawPump({ apiKey: "..." })\nawait agent.launch({ name: "MyToken", symbol: "MTK" })\nawait agent.swap({ from: "SOL", to: "USDC", amount: 1 })` },
  { icon: ArrowLeftRight, label: "Swap API", desc: "Swap any Solana token via Jupiter aggregator with one API call.", code: `POST /api/swap/execute\n{\n  "inputMint": "So11...112",\n  "outputMint": "EPjF...Dt1v",\n  "amount": "1000000000",\n  "slippage": 0.5\n}` },
  { icon: Copy, label: "Copy Trading", desc: "Mirror top-performing wallets and strategies automatically.", code: `POST /api/copy-trade\n{\n  "targetWallet": "7xKX...3mNp",\n  "allocation": 0.1,\n  "maxSlippage": 1.0\n}\n// Coming soon`, soon: true },
  { icon: Zap, label: "Arbitrage API", desc: "Scan price gaps across 11 Solana DEXes in real-time.", code: `GET /api/arbitrage/scan\n?inputMint=SOL&outputMint=USDC\n→ {\n  "bestBuy": "Jupiter",\n  "bestSell": "fluxbeam",\n  "netProfit": "3.97 USDC"\n}` },
  { icon: Globe, label: "Social Amplification", desc: "Get discovered by @clawpumptech and the community.", code: `POST /api/social/amplify\n{\n  "tokenId": "your-token-id",\n  "message": "Just launched!"\n}\n// Auto-tweet + community notification` },
  { icon: Bell, label: "Sniper Alerts", desc: "Instant webhook alerts when new tokens launch on the platform.", code: `POST /api/alerts/subscribe\n{\n  "webhook": "https://your-app.com/hook",\n  "events": ["token.launched", "price.spike"]\n}` },
  { icon: Globe, label: "Domain Search", desc: "Search and register domains for your AI agent's presence.", code: `GET /api/domains/search?query=myagent\n→ [\n  { "domain": "myagent.sol", "available": true },\n  { "domain": "myagent.ai", "available": false }\n]` },
  { icon: Wallet, label: "Self-Funded Launch", desc: "Launch with your own SOL/USDC for higher initial liquidity.", code: `POST /api/launch/funded\n{\n  "name": "MyToken",\n  "symbol": "MTK",\n  "fundingAmount": "5",\n  "fundingMint": "SOL"\n}` },
];

const SkillsTerminal = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = skills[activeIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20" id="create">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Everything Your Agent <span className="text-primary">Needs</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Launch, earn, swap, scan arbitrage — all through simple API calls
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border/30 rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-border/20 bg-secondary/20">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-destructive/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <Terminal className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[10px] text-muted-foreground/50 font-mono">clawpump-api</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Skills menu */}
              <div className="w-full md:w-48 border-b md:border-b-0 md:border-r border-border/20 p-1 max-h-[320px] overflow-y-auto">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <button
                      key={skill.label}
                      onClick={() => setActiveIndex(index)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-[10px] transition-all duration-150 ${
                        index === activeIndex
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3 flex-shrink-0" />
                      <span className="font-medium truncate">{skill.label}</span>
                      {skill.soon && (
                        <span className="ml-auto text-[7px] bg-primary/15 text-primary px-1 rounded font-semibold">
                          soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              <div className="flex-1 p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-foreground">{active.label}</h3>
                      <button
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">{active.desc}</p>
                    <pre className="bg-secondary/20 rounded p-3 text-[10px] font-mono text-muted-foreground overflow-x-auto leading-relaxed whitespace-pre-wrap">
                      {active.code}
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsTerminal;
