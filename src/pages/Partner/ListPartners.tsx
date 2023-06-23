import { Typography, Grid, Avatar, Button, CardMedia } from '@mui/material';
import { useGetPartnersQuery, useDeletePartnerMutation } from 'redux/api/partnerApi';
import { Partner } from "core/models/partner.model";
import { PATHS } from 'routes/Path';
import CustomLink from 'components/CustomLink/CustomLink';
import CardPartnerComponent from 'components/CardPartner/CardPartnerComponent';

const ListPartners = () => {
    const { data: partners, isSuccess, isLoading } = useGetPartnersQuery();
    const [deletPartner] = useDeletePartnerMutation();


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


            <CardPartnerComponent partners={partners} isSuccess={isSuccess} handleDeletePartner={deletPartner} />

        </Grid >
    )
}

export default ListPartners