import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { StyledBox } from "./StatsBox.style";
import { Link } from "react-router-dom";
import {StatBoxProps} from "./StatsBox.type" ;


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
      <Button variant="contained" ><Link to={details}>details</Link></Button>
      
      </Box>
    </StyledBox>
  );
};

export default StatBox;
