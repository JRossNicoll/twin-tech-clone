import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const HELIUS_API_KEY = Deno.env.get("HELIUS_API_KEY");
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

async function rpcCall(method: string, params: unknown[]) {
  const res = await fetch(HELIUS_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const data = await res.json();
  return data.result;
}

async function getSOLPrice(): Promise<number> {
  try {
    // Use Jupiter price API for SOL/USD
    const res = await fetch("https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112");
    const data = await res.json();
    return parseFloat(data.data?.["So11111111111111111111111111111111111111112"]?.price || "0");
  } catch {
    return 150; // fallback
  }
}

async function getTokenMetadata(mintAddresses: string[]) {
  try {
    const res = await fetch(`https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mintAccounts: mintAddresses, includeOffChain: true }),
    });
    return await res.json();
  } catch {
    return [];
  }
}

async function getTokenAccounts(walletAddress: string) {
  try {
    const result = await rpcCall("getTokenAccountsByOwner", [
      walletAddress,
      { programId: "TokenkegQfeN4jV6XiaNicjEK4VcRMK5WYwpPQDcpoJ3" },
      { encoding: "jsonParsed" },
    ]);
    return result?.value || [];
  } catch {
    return [];
  }
}

async function getBalance(address: string): Promise<number> {
  try {
    const result = await rpcCall("getBalance", [address]);
    return (result?.value || 0) / 1e9; // Convert lamports to SOL
  } catch {
    return 0;
  }
}

async function getRecentBlockhash() {
  try {
    const result = await rpcCall("getLatestBlockhash", []);
    return result?.value?.blockhash || null;
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    let responseData: unknown;

    switch (action) {
      case "sol-price": {
        const price = await getSOLPrice();
        responseData = { price };
        break;
      }

      case "token-metadata": {
        const body = await req.json();
        const mints = body.mints || [];
        const metadata = await getTokenMetadata(mints);
        responseData = { metadata };
        break;
      }

      case "balance": {
        const address = url.searchParams.get("address");
        if (!address) throw new Error("address parameter required");
        const balance = await getBalance(address);
        responseData = { balance, address };
        break;
      }

      case "token-accounts": {
        const wallet = url.searchParams.get("wallet");
        if (!wallet) throw new Error("wallet parameter required");
        const accounts = await getTokenAccounts(wallet);
        responseData = { accounts };
        break;
      }

      case "blockhash": {
        const blockhash = await getRecentBlockhash();
        responseData = { blockhash };
        break;
      }

      case "health": {
        // Simple health check that verifies the RPC connection
        const blockhash = await getRecentBlockhash();
        const solPrice = await getSOLPrice();
        responseData = {
          status: "ok",
          rpcConnected: !!blockhash,
          solPrice,
          timestamp: new Date().toISOString(),
        };
        break;
      }

      default:
        responseData = {
          error: "Unknown action. Available: sol-price, token-metadata, balance, token-accounts, blockhash, health",
        };
    }

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
