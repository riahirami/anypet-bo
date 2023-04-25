import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { Router } from "./components/Router";
import { Playground } from "./layouts/SideBar";
import { ProSidebarProvider } from "./components/SidebarSrc/ProSidebarProvider";
import Topbar from "./components/Topbar/Topbar";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Dashboard />
        <div className="playground-container">
          <ProSidebarProvider>
            <Playground />
          </ProSidebarProvider>
        </div>
        <div className="router-container">
          <ProSidebarProvider>
            <Topbar />
          </ProSidebarProvider>
          <Router />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
