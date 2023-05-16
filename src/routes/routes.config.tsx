import { PATHS } from "./Path";
import RouteObject from "../core/models/RouteObject.model";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Categories from "../pages/Category/Categories";
import AddCategory from "../pages/Category/addCategory";
import Categoryshow from "../pages/Category/Categoryshow";
import Advertise from "../pages/Ad/Advertise";
import AddAdvertise from "../pages/Ad/AddAdvertise";
import AdUpdate from "../pages/Ad/AdUpdate";
import AdDetails from "../pages/Ad/AdDetails";
import AdsByCategory from "../pages/Ad/AdsByCategory";
import Profile from "../pages/Dashboard/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmailVerify from "../pages/Dashboard/emailVerify";
import ResetPassword from "../pages/Dashboard/resetPassword";
import AdvertiseRequest from "../pages/Ad/AdvertiseRequest";
import Stats from "../pages/Stats/Stats";
import Home from "../pages/Stats/Home";
import Users from "../pages/Users/Users";
import Update from "../pages/Dashboard/Profile/Update";
import ListFavorit from "pages/Ad/ListFavorit";
import MyAdvertises from './../pages/Ad/MyAdvertises';
import { useState,useEffect } from "react";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/slices/authSlice";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element, ...rest }: { element: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();

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
  return isAuth ? <>{element}</> : <Navigate to={PATHS.SIGNIN} />;
}

const RoutesConfig: RouteObject[] = [
  {
    path: PATHS.SIGNIN,
    element: <Signin />,
  },
  {
    path: PATHS.SIGNUP,
    element: <Signup />,
  },
  {
    path: PATHS.PROFILE,
    element: <ProtectedRoute element={<Update />} />,
  },
  {
    path: PATHS.PROFILEUpdate,
    element: <ProtectedRoute element={<Update />} />,
  },
  {
    path: PATHS.DASHBOARD,
    element: <ProtectedRoute element={<Dashboard />} />,
  },
  {
    path: PATHS.EmailVerify,
    element: <ProtectedRoute element={<EmailVerify />} />,
  },
  {
    path: PATHS.ResetPassword,
    element: <ProtectedRoute element={<ResetPassword />} />,
  },
  {
    path: PATHS.Categories,
    element: <ProtectedRoute element={<Categories />} />,
  },
  {
    path: PATHS.AddCategories,
    element: <ProtectedRoute element={<AddCategory />} />,
  },

  {
    path: PATHS.showCategory,
    element: <ProtectedRoute element={<Categoryshow />} />,
  },
  {
    path: PATHS.Advertise,
    element: <ProtectedRoute element={<Advertise />} />,
  },
  {
    path: PATHS.AddAdvertise,
    element: <ProtectedRoute element={<AddAdvertise />} />,
  },
  {
    path: PATHS.showAdvertise,
    element: <ProtectedRoute element={<AdDetails />} />,
  },
  {
    path: PATHS.updateAdvertise,
    element: <ProtectedRoute element={<AdUpdate />} />,
  },
  {
    path: PATHS.adsByCategory,
    element: <ProtectedRoute element={<AdsByCategory />} />,
  },

  {
    path: PATHS.ManageAds,
    element:<ProtectedRoute element= {<AdvertiseRequest />}/>,
  },
  {
    path: PATHS.Stats,
    element:<ProtectedRoute element={ <Stats />}/>,
  },
  {
    path: PATHS.StatsHome,
    element: <ProtectedRoute element={<Home />} /> ,
  },
  {
    path: PATHS.Users,
    element: <ProtectedRoute element= {<Users />} />,
  },
  {
    path: PATHS.LISTFAVORIT,
    element: <ProtectedRoute element={<ListFavorit />} />,
  },
  {
    path: PATHS.MYADVERTISES,
    element: <ProtectedRoute element={<MyAdvertises />} />,
  },
  
];

export default RoutesConfig;
