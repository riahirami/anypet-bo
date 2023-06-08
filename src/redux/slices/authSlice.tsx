import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../core/models/user.model";
import { AuthState } from "../../core/models/authState.model";
import { RegisterResponse } from "../../core/models/registreResponse.model";
import { authApi } from "redux/api/authApi";

const initialState: AuthState = {
  name: null,
  token: localStorage.getItem("token")
    ? localStorage.getItem("userToken")
    : null,
  message: null,
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) => {
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     user: action.payload.user,
      //     token: action.payload.token,
      //   })
      // );
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    registre: (state, action: PayloadAction<{ user: User; token: string }>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token,
        })
      );
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resendEmailVerification: (
      state,
      action: PayloadAction<{ message: string; token: string }>
    ) => {
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.profile.matchFulfilled,
      (
        state: AuthState,
        action: PayloadAction<{ message: string; user?: User }, string>
      ) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      }
    );
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, registre, logout, resendEmailVerification } =
  authSlice.actions;
export default authSlice.reducer;
