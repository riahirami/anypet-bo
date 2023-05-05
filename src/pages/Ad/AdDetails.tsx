import React, { useEffect, useState } from "react";
import { useGetAdByIdQuery } from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import { statusToString, formaDateTime } from "../../core/services/helpers";
import { ExpandMore } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AdCard from "../../components/Card/AdsCard";

const AdDetails = () => {
  const { id } = useParams();
  const { data: { data: adData } = {}, isLoading } = useGetAdByIdQuery(id);
  const [AdDetails, setAdDetails] = useState();

  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  useEffect(() => {
    setAdDetails(adData);
  }, [adData]);

  return (
    <Grid item xs={12} md={12}>
      {isLoading && <Spinner />}
      {adData && <AdCard adData={adData} />}
    </Grid>
  );
};

export default AdDetails;
