import {User} from './user.model' ;


export interface RegisterResponse {
  message: string; user?: User; token?: string ;
}