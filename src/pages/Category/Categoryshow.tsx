import React, { useState } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Category } from "../../core/models/category.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { CustomTextField, StyledButton } from "./category.style";

const Categoryshow = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryByIdQuery(id);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const item: Category = {
    title: "",
    description: "",
  };
  const [category, setCategory] = useState(item);

  const [
    updateCategory,
    { data: updateData, isSuccess: succesUpdate, isLoading: loadingUpdate },
  ] = useUpdateCategoryMutation();

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  }
  async function handleUpdate(id: string) {
   
    await updateCategory({
      id,
      title: category.title,
      description: category.description,
    });
    setShowModal(true);
    navigate("/categories");
  }

  return (
    <div>
      <Typography align="left">
        Update Category {id} | {data?.data?.title}
      </Typography>
      {isLoading ? <p>loading ...</p> : <p>error !</p>}
      {isLoading && <Spinner />}
      {loadingUpdate && <Spinner />}
      {showModal && (
        <CustomModal
          title="Update"
          description="category updated succeffully"
        />
      )}
      <form>
        <CustomTextField
          type="text"
          label="title"
          name="title"
          id="title"
          onChange={handleChangeForm}
          defaultValue={data?.data?.title}
          fullWidth
        />
        <CustomTextField
          type="text"
          name="description"
          label=" description"
          id="description"
          fullWidth
          onChange={handleChangeForm}
          defaultValue={data?.data?.description}
        />

        <StyledButton
          variant="contained"
          type="button"
          disabled={isLoading}
          onChange={handleChangeForm}
          onClick={() => handleUpdate(id as string)}
        >
          Update
        </StyledButton>
      </form>
    </div>
  );
};

export default Categoryshow;
