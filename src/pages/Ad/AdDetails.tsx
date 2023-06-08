import React, { useEffect, useState } from "react";
import {
  useGetAdByIdQuery,
  useGetMediaByIdQuery,
  useListFavoriteQuery,
  useSetFavoriteMutation,
} from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner/spinner";
import {
  Avatar,
  Box,
  IconButton,
  Button,
  CardMedia,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@mui/material";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";

import AdCard from "../../components/Card/AdsCard";
import Comment from "components/Comment/Comment";
import { Typography } from "@mui/joy";
import { formaDateTime, getState } from "core/services/helpers";
import FavoriteIcon from "@mui/icons-material/Favorite";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { getCurrentUser } from "core/utils/functionHelpers";
import { useCreateReservationsMutation } from "redux/api/reservationApi";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomLink from "components/CustomLink/CustomLink"
import AlertComponent from "components/Alert/Alert";
import {message as CONSTMessage} from "core/constant/message"


const AdDetails: React.FC = () => {
  const { id } = useParams();
  const { data: { data: adData } = {}, isLoading } = useGetAdByIdQuery(id);
  const [AdDetails, setAdDetails] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [setFavorit, { data: datasetFavoris, isSuccess: successFavoris }] =
    useSetFavoriteMutation();

  const [makeReservation, { isSuccess: successReservation, isLoading: reservationLoading }] = useCreateReservationsMutation();

  const user = getCurrentUser();

  const { data, refetch } = useListFavoriteQuery(user?.user?.id);

  const [isFavorite, setIsFavorit] = useState<boolean>();

  const { data: CategoryData, refetch: RefetchCategory } =
    useGetAllCategoriesQuery(100);

  const changeIdtoCategory = (id: string) => {
    const category = CategoryData?.data.find((cat: any) => cat.id == id);
    return category?.title;
  };

  useEffect(() => {
    setAdDetails(adData);
  }, [adData]);

  useEffect(() => {
    if (successReservation)
      setOpen(false)
  }, [successReservation]);

  // TODO optimise this function or replace it by a slice
  const checkIsFavorit = async (id: any) => {
    const favoris = await data?.data.find((fav: any) => fav.ad_id == id);
    if (favoris) {
      setIsFavorit(true);
    } else {
      setIsFavorit(false);
    }
  };

  useEffect(() => {
    checkIsFavorit(adData?.id);
  }, [setFavorit]);

  const setfavorit = async (id: any) => {
    await setFavorit(id);
    await checkIsFavorit(id);
    refetch();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeMessageField = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessage(e.target.value);
  };
  const [selectedPicker, setSelectedPicker] = useState(false);

  const [dateValue, setDateValue] = useState<string>("");
  const [timeValue, setTimeValue] = useState<string>("");


  const handleDatePicker = (date: dayjs.Dayjs | null | string) => {
    setSelectedPicker(true);
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setDateValue(dateString);
  };

  const handleTimeChange = (time: any) => {
    const formattedTime = dayjs(time).format("HH:mm");
    setTimeValue(formattedTime);
  };

  const makeReservationHandler = async () => {
    await makeReservation({
      receiver_id: adData?.user?.id,
      ad_id: adData?.id,
      message: message,
      reservation_date: dateValue + " " + timeValue,
    });

    
  }

  return (
    <>
      {successReservation && (
        <AlertComponent
          title={CONSTMessage.RESERVATIONSEND}
          severity="success"
        />
      )}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Choose a date and add a message to your reservation request"}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", 'TimePicker']}>
              <DatePicker
                value={dateValue}
                label="Choose your date"
                onChange={(newDate) => handleDatePicker(newDate)}
              />
              <TimePicker
                value={timeValue}
                label="Schedule the time"
                onChange={(newTime) => handleTimeChange(newTime)}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={handleChangeMessageField}
            disabled={reservationLoading}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => makeReservationHandler()} disabled={reservationLoading}>Valide</Button>
        </DialogActions>
      </Dialog>


      <Grid item xs={12} md={12}>
        {isLoading && <Spinner />}

        <Grid container justifyContent="space-between">
          <Grid item xs={7} md={7}>
            <Box sx={{ p: "5px" }}>
              <Typography component="h1">{adData?.title}</Typography>
            </Box>
            <Typography sx={{ mb: "10px", p: "5px" }}>
              <LabelImportantIcon color="primary"></LabelImportantIcon>
              Category:{" "}
              <CustomLink to={`/advertise/category/${adData?.category_id}`}>
                {changeIdtoCategory(adData?.category_id)}
              </CustomLink>{" "}
            </Typography>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              aria-label="add to favorites"
              onClick={() => setfavorit(adData.id)}
              sx={{ marginLeft: "auto" }}
            >
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteIcon />}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container alignItems={"center"}>
          {adData &&
            adData?.media?.map((media: any) => {
              return (
                <Grid item key={media.id} xs={12} sm={4} md={4} lg={4}>
                  <CardMedia
                    component="img"
                    width="200"
                    height="400"
                    image={media.file_path}
                    key={media.id}
                  />
                </Grid>
              );
            })}
        </Grid>

        <Grid
          container
          sx={{ m: "10px", p: "5px" }}
          justifyContent={"space-between"}
        >
          <Grid item>
            <CustomLink to={"/user/details/" + adData?.user?.id}>
              <Avatar src={adData?.user?.avatar}></Avatar>
            </CustomLink>
            <Typography>
              <CustomLink to={"/user/details/" + adData?.user?.id}>
                {adData?.user?.firstname} {adData?.user?.lastname}
              </CustomLink>
            </Typography>
          </Grid>

          {user?.user?.id !== adData?.user_id &&
            <>
              <Grid item alignItems={"flex-end"}>
                <Button onClick={handleClickOpen} variant="contained">reservation</Button>
              </Grid><Grid item alignItems={"flex-end"}>
                <CustomLink to={"/users/messages/" + adData?.user?.id}>
                  <Button variant="contained">send message</Button>
                </CustomLink>
              </Grid>
            </>
          }
        </Grid>
        <Divider />
        <Typography variant="plain" sx={{ mb: "10px", p: "10px" }}>
          {adData?.description}
        </Typography>
      </Grid>

      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{getState(adData?.state)} - {adData?.city}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.street}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MarkunreadMailboxIcon sx={{ color: "warning.main" }} />
          <Typography>{adData?.postal_code}</Typography>
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocalPhoneIcon sx={{ color: "warning.main" }} />
          <Typography>+216 {adData?.user?.phone}</Typography>
        </Grid>
      </Grid>

      <Grid>
        <Comment />
      </Grid>
    </>
  );
};

export default AdDetails;
