import React, { useEffect, useState } from "react";
import { useListFavoriteQuery } from "../../redux/api/adsApi";
import AdCard from "components/Card/AdsCard";
import Spinner from "components/Spinner/spinner";
import { Button, Grid, Typography, Container } from "@mui/material";
import { Ad } from "core/models/ad.model";
import { User } from "core/models/user.model";
import { PATHS } from "routes/Path";
import { Link, useParams } from "react-router-dom";

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
  const { id } = useParams();
  const { data, isSuccess, isLoading, refetch } = useListFavoriteQuery(id);

  const [favoritList, setfavoritList] = useState(data);

  useEffect(() => {
    setfavoritList(data);
    refetch();
  }, [data]);


  if (isLoading) return <Spinner />;


  if (isSuccess) {
    return (
      <Grid>
        {isLoading && <Spinner />}
  
        <Container>
          {}
  
          <Grid container spacing={1}>
            <Grid container spacing={2}>
              {
                favoritList?.data?.map((ad: any) => (
                  <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
                    <AdCard adData={ad?.ad} user={ad?.user}/>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  }

  return (
    <div>
      <Typography>No favorite advertises </Typography>
      <Button variant="text">
        <Link to={PATHS.Advertise}>See all</Link>
      </Button>
    </div>
  );
};

export default ListFavorit;
