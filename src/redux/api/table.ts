import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Table } from "@/types/Table";

// Define a service using a base URL and expected endpoints
export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/table`,
  }),
  tagTypes: ["tabels", "tasks"],
  endpoints: (builder) => ({
    getAllTabels: builder.query<Table[], string>({
      query: (id) => `/${id}`,
      providesTags: [{ type: "tabels", id: "LIST" }],
    }),
    createTable: builder.mutation<Table, Table>({
      query(table) {
        return {
          url: `/`,
          method: "POST",
          body: table,
        };
      },
      invalidatesTags: [{ type: "tabels", id: "LIST" }],
    }),

    deleteTable: builder.mutation<Table, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "tabels", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateTableMutation,
  useDeleteTableMutation,
  useGetAllTabelsQuery,
} = tableApi;
