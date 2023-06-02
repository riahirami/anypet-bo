import { Container, Grid } from "@mui/material";
import AdCard from "components/Card/AdsCard";
import Spinner from "components/Spinner/spinner";
import { Ad } from "core/models/ad.model";
import React from "react";
import { useGetMyAdsQuery } from "redux/api/adsApi";
import { getToken } from "core/utils/functionHelpers";
import { useProfileQuery } from "redux/api/authApi";
import { useParams } from "react-router-dom";


const MyAdvertises = () => {
  
  const {id} = useParams()
  const tokenValue = getToken();


  const { data: dataProfile } = useProfileQuery(tokenValue.token);

  
  const { firstname, lastname, email, phone, avatar, role_id } =
  dataProfile?.user ?? {};
  const { data: MyAds, isSuccess, isLoading } = useGetMyAdsQuery(id);

  // const MyAds = useSelector((state: any) => state.ad);


  return (
    <Grid>
      {isLoading && <Spinner />}

      <Container>
        {}

        <Grid container spacing={1}>
          <Grid container spacing={2}>
            {
              MyAds?.data.map((ad: Ad) => (
                <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
                  <AdCard adData={ad} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};

export default MyAdvertises;
