import { styled } from "@mui/material/styles";
import { Button, FormControl, TextField, Typography } from "@mui/material";


export const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  export const CustomTextField = styled(TextField)({
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',


});

export const StyledButton = styled(Button)({
  mt: 3,
  mb: 2,
});