import React, { useState } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import {  useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Category } from "../../core/models/category.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";

const Categoryshow = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryByIdQuery(id);
  const [showModal, setShowModal] = useState(false);

  const item: Category = {
    title: "",
    description: "",
  };
  const [category, setCategory] = useState(item);

  const [updateCategory, { data: updateData, isSuccess: succesUpdate }] =
    useUpdateCategoryMutation();

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  }
  async function handleUpdate(id: string) {
    setShowModal(true);
    await updateCategory({
      id,
      title: category.title,
      description: category.description,
    });

  }

  return (
    <div>
      Category show
      {isLoading ? (
        <p>loading ...</p>
      ) : (
        <>
          <p>title : {data?.data?.title}</p>
          <p>description : {data?.data?.description}</p>
        </>
      )}
      {isLoading && <Spinner />}
      {showModal && (
        <CustomModal
          title="Update"
          description="category updated succeffully"
        />
      )}
      <form>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          label="title"
          name="title"
          id="title"
          onChange={handleChangeForm}
          variant="outlined"
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
          disabled={isLoading}
          onChange={handleChangeForm}
          onClick={() => handleUpdate(id as string)}
        >
          update
        </Button>
      </form>
    </div>
  );
};

export default Categoryshow;
