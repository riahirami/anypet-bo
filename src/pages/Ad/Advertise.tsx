import React, { useEffect, useState } from "react";
import { useDeleteAdMutation, useGetAdsQuery } from "../../redux/api/adsApi";
import { Ad, AdData } from "../../core/models/ad.model";
import {
  Avatar,
  Button,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/Path";
import VisibilityIcon from '@mui/icons-material/Visibility';


const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));


const Advertise = () => {
  const { data, error, isLoading, isSuccess } = useGetAdsQuery();
  const [showModal, setShowModal] = useState(false);


  const [
    deletAd,
    { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
  ] = useDeleteAdMutation();

  function handleDeleteAd(id: string) {
    setShowModal(true);
    deletAd(id);
  }

  return (
    <div>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Advertise
        </Typography>
        <Link to={PATHS.AddAdvertise}>
          <Button variant="contained" endIcon={<PlusOneIcon />}>
            Add advertise
          </Button>{" "}
        </Link>
        {isLoading && <Spinner />}
        {showModal && (
          <CustomModal title="Delete" description="deleted succeffully" />
        )}{" "}
        <Demo>
          <List>
            {data?.data.map((ad: Ad) => (
              <ListItem key={ad.id}>
                <ListItemAvatar>
                  <Avatar>
                    <FormatListBulletedIcon />
                  </Avatar>
                </ListItemAvatar>
                <Link to={"/advertise/" + ad.id}>

                <ListItemText primary={ad.title} secondary={ad.description} />
              </Link>
                <ListItemText primary={ad.country} secondary={ad.city} />
                <ListItemText primary={ad.state} secondary={ad.street} />
                <ListItemText primary={ad.postal_code} />
                <Link to={"/advertise/" + ad.id}>
                  <IconButton
                    color="primary"
                    aria-label="details"
                    component="label"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="primary"
                  aria-label="delete"
                  component="label"
                  onClick={() => handleDeleteAd(ad.id || "")}
                  disabled={loadingDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={"/advertise/update/" + ad.id}>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    component="label"
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </div>
  );
};

export default Advertise;
