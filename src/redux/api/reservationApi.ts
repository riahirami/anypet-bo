import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryConfig } from "./BaseQueryConfig";
import { endpoints } from "core/constant/endpoints";
import { User } from "core/models/user.model";
import { Ad } from "core/models/ad.model";
import dayjs, { Dayjs } from "dayjs";

interface Reservation {
    id: number;
    ad_id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    status: number;
    confirmed_at: string;
    created_at: string;
    updated_at: string;
    advertisement: Ad;
    receiver?: User;
    sender?:User;
    reservation_date:string ;

}

interface ResponseData<T> {
    data: {
        send: T[];
        received: T[];
    }
}

interface BodyResponseOnReservation {
    id: number | string;
    status: number;
}

interface RequestResponse {

    id: number;
    ad_id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    reservation_date:string ;
    status: number;
    confirmed_at: string;
    created_at: string;
    updated_at: string;
    receiver: User;
    advertisement?: Ad;
    sender?:User
}

interface BodyCreateReservation {
    receiver_id: number | undefined;
    ad_id: number | undefined;
    message?: string;
    reservation_date:string ;
}
export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery: fetchBaseQuery(baseQueryConfig),
    tagTypes: ["Reservation"],
    endpoints: (builder) => ({
        getMyReservations: builder.query<ResponseData<Reservation>, void>({
            query: () => endpoints.GETMYRESERVATION,
            providesTags: ["Reservation"],
        }),
        getAdReservationsById: builder.query<ResponseData<Reservation>, number | string>({
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
