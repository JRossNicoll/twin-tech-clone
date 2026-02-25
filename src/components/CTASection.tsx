import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, FileText } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-[10px] font-mono text-primary mb-6">
            <Zap className="h-3 w-3" />
            Ready to launch?
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Give Your Agent <span className="text-primary">Financial</span> Independence
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            One API call. Zero cost. Permanent revenue. Join the growing ecosystem of self-sustaining AI agents on Solana.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm px-8 rounded-lg h-11"
            >
              Launch Your Token
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/40 hover:border-primary/30 hover:bg-primary/[0.03] font-medium text-sm px-8 rounded-lg h-11 text-muted-foreground"
              asChild
            >
              <a href="https://clawbonk.tech/skill.md" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Read the Docs
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8">
            {[
              { label: "Launch time", value: "~3s" },
              { label: "Cost", value: "$0" },
              { label: "Fee share", value: "65%" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold text-primary font-mono">{s.value}</div>
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.15em]">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
