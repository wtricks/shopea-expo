import { DimensionValue, Image, ImageStyle } from "react-native";

import ICONS, { type IconName } from "~/assets/icons/info";
import { Colors } from "~/constants/Theme";

export interface Props {
    name: IconName,
    color: keyof typeof Colors,
    size: DimensionValue,
    width?: DimensionValue,
    style?: ImageStyle
}

export default function Icon({ name, style, size, width, color }: Props) {
    return <Image 
        source={ICONS[name]} 
        style={[
            { width: width || size, height: size }, 
            style
        ]} 
        tintColor={Colors[color]}
        resizeMode="cover"
    />
}