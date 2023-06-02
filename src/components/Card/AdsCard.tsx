import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Avatar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import { formaDateTime, statusToString } from "../../core/services/helpers";
import { Ad, AdData } from "../../core/models/ad.model";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import { AdCardProps, Media } from "./AdsCard.type";
import useDeleteAd from "customHooks/useDeleteAd";
import { useChangeStatusAdsMutation, useListFavoriteQuery, useSetFavoriteMutation } from "redux/api/adsApi";
import { Spinner } from "components/Spinner/spinner";
import { getCurrentUser } from "core/utils/functionHelpers";
import SendIcon from "@mui/icons-material/Send";
import { StatusOption } from "core/enums/status";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CustomLink from "components/CustomLink/CustomLink"

import { message } from "core/constant/message"
import AlertComponent from "components/Alert/Alert";


function AdCard({ adData,user }: AdCardProps) {
  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);
  const [setFavorit, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

  const [isFavorite, setIsFavorit] = useState<boolean>();
  const [listFavorite, setListFavorite] = useState<Ad[]>([]);

  const currentUser = getCurrentUser();
  const { data, isSuccess, isLoading, refetch } = useListFavoriteQuery(currentUser?.user?.id);


  useEffect(() => {
    if (isSuccess) {
      setListFavorite(data?.data);
    }
  }, []);

  useEffect(() => {
    checkIsFavorit(adData.id);
  }, [data]);

  const { handleDeleteAd } = useDeleteAd();

  const [menuAnchor, setMenuAnchor] = useState(null);


  const [
    changeStatus,
    {
      data: dataChangeStatus,
      isLoading: loadingUpdateStatus,
      isSuccess: successChangeStatus,
      isError: errorChangeStatus,
    },
  ] = useChangeStatusAdsMutation()
  const handleStatusChange = async (
    adId: string | number | undefined,
    status: StatusOption
  ) => {
    changeStatus({ id: adId, status })
      .unwrap()
      .then(() => {
        refetch();
      });
    // setStatusParams({ id: adId, status });
  };


  const handleMenuOpen = (event: any) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleDelete = () => {
    if (adData.id) {
      handleDeleteAd(adData.id);
      handleMenuClose();
    }
  };

  const handleShowDetails = () => {
    handleMenuClose();
  };
  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  const checkIsFavorit = async (id: any) => {
    const favoris = data?.data.find((fav: any) => fav.ad_id == id);
    if (favoris) {
      setIsFavorit(true);
    } else {
      setIsFavorit(false);
    }
  };

  const setfavorit = async (id: any) => {
    await setFavorit(id);
    refetch();
    setIsFavorit(true);
  };

  return (
    <>
       {successChangeStatus && (
                <AlertComponent
                    title={message.ADVERTISESTATUSCHANGED}
                    severity="success"
                />
            )}
      <Card key={adData.id}>
        <CardHeader
          avatar={
            <CustomLink to={"/user/details/" + adData?.user_id}>
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={user ? user?.avatar : adData.user?.avatar}
              ></Avatar> </CustomLink>
          }
          action={
            <>
              {(currentUser.user.id === adData.user_id ||
                currentUser.user.role_id == "2") && (
                  <>
                    <IconButton aria-label="settings" onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchor}
                      open={Boolean(menuAnchor)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                      <MenuItem>
                        <CustomLink to={"/advertise/update/" + adData.id}>Update</CustomLink>
                      </MenuItem>
                    </Menu>
                  </>
                )}
            </>
          }
          title={adData.user ? adData.user.firstname : ""}
          subheader={formaDateTime(adData.created_at)}
        />

        <CardContent sx={{ height: "300px" }}>
          <Grid container alignItems={"center"}>
            {adData && (
              <Grid
                item
                key={adData?.media?.[0].id}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                <CardMedia
                  component="img"
                  width="200"
                  height="200"
                  image={adData?.media?.[0].file_path}
                  alt={adData?.media?.[0].id}
                  key={adData?.media?.[0].id}
                />
              </Grid>
            )}
          </Grid>
          <Typography variant="subtitle1" gutterBottom>
            {adData.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Category :{" "}
            <CustomLink to={`/advertise/category/${adData?.category_id}`}>
              {changeIdtoCategory(adData?.category_id)}
            </CustomLink>
          </Typography>
          <Typography variant="body1" color="text.secondary" noWrap>
            {adData.description}
          </Typography>

          {(currentUser.user.id === adData.user_id ||
            currentUser.user.role_id == "2") && (
              <Typography
                color="textSecondary"
                noWrap
                variant="body2"
                gutterBottom
                style={{
                  color:
                    adData.status == "0"
                      ? "orange"
                      : adData.status == "1"
                        ? "red"
                        : adData.status == "2"
                          ? "green"
                          : "inherit",
                }}
              >
                Status:  {statusToString(adData.status)}
              </Typography>
            )}
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <IconButton
                aria-label="add to favorites"
                onClick={() => setfavorit(adData.id)}
              >
                {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <CustomLink to={"/advertise/" + adData.id}>
                <IconButton
                  color="default"
                  aria-label="details"
                  component="label"
                >
                  <VisibilityIcon />
                </IconButton>
              </CustomLink>
            </Grid>
            {currentUser.user.id !== adData.user_id  && <Grid item xs={12} sm={4} md={3} lg={3}>
              <CustomLink to={"/users/messages/" + adData?.user_id}>
                <IconButton aria-label="send">
                  <ChatOutlinedIcon  />
                </IconButton>
              </CustomLink>
            </Grid>}
          </Grid>

          {/* admin actions */}


        </CardActions>
        {currentUser.user.role_id == "2" && <Grid container style={{ padding: "5px" }}>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="warning"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Waiting)
              }
            >Waiting</Button>
          </Grid>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="success"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Validated)
              }
            >Valide</Button>
          </Grid>
          <Grid item key={adData.id} xs={12} sm={4} md={4} lg={4} >
            <Button
              variant="contained"
              color="error"
              disabled={loadingUpdateStatus}
              onClick={() =>
                handleStatusChange(adData.id, StatusOption.Canceled)
              }
            >Cancel</Button>
          </Grid>
        </Grid>}
      </Card>
    </>
  );
}

export default AdCard;
