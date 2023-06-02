import React, { useEffect, useState } from "react";
import { useGetAdsByCategoryQuery, useGetMediaByIdQuery } from "../../redux/api/adsApi";
import { useParams } from "react-router-dom";
import { Grid, Container } from "@mui/material";

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


  return (
   
       <Container>
       {}

       <Grid container >
           {
             adData?.map((item: Ad) => (
               <Grid item key={item.id} xs={12} sm={4} md={4} lg={3}>
                 <AdCard adData={item} />
               </Grid>
             ))}
       </Grid>
     </Container>
  );
};

export default AdsByCategory;
