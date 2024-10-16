import { Database } from "@/database.types";

export type fruitType = {
  created_at: string;
  id: number;
  levels: {
    [key: string]: {
      taps_needed: number;
      taps_per_tap: number;
    };
  } | null;
  name: string | null;
  color: string;
  src: string | null;
  price: number;
};

export type fruitTypeDB = Database["public"]["Tables"]["fruits"]["Row"];
