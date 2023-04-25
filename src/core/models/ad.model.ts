export interface Ad {
  id?: string | undefined
  title: string
  description: string
  country: string
  state: string
  city: string
  street: string
  postal_code: string
  category_id: string
}


export interface AdData {
  current_page: number;
  data: Ad[];
  first_page_url: string;
  from: number;
  last_page: number;
}