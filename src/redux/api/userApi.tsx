import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../core/constant/endpoints";
import { baseQueryConfig } from "./BaseQueryConfig";
import { User } from "../../core/models/user.model";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery(baseQueryConfig),
    tagTypes: ["User"],
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: (page) => `${endpoints.USERS}?page=${page}`,
        providesTags: ["User"],
      }),
      verifiedUsers: builder.query({
        query: () => `${endpoints.VERIFIEDUSERS}`,
        providesTags: ["User"],
      }),

}),
})


export const {useGetUsersQuery,useVerifiedUsersQuery} = userApi ;