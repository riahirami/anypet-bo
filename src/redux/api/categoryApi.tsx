import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {endpoints} from "../../core/constant/endpoints";
import {baseQueryConfig} from "./BaseQueryConfig";
import { Category, CategoryData } from "../../core/models/category.model";
import { idText } from "typescript";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery(baseQueryConfig),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<CategoryData, void>({
            query :()=> {
                return {
                    url : endpoints.Categories,
                    method: "get",
                };
            },
            providesTags: ["Category"]
        }),
        addCategory: builder.mutation({
            query : ({title,description}) => {
                return {
                    url: endpoints.Categories,
                    method: "post",
                    body:{title,description
                        
                      },
                }
            }
        }),
        updateCategory: builder.mutation({
            query: ({ id, title, description }) => ({
              url: `${endpoints.Categories}${id}`,
              method: 'PUT',
              body: { title,description },
            }),
          }),
        deleteCategory: builder.mutation({
            query : (id) => {
                return {
                    url: endpoints.Categories+id,
                    method: "delete",
                    body:id,
                }
            }
        }),
    getCategoryById: builder.query({
      query: (id: any) => {
        return{
            url: endpoints.Categories+`${id}`,
            method:"get"
        }
      }
    }),
        
    })


})

export const {useGetCategoriesQuery,useGetCategoryByIdQuery,useAddCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation} = categoryApi;