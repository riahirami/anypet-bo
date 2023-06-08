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
import { Navigate } from "react-router-dom";
import { getCurrentUser, getToken } from "core/utils/functionHelpers";
import Unauthorized from "pages/error404";
import { UserDetails } from "pages/Users/UserDetails/UserDetails";
import AllNotifications from "pages/Users/AllNotifications";
import Messages from "pages/Users/Messages/Messages";
import Conversations from "pages/Users/Conversations/Conversations";
import UserReservations from "pages/Users/Reservations/UserReservations";

function ProtectedRoute({
  children,
  allowedRoles,
  ...rest
}: {
  children: React.ReactNode;
  allowedRoles: number[];
}) {
  const user = getCurrentUser();

  // const userAuth = useSelector((state: any) => state.auth);
  const currentUser = user;



  const isAuthorized = allowedRoles.includes(currentUser?.user?.role_id ?? 1);


  return currentUser && isAuthorized ? (
    <>
      {children}
    </>
  ) : (
    <Navigate to={PATHS.NOtAUTHORIZED} />
  );
}

const RoutesConfig: RouteObject[] = [
  {
    path: PATHS.MYRESERVATIONS,
    element: <UserReservations />,
  },
  {
    path: PATHS.NOtAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: PATHS.USERDETAILS,
    element: <UserDetails userId="" />,
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
    element: <ProtectedRoute allowedRoles={[1, 2]} >
      <Update />
    </ProtectedRoute>,
  },
  {
    path: PATHS.PROFILEUpdate,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Update /></ProtectedRoute>,
  },
  {
    path: PATHS.DASHBOARD,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Dashboard /></ProtectedRoute>,
  },
  {
    path: PATHS.EmailVerify,
    element: <EmailVerify />,
  },
  {
    path: PATHS.ResetPassword,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><ResetPassword /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.Categories,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Categories /></ProtectedRoute>,
  },
  {
    path: PATHS.AddCategories,
    element: <ProtectedRoute allowedRoles={[2]}><AddCategory /></ProtectedRoute>
    ,
  },

  {
    path: PATHS.showCategory,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><Categoryshow /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.Advertise,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Advertise /></ProtectedRoute>,
  },
  {
    path: PATHS.AddAdvertise,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><AddAdvertise /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.showAdvertise,
    element: <ProtectedRoute allowedRoles={[1, 2]}><AdDetails /></ProtectedRoute>,
  },
  {
    path: PATHS.updateAdvertise,
    element: <ProtectedRoute allowedRoles={[1, 2]}><AdUpdate /></ProtectedRoute>,
  },
  {
    path: PATHS.adsByCategory,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><AdsByCategory /></ProtectedRoute>
    ),
  },

  {
    path: PATHS.ManageAds,
    element: (
      <ProtectedRoute allowedRoles={[2]}><AdvertiseRequest /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.Stats,
    element: <ProtectedRoute allowedRoles={[2]}><Stats /></ProtectedRoute>,
  },
  {
    path: PATHS.StatsHome,
    element: <ProtectedRoute allowedRoles={[2]}><Home /></ProtectedRoute>,
  },
  {
    path: PATHS.Users,
    element: <ProtectedRoute allowedRoles={[2]}><Users /></ProtectedRoute>,
  },
  {
    path: PATHS.LISTFAVORIT,
    element: <ProtectedRoute allowedRoles={[1, 2]}><ListFavorit /></ProtectedRoute>,
  },
  {
    path: PATHS.MYADVERTISES,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><MyAdvertises /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.ALLNOTIFICATIONS,
    element: (
      <ProtectedRoute allowedRoles={[1, 2]}><AllNotifications /></ProtectedRoute>
    ),
  },
  {
    path: PATHS.MESSAGES,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Messages /></ProtectedRoute>,
  },
  {
    path: PATHS.CONVERSATIONS,
    element: <ProtectedRoute allowedRoles={[1, 2]}><Conversations /></ProtectedRoute>,
  },
];

export default RoutesConfig;
