export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agent_activity: {
        Row: {
          action: string
          agent_id: string | null
          created_at: string
          detail: string | null
          id: string
        }
        Insert: {
          action: string
          agent_id?: string | null
          created_at?: string
          detail?: string | null
          id?: string
        }
        Update: {
          action?: string
          agent_id?: string | null
          created_at?: string
          detail?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_activity_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          created_at: string
          description: string | null
          id: string
          joined_at: string | null
          name: string
          rank: number | null
          skills: string[] | null
          status: string | null
          success_rate: number | null
          tokens_launched: number | null
          total_earnings: number | null
          total_volume: number | null
          updated_at: string
          wallet_address: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          joined_at?: string | null
          name: string
          rank?: number | null
          skills?: string[] | null
          status?: string | null
          success_rate?: number | null
          tokens_launched?: number | null
          total_earnings?: number | null
          total_volume?: number | null
          updated_at?: string
          wallet_address?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          joined_at?: string | null
          name?: string
          rank?: number | null
          skills?: string[] | null
          status?: string | null
          success_rate?: number | null
          tokens_launched?: number | null
          total_earnings?: number | null
          total_volume?: number | null
          updated_at?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      platform_stats: {
        Row: {
          active_agents: number | null
          id: string
          tokens_launched: number | null
          total_volume: number | null
          updated_at: string
        }
        Insert: {
          active_agents?: number | null
          id?: string
          tokens_launched?: number | null
          total_volume?: number | null
          updated_at?: string
        }
        Update: {
          active_agents?: number | null
          id?: string
          tokens_launched?: number | null
          total_volume?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      recent_trades: {
        Row: {
          amount: string
          created_at: string
          id: string
          sol_amount: number
          token_id: string | null
          trade_type: string
        }
        Insert: {
          amount: string
          created_at?: string
          id?: string
          sol_amount: number
          token_id?: string | null
          trade_type: string
        }
        Update: {
          amount?: string
          created_at?: string
          id?: string
          sol_amount?: number
          token_id?: string | null
          trade_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "recent_trades_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      tokens: {
        Row: {
          change_24h: number | null
          circulating_pct: number | null
          created_at: string
          creator_agent_id: string | null
          description: string | null
          holders: number | null
          id: string
          mcap: number | null
          mint_address: string | null
          name: string
          price: number | null
          ticker: string
          total_supply: string | null
          txns_24h: number | null
          updated_at: string
          verified: boolean | null
          volume_24h: number | null
        }
        Insert: {
          change_24h?: number | null
          circulating_pct?: number | null
          created_at?: string
          creator_agent_id?: string | null
          description?: string | null
          holders?: number | null
          id?: string
          mcap?: number | null
          mint_address?: string | null
          name: string
          price?: number | null
          ticker: string
          total_supply?: string | null
          txns_24h?: number | null
          updated_at?: string
          verified?: boolean | null
          volume_24h?: number | null
        }
        Update: {
          change_24h?: number | null
          circulating_pct?: number | null
          created_at?: string
          creator_agent_id?: string | null
          description?: string | null
          holders?: number | null
          id?: string
          mcap?: number | null
          mint_address?: string | null
          name?: string
          price?: number | null
          ticker?: string
          total_supply?: string | null
          txns_24h?: number | null
          updated_at?: string
          verified?: boolean | null
          volume_24h?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tokens_creator_agent_id_fkey"
            columns: ["creator_agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
