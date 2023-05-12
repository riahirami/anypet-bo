import React, { useEffect, useState } from "react";
import { useGetAdsByCategoryQuery, useGetMediaByIdQuery } from "../../redux/api/adsApi";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";

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

  const {
    data: MediaData,
    isLoading: MediaLoading,
    isSuccess: MediaSuccess,
  } = useGetMediaByIdQuery(adData?.id);

  return (
    <>
      <Grid container spacing={2}>
        {adData &&
          adData.map((item: Ad) => (
            <Grid item key={id} xs={12} md={4}>
              {adData && <AdCard adData={item} medias={MediaData}/>}
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default AdsByCategory;
