type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      fruits: {
        Row: {
          created_at: string;
          id: number;
          levels: Json | null;
          name: string | null;
          src: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          levels?: Json | null;
          name?: string | null;
          src?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          levels?: Json | null;
          name?: string | null;
          src?: string | null;
        };
        Relationships: [];
      };
      user_fruit_levels: {
        Row: {
          created_at: string;
          current: number | null;
          fruit_id: number | null;
          level: number | null;
          taps: number | null;
          unlocked: boolean;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          current?: number | null;
          fruit_id?: number | null;
          level?: number | null;
          taps?: number | null;
          unlocked?: boolean;
          user_id: string;
        };
        Update: {
          created_at?: string;
          current?: number | null;
          fruit_id?: number | null;
          level?: number | null;
          taps?: number | null;
          unlocked?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_fruit_levels_fruit_id_fkey";
            columns: ["fruit_id"];
            isOneToOne: false;
            referencedRelation: "fruits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_fruit_levels_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          boosting: boolean | null;
          created_at: string;
          energy: number | null;
          id: string;
          main_fruit: number | null;
          max_energy: number | null;
          per_tap: number | null;
          total_taps_counter: number | null;
          user_id: string | null;
        };
        Insert: {
          boosting?: boolean | null;
          created_at?: string;
          energy?: number | null;
          id: string;
          main_fruit?: number | null;
          max_energy?: number | null;
          per_tap?: number | null;
          total_taps_counter?: number | null;
          user_id?: string | null;
        };
        Update: {
          boosting?: boolean | null;
          created_at?: string;
          energy?: number | null;
          id?: string;
          main_fruit?: number | null;
          max_energy?: number | null;
          per_tap?: number | null;
          total_taps_counter?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "users_main_fruit_fkey";
            columns: ["main_fruit"];
            isOneToOne: false;
            referencedRelation: "fruits";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
