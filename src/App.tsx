import "./App.css";
import { Router } from "./components/Router";
import { Playground } from "./layouts/SideBar/SideBar";
import { ProSidebarProvider } from "./components/SidebarSrc/ProSidebarProvider";
import Topbar from "./components/Topbar/Topbar";
import useTheme from "./customHooks/useTheme";
import Signin from "pages/signin";
import { useAuthentication } from "customHooks/useAuthentication";

function App() {
  const { mode, handleThemeChange, handleImageChange, hasImage } = useTheme();
  const authUser = useAuthentication();


  
  if (authUser != null)
    return (
      <div className="App">
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
      </div>
    );

  return <Signin />;
}

export default App;
