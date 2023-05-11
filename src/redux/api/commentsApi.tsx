import {
  CreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "./../../core/constant/endpoints";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (id: any) => endpoints.LISTCOMMENTS + id,
      providesTags: ["Comment"],
    }),
    addComments: builder.mutation({
      query: ({ id, description }) => {
        return {
          url: endpoints.LISTCOMMENTS + id,
          method: "post",
          body: { description },
        };
      },
      invalidatesTags: ["Comment"],
    }),

    replyComments: builder.mutation({
      query: ({ id, parent_id, description }) => {
        return {
          url: endpoints.LISTCOMMENTS + id + "/" + parent_id,
          method: "post",
          body: { description },
        };
      },
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.LISTCOMMENTS + id,
          method: "delete",
          body: id,
        };
      },
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentsMutation,
  useReplyCommentsMutation,
  useDeleteCommentMutation
} = commentApi;
