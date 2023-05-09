import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { Router } from "./components/Router";
import { Playground } from "./layouts/SideBar/SideBar";
import { ProSidebarProvider } from "./components/SidebarSrc/ProSidebarProvider";
import Topbar from "./components/Topbar/Topbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import useTheme from "./customHooks/useTheme";

function App() {
  const dispatch = useAppDispatch();
  const { mode, handleThemeChange, handleImageChange,hasImage } = useTheme();

  ///////////////////////

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        dispatch(setUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard />
        <div className="playground-container">
          <ProSidebarProvider>
            <Playground mode={mode} handleThemeChange={handleThemeChange} handleImageChange={handleImageChange} hasImage={hasImage}/>
          </ProSidebarProvider>
        </div>
        <div className="router-container">
          <ProSidebarProvider>
            <Topbar mode={mode} handleThemeChange={handleThemeChange}  handleImageChange={handleImageChange} hasImage={hasImage}/>
          </ProSidebarProvider>
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
