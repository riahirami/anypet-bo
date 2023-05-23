import { Box, IconButton,MenuItem,Menu } from "@mui/material";
import {  useState } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Badge } from "../SidebarSrc/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ImageIcon from "@mui/icons-material/Image";
import HideImageOutlinedIcon from "@mui/icons-material/HideImageOutlined";

import { useLogoutUserMutation } from "redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "routes/Path";

import { Theme } from "core/enums";
import { Props } from "./TopbarProps.type";
import { useListFavoriteQuery } from "redux/api/adsApi";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { getCurrentUser, getToken } from "core/utils/functionHelpers";
import { logout } from "redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "components/Notifications/Notifications";


const Topbar: React.FC<Props> = ({
  mode,
  handleThemeChange,
  handleImageChange,
  hasImage,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const authUser = useSelector((state: any) => state.auth.token);
  const tokenValue = getToken();

  const currentUser = getCurrentUser();
  const { data, isSuccess, isLoading, refetch } = useListFavoriteQuery(
    currentUser?.user?.id
  );
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutUser, { data: logoutData, isSuccess: isLogoutSuccess }] =
    useLogoutUserMutation(tokenValue);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFunction = async () => {
    if (tokenValue) {
      dispatch(logout());
      await logoutUser(tokenValue);
    }
    localStorage.clear();

    navigate("/signin");
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex" alignItems={"end"}>
        <IconButton onClick={handleImageChange}>
          {hasImage == "true" ? <ImageIcon /> : <HideImageOutlinedIcon />}
        </IconButton>
        <IconButton onClick={handleThemeChange}>
          {mode === Theme.LIGHT ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <Notifications />

        <IconButton>
          <Link to={"/favoritlist/" + currentUser?.user?.id}>
            <FavoriteBorderOutlinedIcon />
          </Link>
          <Badge variant="danger" shape="circle">
            {data?.count}
          </Badge>
        </IconButton>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Person2Icon></Person2Icon>
              <Link to={PATHS.PROFILE}>Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ManageAccountsIcon></ManageAccountsIcon>
              <Link to={PATHS.PROFILEUpdate}>My account</Link>
            </MenuItem>
            <MenuItem onClick={() => logoutFunction()}>
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
