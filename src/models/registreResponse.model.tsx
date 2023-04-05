import {User} from '../models/user.model' ;


export interface RegisterResponse {
  message: string; user?: User; token?: string ;
}