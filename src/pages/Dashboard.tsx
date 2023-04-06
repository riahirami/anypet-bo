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
  useEmailVerificationMutation,
  useResetPasswordMutation,
} from "../services/authApi";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Stack,
  AlertTitle,
  Container,
} from "@mui/material";
import Spinner from "../components/spinner";
import AlertDialogModal from "../components/AlertDialogModal";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { name } = useAppSelector(selectAuth);
  const { token } = useAppSelector(selectAuth);
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
      <Navbar />
      <div>Dahsboard</div>

      {isError ? (
        <>
          <Alert
            severity="warning"
            sx={{ height: "60", t: "center", paddingLeft: "30%" }}
          >
            <AlertTitle>Warning</AlertTitle>
            Error access profile, —{" "}
            <strong>check your email to verify your account !</strong>
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
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          ) : (
            <p></p>
          )}
        </>
      ) : (
        <h2>
          Welcome {isSuccess && dataProfile?.user ? dataProfile.user.login : ""}
        </h2>
      )}
      <ul>
        {dataProfile?.user && (
          <Container>
            <React.Fragment>
              <span>Username: {dataProfile.user.login}</span>
              <p>Fullname: {dataProfile.user.name}</p>
              <p>email: {dataProfile.user.email}</p>
              <p>Phone: {dataProfile.user.phone}</p>
            </React.Fragment>
          </Container>
        )}
      </ul>
      <button type="button" onClick={() => handleLogout()}>
        logout
      </button>
    </>
  );
}

export default Dashboard;
