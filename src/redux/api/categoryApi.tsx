import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../core/constant/endpoints";
import { baseQueryConfig } from "./BaseQueryConfig";
import { Category, CategoryData } from "../../core/models/category.model";
import { idText } from "typescript";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryData, number>({
      query: (page) => `${endpoints.Categories}?page=${page}`,
      providesTags: ["Category"],
    }),
    getAllCategories: builder.query<CategoryData, number>({
      query: (perpage) => {
        return {
          url: `${endpoints.Categories}?perpage=${perpage}`,
          method: "get",
        };
      },
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: ({ title }) => {
        return {
          url: endpoints.Categories,
          method: "post",
          body: { title },
        };
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, title }) => ({
        url: `${endpoints.Categories}${id}`,
        method: "PUT",
        body: { title },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.Categories + id,
          method: "delete",
          body: id,
        };
      },
      invalidatesTags: ["Category"],
    }),
    getCategoryById: builder.query({
      query: (id: any) => {
        return {
          url: endpoints.Categories + `${id}`,
          method: "get",
        };
      },
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
