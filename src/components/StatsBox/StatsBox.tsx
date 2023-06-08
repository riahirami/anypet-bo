import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { StyledBox } from "./StatsBox.style";
import {StatBoxProps} from "./StatsBox.type" ;
import CustomLink from "components/CustomLink/CustomLink";


const StatBox = ({ title, subtitle, icon, value,backgroundCol,details }: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <StyledBox m="0 30px" sx={{background:backgroundCol}}>

      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6">{subtitle}</Typography>
        <Typography variant="h5" fontStyle="italic">
          {value}
        </Typography>
      <Button variant="contained" ><CustomLink to={details}>details</CustomLink></Button>
      
      </Box>
    </StyledBox>
  );
};

export default StatBox;
