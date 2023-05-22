import React, { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
} from "../redux/api/authApi";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import Spinner from "../components/Spinner/spinner";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Grid,
  Link,
  Box,
  Typography,
  Container,
  Divider,
  Chip,
  Alert,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomModal from "../components/Modal/CustomModal";
import AlertComponent from "../components/Alert/Alert";
import { ServerResponse } from "../core/models/authState.model";
import { getCurrentUser } from "core/utils/functionHelpers";
import { useSelector, useDispatch } from "react-redux";
import { useAuthentication } from "customHooks/useAuthentication";
const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};

const theme = createTheme();
const Signin = () => {
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");
  const authUser = useAuthentication();

  const [formValue, setFormValue] = useState(initialState);
  const { firstname, lastname, email, password, phone, address, avatar } =
    formValue;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [
    loginUser,
    {
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginUserMutation();

  function handleChangeForm(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleLogin = async () => {
    if (!(email && password)) {
      setShowModal(true);
    }

    const loginData: any = await loginUser({ email, password });
    if (!!loginData?.data) {
      dispatch(
        setUser({ token: loginData.data.token, user: loginData.data.user })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: loginData?.data.user,
          token: loginData?.data.token,
        })
      );
    
      navigate('/profile');
    }
  };

  const [
    forgotPassword,
    {
      data: responseForgotData,
      isLoading: forgotLoading,
      isSuccess: forgotSuccess,
      error: forgotError,
    },
  ] = useForgotPasswordMutation();

  // TODO: check for undefined on the first click
  const handleSubmitForgotPassword = async () => {
    await forgotPassword(email);

    if (responseForgotData) {
      setDescriptionModal(responseForgotData?.message);
      setShowModal(true);
    }
  };

  if (isLoginError)
    return <AlertComponent title={loginError} severity="error" />;

  if (showModal)
    return (
      <CustomModal title="Forgot password" description={descriptionModal} />
    );
  if (forgotLoading) return <Spinner />;

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChangeForm}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChangeForm}
              autoComplete="current-password"
            />
            <Grid container>
              <Grid item>
                <Button
                  type="button"
                  onClick={handleSubmitForgotPassword}
                  variant="text"
                  disabled={forgotLoading}
                >
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
              disabled={isLoginLoading}
            >
              Sign In
            </Button>

            <Divider>
              <Chip label="Don't have an account ?" />
            </Divider>
            <Button
              href="/signup"
              type="button"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
            >
              {"Sign Up"}
            </Button>
            <Grid item></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;
