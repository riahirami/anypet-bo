import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAddCategoryMutation } from "../../redux/api/categoryApi";
import { Category } from "../../core/models/category.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";

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
    setShowModal(true);

    await addCategory({ title, description });

  
};

  return (
    <div>
      <h3>add Category</h3>

      {isLoading && <Spinner />}

      {showModal && (
              <CustomModal
                title="Add"
                description="category added succeffully"
              />
            )}  
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="title"
          name="title"
          id="title"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="description"
          label=" description"
          id="description"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />

        <Button
          
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          type="button"
          onClick={() => handleAddcategory()}
          disabled={isLoading}
        >
          save
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
