import { MenuItem, TextField } from "@mui/material";
import React from "react";

interface PerPageSelectProps {
  value: string| number | undefined;
  defaultValue: string;
  onChange: (value: string) => void;
}

const PerPageSelect = ({ value, onChange }: PerPageSelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      id="outlined-select-perPage"
      select
      label="per page"
      value={value}
      onChange={handleChange}
    >
      <MenuItem value="4">4</MenuItem>
      <MenuItem value="8">8</MenuItem>
      <MenuItem value="12">12</MenuItem>
    </TextField>
  );
};

export default PerPageSelect;
