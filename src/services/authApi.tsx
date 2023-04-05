import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../models/user.model";
import { RegisterResponse } from "../models/registreResponse.model";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../models/resetPassword.model";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api",
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers.set("authorization", "");
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/login",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"]
    }),
    registreUser: builder.mutation<RegisterResponse, User>({
      query: (body: User) => {
        return {
          url: "/register",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: (body: { token: string }) => {
        return {
          url: "/auth/logout",
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    profile: builder.query<{ message: string; user?: User }, string>({
      query: (token: string) => {
        return {
          url: "/profile",
          method: "post",
          body: {
            token: token,
          },
        };
      },
      providesTags: ["User"],
    }),

    forgotPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: ({ email, password, password_confirmation, token }) => ({
        url: "/reset-password",
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
        url: `/email/verify/${id}/${hash}`,
        method: "GET",
      }),
    }),
    resendEmailVerification: builder.mutation<string, { token: string }>({
      query: ({ token }) => ({
        url: "/email/resend-verification",
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
} = authApi;
