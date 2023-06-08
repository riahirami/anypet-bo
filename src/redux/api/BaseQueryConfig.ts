import { type } from "os";
import { CONFIG } from "../../config";
import { adsApi } from "./adsApi";
import { endpoints } from "../../core/constant/endpoints";
import { getToken } from "core/utils/functionHelpers";

export const baseQueryConfig = {
    baseUrl: CONFIG.BASE_URL_API,
    prepareHeaders: (headers:any, { getState }: any) => {
      // const token = getState().auth.token;
      const user = localStorage.getItem("user");
      
      // const parsedUser = user ? JSON.parse(user) : null; 
      const token = getToken();
    
   
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
      return headers.set("Authorization", "");
    },
    
  }