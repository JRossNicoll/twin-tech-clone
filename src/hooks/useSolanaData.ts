import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface HealthData {
  status: string;
  rpcConnected: boolean;
  solPrice: number;
  timestamp: string;
}

interface BalanceData {
  balance: number;
  address: string;
}

async function callSolanaData<T>(action: string, params?: Record<string, string>, body?: unknown): Promise<T> {
  const queryParams = new URLSearchParams({ action, ...params });

  if (body) {
    const { data, error } = await supabase.functions.invoke("solana-data", {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (error) throw error;
    return data as T;
  }

  const { data, error } = await supabase.functions.invoke(`solana-data?${queryParams.toString()}`, {
    method: "GET",
  });
  if (error) throw error;
  return data as T;
}

export function useSolPrice() {
  return useQuery({
    queryKey: ["sol-price"],
    queryFn: () => callSolanaData<{ price: number }>("sol-price"),
    refetchInterval: 30000, // Refresh every 30s
    staleTime: 15000,
    retry: 2,
  });
}

export function useRpcHealth() {
  return useQuery({
    queryKey: ["rpc-health"],
    queryFn: () => callSolanaData<HealthData>("health"),
    refetchInterval: 60000,
    staleTime: 30000,
    retry: 1,
  });
}

export function useBalance(address: string | null) {
  return useQuery({
    queryKey: ["balance", address],
    queryFn: () => callSolanaData<BalanceData>("balance", { address: address! }),
    enabled: !!address,
    staleTime: 10000,
  });
}

export function useTokenMetadata(mints: string[]) {
  return useQuery({
    queryKey: ["token-metadata", mints],
    queryFn: () =>
      callSolanaData<{ metadata: unknown[] }>("token-metadata", undefined, { mints }),
    enabled: mints.length > 0,
    staleTime: 60000,
  });
}
