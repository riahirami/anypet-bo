import { styled } from "@mui/material/styles";
import { Button, FormControl, TextField, Typography } from "@mui/material";

export const StyledButton = styled(Button)({
    mt: 3,
    mb: 2,
});
export const StateFormControl = styled(FormControl)({
    width: '20%',
    marginTop: '8px',
    marginBottom: '8px',

});

export const CityFormControl = styled(FormControl)({
    width: '35%',
    marginTop: '8px',
    marginBottom: '8px',
    

});

export const StreetFormControl = styled(FormControl)({
    width: '43%',
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '8px',

});

export const PostalFormControl = styled(FormControl)({
    width: '20%',
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '8px',


});
export const CustomTextField = styled(TextField)({
    width: '100%',
    marginTop: '8px',
    marginBottom: '8px',

});

export const TitleTextField = styled(TextField)({
    width: '55%',
    marginTop: '8px',
    marginBottom: '8px',
    marginRight: '10px',
})
export const MediaField = styled(TextField)({
    width: '42%',
    marginTop: '8px',
    marginBottom: '8px',
    marginLeft: '9px',
})

export const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));