import { StyleProp, TouchableOpacity, ViewProps } from "react-native";
import { Link as RouterLink } from "expo-router";

import { TextWithoutLocale as RNText, Props as TextWithoutLocaleProps } from "~/components/Text";
import { rem } from "~/utils/metric";

interface Props extends Partial<TextWithoutLocaleProps> {
    containerStyle?: StyleProp<ViewProps>,
    value: string,
    href: string
}

export default function Link({ href, containerStyle, ...props }: Props) {
    return (
        <RouterLink href={href}asChild style={[{ marginHorizontal: rem(4) }, containerStyle]}>
            <TouchableOpacity activeOpacity={0.7}>
                <RNText color="primary" type="bodyBoldSm" {...props} />
            </TouchableOpacity>
        </RouterLink>
    )
}