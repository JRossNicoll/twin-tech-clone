import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Loader2, Wallet, ImagePlus, AlertCircle, CheckCircle2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CreatePortal = () => {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const [form, setForm] = useState({
    name: "",
    ticker: "",
    description: "",
    imageUrl: "",
  });
  const [launching, setLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = form.name.trim() && form.ticker.trim() && connected;

  const handleLaunch = async () => {
    if (!connected || !publicKey) {
      setVisible(true);
      return;
    }
    setError(null);
    setLaunching(true);
    try {
      const { error: dbError } = await supabase.from("token_launches").insert({
        name: form.name.trim(),
        ticker: form.ticker.trim(),
        description: form.description.trim() || null,
        image_url: form.imageUrl.trim() || null,
        wallet_address: publicKey.toBase58(),
      });
      if (dbError) throw dbError;
      toast.success(`Token "${form.ticker}" launch submitted!`);
      setForm({ name: "", ticker: "", description: "", imageUrl: "" });
    } catch (err: any) {
      setError(err.message || "Failed to submit launch");
    } finally {
      setLaunching(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="create-portal" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-[10px] font-mono text-primary mb-4">
            <Rocket className="h-3 w-3" />
            Create &amp; Launch
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">
            Launch Your <span className="text-primary">Token</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Fill in the details below and deploy your token on Solana via bonk.fun — zero cost, live in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-card border border-border/30 rounded-lg p-6 space-y-5 animated-border">
            {/* Name & Ticker */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Token Name
                </label>
                <Input
                  placeholder="e.g. MyAgent"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="bg-secondary/30 border-border/20 h-9 text-sm placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  Ticker
                </label>
                <Input
                  placeholder="e.g. MYAGT"
                  value={form.ticker}
                  onChange={(e) => update("ticker", e.target.value.toUpperCase())}
                  maxLength={10}
                  className="bg-secondary/30 border-border/20 h-9 text-sm font-mono placeholder:text-muted-foreground/40"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Description <span className="text-muted-foreground/40">(optional)</span>
              </label>
              <Textarea
                placeholder="What does your agent do?"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                rows={3}
                className="bg-secondary/30 border-border/20 text-sm resize-none placeholder:text-muted-foreground/40"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Image URL <span className="text-muted-foreground/40">(optional)</span>
              </label>
              <div className="relative">
                <ImagePlus className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/40" />
                <Input
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => update("imageUrl", e.target.value)}
                  className="bg-secondary/30 border-border/20 h-9 text-sm pl-9 placeholder:text-muted-foreground/40"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-destructive text-xs">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </div>
            )}

            {/* Stats row */}
            <div className="flex items-center justify-between pt-2 border-t border-border/15">
              {[
                { label: "Launch time", value: "~3s" },
                { label: "Cost", value: "$0" },
                { label: "Fee share", value: "65%" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-sm font-bold text-primary font-mono">{s.value}</div>
                  <div className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.15em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Launch button */}
            {connected ? (
              <Button
                onClick={handleLaunch}
                disabled={!canSubmit || launching}
                className="w-full h-11 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-[0_0_20px_hsl(145_100%_50%/0.15)]"
              >
                {launching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Launching...
                  </>
                ) : (
                  <>
                    <Rocket className="h-4 w-4 mr-2" />
                    Launch Token
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setVisible(true)}
                className="w-full h-11 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-[0_0_20px_hsl(145_100%_50%/0.15)]"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet to Launch
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreatePortal;
