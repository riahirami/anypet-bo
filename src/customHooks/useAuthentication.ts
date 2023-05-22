import { useState, useEffect, useRef } from 'react';
import { getCurrentUser, getToken } from "core/utils/functionHelpers";
import { User } from 'core/models/user.model';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { logout, setUser } from 'redux/slices/authSlice';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};
export function useAuthentication() {

  const authUser = useSelector((state: any) => state.auth.user);
  const dispatch: Dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (authUser.user.firstname!="") {
        // dispatch(setUser(authUser));
        return authUser
      }
      else {
        // dispatch(
        //   setUser({ user: initialState, token: "null" })
        // );
        //  dispatch(logout());
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return authUser;
}