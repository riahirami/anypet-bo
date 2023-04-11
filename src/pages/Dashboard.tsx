import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logout,
  selectAuth,
  resendEmailVerification,
} from "../redux/slices/authSlice";
import { authApi } from "../redux/api/authApi";
import {
  useLogoutUserMutation,
  useProfileQuery,
  useResendEmailVerificationMutation,
  useResetPasswordMutation,
} from "../redux/api/authApi";
import { Alert, AlertTitle, Container } from "@mui/material";
import Spinner from "../components/Spinner/spinner";
import { useTranslation } from "react-i18next";
import { dashboard } from "../core/constant/dashboard";
import { resendEmailVerification as ResendEmailVerificationMsg } from "../core/constant/resendEmailVerification";
import CustomModal from "../components/Modal/CustomModal";

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
      setDescriptionModal(ResendEmailVerificationMsg.successResendEmail); 
      setShowModal(true);}
  }

  return (
    <>
      {isLoading && <Spinner />}
      <div>Dahsboard {dashboard.welcomeMsg}</div>
  
      {isError && (
        <div>
          <Alert
            severity="warning"
            sx={{ height: "60", t: "center", paddingLeft: "30%" }}
          >
            <AlertTitle>Warning</AlertTitle>
            {dashboard.checkEmailMsg}
          </Alert>
  
          <button
            type="button"
            onClick={() => handleResendEmail()}
            disabled={isLoading}
          >
            resend email verification
          </button>
          <button type="button" onClick={() => handleLogout()}>
            logout
          </button>
          {loadingResend && <Spinner />}
  
          {loadingResend ? (
            <Spinner />
          ) : successResend ? (
            showModal &&  <CustomModal
            title="Verification email"
            description={descriptionModal}
           />
          ) : errorResend ? (
            <Alert
              severity="error"
              sx={{ height: "60", textAlign: "center" }}
            >
              <AlertTitle>Error</AlertTitle>
              {ResendEmailVerificationMsg.errorResendEmail}
            </Alert>
          ) : null}
        </div>
      )}
  
      {!isError && isSuccess && dataProfile?.user && (
        <>
          <h2>Welcome {login}</h2>
          <Container>
            <p>Username: {login}</p>
            <p>Fullname: {name}</p>
            <p>email: {email}</p>
            <p>Phone: {phone}</p>
          </Container>
          <button type="button" onClick={() => handleLogout()}>
            logout
          </button>
        </>
      )}
  
      {!isError && (!isSuccess || !dataProfile?.user) && (
        <p>{t("profile.user_not_found")}</p>
      )}
    </>
  );
  
}

export default Dashboard;
