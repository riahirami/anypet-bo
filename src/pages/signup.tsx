import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { User } from "../core/models/user.model";
import { RegisterResponse } from "../core/models/registreResponse.model";
import { useRegistreUserMutation } from "../redux/api/authApi";
import { setUser, registre } from "../redux/slices/authSlice";
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
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomModal from "../components/Modal/CustomModal";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertComponent from "./../components/Alert/Alert";

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .required("firstname is required")
    .min(4, "firstname must be at least 4 characters"),
  lastname: Yup.string()
    .required("lastname is required")
    .min(4, "name must be at least 4 characters"),
  email: Yup.string()
    .required("email is required")
    .min(8, "email must be at least 8 characters"),
  phone: Yup.string()
    .required("phone is required")
    .min(8, "phone must be at least 8 characters"),
  address: Yup.string()
    .required("address is required")
    .min(4, "address must be at least 4 characters"),
  password: Yup.string()
    .required("password code is required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
});
const theme = createTheme();

function Signup() {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    password: "",
  };
  let responseApi: RegisterResponse = {
    message: "",
    user: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      avatar: "",
      password: "",
    },
    token: "",
  };
  const [formValue, setFormValue] = useState(initialState);

  const { firstname, lastname, email, password, phone, address } = formValue;
  const user: User = { ...formValue };
  const [showModal, setShowModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState("");
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
      navigate("/profile");
    }
    if (isRegisterError) {
      setShowModal(true);
      setDescriptionModal(registerData?.message);
    }
  }, [isRegisterSuccess, isRegisterError]);

  const handleRegistre = async () => {
    const userData: User = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      phone: phone,
      address: address,
    };

    responseApi = await registreUser(userData).unwrap();
    const token: string | undefined = await responseApi.token;

    if (token) {
      await dispatch(registre({ user, token }));
    }
  };
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const responseApi = await registreUser(values).unwrap();
      const token = responseApi.token;

      if (token) {
        await dispatch(registre({ user: values, token }));
      }
    },
  });

  return (
    <div>
      {/* material ui  */}
      <div>
        {" "}
        {isRegisterSuccess && (
          <AlertComponent title={descriptionModal} severity="success" />
        )}
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
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Firstame"
                      fullWidth
                      type="text"
                      id="firstname"
                      name="firstname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstname}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <Alert severity="error">{formik.errors.firstname}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="lastname"
                      type="text"
                      id="lastname"
                      name="lastname"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <Alert severity="error">{formik.errors.lastname}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="email"
                      type="text"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <Alert severity="error">{formik.errors.email}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="password"
                      id="password"
                      name="password"
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <Alert severity="error">{formik.errors.password}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="phone"
                      fullWidth
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <Alert severity="error">{formik.errors.phone}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="address"
                      type="text"
                      id="address"
                      name="address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <Alert severity="error">{formik.errors.address}</Alert>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isRegistreLoading}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Signup;
