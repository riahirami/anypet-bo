import React, { useEffect, useState } from "react";
import { useGetAdsByCategoryQuery } from "../../redux/api/adsApi";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import { Card, CardContent, Grid, Typography } from "@mui/material";

import { Ad } from "../../core/models/ad.model";
import AdCard from "../../components/Card/AdsCard";
const AdsByCategory = () => {
  const { id } = useParams();
  const {
    data: { data: adData } = {},
    isSuccess,
    isLoading,
  } = useGetAdsByCategoryQuery(id);
  const [Ads, setAds] = useState();

  useEffect(() => {
    setAds(adData);
  }, [adData]);

  const formaDateTime = (dateString: any) => {
    const date = dateString.substr(0, 10);
    const time = dateString.substr(11, 5);
    return `${date} at ${time}`;
  };
  
  return (
    <>
      <Grid container spacing={2}>
        {adData &&
          adData.map((item: Ad) => (
            <Grid item key={id} xs={12} md={4}>
                             {adData && <AdCard adData={item} />}

            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default AdsByCategory;
