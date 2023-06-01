import {
    Grid, Typography, Button, Tab, Box, Avatar, Card,
    CardMedia,
    CardContent,
    CardActions
} from '@mui/material';
import React from 'react'
import { useGetMyReservationsQuery, useResponseOnReservationsMutation } from 'redux/api/reservationApi';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReservationDateTime, formaDateTime, statusToString } from 'core/services/helpers';
import { Link } from 'react-router-dom';


const UserReservations = () => {

    const { data, isLoading, isSuccess } = useGetMyReservationsQuery();
    const [responseOnReservation, { isLoading: loadingResponse }] = useResponseOnReservationsMutation();
    const [value, setValue] = React.useState("1");


    const responseOnReservationHandler = async (reservationId: string | number, status: number) => {
        await responseOnReservation({
            id: reservationId,
            status: status
        })
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Received" value="1" />
                        <Tab label="Send" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container >
                        {data?.data?.received?.map((item) => (
                            <Grid item md={4}>
                                <Card sx={{ maxWidth: 345, height: 435 }} >
                                    <Link to={"/user/details/" + item?.sender_id}> <Avatar
                                        sx={{ width: 200, height: 200, margin: "auto" }}
                                        src={item?.sender?.avatar}
                                        title={item?.sender?.firstname}
                                    ></Avatar>    </Link>
                                    <CardContent>
                                        <Link to={"/user/details/" + item?.sender_id}>

                                            <Typography gutterBottom variant="h5" component="div">
                                                From :  {item?.sender?.firstname} {item?.sender?.lastname}
                                            </Typography>
                                        </Link>
                                        <Link to={"/advertise/" + item?.ad_id}>
                                            <Typography >
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </Link>
                                        <Typography >
                                            Message : {item?.message}
                                        </Typography>
                                        <Typography >
                                            Reservation : {ReservationDateTime(item?.reservation_date)}
                                        </Typography>
                                        <Typography style={{
                                            color:
                                                item?.status == 0
                                                    ? "orange"
                                                    : item?.status == 1
                                                        ? "red"
                                                        : item?.status == 2
                                                            ? "green"
                                                            : "inherit",
                                        }}>
                                            Status :  {statusToString(item?.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created at :  {formaDateTime(item?.created_at)}
                                        </Typography>

                                    </CardContent>
                                    <CardActions style={{ display: "flex", justifyContent: "space-evenly" }}>
                                        {item?.status === 0 &&
                                            <>
                                                <Button size="small" variant='contained' color='success' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 2)}>validate</Button>
                                                <Button size="small" variant='contained' color='error' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 1)}>decline</Button>
                                            </>
                                        }

                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </TabPanel>

                <TabPanel value="2">
                    <Grid container spacing={3}>
                        {data?.data?.send?.map((item) => (
                            <Grid item md={4}>
                                <Card sx={{ maxWidth: 345, height: 470 }}>
                                    <Link to={"/user/details/" + item?.sender_id}>   <Avatar
                                        sx={{ width: 250, height: 250, margin: "auto" }}
                                        src={item?.receiver?.avatar}
                                        title={item?.receiver?.firstname}
                                    ></Avatar>   </Link>
                                    <CardContent>
                                        <Link to={"/user/details/" + item?.receiver_id}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                To :  {item?.receiver?.firstname} {item?.receiver?.lastname}
                                            </Typography>
                                        </Link>
                                        <Link to={"/advertise/" + item?.ad_id}>
                                            <Typography >
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </Link>
                                        <Link to={"/user/details/" + item?.ad_id}>   <Avatar
                                            sx={{ width: 25, height: 25, margin: "auto" }}
                                            src={item?.advertisement?.media?.[0].file_path}
                                            title={item?.advertisement?.media?.[0].file_name}
                                        ></Avatar>
                                        </Link>
                                        <Typography >
                                            Reservation : {ReservationDateTime(item?.reservation_date)}
                                        </Typography>
                                        <Typography >
                                            Message : {item?.message}
                                        </Typography>
                                        <Typography style={{
                                            color:
                                                item?.status == 0
                                                    ? "orange"
                                                    : item?.status == 1
                                                        ? "red"
                                                        : item?.status == 2
                                                            ? "green"
                                                            : "inherit",
                                        }}>
                                            Status :  {statusToString(item?.status)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created at :  {formaDateTime(item?.created_at)}
                                        </Typography>
                                        <CardActions style={{ display: "flex", justifyContent: "center" }}>
                                            {item?.status === 0 &&
                                                <Button size="small" variant='contained' color='error' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 1)}>Cancel</Button>
                                            }
                                        </CardActions>
                                    </CardContent>

                                </Card>
                            </Grid>

                        ))}
                    </Grid>


                </TabPanel>


            </TabContext>

        </>
    )
}

export default UserReservations