import React, { useEffect, useState } from "react";
import { useGetAdByIdQuery } from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import { Grid, Typography } from "@mui/material";
const AdDetails = () => {
  const { id } = useParams();
  const { data: { data: adData } = {}, isLoading } = useGetAdByIdQuery(id);
  const [AdDetails, setAdDetails] = useState();

  useEffect(() => {
    setAdDetails(adData);
  }, [adData]);



  return (
    <Grid item xs={12} md={6}>
      {isLoading && <Spinner />}

      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Advertise
      </Typography>
      <p>{adData?.title}</p>
      <p>{adData?.description}</p>
      <p>{adData?.country}</p>
      <p>{adData?.state}</p>
      <p>{adData?.city}</p>
      <p>{adData?.street}</p>
      <p>{adData?.postal_code}</p>
      <p>{adData?.category_id}</p>
    </Grid>
  );
};

export default AdDetails;
