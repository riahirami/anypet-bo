import { styled } from "@mui/material/styles";
import { Button, FormControl, TextField, Typography } from "@mui/material";

export const StyledButton = styled(Button)({
    mt: 3,
    mb: 2,
});
export const StateFormControl = styled(FormControl)({
    width: '47%',
    marginTop: '8px',
    marginBottom: '8px',

});

export const CityFormControl = styled(FormControl)({
    width: '52%',
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '8px',
    

});

export const StreetFormControl = styled(FormControl)({
    width: '72%',
    marginTop: '8px',
    marginBottom: '8px',

});

export const PostalFormControl = styled(FormControl)({
    width: '27%',
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '8px',


});
export const CustomTextField = styled(TextField)({
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',

});

export const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));