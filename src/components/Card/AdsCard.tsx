import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { Ad, AdData } from "../../core/models/ad.model";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import { AdCardProps } from "./AdsCard.type";
import useDeleteAd from "customHooks/useDeleteAd";

function AdCard({ adData }: AdCardProps) {
  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const { handleDeleteAd } = useDeleteAd();

  const [menuAnchor, setMenuAnchor] = useState(null);

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
    console.log("Show details clicked");
    handleMenuClose();
  };
  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };
  return (
    <>
      <Card key={adData.id}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
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
                  <Link to={"/advertise/update/" + adData.id}>Update</Link>
                </MenuItem>
              </Menu>
            </>
          }
          title={`Advertise ${adData.id}`}
          subheader={formaDateTime(adData.created_at)}
        />
        <CardMedia
          component="img"
          height="280px"
          image="https://images.pexels.com/photos/248307/pexels-photo-248307.jpeg?cs=srgb&dl=pexels-pixabay-248307.jpg&fm=jpg"
          alt={adData.title}
        />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            {adData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {adData.description}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Country: {adData.country}
          </Typography>
          <Typography variant="body2" gutterBottom noWrap>
            State: {adData.state}
          </Typography>
          <Typography variant="body2" gutterBottom>
            City: {adData.city}
          </Typography>
          <Typography variant="body2" gutterBottom noWrap>
            Street: {adData.street}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Postal Code: {adData.postal_code}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Category : {changeIdtoCategory(adData.category_id)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Created At: {formaDateTime(adData.created_at)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Updated At: {formaDateTime(adData.updated_at)}
          </Typography>

          <Typography
            color="textSecondary"
            noWrap
            variant="body2"
            gutterBottom
            style={{
              background:
                adData.status == "0"
                  ? "orange"
                  : adData.status == "1"
                  ? "red"
                  : adData.status == "2"
                  ? "green"
                  : "inherit",
            }}
          >
            Status: {statusToString(adData.status)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container justifyContent="space-between">
            <Grid item key={adData.id} xs={12} sm={4} md={3} lg={3}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Grid>
            <Grid item key={adData.id} xs={12} sm={4} md={3} lg={3}>
              <Link to={"/advertise/" + adData.id}>
                <IconButton
                  color="default"
                  aria-label="details"
                  component="label"
                >
                  <VisibilityIcon />
                </IconButton>
              </Link>
            </Grid>
            <Grid item key={adData.id} xs={12} sm={4} md={3} lg={3}>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

export default AdCard;
