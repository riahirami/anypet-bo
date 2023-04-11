import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {authApi} from "../redux/api/authApi";
import {setupListeners} from "@reduxjs/toolkit/query/react" ;
import authReducer from "../redux/slices/authSlice" ; 


export const store = configureStore({
    reducer: {
        auth:authReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);