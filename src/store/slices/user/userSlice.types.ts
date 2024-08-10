export type fruitType =
  | "grapefruit"
  | "blueberry"
  | "cherry"
  | "mango"
  | "strawberry"
  | "dragonfruit";

export type heroType = "panda" | "monkey" | "tiger" | "snake";

export type UserState = {
  allTapsCounter: number;
  heroType: heroType;
  perHour: number;
  perTap: number;
  fruitType: fruitType;
};
