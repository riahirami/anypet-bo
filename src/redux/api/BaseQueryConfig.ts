import { CONFIG } from "../../config";

export const baseQueryConfig = {
    baseUrl: CONFIG.BASE_URL_API,
    prepareHeaders: (headers:any, { getState }: any) => {
      // const token = getState().auth.token;
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null; // parse the string to a JSON object or set it to null if it's null
      const token = parsedUser?.token || "";

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
      return headers.set("Authorization", "");
    },
    
  }