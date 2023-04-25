import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../../redux/api/categoryApi";
import { Category } from "../../core/models/category.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import {CustomTextField,StyledButton} from './category.style'; 

const AddCategory = () => {
  const [showModal, setShowModal] = useState(false);

  const item: Category = {
    title: "",
    description: "",
  };
  const tokenValue = JSON.parse(localStorage.getItem("user") || "{}");

  const [category, setCategory] = useState(item);
  const [addCategory, { data, isSuccess, isLoading, isError }] =
    useAddCategoryMutation();
  const { title, description } = category;

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  }

  const handleAddcategory = async () => {
    await addCategory({ title, description });
     setShowModal(isSuccess);
  };

  return (
    <div>
      <Typography align="left">Add category</Typography>

      {isLoading && <Spinner />}

      {showModal && (
        <CustomModal title="Add" description="category added succeffully" />
      )}
      <form>
        <CustomTextField
          id="title"
          label="title"
          name="title"
          onChange={handleChangeForm}
          color="primary"
          helperText="Please enter a title"
          fullWidth
        />
        <br />

        <CustomTextField
          id="description"
          label="description"
          name="description"
          onChange={handleChangeForm}
          color="primary"
          helperText="Please enter a description"
          fullWidth
          multiline
          rows={4}
        />

        <br />
        <div style={{ display: "flex", justifyContent: "left" }}>
          <StyledButton size="large"
            variant="contained"
            type="button"
            onClick={handleAddcategory}
            disabled={isLoading}
          >
            save
          </StyledButton>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
