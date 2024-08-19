/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { UserState } from "./userSlice.types";
import { RootState } from "@/store";

const initialState: UserState = {
  boosting: false,
  created_at: "",
  energy: 0,
  id: "",
  main_fruit: undefined,
  max_energy: 0,
  per_tap: 0,
  total_taps_counter: 0,
  user_fruit_stats: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInitialInfo: (state, payload: PayloadAction<UserState>) => {
      state = payload.payload as any;
    },
    setEnergy: (
      state,
      payload: PayloadAction<{ amount: number; type: "remove" | "add" }>
    ) => {
      if (!state?.energy || !state.max_energy) return;
      if (
        payload.payload.type === "add" &&
        state?.energy + payload.payload.amount < state?.max_energy
      ) {
        state.energy += payload.payload.amount;
      } else if (payload.payload.type === "remove") {
        state.energy =
          state.energy - payload.payload.amount >= 0
            ? state.energy - payload.payload.amount
            : 0;
      }
    },
    setBoostingStatus: (state, payload: PayloadAction<boolean>) => {
      state.boosting = payload.payload;
    },
    setPerTap: (state, payload: PayloadAction<number>) => {
      state.per_tap = payload.payload;
    },
  },
});

export const { setEnergy, setInitialInfo, setBoostingStatus, setPerTap } =
  userSlice.actions;

export const handleTap =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (_, getState) => {
    const state = getState().user;
    if (
      (state.energy && state.energy <= 0) ||
      !state.main_fruit ||
      !state.total_taps_counter ||
      !state.energy ||
      !state.user_fruit_stats
    )
      return;

    // add 1 tap to all stats
    const perTapAmount = state.per_tap || 1;
    state.total_taps_counter += perTapAmount;
    state.user_fruit_stats.taps += perTapAmount;
    state.user_fruit_stats.current += perTapAmount;
    state.energy -= 1;
    const fruitLevels = state.main_fruit?.levels;
    const nextLevel = fruitLevels?.[state.user_fruit_stats?.level + 1];

    // increase level and reset current amount of taps
    if (
      nextLevel &&
      state?.main_fruit?.levels &&
      state.user_fruit_stats.current >= nextLevel.taps_needed
    ) {
      state.user_fruit_stats.level += 1;
      state.user_fruit_stats.current = 0;

      // increase taps_per_tap if the user is boosting while reaching a new level
      if (state.boosting) {
        state.per_tap =
          fruitLevels[state.user_fruit_stats?.level].taps_per_tap * 2;
      } else {
        state.per_tap = fruitLevels[state.user_fruit_stats?.level].taps_per_tap;
      }
    }
  };

export default userSlice.reducer;
