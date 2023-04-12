import React, { useState } from "react";
import { Navigate, useNavigate, useParams,useLocation  } from "react-router-dom";
import {
  useProfileQuery,
  useResetPasswordMutation,
} from "../redux/api/authApi";
import Spinner from "../components/Spinner/spinner";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Grid,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import CustomModal from "../components/Modal/CustomModal";
import { resetPasswordMsg } from "../core/constant/resetPassword";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");

  const [
    resetPassword,
    {
      data: resetData,
      isSuccess: resetSuccess,
      isError: resetError,
      error: errorReset,
      isLoading: loadingReset,
    },
  ] = useResetPasswordMutation();

  const {
    data: dataProfile,
    isError,
    isFetching,
    isSuccess,
    isLoading,
  } = useProfileQuery(tokenValue.token);

  const navigate = useNavigate();

  const url = window.location.href;
  const parts = url.split("=");
  const token = parts[1].split("?")[0];
  const thisEmail = parts[2].split("=")[0];



  async function handleResetPassword() {
    const newPassword = password;
    const confirmNewPassword = passwordConfirmation;
    const tokenRequest = token as string;

    if (password == passwordConfirmation) {
      const dataResponse = await resetPassword({
        email: thisEmail,
        password: newPassword,
        password_confirmation: confirmNewPassword,
        token: tokenRequest,
      });

      if (dataResponse) {
        setShowModal(true);
        if (!resetData?.message)
          setDescriptionModal(resetPasswordMsg.errorResetPassword);
        else 
        setDescriptionModal(resetData?.message);
      }
    }
    else 
    {
      setShowModal(true);
      setDescriptionModal(resetPasswordMsg.passwordNotMatch);
    }
  }

  return (
    <div>
      {/* mui */}

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="confirm Password"
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              autoComplete="current-password"
            />

            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleResetPassword}
              disabled={isLoading}
            >
              Confirm
            </Button>
            {loadingReset && <Spinner />}
            {showModal && (
              <CustomModal
                title="Reset password"
                description={descriptionModal}
              />
            )}
            <Grid item></Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
