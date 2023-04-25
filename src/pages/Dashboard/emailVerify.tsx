import React from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useEmailVerificationMutation } from "../../redux/api/authApi";
import { Alert, Button } from "@mui/material";

const EmailVerify = () => {
  const [verifyEmail, { data, isSuccess, isError, isLoading, error }] =
    useEmailVerificationMutation();
  const navigate = useNavigate();

  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const params = useParams();

  const id = params.id as string ;
  const hash = params.hash  as string ;
  

  async function verified() {
    const resultVerify = await verifyEmail({
      token: tokenValue,
      id: id,
      hash: hash,
    });

    if (data) {
      navigate("/profile");
    }
  }

  return (
    <div>
      <h2>{"Email verify page"}</h2>
      <Alert
        severity="warning"
        sx={{ height: "60", t: "center", paddingLeft: "30%" }}
      >
        You're redirected by an email verification to verify your account ! 
      </Alert>
      <Button color="warning" variant="contained" onClick={verified} disabled={isLoading}>
        Validate
      </Button>
    </div>
  );
};

export default EmailVerify;
