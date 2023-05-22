export interface Comment {
    id: string;
    description: string;
    user_id: string;
    ad_id: string;
    parent_id: string;
    created_at?: string;
    updated_at?: string;
    role_id?: number;
  }