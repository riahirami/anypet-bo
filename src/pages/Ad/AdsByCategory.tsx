import React, { useEffect, useState } from "react";
import { useGetAdsByCategoryQuery } from "../../redux/api/adsApi";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import { Grid, Typography } from "@mui/material";
import { Ad } from "../../core/models/ad.model";
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
    console.log({ adData });
  }, [adData]);
  return (
    <>
      <Grid item xs={12} md={6}>
        {isLoading && <Spinner />}

        <Typography align="left">Advertise of category {id}</Typography>

        {isLoading ? (
          <p>loading ...</p>
        ) : isSuccess ? (
          <p>success</p>
        ) : (
          <p>error or no data</p>
        )}
        {adData &&
          adData.map((ad: Ad) => (
            <div key={ad.id}>
              <p>{ad.title}</p>
              <p>{ad.description}</p>
              <p>{ad.country}</p>
              <p>{ad.state}</p>
              <p>{ad.city}</p>
              <p>{ad.street}</p>
              <p>{ad.postal_code}</p>
              <hr></hr>
            </div>
          ))}
      </Grid>
    </>
  );
};

export default AdsByCategory;
