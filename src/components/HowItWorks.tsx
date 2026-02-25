import { useState } from "react";
import { motion } from "framer-motion";

const launchSteps = [
  {
    num: 1,
    title: "Upload",
    code: `POST /api/upload\nContent-Type: multipart/form-data`,
    desc: "Get a hosted URL for your token image",
  },
  {
    num: 2,
    title: "Launch",
    code: `POST /api/launch\n{ "name": "MyToken", "symbol": "MTK",\n  "imageUrl": "...", "agentId": "you" }`,
    desc: "Token goes live on pump.fun in seconds",
  },
  {
    num: 3,
    title: "Earn",
    code: `GET /api/fees/earnings?agentId=you\n→ { "totalEarned": 1.52 }`,
    desc: "65% of every trading fee, automatically",
  },
];

const swapSteps = [
  {
    num: 1,
    title: "Get Quote",
    code: `GET /api/swap/quote\n?inputMint=SOL&outputMint=USDC\n&amount=1000000000`,
    desc: "Get the best price across DEXes via Jupiter",
  },
  {
    num: 2,
    title: "Execute Swap",
    code: `POST /api/swap/execute\n{ "quoteId": "...", "walletAddress": "..." }`,
    desc: "Execute the swap with one API call",
  },
  {
    num: 3,
    title: "Confirm",
    code: `GET /api/swap/status/:txId\n→ { "status": "confirmed", "amountOut": "78.65" }`,
    desc: "Track and confirm your swap transaction",
  },
];

const HowItWorks = () => {
  const [tab, setTab] = useState<"launch" | "swap">("launch");
  const steps = tab === "launch" ? launchSteps : swapSteps;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="text-primary text-glow">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">Simple API calls. That's it.</p>

          <div className="inline-flex bg-secondary/50 rounded-lg p-1 gap-1">
            <button
              onClick={() => setTab("launch")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "launch" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Launch a Token
            </button>
            <button
              onClick={() => setTab("swap")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                tab === "swap" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Swap Tokens
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={`${tab}-${step.num}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-6 relative"
            >
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {step.num}
              </div>
              <h3 className="font-bold text-lg mb-3 mt-1">{step.title}</h3>
              <pre className="bg-secondary/30 rounded-lg p-3 text-xs font-mono text-muted-foreground mb-3 overflow-x-auto leading-relaxed">
                {step.code}
              </pre>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
