import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "../SidebarSrc/Badge";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useLogoutUserMutation } from "../../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/Path";
import { Theme } from "../../core/enums";

interface Props {
  mode: Theme;
  handleThemeChange: () => void;
}

const Topbar: React.FC<Props> = ({ mode, handleThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [
    logoutUser,
    {
      data: logoutData,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutUserMutation(tokenValue);
  const navigate = useNavigate();

  const logoutFunction = async () => {
    if (isLogoutSuccess) await logoutUser(tokenValue);
    localStorage.setItem("user", "{}");
    navigate("/signin");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={handleThemeChange}>
          {mode === Theme.LIGHT ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
          <Badge variant="danger" shape="circle">
            6
          </Badge>
        </IconButton>

        <IconButton>
          <SettingsOutlinedIcon />
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
            <MenuItem onClick={logoutFunction}>
              <LogoutIcon></LogoutIcon>Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  );
};

export default Topbar;
