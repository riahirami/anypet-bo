import { Ad } from "./ad.model";
import { User } from "./user.model";

export interface Reservation {
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

export interface ResponseData<T> {
    data: {
        send: T[];
        received: T[];
    }
}

export interface BodyResponseOnReservation {
    id: number | string;
    status: number;
}

export interface RequestResponse {

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

export interface BodyCreateReservation {
    receiver_id: number | undefined;
    ad_id: number | undefined;
    message?: string;
    reservation_date:string ;
}