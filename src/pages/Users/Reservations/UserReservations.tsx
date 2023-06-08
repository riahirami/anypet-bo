import {
    Grid, Typography, Button, Tab, Box, Avatar, Card,
    Badge,
    CardContent,
    CardActions
} from '@mui/material';
import React from 'react'
import { useGetMyReservationsQuery, useResponseOnReservationsMutation } from 'redux/api/reservationApi';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReservationDateTime, formaDateTime, statusToString } from 'core/services/helpers';
import CustomLink from "components/CustomLink/CustomLink"
import AlertComponent from "components/Alert/Alert";
import { message } from "core/constant/message"
import { SmallAvatar, CustomReservationCard, CardActionsCustom, GridReservation } from "./Reservation.style"




const UserReservations = () => {

    const { data, isLoading, isSuccess } = useGetMyReservationsQuery();
    const [responseOnReservation, { isLoading: loadingResponse, isSuccess: respondSuccess }] = useResponseOnReservationsMutation();
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
            {respondSuccess && (
                <AlertComponent
                    title={message.RESERVATIONUPDATED}
                    severity="success"
                />
            )}

            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Received" value="1" />
                        <Tab label="Send" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Grid container spacing={3}>
                        {data?.data?.received?.map((item) => (
                            <Grid item md={4} key={item?.id}>
                                <CustomReservationCard >

                                    <Grid style={{ display: "flex", justifyContent: "center" }}>
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <CustomLink to={"/user/details/" + item?.sender_id}>
                                                    <SmallAvatar alt={item?.sender?.firstname} src={item?.sender?.avatar} sx={{ width: 70, height: 70 }} />
                                                </CustomLink>}
                                        >
                                            <CustomLink to={"/advertise/" + item?.ad_id}>
                                                <Avatar alt={item?.advertisement?.title} src={item?.advertisement?.media?.[0].file_path} sx={{ width: 180, height: 180 }} />
                                            </CustomLink>
                                        </Badge></Grid>
                                    <CardContent>
                                        <CustomLink to={"/user/details/" + item?.sender_id}>

                                            <Typography gutterBottom variant="h5" component="div">
                                                From :  {item?.sender?.firstname} {item?.sender?.lastname}
                                            </Typography>
                                        </CustomLink>
                                        <CustomLink to={"/advertise/" + item?.ad_id}>
                                            <Typography >
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </CustomLink>
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
                                </CustomReservationCard>
                            </Grid>
                        ))}
                    </Grid>

                </TabPanel>

                <TabPanel value="2">
                    <Grid container spacing={3}>
                        {data?.data?.send?.map((item) => (
                            <Grid item md={4} key={item?.id}>
                                <CustomReservationCard>
                                    <GridReservation >

                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={
                                                <CustomLink to={"/user/details/" + item?.sender_id}>
                                                    <SmallAvatar alt={item?.receiver?.avatar} src={item?.receiver?.avatar} sx={{ width: 70, height: 70 }} />
                                                </CustomLink>
                                            }
                                        >
                                            <CustomLink to={"/advertise/" + item?.ad_id}>
                                                <Avatar alt={item?.advertisement?.title} src={item?.advertisement?.media?.[0].file_path} sx={{ width: 180, height: 180 }} />
                                            </CustomLink>
                                        </Badge>
                                    </GridReservation>

                                    <CardContent>
                                        <CustomLink to={"/user/details/" + item?.receiver_id}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                To :  {item?.receiver?.firstname} {item?.receiver?.lastname}
                                            </Typography>
                                        </CustomLink>
                                        <CustomLink to={"/advertise/" + item?.ad_id}>
                                            <Typography >
                                                Advertise : {item?.advertisement?.title}
                                            </Typography>
                                        </CustomLink>

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
                                        <CardActionsCustom>
                                            {item?.status === 0 &&
                                                <Button size="small" variant='contained' color='error' disabled={loadingResponse} onClick={() => responseOnReservationHandler(item?.id, 1)}>Cancel</Button>
                                            }
                                        </CardActionsCustom>
                                    </CardContent>

                                </CustomReservationCard>
                            </Grid>

                        ))}
                    </Grid>


                </TabPanel>


            </TabContext >

        </>
    )
}

export default UserReservations