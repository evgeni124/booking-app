import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./user/auth.slice";
import { placeApi } from "./place/api/api.place";
import { placeReducer } from "./place/place.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        place: placeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch