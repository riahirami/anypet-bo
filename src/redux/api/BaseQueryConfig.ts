import { CONFIG } from "../../config";

export const baseQueryConfig = {
    baseUrl: CONFIG.BASE_URL_API,
    prepareHeaders: (headers:any, { getState }: any) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
      return headers.set("authorization", "");
    },
  }