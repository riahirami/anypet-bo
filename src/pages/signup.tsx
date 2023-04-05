import React, { useEffect, useState } from "react";
import { useRegistreUserMutation } from "../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { User } from "../models/user.model";
import { RegisterResponse } from "../models/registreResponse.model";
import { setUser, registre } from "../features/authSlice";

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

    if (!token) {
      console.log("Token is undefined!");
      console.log(responseApi.message);
    } else {
      await dispatch(registre({ user, token }));
      console.log(responseApi.message);
    }
  };

  return (
    <div>
      <h1>sign up</h1>
      <>
        <div className="form">
          <input
            type="text"
            placeholder="your name"
            name="name"
            value={name}
            onChange={handleChangeForm}
          ></input>
          <input
            type="text"
            placeholder="your login"
            name="login"
            value={login}
            onChange={handleChangeForm}
          ></input>
          <input
            type="email"
            placeholder="your email"
            name="email"
            value={email}
            onChange={handleChangeForm}
          ></input>
          <input
            type="password"
            placeholder="your password"
            name="password"
            value={password}
            onChange={handleChangeForm}
          ></input>
          <input
            type="text"
            placeholder="your phone"
            name="phone"
            value={phone}
            onChange={handleChangeForm}
          ></input>
          <input
            type="text"
            placeholder="your address"
            name="address"
            value={address}
            onChange={handleChangeForm}
          ></input>
          <input
            type="text"
            placeholder="your avatar"
            name="avatar"
            value={avatar}
            onChange={handleChangeForm}
          ></input>
          <button
            type="button"
            onClick={() => handleRegistre()}
            disabled={isRegistreLoading}
          >
            registre
          </button>
        </div>
      </>

      <h2>you have already an account ?</h2>
      <Link to="/signin">
        <button type="button">sign in </button>
      </Link>
    </div>
  );
}

export default Signup;
