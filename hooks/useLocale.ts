import { useSelector } from 'react-redux'
import { getLanguage } from '~/store/slices/LocaleSlice'

export const useLocale = () => {
    return useSelector(getLanguage).data
}

export const useLocaleName = () => {
    return useSelector(getLanguage).locale
}