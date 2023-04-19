import RouteObject from "../core/models/RouteObject.model";
import Categories from "../pages/Category/Categories";
import Dashboard from "../pages/Dashboard";
import EmailVerify from "../pages/emailVerify";
import ResetPassword from "../pages/resetPassword";
import Signin from "../pages/signin"; 
import Signup from "../pages/signup"; 
import AddCategory from "../pages/Category/addCategory"; 
import { PATHS } from "./Path";
import Categoryshow from "../pages/Category/Categoryshow";
import Advertise from "../pages/Ad/Advertise";
import AddAdvertise from "../pages/Ad/AddAdvertise";
import AdUpdate from "../pages/Ad/AdUpdate";
import AdDetails from "../pages/Ad/AdDetails";
import AdsByCategory from "../pages/Ad/AdsByCategory";

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
      {
        path: PATHS.Categories,
        element: <Categories />,
      },
      {
        path: PATHS.AddCategories,
        element: <AddCategory />,
      },
    
      {
        path: PATHS.showCategory,
        element: <Categoryshow />,
      },
      {
        path: PATHS.Advertise,
        element: <Advertise/>,
      },
      {
        path: PATHS.AddAdvertise,
        element: <AddAdvertise/>,
      },
      {
        path: PATHS.showAdvertise,
        element: <AdDetails />
      },
      {
        path : PATHS.updateAdvertise,
        element: <AdUpdate />
      },
      {
        path : PATHS.adsByCategory,
        element: <AdsByCategory />
      }

  ];

  export default RoutesConfig;