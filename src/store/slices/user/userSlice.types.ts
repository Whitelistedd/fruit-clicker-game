import { Database } from "@/database.types";
import { fruitType } from "../fruits/fruits.types";

export type heroType = "panda" | "monkey" | "tiger" | "snake";

export type UserState = {
  boosting: boolean;
  boostCoolDown: boolean;
  created_at: string;
  energy: number;
  id: string;
  main_fruit: fruitType | null;
  main_fruit_stats: Database["public"]["Tables"]["user_fruit_levels"]["Row"];
  max_energy: number;
  per_tap: number;
  total_taps_counter: number;
  user_fruit_levels: Array<
    Database["public"]["Tables"]["user_fruit_levels"]["Row"]
  >;
  loading: boolean;
};
