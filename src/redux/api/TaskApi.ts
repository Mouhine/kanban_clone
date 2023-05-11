import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Task from "@/types/Task";
import { HYDRATE } from "next-redux-wrapper";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAll: builder.query<Task[], void>({
      query: () => `tasks`,
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    getById: builder.query<Task, string>({
      query: (id: string) => `tasks/${id}`,
      providesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    addTodo: builder.mutation<Task, Task>({
      query(task) {
        return {
          url: `tasks`,
          method: "POST",
          body: task,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Omit<Task, "subTasks">, Task>({
      query(todo) {
        return {
          url: `tasks/${todo.id}`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateSubTodo: builder.mutation<Omit<Task, "subTasks">, Task>({
      query(todo) {
        return {
          url: `tasks/`,
          method: "PUT",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<Task, Task>({
      query(todo) {
        return {
          url: `tasks/${todo.id}`,
          method: "DELETE",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllQuery,
  useUpdateTodoMutation,
  useGetByIdQuery,
  useUpdateSubTodoMutation,
} = todoApi;
