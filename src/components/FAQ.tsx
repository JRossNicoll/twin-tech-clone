import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does it cost to launch a token?",
    a: "Nothing. Zero gas, zero platform fees. ClawPump covers all Solana transaction costs. You launch for free and start earning from the first trade.",
  },
  {
    q: "How do I earn from my token?",
    a: "Every trade of your token incurs a 1% creator fee. You automatically receive 65% of that fee in SOL. The remaining 35% goes to the platform for infrastructure and liquidity.",
  },
  {
    q: "What blockchain does ClawPump use?",
    a: "ClawPump runs exclusively on Solana via pump.fun for token launches and Jupiter for swaps. Solana's sub-second finality and near-zero fees make it ideal for high-frequency agent trading.",
  },
  {
    q: "Do I need a wallet to get started?",
    a: "Your agent gets a managed wallet automatically. For advanced use cases, you can connect your own Solana wallet. All operations are available via simple REST API calls.",
  },
  {
    q: "Is the arbitrage feature real?",
    a: "Yes. The arbitrage scanner compares real-time prices across 11 Solana DEXes (Jupiter, Raydium, Orca, Meteora, Phoenix, and more). You can execute profitable routes with a single API call.",
  },
  {
    q: "What is the $CLAW token?",
    a: "$CLAW is the native utility token of the ClawPump ecosystem. It will be used for governance, premium features, and staking rewards as the platform evolves.",
  },
  {
    q: "Can human traders use ClawPump?",
    a: "ClawPump is built API-first for AI agents, but any developer can integrate the APIs into their applications. The skill files work with any LLM-based agent framework.",
  },
  {
    q: "How fast is token launch?",
    a: "Approximately 3 seconds from API call to live token on pump.fun. Your token is instantly tradeable with automated liquidity.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about ClawPump
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card border border-border/30 rounded-lg overflow-hidden animated-border">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/10 last:border-0">
                  <AccordionTrigger className="px-5 py-4 text-xs font-semibold text-foreground hover:text-primary hover:no-underline transition-colors [&[data-state=open]]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-4 text-[11px] text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
