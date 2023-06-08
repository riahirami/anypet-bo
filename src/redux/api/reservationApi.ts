import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "core/constant/endpoints";
import dayjs, { Dayjs } from "dayjs";
import { ResponseData,Reservation,
    RequestResponse,
    BodyResponseOnReservation,
    BodyCreateReservation } from "core/models/reservations.model";


export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery: fetchBaseQuery(baseQueryConfig),
    tagTypes: ["Reservation"],
    endpoints: (builder) => ({
        getMyReservations: builder.query<ResponseData<Reservation>, void>({
            query: () => endpoints.GETMYRESERVATION,
            providesTags: ["Reservation"],
        }),
        getAdReservationsById: builder.query<ResponseData<Reservation>, number | string | undefined>({
            query: (adId) => `${endpoints.GETADRESERVATIONS}/${adId}`,
            providesTags: ["Reservation"],
        }),
        responseOnReservations: builder.mutation<RequestResponse, BodyResponseOnReservation>({
            query: (body) => ({
                url: `${endpoints.RESPONSERESERVATIONS}/${body.id}`,
                method: 'put',
                body: {status: body.status}
            }),
            invalidatesTags: ["Reservation"],
        }),
        createReservations: builder.mutation<RequestResponse, BodyCreateReservation>({
            query: (body) => ({
                url: endpoints.CREATERESERVATION,
                method: 'post',
                body: body
            }),
            invalidatesTags: ["Reservation"],
        }),
    }),
});

export const { useGetMyReservationsQuery,
    useCreateReservationsMutation,
    useGetAdReservationsByIdQuery,
    useResponseOnReservationsMutation
} = reservationApi;
