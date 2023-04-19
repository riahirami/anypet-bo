import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "../../core/constant/endpoints";
import { Ad } from "../../core/models/ad.model";
interface AdData {
  current_page: number;
  data: Ad[]; // Remplacer `any` avec le type spécifique de vos données.
  first_page_url: string;
  from: number;
  last_page: number;
  // Ajouter d'autres propriétés si nécessaire.
}
export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["Ad"],
  endpoints: (builder) => ({
    getAds: builder.query<AdData, void>({
      query: () => endpoints.Ads,
      providesTags: ["Ad"]

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
        method: 'PUT',
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
          providesTags: ["Ad"]

        };    
      },
    }),
    getAdsByCategory: builder.query({
      query: (id: any) => {
        return {
          url: endpoints.AdsByCategory + `${id}`,
          method: "get",
          providesTags: ["Ad"]

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
  useGetAdsByCategoryQuery
} = adsApi;
