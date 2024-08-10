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
  perHour: number;
  perTap: number;
  fruitType: fruitType;
};
