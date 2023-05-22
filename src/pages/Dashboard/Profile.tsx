import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectAuth,
  resendEmailVerification,
} from "../../redux/slices/authSlice";
import {
  useLogoutUserMutation,
  useProfileQuery,
  useResendEmailVerificationMutation,
  useResetPasswordMutation,
  useUpdateAvatarMutation,
} from "../../redux/api/authApi";
import { Alert, AlertTitle, Avatar, CardMedia, Container } from "@mui/material";
import Spinner from "../../components/Spinner/spinner";
import { useTranslation } from "react-i18next";
import { dashboard } from "../../core/constant/dashboard";
import { resendEmailVerificationMsg } from "../../core/constant/resendEmailVerification";
import CustomModal from "../../components/Modal/CustomModal";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { getToken } from "core/utils/functionHelpers";

function Profile() {
  // const { name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectAuth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tokenValue = getToken();
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");

  const {
    data: dataProfile,
    isError,
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

  const [
    updateAvatar,
    {
      data: avatarData,
      isSuccess: avatarSuccess,
      isError: avatarError,
      isLoading: AvatarLoading,
    },
  ] = useUpdateAvatarMutation();

  const { firstname, lastname, email, phone, avatar } = dataProfile?.user ?? {};

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

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div>
        <Alert
          severity="warning"
          sx={{ height: "60", t: "center", paddingLeft: "30%" }}
        >
          <AlertTitle>Warning</AlertTitle>
          {dashboard.checkEmailMsg}
        </Alert>

        <Button
          type="button"
          onClick={() => handleResendEmail()}
          disabled={isLoading}
        >
          resend email verification
        </Button>
        <Button type="button" onClick={() => handleLogout()}>
          logout
        </Button>
        {loadingResend && <Spinner />}

        {loadingResend ? (
          <Spinner />
        ) : successResend ? (
          showModal && (
            <CustomModal
              title="Verification email"
              description={descriptionModal}
            />
          )
        ) : errorResend ? (
          <Alert severity="error" sx={{ height: "60", textAlign: "center" }}>
            <AlertTitle>Error</AlertTitle>
            {resendEmailVerificationMsg.errorResendEmail}
          </Alert>
        ) : null}
      </div>
    );

  if (isSuccess && dataProfile?.user)
    return (
      <>
        <h2>Welcome {firstname}</h2>
        <Container>
          <Avatar sx={{ width: 90, height: 90 }} alt="avatar" src={avatar} />
          <p>Firstname: {firstname}</p>
          <p>Lastname: {lastname}</p>
          <p>email: {email}</p>
          <p>Phone: {phone}</p>
        </Container>
      </>
    );
  else return <p>{t("profile.user_not_found")}</p>;
}

export default Profile;
