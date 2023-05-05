import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AlertComponent from "../../components/Alert/Alert";

const advertiseSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters")
    .max(20, "Title must be at most 20 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(12, "description must be at least 12 characters"),
  category_id: Yup.string().required(
    "Category is required ! please choose on of the list above"
  ),
  country: Yup.string()
    .required("Country is required")
    .min(4, "Country must be at least 4 characters"),
  state: Yup.string()
    .required("State is required")
    .min(4, "State must be at least 4 characters"),
  city: Yup.string()
    .required("City is required")
    .min(4, "City must be at least 4 characters"),
  street: Yup.string()
    .required("Street is required")
    .min(4, "Street must be at least 4 characters"),
  postal_code: Yup.string()
    .required("Postal code is required")
    .min(4, "Postal code must be at least 4 characters"),
});
const AdUpdate = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess,refetch } = useGetAdByIdQuery(id);
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
    created_at:"",
    updated_at:"",
    status:""
  };
  const [ad, setAd] = useState(item);

  const [updateAd, { data: updatedData, isSuccess: succesUpdate }] =
    useUpdateAdMutation();
  const { data: dataAllCategory } = useGetAllCategoriesQuery(100);
  const navigate = useNavigate();

  // const categories = useSelector(selectCategory);
  const categories = dataAllCategory?.data;

  function handleChangeForm(formikProps: any) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formikProps.setFieldValue(name, value);
    };
  }

  useEffect(() => {
    refetch();
  }, [isLoading, refetch]);

  const handleUpdate = async (values: any, { setSubmitting }: any) => {
    await updateAd({ id, ...values })
      .unwrap()
      .then(() => {
        setShowModal(true);
        setSubmitting(false);
      })
      .then(() => {
        return new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds
      })
      .then(() => {
        navigate("/Advertise");
      });
  };

  return (
    <div>
      {isLoading && <Spinner />}
   
   {succesUpdate && (
        <AlertComponent title="advertise updated succeffully" severity="success" />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            title: data?.data.title,
            description: data?.data.description,
            country: data?.data.country,
            state: data?.data.state,
            city: data?.data.city,
            street: data?.data.street,
            postal_code: data?.data.postal_code,
            category_id: data?.data.category_id,
          }}
          validationSchema={advertiseSchema}
          onSubmit={handleUpdate}
        >
          {(formikProps) => (
            <Form>
              <Field
                id="title"
                name="title"
                label="title"
                color="primary"
                fullWidth
                as={CustomTextField}
                helperText={
                  formikProps.touched.title && formikProps.errors.title
                }
                error={formikProps.touched.title && !!formikProps.errors.title}
                onChange={handleChangeForm(formikProps)}
              />
              <CustomTextField
                select
                name="category_id"
                id="category_id"
                fullWidth
                label="Category"
                onChange={handleChangeForm(formikProps)}
                helperText="Please choose a category of your advertise"
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.title}
                  </MenuItem>
                ))}
              </CustomTextField>
              <Field
                id="description"
                name="description"
                label="description"
                color="primary"
                fullWidth
                multiline
                rows={4}
                as={CustomTextField}
                helperText={
                  formikProps.touched.description &&
                  formikProps.errors.description
                }
                error={
                  formikProps.touched.description &&
                  !!formikProps.errors.description
                }
                onChange={handleChangeForm(formikProps)}
              />

              <Field
                id="country"
                name="country"
                label="country"
                color="primary"
                fullWidth
                as={CustomTextField}
                helperText={
                  formikProps.touched.country && formikProps.errors.country
                }
                error={
                  formikProps.touched.country && !!formikProps.errors.country
                }
                onChange={handleChangeForm(formikProps)}
              />

              <StateFormControl variant="filled">
                <Field
                  id="state"
                  name="state"
                  label="state"
                  color="primary"
                  fullWidth
                  as={CustomTextField}
                  helperText={
                    formikProps.touched.state && formikProps.errors.state
                  }
                  error={
                    formikProps.touched.state && !!formikProps.errors.state
                  }
                  onChange={handleChangeForm(formikProps)}
                />
              </StateFormControl>
              <CityFormControl variant="filled">
                <Field
                  id="city"
                  name="city"
                  label="city"
                  color="primary"
                  fullWidth
                  as={CustomTextField}
                  helperText={
                    formikProps.touched.city && formikProps.errors.city
                  }
                  error={formikProps.touched.city && !!formikProps.errors.city}
                  onChange={handleChangeForm(formikProps)}
                />
              </CityFormControl>
              <StreetFormControl variant="filled">
                <Field
                  id="street"
                  name="street"
                  label="street"
                  color="primary"
                  fullWidth
                  as={CustomTextField}
                  helperText={
                    formikProps.touched.street && formikProps.errors.street
                  }
                  error={
                    formikProps.touched.street && !!formikProps.errors.street
                  }
                  onChange={handleChangeForm(formikProps)}
                />
              </StreetFormControl>
              <PostalFormControl variant="filled">
                <Field
                  id="postal_code"
                  name="postal_code"
                  label="postal_code"
                  color="primary"
                  fullWidth
                  as={CustomTextField}
                  helperText={
                    formikProps.touched.postal_code &&
                    formikProps.errors.postal_code
                  }
                  error={
                    formikProps.touched.postal_code &&
                    !!formikProps.errors.postal_code
                  }
                  onChange={handleChangeForm(formikProps)}
                />
              </PostalFormControl>

              <StyledButton
                size="large"
                variant="contained"
                type="submit"
                disabled={formikProps.isSubmitting}
              >
                save
              </StyledButton>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AdUpdate;
