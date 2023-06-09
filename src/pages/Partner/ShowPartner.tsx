import React from 'react'
import { useGetPartnerByIdQuery } from 'redux/api/partnerApi';
import { Typography, Grid, Avatar, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';

const ShowPartner = () => {
    const { id } = useParams();

    const { data: partner, isSuccess, isLoading } = useGetPartnerByIdQuery(id);

    return (
        <Grid>


            {isSuccess &&

                <Grid container >
                    {isSuccess &&
                        partner?.data?.media?.map((media: any) => {
                            return (
                                <Grid item key={media.id} xs={12} sm={4} md={4} lg={4}>
                                    <CardMedia
                                        component="img"
                                        width="200"
                                        height="300"
                                        image={media.file_path}
                                        key={media.id}
                                    />
                                </Grid>
                            );
                        })}
                    <Avatar src={partner?.data?.logo}></Avatar>
                    <Typography>{partner?.data?.name}</Typography>
                    <Typography>{partner?.data?.description}</Typography>
                    <Typography>address :{partner?.data?.address}</Typography>
                    <Typography>contact: {partner?.data?.contact}</Typography>
                    <Typography>website : {partner?.data?.link}</Typography>

                </Grid>
            }

        </Grid>)
}

export default ShowPartner