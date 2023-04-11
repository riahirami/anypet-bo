import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { User } from "../../core/models/user.model";
import {AuthState  } from "../../core/models/authState.model";
import {  RegisterResponse } from "../../core/models/registreResponse.model";




const initialState: AuthState = {
  name: null,
  token: localStorage.getItem('token')
  ? localStorage.getItem('userToken')
  : null,
  message: null,
  user:null,
}
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; token: string }>
    ) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: action.payload.name,
          token: action.payload.token,
        })
      );
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.name = null;
      state.token = null;
    },
    registre: (state,
      action: PayloadAction<{ user: User; token: string}>
      ) => {
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
    resendEmailVerification: (state,
      action: PayloadAction<{ message: string; token: string}>
      ) => {
     
      state.message = action.payload.message;
    },
  },
  
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser,registre, logout, resendEmailVerification } = authSlice.actions;
export default authSlice.reducer;
