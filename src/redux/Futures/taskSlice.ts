import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import TaskType from "@/types/Task";
export interface TaskState {
  id: string;
}

const initialState: TaskState = {
  id: "",
};

export const taskSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setId: (state, { payload }: PayloadAction<string>) => {
      state.id = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setId } = taskSlice.actions;

export default taskSlice.reducer;
