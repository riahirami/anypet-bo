import RouteObject from "../core/models/RouteObject.model";
import Dashboard from "../pages/Dashboard";
import EmailVerify from "../pages/emailVerify";
import ResetPassword from "../pages/resetPassword";
import Signin from "../pages/signin"; 
import Signup from "../pages/signup"; 
import { PATHS } from "./Path";

const RoutesConfig: RouteObject[] = [
    {
      path: PATHS.SIGNIN,
      element:<Signin />,
    },
    {
      path: PATHS.SIGNUP,
      element:<Signup />,
    },
    {
      path: PATHS.DASHBOARD,
      element: <Dashboard />,
    },
    {
        path: PATHS.EmailVerify,
        element: <EmailVerify />,
      },
      {
        path: PATHS.ResetPassword,
        element: <ResetPassword />,
      },
  ];

  export default RoutesConfig;