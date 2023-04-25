import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Ad } from "../../core/models/ad.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { useAddAdMutation } from "../../redux/api/adsApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  getCategories,
  categorySlice,
} from "../../redux/slices/categorySlice";
import { RootState } from "../../redux/store";
import GetCategories from "../../components/getter/getCategories";

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

  const categories = useSelector(selectCategory);
  console.log({ categories });

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setAd((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleAddcategory = async () => {
    setShowModal(true);

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
  };

  return (
    <div>
      <h3>add advertise</h3>

      {isLoading && <Spinner />}

      {showModal && (
        <CustomModal title="Add" description="advertise added succeffully" />
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
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="country"
          label="country"
          id="country"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="state"
          label="state"
          id="state"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="city"
          label="city"
          id="city"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="street"
          label="street"
          id="street"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="postal_code"
          label="postal_code"
          id="postal_code"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="category_id"
          label="category_id"
          id="category_id"
          variant="outlined"
          onChange={handleChangeForm}
        />

        <br />
        <GetCategories />

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

export default AddAdvertise;
