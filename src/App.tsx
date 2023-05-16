import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { useEffect, useState } from "react";
import { setUser } from "./redux/slices/authSlice";
import { Router } from "./components/Router";
import { Playground } from "./layouts/SideBar/SideBar";
import { ProSidebarProvider } from "./components/SidebarSrc/ProSidebarProvider";
import Topbar from "./components/Topbar/Topbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import useTheme from "./customHooks/useTheme";
import Signin from "pages/signin";
import EmailVerify from "pages/Dashboard/emailVerify";
import Profile from "pages/Dashboard/Profile";
import Signup from './pages/signup';

function App() {
  const dispatch = useAppDispatch();
  const { mode, handleThemeChange, handleImageChange, hasImage } = useTheme();
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
  }, [dispatch]);

return (
    <div className="App">
      <BrowserRouter>
        <div className="playground-container">
          <ProSidebarProvider>
            <Playground
              mode={mode}
              handleThemeChange={handleThemeChange}
              handleImageChange={handleImageChange}
              hasImage={hasImage}
            />
          </ProSidebarProvider>
        </div>
        <div className="router-container">
          <ProSidebarProvider>
            <Topbar
              mode={mode}
              handleThemeChange={handleThemeChange}
              handleImageChange={handleImageChange}
              hasImage={hasImage}
            />
          </ProSidebarProvider>
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );

 

 
}

export default App;
