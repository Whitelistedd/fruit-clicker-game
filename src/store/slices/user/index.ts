import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice.types";

const initialState: UserState = {
  allTapsCounter: 0,
  fruitType: "grapefruit",
  heroType: "panda",
  perHour: 0,
  perTap: 1,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPerTap: (state, payload: PayloadAction<number>) => {
      state.perTap = payload.payload;
    },
  },
});

export const { setPerTap } = userSlice.actions;

export default userSlice.reducer;
