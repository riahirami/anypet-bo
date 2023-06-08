import { User } from "./user.model";

export interface Message {
    created_at: string;
    id: number;
    message: string;
    receiver_id: number;
    sender_id: number;
    updated_at: string;
    sender: null | User; 
    receiver: null | User; 
    sender_avatar?:  string; 
    receiver_avatar?: string; 
  }