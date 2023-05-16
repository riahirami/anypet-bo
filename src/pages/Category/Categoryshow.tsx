import React, { useEffect, useState } from "react";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApi";
import { useParams, Navigator, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import { Category } from "../../core/models/category.model";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";
import { CustomTextField, StyledButton } from "./category.style";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {message} from "../../core/constant/message";

const categorySchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(20, "Title must be at most 20 characters"),
});
const Categoryshow = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetCategoryByIdQuery(id);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const item: Category = {
    title: "",
  };
  const [category, setCategory] = useState(item);

  const [
    updateCategory,
    { data: updateData, isSuccess: succesUpdate, isLoading: loadingUpdate },
  ] = useUpdateCategoryMutation();

  function handleChangeForm(formikProps: any) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      formikProps.setFieldValue(name, value);
    };
  }
  useEffect(() => {
    refetch();
  }, [isLoading, refetch]);

  const handleUpdate = async (values: any) => {
    await updateCategory({
      id,
      title: values.title,
      description: values.description,
    })
      .unwrap()
      .then(() => {
        setShowModal(true);
      })
      .then(() => {
        return new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds
      })
      .then(() => {
        navigate("/categories");
      });
  };

  return (
    <div>
      <Typography align="left">
        Update Category id: {id} | {data?.data?.title}
      </Typography>
      {isLoading && <Spinner />}
      {loadingUpdate && <Spinner />}
      {showModal && (
        <CustomModal
          title="Update"
          description={message.CATEGORYEDITED}
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            title: data?.data?.title,
            description: data?.data?.description,
          }}
          validationSchema={categorySchema}
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
      )}
    </div>
  );
};

export default Categoryshow;
