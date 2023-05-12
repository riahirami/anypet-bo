import React from "react";
import { useGetMediaByIdQuery, useListFavoriteQuery } from "../../redux/api/adsApi";
import AdCard from "components/Card/AdsCard";
import Spinner from "components/Spinner/spinner";
import { Grid } from "@mui/material";
import { Ad } from "core/models/ad.model";

interface ListFav {
  id: number;
  user_id: number;
  ad_id: number;
  created_at: string;
  updated_at: string;
  ad: {
    id: number;
    title: string;
    description: string;
    status: number;
    country: string;
    state: string;
    city: string;
    street: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
    category_id: number;
  };
}
interface AdData {
  data: ListFav[];
}
const ListFavorit = () => {
  const { data, isSuccess, isLoading, error } = useListFavoriteQuery(1);
  const {
    data: MediaData,
    isLoading: MediaLoading,
    isSuccess: MediaSuccess,
  } = useGetMediaByIdQuery(undefined);


  if (isSuccess) {
    return (
        <Grid container alignItems="center">
        {data?.data?.map((item: any) => (
          <Grid key={item.id} item xs={4} sm={4} md={4}>
            <AdCard adData={item.ad} medias={MediaData} />
          </Grid>
        ))}
      </Grid>
    );
  } 
  else if(isLoading) return <Spinner />;
  else  return (<div><p>error </p></div>);
};

export default ListFavorit;
