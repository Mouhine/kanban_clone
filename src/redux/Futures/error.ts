import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  msg: string;
}

const initialState: CounterState = {
  msg: "",
};

export const errorSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMsg: (state, action: PayloadAction<string>) => {
      state.msg = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMsg } = errorSlice.actions;

export default errorSlice.reducer;
