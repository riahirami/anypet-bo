import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "../../core/constant/endpoints";
import { Ad, AdData } from "../../core/models/ad.model";

function generateQueryParams(obj: { [key: string]: any }): string {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      params.append(key, obj[key]);
    }
  }

  return params.toString();
}
export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery(baseQueryConfig),
  tagTypes: ["Ad"],
  endpoints: (builder) => ({
    getAds: builder.query<
      AdData,
      {
        keyword: string | undefined;
        date: string | undefined;
        page: number;
        perPage: string;
        status: string | undefined;
      }
    >({
      query: (parameters) =>
        endpoints.AdsGlobal + "?" + generateQueryParams(parameters),
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
        media,
      }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("country", country);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("street", street);
        formData.append("postal_code", postal_code);
        formData.append("category_id", category_id);
        for (let i = 0; i < media.length; i++) {
          formData.append("media[]", media[i]);
        }
        return {
          url: endpoints.Ads,
       
          method: "post",
          body: formData,
        };
      },
      invalidatesTags:['Ad']

    }),
    getMediaById: builder.query({
      query: (id: any) => {
        return {
          url: endpoints.ADMEDIA + `${id}`,
          method: "get",
          providesTags: ["Ad"],
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
      invalidatesTags:['Ad']
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
    changeStatusAds: builder.mutation<
      Ad,
      {
        id: string | number | undefined;
        status: string | number | undefined;
      }
    >({
      query: (parameters) => ({
        url: endpoints.changeStatusAds + "?" + generateQueryParams(parameters),
        method: "get",
      }),
    }),

    getAdsStats: builder.query({
      query: (column: any) => {
        return {
          url: endpoints.statsAds + "?column=" + column,
          method: "get",
        };
      },
    }),
    getAdsByStatus: builder.query({
      query: (status: string) => {
        return {
          url: endpoints.AdsByStatus + `${status}`,
          method: "get",
          providesTags: ["Ad"],
        };
      },
    }),
    getCountAdsPerDate: builder.query({
      query: () => {
        return {
          url: endpoints.COUNTADSPERDATE,
          method: "get",
          providesTags: ["Ad"],
        };
      },
    }),
    setFavorite: builder.mutation({
      query: (id) => {
        return {
          url: endpoints.SETASFAVORITE + id,
          method: "post",
          providesTags: ["Ad"],
        };
      },
    }),
    listFavorite: builder.query({
      query: () => {
        return {
          url: endpoints.LISTFAVORITE,
          method: "get",
          providesTags: ["Ad"],
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
  useChangeStatusAdsMutation,
  useGetAdsStatsQuery,
  useGetAdsByStatusQuery,
  useGetCountAdsPerDateQuery,
  useListFavoriteQuery,
  useSetFavoriteMutation,
  useGetMediaByIdQuery
} = adsApi;
