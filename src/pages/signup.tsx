import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { User } from "../models/user.model";
import { RegisterResponse } from "../models/registreResponse.model";
import { useRegistreUserMutation } from "../services/authApi";
import { setUser, registre } from "../features/authSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

function Signup() {
  const initialState = {
    name: "",
    email: "",
    login: "",
    phone: "",
    address: "",
    avatar: "",
    password: "",
  };
  let responseApi: RegisterResponse = {
    message: "",
    user: {
      name: "",
      email: "",
      login: "",
      phone: "",
      address: "",
      avatar: "",
      password: "",
    },
    token: "",
  };
  const [formValue, setFormValue] = useState(initialState);

  const { name, login, email, password, phone, address, avatar } = formValue;
  const user: User = { ...formValue };

  const dispatch = useAppDispatch();
  const [
    registreUser,
    {
      data: registerData,
      error: registerError,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
      isLoading: isRegistreLoading,
    },
  ] = useRegistreUserMutation();

  const navigate = useNavigate();

  function handleChangeForm(e: any) {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (isRegisterSuccess) {
      console.log("error login");
    }
    if (isRegisterSuccess) {
      console.log("success registre", registerData);
      navigate("/dashboard");
    }
  }, [isRegisterSuccess, isRegisterError]);

  const handleRegistre = async () => {
    const userData: User = {
      name: name,
      login: login,
      email: email,
      password: password,
      phone: phone,
      address: address,
      avatar: avatar,
    };

    responseApi = await registreUser(userData).unwrap();
    const token: string | undefined = await responseApi.token;

    if (token) {  
      await dispatch(registre({ user, token }));
    }
  };

  return (
    <div>
     
      {/* material ui  */}
      <div>
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      value={name}
                      onChange={handleChangeForm}                      required
                      fullWidth
                      id="firstName"
                      label=" Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="login"
                      name="login"
                      value={login}
                      onChange={handleChangeForm}                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      onChange={handleChangeForm}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      value={password}
                      onChange={handleChangeForm}
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="phone"
                      value={phone}
                      onChange={handleChangeForm}
                      label="phone"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      value={address}
                      onChange={handleChangeForm}
                      label="address"
                      id="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="avatar"
                      value={avatar}
                      onChange={handleChangeForm}
                      label="avatar"
                      id="avatar"
                    />
                  </Grid>
                
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type="button"
                  onClick={() => handleRegistre()}
                  disabled={isRegistreLoading}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signin" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Signup;
