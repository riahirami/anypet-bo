import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Ad,AdData } from "../../core/models/ad.model";
import { RootState } from "../store";
interface MyAdData {
  data: Ad[];
  count: number;
}

interface Ad {
  id?: number | null; // Update the type of the id property
  title: string;
  description: string;
  state: number;
  status: number;
  city: string;
  street: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  user_id: number;
  media: Media[];
  user: User;
}

interface Media {
  id: number;
  file_name: string;
  file_path: string;
  mime_type: string;
  mediable_type: string;
  mediable_id: number;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at: string;
  phone: string;
  address: string;
  avatar: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

const initialState: MyAdData = {
  data: [],
  count: 0,
};

export const adsSlice = createSlice({
  name: "ad",
  initialState,
  reducers: {
    getMyAds: (
      state,
      action: PayloadAction<{ ad: MyAdData | undefined }>
    ) => {
      state.data = action.payload.ad?.data ?? [];
      state.count = action.payload.ad?.count ?? 0;
    },
    
  },
});

export const selectAd = (state: RootState) => state.ad;
export const { getMyAds } = adsSlice.actions;
export default adsSlice.reducer;