import Signin from "pages/signin";
import Signup from "pages/signup";
import {  useLocation } from "react-router-dom";
import { PATHS } from "routes/Path";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authUser = localStorage.getItem("user");
  const location = useLocation();
  const showSignup = location.pathname == PATHS.SIGNUP;

  if (authUser) {
    return <>{children}</>;
  } else {
    return showSignup ? <Signup /> : <Signin />;
  }
};



export default AuthGuard;
