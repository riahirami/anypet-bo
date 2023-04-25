import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoryData } from "../../core/models/category.model";
import { useGetCategoriesQuery } from "../../redux/api/categoryApi";
import {
  getCategories,
  selectCategory,
} from "../../redux/slices/categorySlice";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const GetCategories = () => {
  const {
    data: dataCategory,
    isSuccess,
    isFetching,
    refetch,
  } = useGetCategoriesQuery();
  const [category, setCategory] = useState<CategoryData>();

  const dispatch = useDispatch();
  const categoryState = useSelector(selectCategory);

  console.log(categoryState);
  
  useEffect(() => {
    if (isSuccess) {
      setCategory(dataCategory);
      dispatch(getCategories({ category: dataCategory }));
    }
  });
  return (
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      label="Category"
    >
      {categoryState.map((category) => (
        <MenuItem key={category.id} value={category.id}>
          {category.title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default GetCategories;
