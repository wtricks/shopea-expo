import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, PressableProps, TextProps, ViewStyle } from "react-native";
import { Shadow } from 'react-native-shadow-2'

import Text, { TextWithoutLocale } from "~/components/Text";
import { Colors } from "~/constants/Theme";
import { rem } from "~/utils/metric";

interface Props extends PressableProps {
    variant?: 'primary' | 'secondary' | 'tertiary';
    onPress: (e: GestureResponderEvent) => void;
    noLocale?: boolean;
    value: string;
    textProps?: TextProps,
    children?: React.ReactNode,
    style?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>
}

export default function Button({
    onPress,
    variant,
    style,
    noLocale,
    value,
    textProps,
    children,
    containerStyle,
    ...rest
}: Props) {
    const color = variant == 'primary' ? 'white' : variant == 'secondary' ? 'grey' : 'primary';

    return (
        <Shadow
            disabled={variant != 'primary'}
            containerStyle={[styles.containerStyle, containerStyle]} 
            style={styles.containerStyle}
            distance={6} 
            startColor={Colors.light} 
            offset={[1, 2]}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => ([{
                    ...styles.container,
                    ...styles[variant || 'primary'],
                    opacity: pressed ? variant == 'secondary' ? 0.6 : 0.8 : 1,
                    borderColor: variant == 'secondary' ? Colors.border : 'transparent'
                }, style])}
                {...rest}
            >
                {children}
                {
                    noLocale
                        ? <TextWithoutLocale value={value} type="h5" color={color} {...(textProps || {})} />
                        : <Text color={color} value={value} type="h5" {...(textProps || {})} />
                }
            </Pressable>
        </Shadow>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: rem(16),
        paddingHorizontal: rem(18),
        borderRadius: rem(8),
        borderWidth: 1,
        position: 'relative',
        width: '100%'
    },

    containerStyle: {
        width: '100%'
    },

    primary: {
        backgroundColor: Colors.primary
    },
    secondary: {
        backgroundColor: Colors.white
    },
    tertiary: {
        backgroundColor: Colors.light
    }
})