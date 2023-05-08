import React from 'react'
import { OrderDirectionSelectProps} from "./OrderDirection.type"
import { MenuItem } from "@mui/material";
import { StyledTextFieldList } from './OrderDirection.style';



const OrderDirection = ({ value, onChange }: OrderDirectionSelectProps)  => {
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      };

    return (
 <StyledTextFieldList
    id="outlined-select-SortDirection"
    select
    label="Sort direction"
    value={value}
    onChange={handleChange}
  >
    <MenuItem value="asc">Ascending</MenuItem>
    <MenuItem value="desc">Descending</MenuItem>
  </StyledTextFieldList>  )
}

export default OrderDirection