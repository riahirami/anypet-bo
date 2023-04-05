import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEmailVerificationMutation } from "../services/authApi";
import { Alert, AlertTitle, Button } from "@mui/material";

const EmailVerify = () => {
  const [verifyEmail, { data, isSuccess, isError, isLoading, error }] =
    useEmailVerificationMutation();
  const navigate = useNavigate();

  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const { id, hash } = useParams();
  const url = window.location.href;
  const parts = url.split("/");
  const iid = parts[6];
  const hhash = parts[7].split("?")[0];

  //   const hhash = parts[7];

  async function verified() {
    const resultVerify = await verifyEmail({
      token: tokenValue,
      id: iid,
      hash: hhash,
    });
    console.log("result : ", resultVerify);

    if (data) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <h1> </h1>
      <h2>{"Email verify page"}</h2>
      <p></p>
      <Alert
        severity="warning"
        sx={{ height: "60", t: "center", paddingLeft: "30%" }}
      >
        Verifying email with ID: {iid} and hash: {hhash}
      </Alert>
      <Button color="warning" variant="contained" onClick={verified} disabled={isLoading}>
        verifier
      </Button>
    </div>
  );
};

export default EmailVerify;
