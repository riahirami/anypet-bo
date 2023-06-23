import React, { useEffect, useState } from "react";
import {
  useChangeStatusAdsMutation,
  useGetAdsQuery,
} from "../../redux/api/adsApi";
import Spinner from "../../components/Spinner/spinner";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Ad, AdData } from "../../core/models/ad.model";
import {
  Button,
  Pagination,
  Grid, Container,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import EventBusySharpIcon from "@mui/icons-material/EventBusySharp";
import { StatusOption } from "../../core/enums/status";
import { parametersListing } from "../../core/models/parametersListing.model";
import { statusParams } from "../../core/models/statusParams.model";
import PerPageSelect from "../../components/PerPageChange/PerPageSelect";
import AdCard from "../../components/Card/AdsCard";
import AlertComponent from "../../components/Alert/Alert";
import { message } from "../../core/constant/message";
import OrderBy from "components/OrderBy/OrderBy";
import OrderDirection from "components/OrderDirection/OrderDirection";
import { styled } from '@mui/material/styles';

export const CustomGrid = styled(Grid)(({ theme }) => ({
  display: "flex", justifyContent: "space-evenly", marginBottom: "20px", paddingBottom: "20px", paddingTop: "20px"
}))

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

  const { data, error, isLoading, isSuccess, refetch, isFetching } =
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



  useEffect(() => {
    setStatusParams({ ...statusParams });
  }, []);

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
    <Grid>
      {successChangeStatus && (
        <AlertComponent
          title={message.ADVERTISESTATUSCHANGED}
          severity="success"
        />
      )}

      <Typography align="left">Advertises requests</Typography>

      <Grid >

        <CustomGrid container alignItems="center">
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value}
                onChange={(newDate) => handlePicker(newDate)}
              />
            </LocalizationProvider>
            <Button onClick={handleReset}>
              <EventBusySharpIcon />
              reset
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={2} lg={4}>
            <Grid  >
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

          <Grid item  xs={12} sm={12} md={6} lg={4}>
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
        </CustomGrid>

        <Grid>
          {isLoading && <Spinner />}

          <Container>
            { }

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
        <Grid container justifyContent={"center"}>
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


        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdvertiseRequest;
