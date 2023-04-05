import React, { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useForgotPasswordMutation,
} from "../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";
const initialState = {
  name: "",
  email: "",
  login: "",
  phone: "",
  address: "",
  avatar: "",
  password: "",
};

const Signin = () => {
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

    console.log(responseForgotData);
  };
  return (
    <>
      <h1> Sign in </h1>
      <div className="form">
        <input
          type="email"
          placeholder="your email"
          name="email"
          onChange={handleChangeForm}
        ></input>
        <input
          type="password"
          placeholder="your password"
          name="password"
          onChange={handleChangeForm}
        ></input>

        <button type="button" onClick={handleLogin} disabled={isLoginLoading}>
          login
        </button>
        <button
          type="button"
          onClick={handleSubmitForgotPassword}
          disabled={forgotLoading}
        >
          forgot password ?
        </button>

        {forgotSuccess ? (
          <p>reset password email send, check your email ! </p>
        ) : forgotError ? (
          <p>
            Error to send your email to reset your password, try again later !{" "}
          </p>
        ) : (
          <p></p>
        )}
      </div>

      <h2>you haven't an account ?</h2>
      <Link to="/signup">
        <button type="button">sign up </button>
      </Link>
    </>
  );
};

export default Signin;
