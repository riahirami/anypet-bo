import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  logout,
  selectAuth,
  resendEmailVerification,
} from "../features/authSlice";
import { authApi } from "../services/authApi";
import {
  useLogoutUserMutation,
  useProfileQuery,
  useResendEmailVerificationMutation,
  useResetPasswordMutation,
} from "../services/authApi";
import { Alert, AlertTitle, Container } from "@mui/material";
import Spinner from "../components/spinner";
import AlertDialogModal from "../components/AlertDialogModal";
// import {Navbar as MenuNavbar} from "../components/Navbar/Navbar"
import { useTranslation } from "react-i18next";
import { dashboard } from '../core/constant/dashboard';
import { resendEmailVerification as ResendEmailVerificationMsg } from "../core/constant/resendEmailVerification";

function Dashboard() {
  // const { name } = useAppSelector(selectAuth);
  const { token } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");
  const [showModal, setShowModal] = useState(false);

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
      console.log("user logout successfully");
      navigate("/signin");
    }
  }

  async function handleResendEmail() {
    const responseResend = await resendEmail(tokenValue);
    if (responseResend) setShowModal(true);
  }

  return (
    <>
      {isLoading && <Spinner />}
      <div>Dahsboard { dashboard.welcomeMsg}</div>

      {isError ? (
        <>
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
          {loadingResend && <Spinner />}

          {loadingResend ? (
            <Spinner />
          ) : successResend ? (
            showModal && <AlertDialogModal title="Resend email " />
          ) : errorResend ? (
            <Alert severity="error" sx={{ height: "60", textAlign: "center" }}>
              <AlertTitle>Error</AlertTitle>
              {ResendEmailVerificationMsg.errorResendEmail}
            </Alert>
          ) : (
            {}
          )}
        </>
      ) : (
        <h2>
          Welcome {isSuccess && dataProfile?.user ? dataProfile.user.login : ""}
        </h2>
      )}
 <div>
 <ul>
        {dataProfile?.user ? (
          dataProfile?.user && (
            <Container>
                <p>Username: {login}</p>
                <p>Fullname: {name}</p>
                <p>email: {email}</p>
                <p>Phone: {phone}</p>
            </Container>
          )
        ) : (
          <p>{t("profile.user_not_found")}</p>
        )}
      </ul>
      <button type="button" onClick={() => handleLogout()}>
        logout
      </button>
 </div>
      
    </>
  );
}

export default Dashboard;
