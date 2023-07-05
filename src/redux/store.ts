import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authApi} from "../redux/api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query/react" ;
import authReducer from "../redux/slices/authSlice" ; 
import categoryReducer from "../redux/slices/categorySlice" ; 
import adsReducer from "../redux/slices/adsSlice" ; 
import { categoryApi } from './api/categoryApi';
import {adsApi} from './api/adsApi';
import {userApi} from './api/userApi';
import {commentApi} from './api/commentsApi';
import { reservationApi } from './api/reservationApi';
import { partnerApi } from './api/partnerApi';


export const store = configureStore({
    reducer: {
        auth:authReducer,
        category:categoryReducer,
        ad:adsReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer, 
        [adsApi.reducerPath]: adsApi.reducer, 
        [userApi.reducerPath]: userApi.reducer, 
        [commentApi.reducerPath]: commentApi.reducer, 
        [reservationApi.reducerPath]: reservationApi.reducer, 
        [partnerApi.reducerPath]: partnerApi.reducer, 
    },
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
        .concat(categoryApi.middleware) 
        .concat(userApi.middleware)
        .concat(commentApi.middleware)
        .concat(adsApi.middleware) 
        .concat(reservationApi.middleware)
        .concat(partnerApi.middleware), 

        
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);