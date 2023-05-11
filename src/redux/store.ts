import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalSlice from "./Futures/modalSlice";
import boardSlice from "./Futures/board";
import taskSlice from "./Futures/taskSlice";
import authSlice from "./Futures/authSlice";
import errorSlice from "./Futures/error";
import { userApi } from "./api/userApi";
import { todoApi } from "./api/TaskApi";
import { boardApi } from "./api/boardApi";
import { authApi } from "./api/auth";
import { tableApi } from "./api/table";
export const store = configureStore({
  reducer: {
    modal: modalSlice,
    board: boardSlice,
    task: taskSlice,
    credentials: authSlice,
    error: errorSlice,
    [todoApi.reducerPath]: todoApi.reducer,
    [boardApi.reducerPath]: boardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tableApi.reducerPath]: tableApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      todoApi.middleware,
      boardApi.middleware,
      authApi.middleware,
      userApi.middleware,
      tableApi.middleware
    ),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
