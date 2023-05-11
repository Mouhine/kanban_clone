import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  open: boolean;
  view: string;
  title: string;
}

const initialState: CounterState = {
  open: false,
  view: "",
  title: "",
};

export const modalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.open = !state.open;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleOpen, setView, setTitle } = modalSlice.actions;

export default modalSlice.reducer;
