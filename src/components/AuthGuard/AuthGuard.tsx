import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/slices/authSlice";

interface AuthGuardProps {
  element: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ element }) => {
  const dispatch = useAppDispatch();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        dispatch(setUser(user));
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isAuth) {
    return <>{element}</>;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default AuthGuard;
