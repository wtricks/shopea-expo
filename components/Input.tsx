import { useState } from "react";
import { GestureResponderEvent, TextInput as RNTextInput, StyleProp, StyleSheet, TextInputProps, View, ViewStyle, Pressable, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import { TextWithoutLocale } from "~/components/Text";
import IconButton from "~/components/IconButton";
import Icon from "~/components/Icon";

import { type IconName } from "~/assets/icons/info";
import { BaseStyle, Colors } from "~/constants/Theme";
import { rem } from "~/utils/metric";

import type { Props as IconProps } from '~/components/Icon'
import type { Props as IconButtonProps } from '~/components/IconButton'

export interface Props extends TextInputProps {
    value?: string,
    placeholder?: string,
    label?: string,
    leftIcon?: IconName,
    rightIcon?: IconName,
    onIconPress?: (e: GestureResponderEvent) => void,
    containerStyle?: StyleProp<ViewStyle>,
    onTextChange: (value: string) => void,
    multiline?: boolean,
    leftIconProps?: Partial<IconProps>,
    rightIconProps?: Partial<IconButtonProps>,
    error?: string,
    contentStyle?: StyleProp<ViewStyle>
}

export default function Input({
    value,
    containerStyle,
    contentStyle,
    label,
    onTextChange,
    leftIcon,
    rightIcon,
    onIconPress,
    placeholder,
    style,
    multiline,
    leftIconProps,
    rightIconProps,
    error,
    ...rest
}: Props) {
    const [focus, setFocus] = useState(false);

    const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(true);
        rest.onFocus?.(e);
    }

    const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocus(false);
        rest.onBlur?.(e);
    }

    return (
        <View style={[{ width: '100%' }, containerStyle]}>
            {label && <TextWithoutLocale style={styles.label} value={label} type="h5" color="dark" />}

            <View style={[
                styles.container,
                {
                    borderColor: error ? Colors.error : focus ? Colors.primary : Colors.border,
                    alignItems: multiline ? 'flex-start' : 'center'
                },
                contentStyle
            ]}>
                {value == '' && placeholder && (
                    <TextWithoutLocale
                        value={placeholder}
                        type="bodyRegularMd"
                        style={[styles.placeholder, { left: leftIcon ? rem(36) : rem(14) }]}
                    />
                )}

                {!!leftIcon && (
                    <Icon
                        style={{ marginLeft: rem(8), marginTop: multiline ? rem(5) : 0 }}
                        name={leftIcon}
                        size={rem(22)}
                        color={error ? "error" : focus ? "primary" : "grey"}
                        {...leftIconProps}
                    />
                )}

                <RNTextInput
                    {...rest}
                    value={value}
                    onChangeText={onTextChange}
                    selectionColor={Colors.primary}
                    multiline={multiline}
                    onBlur={onInputBlur}
                    onFocus={onInputFocus}
                    style={[
                        styles.inputStyle,
                        BaseStyle.bodyBoldMd,
                        {
                            paddingLeft: leftIcon ? rem(7) : rem(14),
                            paddingRight: rightIcon ? 0 : rem(14),
                            verticalAlign: multiline ? 'top' : 'middle'
                        },
                        style
                    ]}
                />

                {!!rightIcon && (
                    <IconButton
                        tochable="all"
                        style={{ marginRight: rem(8), marginTop: multiline ? rem(5) : 0 }}
                        icon={rightIcon}
                        onPress={onIconPress!}
                        size={rem(32)}
                        {...rightIconProps}
                    />
                )}
            </View>
            {!!error && <TextWithoutLocale style={styles.errorText} value={error} type="bodyBoldSm" color="error" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: rem(8),
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
    },
    inputStyle: {
        color: Colors.dark,
        paddingVertical: rem(13),
        flex: 1
    },
    placeholder: {
        color: Colors.grey,
        position: 'absolute',
        top: rem(13)
    },
    errorText: {
        marginTop: rem(5),
    },
    label: {
        marginBottom: rem(5),
        marginLeft: rem(5),
    }
});
