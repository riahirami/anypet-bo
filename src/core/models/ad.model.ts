import { User } from "./user.model"

export interface Ad {
  id?: string | undefined
  title: string
  description: string
  state: string
  city: string
  street: string
  postal_code: string
  category_id: string
  created_at?:string
  updated_at?:string
  status?:string
  media?: string[]
  user_id:string
  user:User
}



export interface AdData {
  current_page: number;
  data: Ad[]; 
  first_page_url: string;
  from: number;
  last_page: number;
}