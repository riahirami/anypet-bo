import React from "react";
import {
  useListAllNotificationsQuery,
  useMarkAllAsReadNotificationsMutation,
} from "redux/api/userApi";
import { getNotificationMessage, formaDateTime } from "core/services/helpers";
import { getCurrentUser } from "core/utils/functionHelpers";
import { Typography, Grid, IconButton, Divider } from "@mui/material";
import { Link} from "react-router-dom"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const AllNotifications = () => {
  const currentUser = getCurrentUser();

  const { data, isLoading, isSuccess } = useListAllNotificationsQuery(
    currentUser?.user?.id
  );
  return (
    <Grid>
      <Typography>All Notifications</Typography>

      {data?.data?.map((notification: any) => (
        <>
          <Grid
            key={notification.id}
            container
            justifyContent={"space-between"}
            sx={{ margin: "10px", padding: "10px" }}
          >
            <Grid item>
              <Typography variant="subtitle1">
                {" "}
                {getNotificationMessage(notification)}
              </Typography>
              <Typography variant="body2">
                {" "}
                {formaDateTime(notification.created_at)}
              </Typography>
            </Grid>
            <Grid item>
              {notification?.data?.url ? (
                <IconButton  >
                  <Link to={notification?.data?.url}>
                  <VisibilityOutlinedIcon color="info"/>
                  </Link>
                </IconButton>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
          <Divider />
        </>
      ))}
    </Grid>
  );
};

export default AllNotifications;
