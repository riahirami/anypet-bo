import { MenuItem } from "@mui/material";
import React from "react";
import { PerPageSelectProps } from "./PerPage.type";
import { StyledTextFieldList } from './PerPage.style';

const PerPageSelect = ({ value, onChange }: PerPageSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTextFieldList
      id="outlined-select-perPage"
      select
      label="per page"
      value={value}
      onChange={handleChange}
    >
      <MenuItem value="4">4</MenuItem>
      <MenuItem value="8">8</MenuItem>
      <MenuItem value="12">12</MenuItem>
    </StyledTextFieldList>
  );
};

export default PerPageSelect;
