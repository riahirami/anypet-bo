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
import {  useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useGetAllCategoriesQuery } from "redux/api/categoryApi";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { formaDateTime } from "core/services/helpers";
import CustomLink from "components/CustomLink/CustomLink"
import {CustomGridAvatarName,CustomTypography,CustomBox} from "./UserDetails.style"

const useStyles = makeStyles({
  root: {
    maxWidth: 550,
  },
});

export const UserDetails = (Props?: {userId:string}) => {
  const classes = useStyles();

  const { id } = useParams();
  const { data, isLoading } = useUserDetailsQuery(id || Props?.userId);
  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const avatar = data?.data?.avatar;

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  return (
    <>
      <CustomGridAvatarName container spacing={2} >
        <Grid item >
          <Avatar src={avatar}>Avatar</Avatar>
        </Grid>

        <Grid item >
          <Typography>
            {data?.data?.firstname} {data?.data?.lastname}
          </Typography>
        </Grid>
      </CustomGridAvatarName>
      <Grid container>
        <Grid container item spacing={2}>
          {data?.data?.ads?.map((adData: Ad) => (
            <Grid item md={4} xs={12} key={adData?.id}>
              {/* <AdCard adData={adData} /> */}

              <Card className={classes.root} sx={{ height: "350px" }}>
                <CardMedia
                  component="img"
                  width="150"
                  height="150"
                  image={adData?.media?.[0].file_path}
                  alt={adData?.media?.[0].file_name}
                  key={adData?.media?.[0].id}
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                    {adData.title}
                  </Typography>
                  <CustomBox >
                    <CustomTypography
                      color="primary"
                      variant="body2"
                    >
                      Category:
                    </CustomTypography>
                    <Typography
                      variant="body2"
                      component="p"
                    >
                      <CustomLink to={`/advertise/category/${adData?.category_id}`}>
                        {changeIdtoCategory(adData?.category_id)}
                      </CustomLink>
                    </Typography>
                  </CustomBox>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    noWrap
                  >
                    {adData.description}
                  </Typography>
                  <Divider />
                  <CustomBox >
                    <CustomTypography
                      color="primary"
                    >
                      Published:
                    </CustomTypography>
                    <Typography
                      variant="body2"
                      component="p"
                    >
                      {formaDateTime(adData.created_at)}
                    </Typography>
                  </CustomBox>

                  
                </CardContent>
                <CustomBox>
                    <Button variant="contained" color="info" >
                      <CustomLink to={"/advertise/" + adData.id}>details</CustomLink>
                    </Button>
                  </CustomBox>

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
                    avatar={<Avatar src={comment?.user?.avatar}></Avatar>}
                    action={
                      <IconButton aria-label="settings">
                        <CustomLink to={"/advertise/" + comment.ad_id}>
                          <ArrowForwardIosIcon />
                        </CustomLink>
                      </IconButton>
                    }
                    title={comment.description}
                    subheader={formaDateTime(comment.created_at)}
                  />
                </Card>
              </Grid>
              <Divider />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>

    </>
  );
};
