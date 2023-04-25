import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectAuth,
  resendEmailVerification,
} from "../../redux/slices/authSlice";
import { authApi } from "../../redux/api/authApi";
import {
  useLogoutUserMutation,
  useProfileQuery,
  useResendEmailVerificationMutation,
  useResetPasswordMutation,
} from "../../redux/api/authApi";
import { Alert, AlertTitle, Container } from "@mui/material";
import Spinner from "../../components/Spinner/spinner";
import { useTranslation } from "react-i18next";
import { dashboard } from "../../core/constant/dashboard";
import { resendEmailVerificationMsg } from "../../core/constant/resendEmailVerification";
import CustomModal from "../../components/Modal/CustomModal";
import { ProSidebarProvider } from "../../components/SidebarSrc/ProSidebarProvider";
import Profile from "./Profile";
import { Playground } from "../../layouts/SideBar";
import { BrowserRouter } from "react-router-dom";

function Dashboard() {
  // const { name } = useAppSelector(selectAuth);
  const { token } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");

  const {
    data: dataProfile,
    isError,
    isFetching,
    isSuccess,
    isLoading,
  } = useProfileQuery(tokenValue.token);

  const { login, name, email, phone } = dataProfile?.user ?? {};

  const [
    logoutUser,
    {
      data: loginData,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutUserMutation(tokenValue);

  const [
    resendEmail,
    {
      data: resendEmailData,
      isLoading: loadingResend,
      isSuccess: successResend,
      isError: errorResend,
    },
  ] = useResendEmailVerificationMutation();

  const [
    resetPassword,
    { data: resetData, isSuccess: resetSuccess, isError: resetError },
  ] = useResetPasswordMutation();

  function handleLogout() {
    // dispatch(logout);
    if (token) {
      localStorage.clear();
      navigate("/signin");
    }
  }

  async function handleResendEmail() {
    const responseResend = await resendEmail(tokenValue);

    if (responseResend) {
      setDescriptionModal(resendEmailVerificationMsg.successResendEmail);
      setShowModal(true);
    }
  }

  return (
    <>
        
    </>
  );
}

export default Dashboard;
