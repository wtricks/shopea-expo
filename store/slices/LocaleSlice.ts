import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Locale } from "~/constants/locale";
import { RootState } from "..";

export type Language = typeof Locale[keyof typeof Locale];
export type LanguageNames = keyof typeof Locale;

const initialState: { locale: LanguageNames, data: Language } = {
    locale: "en",
    data: Locale.en
}

export const LocaleSlice = createSlice({
    name: "locale",
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<LanguageNames>) => {
            state.locale = action.payload;
            state.data = Locale[action.payload];
        }
    }
});

export const getLanguage = (state: RootState) => {
    return state.locale;
}

export const { setLocale } = LocaleSlice.actions;
export default LocaleSlice.reducer;