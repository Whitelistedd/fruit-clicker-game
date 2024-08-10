import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice.types";

const initialState: UserState = {
  totalTapsCounter: 0,
  fruitType: "grapefruit",
  heroType: "panda",
  perHour: 60,
  perTap: 1,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPerTap: (state, payload: PayloadAction<number>) => {
      state.totalTapsCounter += payload.payload;
    },
  },
});

export const { setPerTap } = userSlice.actions;

export default userSlice.reducer;
