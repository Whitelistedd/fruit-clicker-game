/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice.types";
import { fruits } from "@/constants/fruits";

const initialState: UserState = {
  totalTapsCounter: 0,
  fruitType: "grapefruit",
  heroType: "panda",
  levels: {
    grapefruit: { taps: 0, current: 0, level: 1 },
    blueberry: { taps: 0, current: 0, level: -1 },
    cherry: { taps: 0, current: 0, level: -1 },
    mango: { taps: 0, current: 0, level: -1 },
    strawberry: { taps: 0, current: 0, level: -1 },
    dragonfruit: { taps: 0, current: 0, level: -1 },
  },
  perTap: 1,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPerTap: (state, payload: PayloadAction<number>) => {
      state.totalTapsCounter += payload.payload;
      state.levels[state.fruitType].taps += payload.payload;
      state.levels[state.fruitType].current += payload.payload;
      const currentLevel = state.levels[state.fruitType];
      const fruitLevels = fruits[state.fruitType].levels;
      const nextLevel = fruitLevels[currentLevel.level + 1];
      if (nextLevel && currentLevel.current >= nextLevel.tapsNeeded) {
        state.levels[state.fruitType].level += 1;
        state.levels[state.fruitType].current = 0;
        state.perTap = fruitLevels[currentLevel.level].tapsPertap;
      }
      /* if (fruitLevel) state.levels.set(state.fruitType, { ...fruitLevel }); */
    },
  },
});

export const { setPerTap } = userSlice.actions;

export default userSlice.reducer;
