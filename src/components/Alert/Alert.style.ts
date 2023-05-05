import { styled } from '@mui/system';
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";


export const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
    width: '400px',
    position: 'fixed'
   
}));

export const StyledAlert = styled(MuiAlert)({
    width: '100%',
});