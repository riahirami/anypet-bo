import "./App.css";
import { Router } from "./components/Router";
import { Playground } from "./layouts/SideBar/SideBar";
import { ProSidebarProvider } from "./components/SidebarSrc/ProSidebarProvider";
import Topbar from "./components/Topbar/Topbar";
import useTheme from "./customHooks/useTheme";
import Signin from "pages/signin";
import { useAuthentication } from "customHooks/useAuthentication";
import AuthGuard from "components/AuthGuard/AuthGuard";

function App() {
  const { mode, handleThemeChange, handleImageChange, hasImage } = useTheme();
  const authUser = useAuthentication();



  return (
    <div className="App">
      <AuthGuard>

        <ProSidebarProvider>
          <div className="playground-container">
            <Playground
              mode={mode}
              handleThemeChange={handleThemeChange}
              handleImageChange={handleImageChange}
              hasImage={hasImage}
            />
          </div>

          <div className="router-container">
            <Topbar
              mode={mode}
              handleThemeChange={handleThemeChange}
              handleImageChange={handleImageChange}
              hasImage={hasImage}
            />

            <Router />
          </div>
        </ProSidebarProvider>
      </AuthGuard>
    </div>
  );

}

export default App;
