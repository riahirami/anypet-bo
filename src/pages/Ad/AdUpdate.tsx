import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import {
    useGetAdByIdQuery,
    useUpdateAdMutation
} from "../../redux/api/adsApi";
import { Ad } from "../../core/models/ad.model";
const AdUpdate = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetAdByIdQuery(id);
  const [showModal, setShowModal] = useState(false);

  const item: Ad = {
    title:"",
    description:"",
    country:"",
    state:"",
    city:"",
    street:"",
    postal_code:"",
    category_id:"",
  };
  const [ad, setAd] = useState(item);

  const [updateAd, { data: updatedData, isSuccess: succesUpdate }] =
  useUpdateAdMutation();

  function handleChangeForm(e: any) {
    const { name, value } = e.target;
    setAd((prevState) => ({ ...prevState, [name]: value }));
  }
  async function handleUpdate(id: string) {
    console.log(updatedData)
    setShowModal(true);
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

  }

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
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="country"
          label=" country"
          id="country"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="state"
          label=" state"
          id="state"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="city"
          label=" city"
          id="city"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="street"
          label=" street"
          id="street"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="postal_code"
          label=" postal_code"
          id="postal_code"
          variant="outlined"
          onChange={handleChangeForm}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          type="text"
          name="category_id"
          label=" category_id"
          id="category_id"
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

export default AdUpdate;
