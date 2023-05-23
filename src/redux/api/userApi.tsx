import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../core/constant/endpoints";
import { baseQueryConfig } from "./BaseQueryConfig";
import { User } from "../../core/models/user.model";
import { UserDetails, UsersDetails } from "core/models/UserDetails.model";

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
    setAdmin: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.SETADMIN + id,
          method: "put",
        };
      },
      invalidatesTags: ["User"],
    }),
    revokeAdmin: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.REVOKEADMIN + id,
          method: "put",
        };
      },
      invalidatesTags: ["User"],
    }),
    userDetails: builder.query<UserDetails, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERDETAILS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    listAllNotifications: builder.query<any, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERLISTNOTIFICATIONS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    listUnreadNotifications: builder.query<any, string | undefined>({
      query: (id) => {
        return {
          url: endpoints.USERLISTUNREADNOTIFICATIONS + id,
          method: "get",
        };
      },
      providesTags: ["User"],
    }),
    markAllAsReadNotifications: builder.mutation<any, void>({
      query: () => {
        return {
          url: endpoints.MARKAllASREADNOTIFICATIONS,
          method: "post",
        };
      },
      invalidatesTags: ["User"],
    }),
    
  }),
});

export const {
  useGetUsersQuery,
  useVerifiedUsersQuery,
  useSetAdminMutation,
  useRevokeAdminMutation,
  useUserDetailsQuery,
  useListAllNotificationsQuery,
  useListUnreadNotificationsQuery,
  useMarkAllAsReadNotificationsMutation

} = userApi;
