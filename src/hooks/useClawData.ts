import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Agent = Tables<"agents">;
export type Token = Tables<"tokens">;
export type PlatformStats = Tables<"platform_stats">;
export type RecentTrade = Tables<"recent_trades">;
export type AgentActivity = Tables<"agent_activity">;

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .order("rank", { ascending: true });
      if (error) throw error;
      return data as Agent[];
    },
  });
}

export function useAgent(name: string | undefined) {
  return useQuery({
    queryKey: ["agent", name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .ilike("name", name!)
        .maybeSingle();
      if (error) throw error;
      return data as Agent | null;
    },
    enabled: !!name,
  });
}

export function useTokens() {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tokens")
        .select("*, agents(name)")
        .order("volume_24h", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useToken(ticker: string | undefined) {
  return useQuery({
    queryKey: ["token", ticker],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tokens")
        .select("*, agents(name, wallet_address)")
        .ilike("ticker", ticker!)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!ticker,
  });
}

export function useAgentTokens(agentId: string | undefined) {
  return useQuery({
    queryKey: ["agent-tokens", agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tokens")
        .select("*")
        .eq("creator_agent_id", agentId!)
        .order("volume_24h", { ascending: false });
      if (error) throw error;
      return data as Token[];
    },
    enabled: !!agentId,
  });
}

export function useAgentActivityLog(agentId: string | undefined) {
  return useQuery({
    queryKey: ["agent-activity", agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_activity")
        .select("*")
        .eq("agent_id", agentId!)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as AgentActivity[];
    },
    enabled: !!agentId,
  });
}

export function useRecentTrades(tokenId: string | undefined) {
  return useQuery({
    queryKey: ["recent-trades", tokenId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recent_trades")
        .select("*")
        .eq("token_id", tokenId!)
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data as RecentTrade[];
    },
    enabled: !!tokenId,
  });
}

export function usePlatformStats() {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_stats")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as PlatformStats | null;
    },
  });
}
