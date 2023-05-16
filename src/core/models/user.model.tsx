export interface User {
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
  }