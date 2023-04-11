import React, {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {StyledBox} from './spinner.style';

export const Spinner = () => {
  const [show, setShow] = useState(true);

return (
  <StyledBox>
  <CircularProgress />
 </StyledBox>

);
}
export default Spinner