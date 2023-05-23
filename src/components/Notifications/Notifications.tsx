import React, { useState } from "react";
import { Badge } from "../SidebarSrc/Badge";
import { Link } from "react-router-dom";
import { PATHS } from "routes/Path";
import { getCurrentUser } from "core/utils/functionHelpers";
import {
  useListUnreadNotificationsQuery,
  useMarkAllAsReadNotificationsMutation,
} from "redux/api/userApi";
import { getNotificationMessage } from "core/services/helpers";
import { IconButton, Typography, Menu, Grid, MenuItem } from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Notifications = () => {
  const [markAllAsRead] = useMarkAllAsReadNotificationsMutation();
  const currentUser = getCurrentUser();

  const { data: unreadNotifications } = useListUnreadNotificationsQuery(
    currentUser?.user?.id
  );
  const [notifNumber, setNotifNumber] = useState(
    unreadNotifications?.data?.length
  );
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const openNotificationMenu = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = async () => {
    setNotificationAnchorEl(null);
    await markAllAsRead();
    setNotifNumber(0);
  };

  return (
    <div>
      <IconButton
        id="notification-button"
        aria-controls={openNotificationMenu ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openNotificationMenu ? "true" : undefined}
        onClick={handleNotificationClick}
      >
        <NotificationsOutlinedIcon />
        <Badge variant="danger" shape="circle">
          {notifNumber ? notifNumber : "0"}
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={notificationAnchorEl}
        open={openNotificationMenu}
        onClose={handleNotificationClose}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
      >
        {notifNumber > 0 ? (
          unreadNotifications?.data?.map((notification: any) => (
            <MenuItem key={notification.id}>
              {getNotificationMessage(notification)}
              <Grid item>
                {notification?.data?.ad_url ? (
                  <IconButton>
                    <Link to={notification?.data?.ad_url}>
                      <VisibilityOutlinedIcon color="info" />
                    </Link>
                  </IconButton>
                ) : (
                  <></>
                )}
              </Grid>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography>No unread notifications</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleNotificationClose()}>
          <Link to={PATHS.ALLNOTIFICATIONS  +currentUser?.user?.id}>
            <Typography align="center" color={"darkcyan"}>
              See All
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Notifications;
