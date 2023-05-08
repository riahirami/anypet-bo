import React from 'react'
import { MenuItem, TextField } from "@mui/material";
import { OrderBySelectProps } from './OrderBy.type';
import { StyledTextFieldList } from './OrderBy.style';

const OrderBy = ({ value, onChange }: OrderBySelectProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      };

  return (
    <StyledTextFieldList
    id="outlined-select-sort"
    select
    label="Sort"
    value={value}
    onChange={handleChange}
  >
    <MenuItem value="title">title</MenuItem>
    <MenuItem value="created_at">Creation Date</MenuItem>
  </StyledTextFieldList>
);
  
}

export default OrderBy