import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authApi} from "../redux/api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query/react" ;
import authReducer from "../redux/slices/authSlice" ; 
import categoryReducer from "../redux/slices/categorySlice" ; 
import { categoryApi } from './api/categoryApi';
import {adsApi} from './api/adsApi';
import {userApi} from './api/userApi';
import {commentApi} from './api/commentsApi';


export const store = configureStore({
    reducer: {
        auth:authReducer,
        category:categoryReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer, 
        [adsApi.reducerPath]: adsApi.reducer, 
        [userApi.reducerPath]: userApi.reducer, 
        [commentApi.reducerPath]: commentApi.reducer, 
    },
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
        .concat(categoryApi.middleware) 
        .concat(userApi.middleware)
        .concat(commentApi.middleware)
        .concat(adsApi.middleware), 

        
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);