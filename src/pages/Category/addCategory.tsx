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
import { CustomTextField, StyledButton } from "./category.style";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const categorySchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters")
    .max(20, "Title must be at most 255 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(12, "description must be at least 12 characters"),
});
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
  const navigate = useNavigate();

  function handleChangeForm(formikProps: any) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formikProps.setFieldValue(name, value);
    };
  }

  const handleAddcategory = async (values: any, { setSubmitting }: any) => {
    await addCategory(values).unwrap()
    .then(() => {
      setShowModal(true);
    
    })
    .then(() => {
      return new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds
    })
    .then(() => {
      navigate("/categories");
    });
  };

  return (
    <div>
      <Typography align="left">Add category</Typography>

      {isLoading && <Spinner />}

      {showModal && (
        <CustomModal title="Add" description="category added succeffully" />
      )}
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={categorySchema}
        onSubmit={handleAddcategory}
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
              helperText={formikProps.touched.title && formikProps.errors.title}
              error={formikProps.touched.title && !!formikProps.errors.title}
              onChange={handleChangeForm(formikProps)}
            />
            <br />
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
            <br />
            <div style={{ display: "flex", justifyContent: "left" }}>
              <StyledButton
                size="large"
                variant="contained"
                type="submit"
                disabled={formikProps.isSubmitting}
              >
                save
              </StyledButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
