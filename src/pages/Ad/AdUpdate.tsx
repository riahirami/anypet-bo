import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { useGetAdByIdQuery, useUpdateAdMutation } from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
import {
  CityFormControl,
  CustomTextField,
  PostalFormControl,
  StateFormControl,
  StreetFormControl,
  StyledButton,
} from "./Advertise.style";
import { useSelector } from "react-redux";
import { selectCategory } from "../../redux/slices/categorySlice";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";

const AdUpdate = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useGetAdByIdQuery(id);
  const [showModal, setShowModal] = useState(false);

  const item: Ad = {
    title: "",
    description: "",
    country: "",
    state: "",
    city: "",
    street: "",
    postal_code: "",
    category_id: "",
  };
  const [ad, setAd] = useState(item);

  const [updateAd, { data: updatedData, isSuccess: succesUpdate }] =
    useUpdateAdMutation();
  const { data: dataAllCategory } = useGetAllCategoriesQuery(100);

  // TODO : fix get categories, that select only one page of categories
  // const categories = useSelector(selectCategory);
  const categories = dataAllCategory?.data;
  console.log(dataAllCategory );

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setAd((prevState) => ({ ...prevState, [name]: value }));
  }
  async function handleUpdate(id: string) {
    await updateAd({
      id,
      title: ad.title,
      description: ad.description,
      country: ad.country,
      state: ad.state,
      city: ad.city,
      street: ad.street,
      postal_code: ad.postal_code,
      category_id: ad.category_id,
    });
    setShowModal(true);
  }
  const handleSelected = (event: any) => {
    event.preventDefault();
    const selectedItemId: string = event.target.value as string;
    setAd({ ...ad, category_id: selectedItemId });
    console.log(selectedItemId);
  };

  return (
    <div>
      {isLoading && <Spinner />}
      {showModal && (
        <CustomModal
          title="Update"
          description="advertise updated succeffully"
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
          select
          name="category_id"
          id="category_id"
          fullWidth
          label="Category"
          onChange={handleSelected}
          defaultValue={data?.data?.category_id}
          helperText="Please choose a category of your advertise"
        >
          {categories?.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.title}
            </MenuItem>
          ))}
        </CustomTextField>
        <CustomTextField
          type="text"
          name="description"
          label=" description"
          id="description"
          onChange={handleChangeForm}
          fullWidth
          defaultValue={data?.data?.description}
          helperText="Please enter a real description"
          multiline
          rows={4}
        />

        <CustomTextField
          type="text"
          name="country"
          label=" country"
          id="country"
          variant="outlined"
          onChange={handleChangeForm}
          defaultValue={data?.data?.country}
          fullWidth
        />
        <StateFormControl variant="filled">
          <CustomTextField
            type="text"
            name="state"
            label="state"
            id="state"
            variant="outlined"
            onChange={handleChangeForm}
            defaultValue={data?.data?.state}
            fullWidth
          />
        </StateFormControl>
        <CityFormControl variant="filled">
          <CustomTextField
            type="text"
            name="city"
            label=" city"
            id="city"
            variant="outlined"
            onChange={handleChangeForm}
            defaultValue={data?.data?.city}
            fullWidth
          />
        </CityFormControl>
        <StreetFormControl variant="filled">
          <CustomTextField
            type="text"
            name="street"
            label=" street"
            id="street"
            variant="outlined"
            onChange={handleChangeForm}
            defaultValue={data?.data?.street}
            fullWidth
          />
        </StreetFormControl>
        <PostalFormControl variant="filled">
          <CustomTextField
            fullWidth
            type="text"
            name="postal_code"
            label=" postal_code"
            id="postal_code"
            variant="outlined"
            onChange={handleChangeForm}
            defaultValue={data?.data?.postal_code}
          />
        </PostalFormControl>

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

export default AdUpdate;
