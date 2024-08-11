import grapefruitSrc from "@/assets/imgs/grapefruit.png";
import blueberrySrc from "@/assets/imgs/blueberry.png";
import cherrySrc from "@/assets/imgs/cherry.png";
import mangoSrc from "@/assets/imgs/mango.png";
import strawberrySrc from "@/assets/imgs/strawberry.png";
import dragonfruitSrc from "@/assets/imgs/dragonfruit.png";

const fruitlevels: {
  [key: number]: {
    tapsNeeded: number;
    tapsPertap: number;
  };
} = {
  1: {
    tapsNeeded: 0,
    tapsPertap: 1,
  },
  2: {
    tapsNeeded: 20,
    tapsPertap: 5,
  },
  3: {
    tapsNeeded: 310,
    tapsPertap: 15,
  },
  4: {
    tapsNeeded: 480,
    tapsPertap: 20,
  },
  5: {
    tapsNeeded: 900,
    tapsPertap: 40,
  },
};

export const fruits = {
  grapefruit: {
    src: grapefruitSrc,
    name: "Magic Strawberry",
    levels: fruitlevels,
  },
  blueberry: {
    src: blueberrySrc,
    name: "Honey Blueberry",
    levels: fruitlevels,
  },
  cherry: {
    src: cherrySrc,
    name: "Sweet Cherry",
    levels: fruitlevels,
  },
  mango: {
    src: mangoSrc,
    name: "Honey Mango",
    levels: fruitlevels,
  },
  strawberry: {
    src: strawberrySrc,
    name: "Strawberry",
    levels: fruitlevels,
  },
  dragonfruit: {
    src: dragonfruitSrc,
    name: "Hot Dragon Fruit",
    levels: fruitlevels,
  },
};
