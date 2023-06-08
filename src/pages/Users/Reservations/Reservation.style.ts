import { styled } from '@mui/material/styles';
import {
    Grid, Typography, Button, Tab, Box, Avatar, Card,
    Badge,
    CardContent,
    CardActions
} from '@mui/material'

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));


export const CustomReservationCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    height: 435
}));

export const CardActionsCustom = styled(CardActions)(({ theme }) => ({
    display: "flex", justifyContent: "center", marginTop: "20px"
}));

export const GridReservation = styled(Grid)(({ theme }) => ({
    display: "flex", justifyContent: "center" 
}));
