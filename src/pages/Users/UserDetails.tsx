import {
  Grid,
  Box,
  Avatar,
  Typography,
  Divider,
  Card,
  CardHeader,
  IconButton,
  CardMedia,
  Button,
  CardContent,
} from "@mui/material";
import AdCard from "components/Card/AdsCard";
import { Ad, AdData } from "core/models/ad.model";
import React from "react";
import { useUserDetailsQuery } from "redux/api/userApi";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useGetAllCategoriesQuery } from "redux/api/categoryApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formaDateTime } from "core/services/helpers";

const useStyles = makeStyles({
  root: {
    maxWidth: 450,
  },
});
export const UserDetails = () => {
  const classes = useStyles();

  const { id } = useParams();
  const { data, isLoading } = useUserDetailsQuery(id);
  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const avatar = data?.data?.avatar;

  console.log({ data });

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  return (
    <>
      <Grid container>
        <Grid item spacing={2}>
          <Avatar src={avatar}>Avatar</Avatar>
        </Grid>

        <Grid item spacing={2}>
          <Typography>
            {data?.data?.firstname} {data?.data?.lastname}
          </Typography>
        </Grid>

        <Grid container>
          <Grid container item spacing={2}>
            {data?.data?.ads?.map((adData: Ad) => (
              <Grid item md={4} xs={12} key={adData?.id}>
                {/* <AdCard adData={adData} /> */}

                <Card className={classes.root} sx={{ height: "250px" }}>
                  {/* <CardMedia
                    //   className={classes.media}
                      image={adData?.media?.[0].file_path}
                    title="Paella dish"
                  /> */}
                  <CardContent sx={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {adData.title}
                    </Typography>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        color="primary"
                        variant="body2"
                        style={{ marginRight: "8px" }}
                      >
                        Category:
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ color: "black" }}
                      >
                        <Link to={`/advertise/category/${adData?.category_id}`}>
                          {changeIdtoCategory(adData?.category_id)}
                        </Link>
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      noWrap
                    >
                      {adData.description}
                    </Typography>
                    <Divider />
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        color="primary"
                        style={{ marginRight: "8px" }}
                      >
                        Published:
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        style={{ color: "black" }}
                      >
                        {formaDateTime(adData.created_at)}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Button variant="contained" color="info">
                    <Link to={"/advertise/" + adData.id}>details</Link>
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Typography sx={{ marginTop: "20px" }}>Comments :</Typography>
          <Grid container item spacing={2}>
            {data?.data?.comments?.map((comment: any) => (
              <React.Fragment key={comment?.id}>
                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={<Avatar>{avatar}</Avatar>}
                      action={
                        <IconButton aria-label="settings">
                          <Link to={"/advertise/" + comment.ad_id}>
                            <ArrowForwardIosIcon />
                          </Link>
                        </IconButton>
                      }
                      subheader={formaDateTime(comment.created_at)}
                      title={comment.description}
                    />
                  </Card>
                </Grid>
                <Divider />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
