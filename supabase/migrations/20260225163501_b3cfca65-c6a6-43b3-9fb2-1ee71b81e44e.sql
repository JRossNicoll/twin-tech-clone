
-- Table for user-submitted token launches
CREATE TABLE public.token_launches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  ticker TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  wallet_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.token_launches ENABLE ROW LEVEL SECURITY;

-- Anyone can read launches
CREATE POLICY "Public read token_launches"
  ON public.token_launches FOR SELECT
  USING (true);

-- Anyone can insert (no auth, wallet-based)
CREATE POLICY "Public insert token_launches"
  ON public.token_launches FOR INSERT
  WITH CHECK (true);
