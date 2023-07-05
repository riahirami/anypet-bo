import { Media } from "components/Card/AdsCard.type"


export interface Partner {

  id?: string | undefined
  name: string
  description: string
  address: string
  link: string
  logo?: string
  contact: string
  created_at?: string
  updated_at?: string
  media?: Media[]

}


export interface PartnerData {
 data:{
  current_page: number;
  data: Partner[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
 }
}