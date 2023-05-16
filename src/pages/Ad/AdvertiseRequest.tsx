import React, { useEffect, useState } from "react";
import {
  useChangeStatusAdsMutation,
  useGetAdsQuery,
  useGetMediaByIdQuery,
  
} from "../../redux/api/adsApi";
import { Demo } from "./Advertise.style";
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
import { Ad, AdData } from "../../core/models/ad.model";
import {
  Button,
  Fab,
  Pagination,
  Grid,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Stack,
} from "@mui/material";
import CustomModal from "../../components/Modal/CustomModal";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EventBusySharpIcon from "@mui/icons-material/EventBusySharp";
import { StatusOption } from "../../core/enums/status";
import { statusToString, formaDateTime } from "../../core/services/helpers";
import { parametersListing } from "../../core/models/parametersListing.model";
import { statusParams } from "../../core/models/statusParams.model";
import PerPageSelect from "../../components/PerPageChange/PerPageSelect";
import AdCard from "../../components/Card/AdsCard";
import AlertComponent from "../../components/Alert/Alert";
import { message } from "../../core/constant/message";
import OrderBy from "components/OrderBy/OrderBy";
import OrderDirection from "components/OrderDirection/OrderDirection";

const AdvertiseRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<string | null>("");
  const [value, setValue] = useState<Dayjs | null | string>(
    dayjs("2023-04-01")
  );
  const [status, setStatus] = useState("");

 

  const [parameters, setParameters] = useState<parametersListing>({
    page: 1,
    perPage: "4",
    keyword: undefined,
    date: undefined,
    status: "0",
    orderBy: undefined,
    orderDirection: undefined,
  });

  const [statusParams, setStatusParams] = useState<statusParams>({
    id: undefined,
    status: undefined,
  });

  const statusOptions = [
    { value: StatusOption.All, label: "All" },
    { value: StatusOption.Waiting, label: "Waiting" },
    { value: StatusOption.Canceled, label: "Canceled" },
    { value: StatusOption.Validated, label: "Validated" },
  ];

  const { data, error, isLoading, isSuccess, refetch } =
    useGetAdsQuery(parameters);

  const [
    changeStatus,
    {
      data: dataChangeStatus,
      isLoading: loadingUpdateStatus,
      isSuccess: successChangeStatus,
      isError: errorChangeStatus,
    },
  ] = useChangeStatusAdsMutation();

  const {
    data: MediaData,
    isLoading: MediaLoading,
    isSuccess: MediaSuccess,
  } = useGetMediaByIdQuery(undefined);


  useEffect(() => {
    setStatusParams({ ...statusParams });
  }, [statusParams]);

  const handlePageChange = (event: any, page: number) => {
    setParameters({ ...parameters, page });
  };

  const handlePicker = (date: dayjs.Dayjs | null | string) => {
    const datePicker = dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
    const dateString = datePicker?.substring(0, 10).replace(/-/g, "");
    setParameters({ ...parameters, date: dateString });
  };

  const handleReset = () => {
    setValue("YYYY-DD-MM");
    setParameters({ ...parameters, date: undefined });
  };

  const handleChangePerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParameters({ ...parameters, perPage: event.target.value });
  };

  const handleStatusChange = async (
    adId: string | number | undefined,
    status: StatusOption
  ) => {
    changeStatus({ id: adId, status })
      .unwrap()
      .then(() => {
        refetch();
      });
    // setStatusParams({ id: adId, status });
  };

 

  function handleStatusListChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newStatus = event.target.value;
    if (newStatus === "-1") {
      setParameters({ ...parameters, status: undefined });
    } else {
      setParameters({ ...parameters, status: newStatus });
    }
  }

  const handlePerPageChange = (perPage: string) => {
    setParameters({ ...parameters, perPage });
  };

  const handleOrderByChange = (orderBy: any) => {
    setParameters({ ...parameters, orderBy });
  };

  const handleOrderDirectionChange = (orderDirection: any) => {
    setParameters({ ...parameters, orderDirection });
  };

  return (
    <div>
      {successChangeStatus && (
        <AlertComponent
          title={message.ADVERTISESTATUSCHANGED}
          severity="success"
        />
      )}

      <Typography align="left">Advertises requests</Typography>

      <Grid item xs={12} md={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value}
                onChange={(newDate) => handlePicker(newDate)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2} md={4}>
            <Button onClick={handleReset}>
              <EventBusySharpIcon />
              reset
            </Button>
          </Grid>

          <Grid item xs={12} sm={2} md={2}>
            <Grid container spacing={2}>
              <TextField
                id="outlined-select-status"
                select
                label="Status"
                value={parameters.status || "-1"}
                onChange={handleStatusListChange}
                variant="outlined"
                fullWidth
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

        {isLoading && <Spinner />}

        <Demo>
          {}

          <Grid container spacing={1}>
            {data?.data.map((ad: Ad) => (
              <Grid item key={ad.id} xs={12} sm={4} md={3} lg={3}>
                {data && <AdCard adData={ad} />}

                {/* <IconButton
                  color="error"
                  aria-label="cancel"
                  component="label"
                  onClick={() =>
                    handleStatusChange(ad.id, StatusOption.Canceled)
                  }
                >
                  <CancelIcon />
                </IconButton>

                <IconButton
                  color="success"
                  aria-label="validate"
                  component="label"
                  onClick={() =>
                    handleStatusChange(ad.id, StatusOption.Validated)
                  }
                >
                  <CheckCircleIcon />
                </IconButton>

                <IconButton
                  color="warning"
                  aria-label="wating"
                  component="label"
                  onClick={() =>
                    handleStatusChange(ad.id, StatusOption.Waiting)
                  }
                >
                  <HourglassEmptyIcon />
                </IconButton> */}
                <Grid container justifyContent="space-between">
                  <Grid item key={ad.id} xs={12} sm={4} md={3} lg={3}>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() =>
                        handleStatusChange(ad.id, StatusOption.Waiting)
                      }
                    >
                      Waiting
                    </Button>
                  </Grid>
                  <Grid item key={ad.id} xs={12} sm={4} md={3} lg={3}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleStatusChange(ad.id, StatusOption.Validated)
                      }
                    >
                      Valide
                    </Button>
                  </Grid>
                  <Grid item key={ad.id} xs={12} sm={4} md={3} lg={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() =>
                        handleStatusChange(ad.id, StatusOption.Canceled)
                      }
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Demo>

        <br></br>
        <br></br>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Stack spacing={2}>
              <Pagination
                color="primary"
                count={data?.last_page}
                defaultPage={parameters.page}
                boundaryCount={1}
                onChange={handlePageChange}
                disabled={isLoading}
              />
            </Stack>
          </Grid>

          <Grid item>
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
      </Grid>
    </div>
  );
};

export default AdvertiseRequest;
