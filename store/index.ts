import { configureStore } from "@reduxjs/toolkit"
import LocaleSlice from "./slices/LocaleSlice"

export const store = configureStore({ 
    reducer: {
        locale: LocaleSlice
    } 
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>