import { Ad } from "./ad.model";
import { Comment } from "./Comment.model";

export interface UserDetails {
  data: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    avatar?: string;
    created_at?: string;
    updated_at?: string;
    role_id?: number;
    ads: Ad[];
    comments: Comment[]
  }
}

export interface UsersDetails {
  data: UserDetails[]
}