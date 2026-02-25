
-- Agents table
CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  wallet_address TEXT,
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  total_earnings NUMERIC DEFAULT 0,
  tokens_launched INTEGER DEFAULT 0,
  total_volume NUMERIC DEFAULT 0,
  success_rate NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'idle')),
  rank INTEGER,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tokens table
CREATE TABLE public.tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL UNIQUE,
  mint_address TEXT,
  description TEXT,
  price NUMERIC DEFAULT 0,
  mcap NUMERIC DEFAULT 0,
  volume_24h NUMERIC DEFAULT 0,
  change_24h NUMERIC DEFAULT 0,
  holders INTEGER DEFAULT 0,
  txns_24h INTEGER DEFAULT 0,
  total_supply TEXT DEFAULT '1,000,000,000',
  circulating_pct NUMERIC DEFAULT 100,
  verified BOOLEAN DEFAULT false,
  creator_agent_id UUID REFERENCES public.agents(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Platform stats table (single row for global stats)
CREATE TABLE public.platform_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tokens_launched INTEGER DEFAULT 0,
  total_volume NUMERIC DEFAULT 0,
  active_agents INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Recent trades table
CREATE TABLE public.recent_trades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id UUID REFERENCES public.tokens(id) ON DELETE CASCADE,
  trade_type TEXT NOT NULL CHECK (trade_type IN ('buy', 'sell')),
  amount TEXT NOT NULL,
  sol_amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Agent activity log
CREATE TABLE public.agent_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recent_trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_activity ENABLE ROW LEVEL SECURITY;

-- Public read access (leaderboard/token data is public)
CREATE POLICY "Public read agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Public read tokens" ON public.tokens FOR SELECT USING (true);
CREATE POLICY "Public read platform_stats" ON public.platform_stats FOR SELECT USING (true);
CREATE POLICY "Public read recent_trades" ON public.recent_trades FOR SELECT USING (true);
CREATE POLICY "Public read agent_activity" ON public.agent_activity FOR SELECT USING (true);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON public.agents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tokens_updated_at BEFORE UPDATE ON public.tokens FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_platform_stats_updated_at BEFORE UPDATE ON public.platform_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for leaderboard
ALTER PUBLICATION supabase_realtime ADD TABLE public.tokens;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
