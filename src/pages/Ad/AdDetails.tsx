import React, { useEffect, useState } from "react";
import {
  useGetAdByIdQuery,
  useGetMediaByIdQuery,
  useListFavoriteQuery,
  useSetFavoriteMutation,
} from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import { useParams, Link } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import {
  Avatar,
  Box,
  IconButton,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";

import AdCard from "../../components/Card/AdsCard";
import Comment from "components/Comment/Comment";
import { Typography } from "@mui/joy";
import { formaDateTime } from "core/services/helpers";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { getCurrentUser } from "core/utils/functionHelpers";

const AdDetails: React.FC = () => {
  const { id } = useParams();
  const { data: { data: adData } = {}, isLoading } = useGetAdByIdQuery(id);
  const [AdDetails, setAdDetails] = useState();

  const [setFavorit, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

    const user = getCurrentUser();

  const { data, refetch } = useListFavoriteQuery(user?.user?.id);

  const [isFavorite, setIsFavorit] = useState<boolean>();

  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  console.log({ adData });

  useEffect(() => {
    setAdDetails(adData);
  }, [adData]);

  const checkIsFavorit = async (id: any) => {
    const favoris = data?.data.find((fav: any) => fav.ad_id == id);
    if (favoris) {
      setIsFavorit(true);
    } else {
      setIsFavorit(false);
    }
  };

  useEffect(() => {
    checkIsFavorit(adData?.id);
  }, [data]);

  const setfavorit = async (id: any) => {
    await setFavorit(id);
    refetch();
    setIsFavorit(true);
  };

  return (
    <>
      <Grid item xs={12} md={12}>
        {isLoading && <Spinner />}

        {/* {adData && <AdCard adData={adData} />} */}

        <Grid container xs={12} md={12} justifyContent="space-between">
          <Grid item xs={7} md={7}>
            <Box sx={{ p: "5px" }}>
              <Typography component="h1">{adData?.title}</Typography>
            </Box>
            <Typography sx={{ mb: "10px", p: "5px" }}>
              <LabelImportantIcon color="primary"></LabelImportantIcon>
              Category:{" "}
              <Link to={`/advertise/category/${adData?.category_id}`}>
                {changeIdtoCategory(adData?.category_id)}
              </Link>{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="add to favorites"
              onClick={() => setfavorit(adData.id)}
              sx={{ marginLeft: "auto" }}
            >
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container alignItems={"center"}>
          {adData &&
            adData?.media?.map((media: any) => {
              return (
                <Grid item key={media.id} xs={12} sm={4} md={4} lg={4}>
                  <CardMedia
                    component="img"
                    width="200"
                    height="400"
                    image={media.file_path}
                    key={media.id}
                  />
                </Grid>
              );
            })}
        </Grid>

        <Grid container alignContent={"center"} sx={{ m: "10px", p: "5px" }}>
          <Grid item> <Link to={"/user/details/" + adData?.user?.id}>
            <Avatar src={adData?.user?.avatar}></Avatar>
           </Link>

          </Grid>
          <Grid item>
            <Typography sx={{ ml: "10px", p: "5px" }}>
          <Link to={"/user/details/" + adData?.user?.id}>
              {adData?.user?.firstname} {adData?.user?.lastname}
            </Link>
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="plain" sx={{ mb: "10px", p: "10px" }}>
          {adData?.description}
        </Typography>
      </Grid>

      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.city}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.street}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MarkunreadMailboxIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.postal_code}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalPhoneIcon sx={{ color: "warning.main" }} />
          <Typography>+216 {adData?.user?.phone}</Typography>
        </Grid>
      </Grid>
     
      <Grid>
        <Comment />
      </Grid>
    </>
  );
};

export default AdDetails;
