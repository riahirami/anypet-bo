import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../core/models/user.model";
import {authApiUrl} from "../../core/constant/authApi"


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: authApiUrl.baseUrl,
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
          url: authApiUrl.loginUserUrl,
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"]
    }),
    registreUser: builder.mutation({
      query: (body: User) => {
        return {
          url: authApiUrl.registreUserUrl,
          method: "post",
          body,
        };
      },
      
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: (body: { token: string }) => {
        return {
          url: authApiUrl.logoutUserUrl,
          method: "post",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    profile: builder.query<{ message: string; user?: User }, string>({
      query: (token: string) => {
        return {
          url: authApiUrl.profileUrl,
          method: "post",
          body: {
            token: token,
          },
        };
      },
      providesTags: ["User"],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: authApiUrl.forgotPasswordUrl,
        method: "POST",
        body: { email },
      }),
      // invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: ({ email, password, password_confirmation, token }) => ({
        url: authApiUrl.resetPasswordUrl,
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
        url: authApiUrl.emailVerificationUrl+`${id}/${hash}`,
        method: "GET",
      }),
    }),
    resendEmailVerification: builder.mutation<string, { token: string }>({
      query: ({ token }) => ({
        url: authApiUrl.resendEmailVerificationUrl,
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
