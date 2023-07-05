import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPartnerByIdQuery, useUpdatePartnerMutation } from 'redux/api/partnerApi';
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
    StreetFormControl, MediaField,
    CityFormControl,
    StyledButton, CustomTextField,
    TitleTextField
} from './UpdatePartner.style';
import { Grid, Typography } from '@mui/material';

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


const UpdatePartner = () => {
    const { id } = useParams();
    const [updatePartner, { isSuccess: SuccessGetPartner, isLoading: loadingGetPartner }] = useUpdatePartnerMutation();
    const { data: partnerData, isSuccess, isLoading, isFetching } = useGetPartnerByIdQuery(id);

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

    const handleUpdatePartner = async (values: any, { setSubmitting }: any) => {

        await updatePartner({id, logo: logoFile, ...values }).unwrap()
            .then(() => {
                setSubmitting(false);
            })
            .then(() => {
                return new Promise(resolve => setTimeout(resolve, 2000));
            })
            .then(() => {
                navigate("/partner/list");
            });
    };
    return (
        <Grid container>
            <Typography align="left">Update partner</Typography>
            <Grid item md={8} style={{ paddingTop: "50px", margin: "auto" }}>
                <Formik
                    initialValues={{
                        name: partnerData?.data?.name,
                        description: partnerData?.data?.description,
                        address: partnerData?.data?.address,
                        contact: partnerData?.data?.contact,
                        link: partnerData?.data?.link,
                        logo: "",
                        media: [],
                    }}
                    validationSchema={partnerSchema}
                    onSubmit={handleUpdatePartner}
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
    )
}

export default UpdatePartner