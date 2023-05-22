import React, { useEffect, useState } from "react";
import {
  useDeleteAdMutation,
  useGetAdsQuery,
  useGetMediaByIdQuery,
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
import { message } from "../../core/constant/message";
import OrderBy from "components/OrderBy/OrderBy";
import OrderDirection from "components/OrderDirection/OrderDirection";

const Advertise = () => {
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null | string>(dayjs());

  const [selectedPicker, setSelectedPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "4",
    orderBy: undefined,
    orderDirection: undefined,
    keyword: undefined,
    date: undefined,
    status: undefined,
  });
  const { data, error, isLoading, isSuccess, refetch, isFetching } =
    useGetAdsQuery(parameters);

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  useEffect(() => {
    setParameters({
      ...parameters,
      keyword: debouncedSearchTerm !== "" ? debouncedSearchTerm : undefined,
    });
  }, [debouncedSearchTerm, parameters]);

  const handlePageChange = (event: any, page: number) => {
    setParameters({ ...parameters, page });
  };

  const handlePicker = (date: dayjs.Dayjs | null | string) => {
    setSelectedPicker(true);
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setParameters({ ...parameters, date: dateString });
  };

  const handleReset = () => {
    setValue("YYYY-DD-MM");
    setParameters({ ...parameters, date: undefined });
  };

  useEffect(() => {
    refetch();
  }, []);

  const handlePerPageChange = (perPage: any) => {
    setParameters({ ...parameters, perPage });
  };
  const handleOrderByChange = (orderBy: any) => {
    setParameters({ ...parameters, orderBy });
  };

  const handleOrderDirectionChange = (orderDirection: any) => {
    setParameters({ ...parameters, orderDirection });
  };

  const handleParameterChange = (param: string, value: any) => {
    setParameters({ ...parameters, [param]: value });
  };
  return (
    <div>
      {/* {isSuccessDelete && <AlertComponent title={message.ADVERRTISESDELETED} severity="success" />} */}
      <Typography align="left">Advertises</Typography>

      <Grid container justifyContent="space-between" alignItems="flex-end">
        <Grid item xs={12} sm={4} md={4} lg={4}>
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
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  onChange={(newDate) => handlePicker(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button onClick={handleReset} variant="text">
              Reset
            </Button>
          </Box>
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
                  {isFetching ? <Spinner /> : <AdCard adData={ad} />}
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
          <OrderBy
            defaultValue={parameters.orderBy}
            value={parameters.orderBy}
            onChange={handleOrderByChange}
          />
          <OrderDirection
            defaultValue={parameters.orderDirection}
            value={parameters.orderDirection}
            onChange={handleOrderDirectionChange}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Advertise;
