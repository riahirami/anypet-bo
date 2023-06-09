import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../../components/Modal/CustomModal";
import Spinner from "../../components/Spinner/spinner";

import {
    CityFormControl,
    CustomTextField,
    MediaField,
    PostalFormControl,
    StreetFormControl,
    StyledButton,
    TitleTextField,
} from "./AddPartner.style";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { message } from "../../core/constant/message";
import { useAddPartnerMutation } from "redux/api/partnerApi";
import { Partner } from "core/models/partner.model";

const partnerSchema = Yup.object().shape({
    name: Yup.string()
        .required("name is required")
        .min(3, "name must be at least 3 characters")
        .max(20, "name must be at most 20 characters"),
    description: Yup.string()
        .required("Description is required")
        .min(6, "description must be at least 6 characters"),
    address: Yup.string().required("Description is required")
        .min(6, "description must be at least 6 characters"),
    contact: Yup.string()
        .required("contact is required")
        .min(1, "contact must be at least 8 characters"),
    link: Yup.string()
        .required("link is required")
});
const AddPartner = () => {
    const [showModal, setShowModal] = useState(false);
    const [mediaValue, setMediaValue] = useState<File | null>(null);
    const item: Partner["data"] = {
        name: "",
        description: "",
        address: "",
        contact: "",
        link: "",
        logo: "",
        media: [],
    };


    const [addPartner, { data, isSuccess, isLoading, isError }] =
        useAddPartnerMutation();

    const navigate = useNavigate();

    function handleChangeForm(formikProps: any) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = event.target;
            if (files) {
                formikProps.setFieldValue(name, Array.from(files));
            } else {
                formikProps.setFieldValue(name, value);
            }
        };
    }
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleChangeFormlogo = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const imgFile = event?.target?.files?.[0];
        if (imgFile) {
          setLogoFile(imgFile);
        }
      };


    const handleAddPartner = async (values: any, { setSubmitting }: any) => {

        await addPartner({ ...values,logo:logoFile }).unwrap()
            .then(() => {
                setShowModal(true);
                setSubmitting(false);
            })
            .then(() => {
                return new Promise(resolve => setTimeout(resolve, 2000));
            })
            .then(() => {
                navigate("/partner/list");
            });
    };


    if (isLoading) return (

        <Spinner />
    )

    return (
        <Grid container>
            <Typography align="left">Add partner</Typography>


            {showModal && (
                <CustomModal title="partner" description={message.ADVERRTISESADDED} />
            )}

            <Grid item md={8} style={{ paddingTop: "50px", margin: "auto" }}>
                <Formik
                    initialValues={{
                        name: "",
                        description: "",
                        address: "",
                        contact: "",
                        link: "",
                        logo: "",
                        media: [],
                    }}
                    validationSchema={partnerSchema}
                    onSubmit={handleAddPartner}
                >
                    {(formikProps) => (
                        <Form>
                            <Field
                                id="name"
                                name="name"
                                label="name"
                                color="primary"
                                as={TitleTextField}
                                helperText={formikProps.touched.name && formikProps.errors.name}
                                error={formikProps.touched.name && !!formikProps.errors.name}
                                onChange={handleChangeForm(formikProps)}
                            />
                            <MediaField
                                label="media"
                                name="media"
                                id="media"
                                color="primary"
                                type="file"
                                inputProps={{ multiple: true }}
                                onChange={handleChangeForm(formikProps)}
                            />
                            <MediaField
                                id="logo"
                                name="logo"
                                label="logo"
                                color="primary"
                                fullWidth
                                type="file"
                                onChange={handleChangeFormlogo}
                            />
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
                                id="link"
                                name="link"
                                label="link"
                                color="primary"
                                fullWidth
                                as={CustomTextField}
                                helperText={
                                    formikProps.touched.link &&
                                    formikProps.errors.link
                                }
                                error={
                                    formikProps.touched.link &&
                                    !!formikProps.errors.link
                                }
                                onChange={handleChangeForm(formikProps)}
                            />

                            <CityFormControl variant="filled">
                                <Field

                                    id="address"
                                    name="address"
                                    label="address"
                                    color="primary"
                                    fullWidth
                                    as={CustomTextField}
                                    helperText={
                                        formikProps.touched.address && formikProps.errors.address
                                    }
                                    error={formikProps.touched.address && !!formikProps.errors.address}
                                />
                            </CityFormControl>
                            <StreetFormControl variant="filled">
                                <Field
                                    id="contact"
                                    name="contact"
                                    label="contact"
                                    color="primary"
                                    fullWidth
                                    as={CustomTextField}
                                    helperText={
                                        formikProps.touched.contact && formikProps.errors.contact
                                    }
                                    error={
                                        formikProps.touched.contact && !!formikProps.errors.contact
                                    }
                                    onChange={handleChangeForm(formikProps)}
                                />
                            </StreetFormControl>

                            <br />
                            <br />
                            <br />
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
            </Grid>

        </Grid>
    );
};

export default AddPartner;
