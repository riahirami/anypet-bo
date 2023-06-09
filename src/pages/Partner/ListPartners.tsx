import { Typography, Grid, Avatar, Button, CardMedia } from '@mui/material';
import { useGetPartnersQuery, useDeletePartnerMutation } from 'redux/api/partnerApi';
import { Partner } from "core/models/partner.model";
import { PATHS } from 'routes/Path';
import CustomLink from 'components/CustomLink/CustomLink';

const ListPartners = () => {
    const { data: partners, isSuccess, isLoading } = useGetPartnersQuery();
    const [deletPartner] = useDeletePartnerMutation();

    console.log({ partners })

    function handleDeletePartner(id: string) {
        deletPartner(id)
            .unwrap()
            .then(() => {
                // setShowModal(true);
                // refetch();
            });
    }
    return (
        <Grid>

            <Typography>ListPartners</Typography>

            {isSuccess && partners?.data?.data?.map((partner: Partner["data"]) => (

                <Grid>
                    <CustomLink to={"/partner/" + partner?.id}>
                        <Avatar src={partner?.logo}></Avatar>
                    </CustomLink>
                    <Typography>{partner?.name}</Typography>
                    <Grid>
                        <Button variant='contained' color='error' onClick={() => handleDeletePartner(partner.id || "")}
                        >delete</Button>
                        <CustomLink to={"/partner/update/" + partner?.id}>
                            <Button variant="contained" color='info' >update</Button>
                        </CustomLink>

                    </Grid>

                </Grid>
            ))
            }

        </Grid >
    )
}

export default ListPartners