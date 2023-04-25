import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Ad } from "../../core/models/ad.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { useAddAdMutation } from "../../redux/api/adsApi";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  getCategories,
  categorySlice,
} from "../../redux/slices/categorySlice";
import {CityFormControl,CustomTextField,PostalFormControl,StateFormControl,StreetFormControl,StyledButton} from './Advertise.style'; 
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";

const AddAdvertise = () => {
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
  const [addAdvertise, { data, isSuccess, isLoading, isError }] =
    useAddAdMutation();
  const {
    title,
    description,
    country,
    state,
    city,
    street,
    postal_code,
    category_id,
  } = ad;
  const { data: dataAllCategory } = useGetAllCategoriesQuery(100);

  // const categories = useSelector(selectCategory);
  const categories = dataAllCategory?.data;

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setAd((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleAddAd = async () => {
    await addAdvertise({
      title,
      description,
      country,
      state,
      city,
      street,
      postal_code,
      category_id,
    });
    setShowModal(true);
  };
  const handleSelected = (event: any) => {
    event.preventDefault();
    const selectedItemId: string = event.target.value as string;
    setAd({ ...ad, category_id: selectedItemId });
    console.log(selectedItemId);
  };

  return (
    <div>
      <Typography align="left">Add advertise</Typography>

      {isLoading && <Spinner />}

      {showModal && (
        <CustomModal title="Add" description="advertise added succeffully" />
      )}
      <form>
        <CustomTextField
          type="text"
          label="title"
          name="title"
          id="title"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a valide title"
        />
        <CustomTextField
          select
          name="category_id"
          id="category_id"
          fullWidth
          label="Category"
          onChange={handleSelected}
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
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a real description"
          multiline
          rows={4}
          maxRows={5}

        />

        <CustomTextField
          type="text"
          name="country"
          label="country"
          id="country"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          margin="normal"
          helperText="Please enter a valide country"
        />


      <StateFormControl variant="filled">
        <CustomTextField
          type="text"
          name="state"
          label="state"
          id="state"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a valid state"
        />
      </StateFormControl>
      <CityFormControl variant="filled">
        <CustomTextField
          type="text"
          name="city"
          label="city"
          id="city"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a valid city"
        />
      </CityFormControl>
      <StreetFormControl variant="filled">
        <CustomTextField
          type="text"
          name="street"
          label="street"
          id="street"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a valid street"
        />
      </StreetFormControl>
      <PostalFormControl variant="filled">
        <CustomTextField
          type="text"
          name="postal_code"
          label="postal_code"
          id="postal_code"
          variant="outlined"
          onChange={handleChangeForm}
          fullWidth
          helperText="Please enter a valid postal code"
        />
      </PostalFormControl>

        <StyledButton
          variant="contained"
          type="button"
          onClick={() => handleAddAd()}
          disabled={isLoading}
          
        >
          save
        </StyledButton>
      </form>
    </div>
  );
};

export default AddAdvertise;
