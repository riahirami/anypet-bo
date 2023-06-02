import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import {

  selectAuth,
} from "../../../../redux/slices/authSlice";
import {
  useProfileQuery,
  useResendEmailVerificationMutation,

} from "../../../../redux/api/authApi";
import { Alert, AlertTitle, Avatar, Container } from "@mui/material";
import Spinner from "../../../../components/Spinner/spinner";
import { useTranslation } from "react-i18next";
import { dashboard } from "../../../../core/constant/dashboard";
import { resendEmailVerificationMsg } from "../../../../core/constant/resendEmailVerification";
import CustomModal from "../../../../components/Modal/CustomModal";
import {
  Button,
  Grid,
  Typography, Divider
} from "@mui/material";
import { getToken } from "core/utils/functionHelpers";

import {CustomContainerProfile,CustomGlobalGrid, CustomGridCover,CustomGridProfileInformations} from "./Profile.style"

function Profile() {
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
    resendEmail,
    {
      data: resendEmailData,
      isLoading: loadingResend,
      isSuccess: successResend,
      isError: errorResend,
    },
  ] = useResendEmailVerificationMutation();



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
        <CustomGlobalGrid>
          <CustomContainerProfile>
            <CustomGridCover item>
              <Avatar sx={{ width: 120, height: 120 }} alt="avatar" src={avatar} />
            </CustomGridCover>
            <Divider>
              <Typography variant="h5" style={{ padding: '15px' }}>Welcome {firstname}</Typography>
            </Divider>
            <CustomGridProfileInformations container >
              <Grid item>
                <Typography>First name: {firstname}</Typography>
              </Grid>
              <Grid item>
                <Typography>Last name: {lastname}</Typography>
              </Grid>
              <Grid item>
                <Typography>email: {email}</Typography>
              </Grid>
              <Grid item>
                <Typography>Phone: {phone}</Typography>
              </Grid>
            </CustomGridProfileInformations>
            <Divider/>
          </CustomContainerProfile>
        </CustomGlobalGrid>


      </>
    );
  else return <p>{t("profile.user_not_found")}</p>;
}

export default Profile;
