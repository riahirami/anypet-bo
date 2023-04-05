import React, { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
} from "../services/authApi";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Modal } from "@mui/joy";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlertDialogModal from "../components/AlertDialogModal";
import { ResetPasswordResponse } from "../models/resetPassword.model";

export interface Rep {
  message: string
}

const initialState = {
  name: "",
  email: "",
  login: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};

const theme = createTheme();
const Signin = () => {
  const [showModal, setShowModal] = useState(false);

  const [formValue, setFormValue] = useState(initialState);
  const { name, login, email, password, phone, address, avatar } = formValue;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
      isLoading: isLoginLoading,
    },
  ] = useLoginUserMutation();

  useEffect(() => {
    if (isLoginSuccess) {
      console.log("success login" + loginData.name);
      dispatch(setUser({ token: loginData.token, name: loginData.name }));
      navigate("/dashboard");
    }
    if (isLoginError) {
      console.log("error login");
    }
  }, [isLoginSuccess, isLoginError]);

  function handleChangeForm(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  const handleLogin = async () => {
    // e.preventDefault();
    if (email && password) {
      await loginUser({ email, password });
    } else {
      console.log("error ! fill all input please");
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

  const handleSubmitForgotPassword = async () => {
    const responseForgot = await forgotPassword(email);
   if (forgotSuccess) {
    
    setShowModal(true);
  }
  const msg: ResetPasswordResponse ={
    message:""
  }
  
  msg.message = responseForgotData
    console.log( responseForgotData);
  };
  return (
    <div>
      {/* materrial ui */}
      <>
      {showModal && <AlertDialogModal title="forgot password" />}

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

      </>
    </div>
  );
};

export default Signin;
