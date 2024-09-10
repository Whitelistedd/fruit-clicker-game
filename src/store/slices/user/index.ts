/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import { UserState } from "./userSlice.types";
import { RootState } from "@/store";
import {fruitType} from "@/store/slices/fruits/fruits.types.ts";

const initialState: UserState = {
  boosting: false, // if the user is boosting currently
  boostCoolDown: false, // if the user boost cooldown is active
  created_at: "", // when the user account was created
  energy: 0, // current energy level of the user
  id: "", // user id
  main_fruit: null, // main fruit information (levels, name, img)
  main_fruit_stats: {
    created_at: "",
    current: 0,
    fruit_id: 0,
    level: 0,
    taps: 0,
    unlocked: false,
    user_id: "",
  }, // main fruit stats (current level, unlocked, amount of taps)
  max_energy: 0, // maximum energy
  per_tap: 0, // how much taps (number) to be added (ex. +1, +15, +30 per tap)
  total_taps_counter: 0, // total number of taps across all fruits
  user_fruit_levels: [
    {
      created_at: "",
      current: 0,
      fruit_id: 0,
      level: 0,
      taps: 0,
      unlocked: false,
      user_id: "",
    },
  ], // all user's fruit stats
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInitialInfo: (state, payload: PayloadAction<UserState>) => {
      state.boosting = payload.payload.boosting;
      state.energy = payload.payload.energy;
      state.main_fruit = payload.payload.main_fruit;
      state.main_fruit_stats = payload.payload.main_fruit_stats;
      state.max_energy = payload.payload.max_energy;
      state.per_tap = payload.payload.per_tap;
      state.total_taps_counter = payload.payload.total_taps_counter;
      state.user_fruit_levels = payload.payload.user_fruit_levels;
    },
    setEnergy: (
      state,
      payload: PayloadAction<{ amount?: number; type: "remove" | "add" }>
    ) => {
      if (isNaN(state?.energy) || isNaN(state.max_energy)) return;
      if (
        payload.payload.type === "add" &&
        state?.energy + (payload.payload.amount || 1) <= state?.max_energy
      ) {
        state.energy += payload.payload.amount || 1;
      } else if (payload.payload.type === "remove") {
        state.energy =
          state.energy - (payload.payload.amount || 1) >= 0
            ? state.energy - (payload.payload.amount || 1)
            : 0;
      }
    },
    setBoostingStatus: (state, payload: PayloadAction<boolean>) => {
      state.boosting = payload.payload;
    },
    setBoostCooldown: (state, payload: PayloadAction<boolean>) => {
      state.boostCoolDown = payload.payload
    },
    setTotalTapsCounter: (state, payload: PayloadAction<number>) => {
      state.total_taps_counter = payload.payload
    },
    setMainFruitTaps: (state, payload: PayloadAction<number>) => {
      state.main_fruit_stats.taps = payload.payload
    },
    setMainFruitLevel: (state, payload: PayloadAction<number>) => {
      state.main_fruit_stats.level = payload.payload
      state.user_fruit_levels = state.user_fruit_levels.map(userLevel => (userLevel.fruit_id == state.main_fruit_stats.fruit_id ? {...userLevel, level: payload.payload} : userLevel))
    },
    setMainFruitCurrent: (state, payload: PayloadAction<number>) => {
      state.main_fruit_stats.current = payload.payload
    },
    setMainFruit: (state, payload: PayloadAction<fruitType>) => {
      const new_main_fruit_stats = state.user_fruit_levels.find(fruit => fruit.fruit_id === payload.payload.id)
      if(!new_main_fruit_stats) return console.log("Not Unlocked")
      state.main_fruit = payload.payload
      state.user_fruit_levels = state.user_fruit_levels.map(fruit => fruit.fruit_id === payload.payload.id ? state.main_fruit_stats : fruit)
      state.main_fruit_stats = new_main_fruit_stats
      if(new_main_fruit_stats?.level && payload?.payload?.levels)
        state.per_tap = payload?.payload?.levels[new_main_fruit_stats?.level].taps_per_tap
    },
    setPerTap: (state, payload: PayloadAction<number>) => {
      state.per_tap = payload.payload;
    },
    setUserFruitLevels: (state, payload) => {
      state.user_fruit_levels = payload.payload
    }
  },
});

export const { setEnergy, setTotalTapsCounter, setMainFruitLevel, setMainFruit, setInitialInfo, setUserFruitLevels, setMainFruitCurrent, setMainFruitTaps, setBoostCooldown, setBoostingStatus, setPerTap } =
  userSlice.actions;

export const handleTap =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    let state = getState().user;
    if (
      state?.main_fruit_stats?.level === null ||
      state.energy <= 0 ||
      !state.main_fruit ||
      isNaN(state.total_taps_counter) ||
      isNaN(state.energy) ||
      state?.main_fruit_stats?.taps === null ||
      state?.main_fruit_stats?.current === null
    )
      return;

    // add 1 tap to all stats
    const perTapAmount = state.per_tap || 1;
    dispatch(setTotalTapsCounter(state.total_taps_counter + perTapAmount))
    dispatch(setMainFruitTaps(state.main_fruit_stats.taps + perTapAmount))
    dispatch(setMainFruitCurrent(state.main_fruit_stats.current + perTapAmount))
    dispatch(setEnergy({amount: 1, type: "remove"}))
    state = getState().user;
    const fruitLevels = state.main_fruit?.levels;
    const nextLevel = fruitLevels?.[1 + (state?.main_fruit_stats?.level || 1)];

    // increase level and reset current amount of taps
    if (
      nextLevel&&
      state?.main_fruit?.levels !== null &&
      state?.main_fruit_stats?.level !== null &&
      state.main_fruit_stats?.current !== null &&
      state.main_fruit_stats?.current >= nextLevel?.taps_needed
    ) {
      dispatch(setMainFruitLevel(state?.main_fruit_stats?.level + 1))
      dispatch(setMainFruitCurrent(0))

      // increase taps_per_tap if the user is boosting while reaching a new level
      if (state.boosting) {
        dispatch(setPerTap(fruitLevels[state.main_fruit_stats?.level + 1].taps_per_tap * 2))
      } else {
        dispatch(setPerTap(fruitLevels[state.main_fruit_stats?.level + 1].taps_per_tap))
      }
    }
  };

export default userSlice.reducer;
