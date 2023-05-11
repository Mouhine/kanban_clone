import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs/promises";

export interface authState {
  accessToken: string;
  id: string;
}

const initialState: authState = {
  accessToken: "",
  id: "",
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authState>) => {
      console.log(action.payload, "this is payload fuck you");
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
    },
  },
});
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
