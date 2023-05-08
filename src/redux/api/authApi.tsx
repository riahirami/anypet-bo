import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../core/models/user.model";
import {endpoints} from "../../core/constant/endpoints";
import {baseQueryConfig} from "./BaseQueryConfig";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: endpoints.loginUserUrl,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"]
    }),
    registreUser: builder.mutation({
      query: (body: User) => {
        return {
          url: endpoints.registreUserUrl,
          method: "post",
          body,
        };
      },
      
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: (body: { token: string }) => {
        return {
          url: endpoints.logoutUserUrl,
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    profile: builder.query<{ message: string; user?: User }, string>({
      query: (token: string) => {
        return {
          url: endpoints.profileUrl,
          method: "post",
          body: {
            token: token,
          },
        };
      },
      providesTags: ["User"],
    }),
    UpdateAvatar: builder.mutation({
      query: (body) => ({
        url: endpoints.UPDATEAVATAR,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: endpoints.forgotPasswordUrl,
        method: "POST",
        body: { email },
      }),
       invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: ({ email, password, password_confirmation, token }) => ({
        url: endpoints.resetPasswordUrl,
        method: "POST",
        body: { email, password, password_confirmation, token },
      }),
      invalidatesTags: ["User"],
    }),
    emailVerification: builder.mutation<
      string,
      { token: string; id: string; hash: string }
    >({
      query: ({ token, id, hash }) => ({
        url: endpoints.emailVerificationUrl+`${id}/${hash}`,
        method: "GET",
      }),
    }),
    resendEmailVerification: builder.mutation<string, { token: string }>({
      query: ({ token }) => ({
        url: endpoints.resendEmailVerificationUrl,
        method: "POST",
        body: { token },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useProfileQuery,
  useRegistreUserMutation,
  useForgotPasswordMutation,
  useResendEmailVerificationMutation,
  useEmailVerificationMutation,
  useResetPasswordMutation,
  useUpdateAvatarMutation
} = authApi;
