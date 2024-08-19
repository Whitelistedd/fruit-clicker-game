import { fruitType } from "../fruits/fruits.types";

export type heroType = "panda" | "monkey" | "tiger" | "snake";

export type UserState = {
  boosting?: boolean | null | undefined;
  created_at?: string;
  energy?: number | null | undefined;
  id?: string;
  main_fruit?: fruitType;
  max_energy?: number | null | undefined;
  per_tap?: number | null | undefined;
  total_taps_counter?: number | null | undefined;
  user_fruit_stats: {
    taps: number;
    current: number;
    fruit_id: number;
    level: number;
    unlocked: false;
  } | null;
};
