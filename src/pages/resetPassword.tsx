import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useProfileQuery, useResetPasswordMutation } from "../services/authApi";
import { ResetPasswordRequest } from "../models/resetPassword.model";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const [
    resetPassword,
    { data: resetData, isSuccess: resetSuccess, isError: resetError, error: errorReset },
  ] = useResetPasswordMutation();

  const {
    data: dataProfile,
    isError,
    isFetching,
    isSuccess,
    isLoading,
  } = useProfileQuery(tokenValue.token);

  const navigate = useNavigate();

//   const urlParams = new URLSearchParams(window.location.search);
//   const thisEmail = urlParams.get("email");
//   const token = urlParams.get("token");

const url = window.location.href;
  const parts = url.split("=");
  const token = parts[1].split("?")[0];
  const  thisEmail = parts[2].split("=")[0];

  // function handleResetPassword(newEmail: string, newPassword: string, confirmNewPassword: string) {
  async function handleResetPassword() {
    const newPassword = password;
    const confirmNewPassword = passwordConfirmation;
    const tokenRequest = token as string;

    console.log(thisEmail, tokenRequest, newPassword, confirmNewPassword);

    if ((password == passwordConfirmation)){
      const dataResponse = await resetPassword({
        // email: thisEmail as string,
        email: thisEmail,
        password: newPassword,
        password_confirmation: confirmNewPassword,
        token: tokenRequest,
      })
     await console.log(dataResponse);
    
  }
  // navigate("/signin");
    
  }

  return (
    <div>
      <h1>Reset Password</h1>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>
      <button onClick={handleResetPassword} disabled={isLoading}>
        {isLoading ? "Loading..." : "Reset Password"}
      </button>
    </div>
  );
};

export default ResetPassword;
