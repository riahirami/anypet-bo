export interface ResetPasswordRequest {
    email: string|undefined;
    password: string;
    password_confirmation: string;
    token:string,
  }
  
  export interface ResetPasswordResponse {
   data:{  message: string|undefined}
  }