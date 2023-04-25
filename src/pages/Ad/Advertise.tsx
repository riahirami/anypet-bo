import React, { useEffect, useState } from "react";
import {
  useDeleteAdMutation,
  useGetAdsQuery,
  useGetAdsByDateQuery,
} from "../../redux/api/adsApi";
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
  TextField,
  Typography,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/Path";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {Demo} from './Advertise.style'; 

const Advertise = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-04-01"));
  const [selectedPicker, setSelectedPicker] = useState(false);

  const { data, error, isLoading, isSuccess } = useGetAdsQuery(currentPage);

  const { data: dataByDate, isLoading: dataByDateLoading } =
    useGetAdsByDateQuery(date);

  const [
    deletAd,
    { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
  ] = useDeleteAdMutation();

  function handleDeleteAd(id: string) {
    deletAd(id);
    setShowModal(isSuccessDelete);
  }
  const handlePageChange = (event: any, page: number) => {
    setCurrentPage(page);
  };

  const handlePicker = (date: dayjs.Dayjs | null) => {
    setSelectedPicker(true);
    const dateString = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const datePicker = dateString?.substring(0, 10).replace(/-/g, ""); // '20230424'
    setDate(datePicker);
  };

  const handleReset = () => {
    setSelectedPicker(false);
  };
  return (
    <div>
              <Typography align="left">Advertises</Typography>

      <Grid>
      <Link to={PATHS.AddAdvertise}>
          <Button variant="contained" endIcon={<PlusOneIcon />}>
            Add Advertise
          </Button>{" "}
        </Link>

      </Grid>
      <Grid item xs={12} md={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={value}
              onChange={(newDate) => handlePicker(newDate)}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button onClick={handleReset}>reset</Button>

        {isLoading && <Spinner />}
        {showModal && (
          <CustomModal title="Delete" description="deleted succeffully" />
        )}{" "}
        <Demo>
          {}
          {selectedPicker ? (
            <List>
              {dataByDate?.data.map((ad: Ad) => (
                <ListItem key={ad.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FormatListBulletedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link to={"/advertise/" + ad.id}>
                    <ListItemText
                      primary={ad.title}
                      secondary={ad.description}
                    />
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
          ) : (
            <List>
              {data?.data.map((ad: Ad) => (
                <ListItem key={ad.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FormatListBulletedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link to={"/advertise/" + ad.id}>
                    <ListItemText
                      primary={ad.title}
                      secondary={ad.description}
                    />
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
          )}
        </Demo>
        {selectedPicker ? (
          <Stack spacing={2}>
            <Pagination
              color="primary"
              count={dataByDate?.last_page}
              defaultPage={currentPage}
              boundaryCount={1}
              onChange={handlePageChange}
              disabled={isLoading}
            />
          </Stack>
        ) : (
          <Stack spacing={2}>
            <Pagination
              color="primary"
              count={data?.last_page}
              defaultPage={currentPage}
              boundaryCount={1}
              onChange={handlePageChange}
              disabled={isLoading}
            />
          </Stack>
        )}
      </Grid>
    </div>
  );
};

export default Advertise;
