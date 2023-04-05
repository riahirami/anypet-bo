import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { setUser } from "./features/authSlice";
import EmailVerify from "./pages/emailVerify";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ResetPassword from "./pages/resetPassword";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/api/email/verify/:id/:hash" element={<EmailVerify />} />
          <Route path="/api/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
