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
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  InputBase,
  Divider,
  MenuItem,
  CardMedia,
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
import { Demo } from "./Advertise.style";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import SearchIcon from "@mui/icons-material/Search";
import { Container } from "@mui/joy";
import useDebounce from "../../customHooks/useDebounce";
import { parametersListing } from "../../core/models/parametersListing.model";
import { formaDateTime } from "../../core/services/helpers";
import PerPageSelect from "../../components/PerPageChange/PerPageSelect";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import AdCard from "../../components/Card/AdsCard";
import AlertComponent from "../../components/Alert/Alert";

const Advertise = () => {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null | string>(
    dayjs("2023-04-01")
  );
  const [selectedPicker, setSelectedPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "4",
    keyword: undefined,
    date: undefined,
    status: undefined,
  });
  const { data, error, isLoading, isSuccess, refetch } =
    useGetAdsQuery(parameters);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  useEffect(() => {
    setParameters({
      ...parameters,
      keyword: debouncedSearchTerm !== "" ? debouncedSearchTerm : undefined,
    });
  }, [debouncedSearchTerm, parameters]);

  const [
    deletAd,
    { data: deletData, isSuccess: isSuccessDelete, isLoading: loadingDelete },
  ] = useDeleteAdMutation();

  function handleDeleteAd(id: string) {
    deletAd(id)
      .unwrap()
      .then(() => {
        refetch();
        setShowModal(true);
      });
  }
  const handlePageChange = (event: any, page: number) => {
    setParameters({ ...parameters, page });
  };

  const handlePicker = (date: dayjs.Dayjs | null | string) => {
    setSelectedPicker(true);
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setParameters({ ...parameters, date: dateString });
    console.log({ parameters });
  };

  const handleReset = () => {
    setValue("YYYY-DD-MM");
    setParameters({ ...parameters, date: undefined });
  };

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handlePerPageChange = (perPage: any) => {
    setParameters({ ...parameters, perPage });
  };

  return (
    <div>
      {isSuccessDelete && (
        <AlertComponent
          title="advertise deleted succeffully"
          severity="success"
        />
      )}
      <Box display="flex" borderRadius="3px">
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          defaultValue={key}
          onChange={(event) => {
            // setParameters({...parameters,keyword:event.target.value === '' ? undefined : event.target.value})
            setSearchTerm(event.target.value);
          }}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <Typography align="left">Advertises</Typography>
      <Grid container alignItems="center">
        <Grid item md={4}>
          <Grid container>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={value}
                    onChange={(newDate) => handlePicker(newDate)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item>
              <Button onClick={handleReset}>Reset</Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={4} container justifyContent="flex-end">
          <Link to={PATHS.AddAdvertise}>
            <Button variant="contained" endIcon={<PlusOneIcon />}>
              Add Advertise
            </Button>
          </Link>
        </Grid>
      </Grid>

      <br />
      <br />
      <Grid>
        {isLoading && <Spinner />}
        
        <Container>
          {}

          <Grid container spacing={1}>
            <Grid container spacing={2}>
              {data?.data.map((ad: Ad) => (
                <Grid item key={ad.id} xs={12} sm={6} md={4} lg={3}>
                  <AdCard adData={ad} />
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
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <br></br>
      <br></br>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Pagination
            color="primary"
            count={data?.last_page}
            defaultPage={parameters.page}
            boundaryCount={1}
            onChange={handlePageChange}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={4} sm={6} md={8} container justifyContent="flex-end">
          <PerPageSelect
            defaultValue={parameters.perPage}
            value={parameters.perPage}
            onChange={handlePerPageChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Advertise;
