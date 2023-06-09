import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../core/constant/endpoints";
import { baseQueryConfig } from "./BaseQueryConfig";
import { Partner, PartnerData } from "core/models/partner.model";

export const partnerApi = createApi({
    reducerPath: "partnerApi",
    baseQuery: fetchBaseQuery(baseQueryConfig),
    tagTypes: ["Partner"],
    endpoints: (builder) => ({
        getPartners: builder.query<PartnerData, void>({
            query: () => endpoints.PARTNERS,
            providesTags: ["Partner"],
        }),
        addPartner: builder.mutation({
            query: ({ name, description, address, link, contact, logo, media }) => {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("address", address);
                formData.append("link", link);
                formData.append("contact", contact);
                    formData.append("logo", logo);
                for (let i = 0; i < media.length; i++) {
                    formData.append("media[]", media[i]);
                }
                return {
                    url: endpoints.ADDPARTNERS,
                    method: "post",
                    body: formData,
                };
            },
            invalidatesTags: ["Partner"],
        }),
        updatePartner: builder.mutation({
            query: ({ name, description, address, link, contact, media }) => {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("description", description);
                formData.append("address", address);
                formData.append("link", link);
                formData.append("contact", contact);
                for (let i = 0; i < media.length; i++) {
                    formData.append("media[]", media[i]);
                }
                return {
                    url: endpoints.PARTNERS,
                    method: "put",
                    body: formData,
                };
            },
            invalidatesTags: ["Partner"],
        }),
        deletePartner: builder.mutation({
            query: (id) => {
                return {
                    url: endpoints.PARTNERS + id,
                    method: "delete",
                    body: id,
                };
            },
            invalidatesTags: ["Partner"],
        }),
        getPartnerById: builder.query<Partner, number | string | undefined>({
            query: (id: any) => {
                return {
                    url: endpoints.PARTNERS + `${id}`,
                    method: "get",
                };
            },
            providesTags: ["Partner"],
        }),
    }),
});

export const {
    useAddPartnerMutation, useDeletePartnerMutation, useGetPartnerByIdQuery, useGetPartnersQuery
} = partnerApi;
