export type fruitType =
  | "grapefruit"
  | "blueberry"
  | "cherry"
  | "mango"
  | "strawberry"
  | "dragonfruit";

export type heroType = "panda" | "monkey" | "tiger" | "snake";

export type UserState = {
  totalTapsCounter: number;
  heroType: heroType;
  perTap: number;
  levels: { [key: string]: { taps: number; current: number; level: number } };
  fruitType: fruitType;
  energy: number;
  maxEnergy: number;
  boosting: boolean;
};
