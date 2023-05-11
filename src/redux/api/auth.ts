import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, loginEntry, loginInput } from "../../types/User";
import { authState } from "../Futures/authSlice";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<authState, loginEntry>({
      query: (input) => ({
        url: `/auth/login`,
        method: "POST",
        body: input,
      }),
    }),

    handleRefresh: builder.mutation<authState, null>({
      query: () => ({
        url: `/auth/refresh`,
        method: "POST",
        credentials: "include",
      }),
    }),

    registerUser: builder.mutation<authState, User>({
      query: (user) => ({
        url: `/auth/register`,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useHandleRefreshMutation,
} = authApi;
