import React from "react";
import {
  useGetMediaByIdQuery,
  useListFavoriteQuery,
} from "../../redux/api/adsApi";
import AdCard from "components/Card/AdsCard";
import Spinner from "components/Spinner/spinner";
import { Button, Grid,Typography } from "@mui/material";
import { Ad } from "core/models/ad.model";
import { User } from "core/models/user.model";
import { PATHS } from "routes/Path";
import { Link, useParams } from 'react-router-dom';

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
    state: string;
    city: string;
    street: string;
    postal_code: string;
    created_at: string;
    updated_at: string;
    category_id: number;
    user: User;
  };
}
interface AdData {
  data: ListFav[];
}
const ListFavorit = () => {

  const {id} = useParams() ;
  const { data, isSuccess, isLoading, error } = useListFavoriteQuery(id);
  

  if (isSuccess) {
    return (
      <Grid container alignItems="center">
        {data?.data?.map((item: any) => (
          <Grid key={item.id} item xs={4} sm={4} md={4}>
            <AdCard adData={item.ad} />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Typography>No favorite advertises </Typography>
      <Button variant="text"><Link to={PATHS.Advertise}>See all</Link></Button>
    </div>
  );
};

export default ListFavorit;
