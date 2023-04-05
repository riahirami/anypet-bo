import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEmailVerificationMutation } from "../services/authApi";


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
      <h1>email verify page </h1>
      <button onClick={verified} disabled={isLoading}>
        verifier
      </button>
      <p>
        Verifying email with ID: {iid} and hash: {hhash}
      </p>
    </div>
  );
};

export default EmailVerify;
