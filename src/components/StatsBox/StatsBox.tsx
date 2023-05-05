import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)({
  color: "white",
  borderRadius: "15px",
  padding: "15px",
  marginTop: "15px",
  marginBottom: "5px",
});

interface StatBoxProps {
  title?: string;
  subtitle?: string;
  icon: any;
  value?: string;
  backgroundCol?: any;
  details?: any;
}
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
