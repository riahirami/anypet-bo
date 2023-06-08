import { styled } from '@mui/material/styles';
import {
    Grid,Box,
    Typography
} from '@mui/material'

export const CustomGridAvatarName = styled(Grid)(({ theme }) => ({
    display: "flex", alignItems: "center", marginBottom: "10px", marginLeft: "10px" 
}))
export const CustomTypography = styled(Typography)(({ theme }) => ({
    marginRight: "8px"
}))
export const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex", alignItems: "center"}))
