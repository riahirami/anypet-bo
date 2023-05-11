import { User} from "../../core/models/user.model"

export interface Comments {
    id: number
    description: string
    user_id: number
    ad_id: number
    created_at: string
    updated_at: string
    parent_id: number
    user: User
    reply_comments: ReplyComment[]
  }
  

  
  export interface ReplyComment {
    id: number
    description: string
    user_id: number
    ad_id: number
    created_at: string
    updated_at: string
    parent_id: number
    user: User
  }
  

  