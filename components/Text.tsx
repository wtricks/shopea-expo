import { Text as RNText, TextProps } from "react-native";
import { Colors, BaseStyle } from "~/constants/Theme";
import { useLocale } from "~/hooks/useLocale";
import { getDeepProperty } from "~/utils/helper";

export interface Props extends TextProps {
    type: keyof typeof BaseStyle;
    color?: keyof typeof Colors;
    value: string;
}

export default function Text({ value, color, type, style, ...rest }: Props) {
    const locale = useLocale();
    
    return (
        <RNText 
            style={[
                { 
                    color: color ? Colors[color] : Colors.dark, 
                    ...BaseStyle[type] 
                }, 
                style
            ]} 
            {...rest} 
        >{ getDeepProperty(locale, value) }</RNText>
    )
}

export function TextWithoutLocale({ value, color, type, style, ...rest }: Props) {
    return (
        <RNText 
            style={[
                { 
                    color: color ? Colors[color] : Colors.dark, 
                    ...BaseStyle[type] 
                }, 
                style
            ]} 
            {...rest} 
        >{ value }</RNText>
    )
}