import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "../../core/constant/endpoints";
import { Ad, AdData } from "../../core/models/ad.model";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["Ad"],
  endpoints: (builder) => ({
    getAds: builder.query<AdData, number>({
      query: (page) => `${endpoints.Ads}?page=${page}`,
      providesTags: ["Ad"],
    }),
    addAd: builder.mutation({
      query: ({
        title,
        description,
        country,
        state,
        city,
        street,
        postal_code,
        category_id,
      }) => {
        return {
          url: endpoints.Ads,
          method: "post",
          body: {
            title,
            description,
            country,
            state,
            city,
            street,
            postal_code,
            category_id,
          },
        };
      },
    }),
    updateAd: builder.mutation({
      query: ({
        id,
        title,
        description,
        country,
        state,
        city,
        street,
        postal_code,
        category_id,
      }) => ({
        url: `${endpoints.Ads}${id}`,
        method: "PUT",
        body: {
          title,
          description,
          country,
          state,
          city,
          street,
          postal_code,
          category_id,
        },
      }),
    }),
    deleteAd: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.Ads + id,
          method: "delete",
          body: id,
        };
      },
    }),
    getAdById: builder.query({
      query: (id: any) => {
        return {
          url: endpoints.Ads + `${id}`,
          method: "get",
          providesTags: ["Ad"],
        };
      },
    }),
    getAdsByCategory: builder.query({
      query: (id: any) => {
        return {
          url: endpoints.AdsByCategory + `${id}`,
          method: "get",
          providesTags: ["Ad"],
        };
      },
    }),
    getAdsByDate: builder.query({
      query: (date: any) => {
        return {
          url: `${endpoints.AdsByDate}${date}`,
          method: "get",
        };
      },
    }),
  }),
});

export const {
  useGetAdsQuery,
  useDeleteAdMutation,
  useAddAdMutation,
  useGetAdByIdQuery,
  useUpdateAdMutation,
  useGetAdsByCategoryQuery,
  useGetAdsByDateQuery,
} = adsApi;
