import { Container,Grid } from '@mui/material';
import AdCard from 'components/Card/AdsCard';
import Spinner from 'components/Spinner/spinner';
import { Ad } from 'core/models/ad.model';
import React from 'react'
import { useGetAdsOfUserQuery, useGetMediaByIdQuery } from 'redux/api/adsApi';

const MyAdvertises = () => {

    const {data,isSuccess,isLoading} = useGetAdsOfUserQuery(1);
    const {
        data: MediaData,
        isLoading: MediaLoading,
        isSuccess: MediaSuccess,
      } = useGetMediaByIdQuery(15);
  return (
    <Grid>

    {isLoading && <Spinner />}

    <Container>
      {}

      <Grid container spacing={1}>
        <Grid container spacing={2}>
          {isSuccess && data?.data.map((ad: Ad) => (
            <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
              <AdCard adData={ad} />
            
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>  
    </Grid>
)
}

export default MyAdvertises