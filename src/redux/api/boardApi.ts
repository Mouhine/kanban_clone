import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Board } from "@/types/Board";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/boards`,
  }),
  tagTypes: ["Boards"],
  endpoints: (builder) => ({
    getAllBoards: builder.query<Board[], string>({
      query: (id) => `/${id}`,
      providesTags: [{ type: "Boards", id: "LIST" }],
    }),
    createBoard: builder.mutation<Board, Board>({
      query(board) {
        return {
          url: `/`,
          method: "POST",
          body: board,
        };
      },
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),
    deleteBoard: builder.mutation<Board, Board>({
      query(board) {
        return {
          url: `/${board.id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Boards", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useGetAllBoardsQuery,
} = boardApi;
