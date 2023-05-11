import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  id: string;
  title: string;
}

const initialState: CounterState = {
  title: "",
  id: "",
};

export const boardSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBoardTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setBoaredId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBoardTitle, setBoaredId } = boardSlice.actions;

export default boardSlice.reducer;
