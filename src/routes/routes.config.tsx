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
import MyAdvertises from "./../pages/Ad/MyAdvertises";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/slices/authSlice";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useProfileQuery } from "redux/api/authApi";
import { getCurrentUser, getToken } from "core/utils/functionHelpers";
import { useSelector } from "react-redux";
import { useAuthentication } from "customHooks/useAuthentication";
import Unauthorized from "pages/error404";
import { UserDetails } from "pages/Users/UserDetails";
import AllNotifications from "pages/Users/AllNotifications";

function ProtectedRoute({
  element,
  allowedRoles,
  ...rest
}: {
  element: React.ReactNode;
  allowedRoles: number[];
}) {
  const userAuth = useSelector((state: any) => state.auth);
  const currentUser = userAuth?.user;

  const isAuthorized = allowedRoles.includes(currentUser?.role_id ?? 1);

  return currentUser && isAuthorized ? (
    <> {element} </>
  ) : (
    <Navigate to={PATHS.NOtAUTHORIZED} />
  );
}

const RoutesConfig: RouteObject[] = [
  {
    path: PATHS.NOtAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: PATHS.USERDETAILS,
    element: <UserDetails />,
  },
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
    element: <ProtectedRoute element={<Update />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.PROFILEUpdate,
    element: <ProtectedRoute element={<Update />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.DASHBOARD,
    element: <ProtectedRoute element={<Dashboard />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.EmailVerify,
    element: <EmailVerify />,
  },
  {
    path: PATHS.ResetPassword,
    element: (
      <ProtectedRoute element={<ResetPassword />} allowedRoles={[1, 2]} />
    ),
  },
  {
    path: PATHS.Categories,
    element: <ProtectedRoute element={<Categories />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.AddCategories,
    element: <ProtectedRoute element={<AddCategory />} allowedRoles={[2]} />,
  },

  {
    path: PATHS.showCategory,
    element: (
      <ProtectedRoute element={<Categoryshow />} allowedRoles={[1, 2]} />
    ),
  },
  {
    path: PATHS.Advertise,
    element: <ProtectedRoute element={<Advertise />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.AddAdvertise,
    element: (
      <ProtectedRoute element={<AddAdvertise />} allowedRoles={[1, 2]} />
    ),
  },
  {
    path: PATHS.showAdvertise,
    element: <ProtectedRoute element={<AdDetails />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.updateAdvertise,
    element: <ProtectedRoute element={<AdUpdate />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.adsByCategory,
    element: (
      <ProtectedRoute element={<AdsByCategory />} allowedRoles={[1, 2]} />
    ),
  },

  {
    path: PATHS.ManageAds,
    element: (
      <ProtectedRoute element={<AdvertiseRequest />} allowedRoles={[2]} />
    ),
  },
  {
    path: PATHS.Stats,
    element: <ProtectedRoute element={<Stats />} allowedRoles={[2]} />,
  },
  {
    path: PATHS.StatsHome,
    element: <ProtectedRoute element={<Home />} allowedRoles={[2]} />,
  },
  {
    path: PATHS.Users,
    element: <ProtectedRoute element={<Users />} allowedRoles={[2]} />,
  },
  {
    path: PATHS.LISTFAVORIT,
    element: <ProtectedRoute element={<ListFavorit />} allowedRoles={[1, 2]} />,
  },
  {
    path: PATHS.MYADVERTISES,
    element: (
      <ProtectedRoute element={<MyAdvertises />} allowedRoles={[1, 2]} />
    ),
  },
  {
    path: PATHS.ALLNOTIFICATIONS,
    element: (
      <ProtectedRoute element={<AllNotifications />} allowedRoles={[1, 2]} />
    ),
  },
];

export default RoutesConfig;
