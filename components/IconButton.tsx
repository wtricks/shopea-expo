import { DimensionValue, GestureResponderEvent, Pressable, ViewStyle } from "react-native";

import { type IconName } from "~/assets/icons/info";
import Icon from '~/components/Icon';
import { Colors } from "~/constants/Theme";
import { rem } from "~/utils/metric";

export interface Props {
    icon: IconName;
    iconSize?: DimensionValue;
    iconWidth?: DimensionValue;
    size: number;
    color?: keyof typeof Colors;
    onPress: (event: GestureResponderEvent) => void;
    style?: ViewStyle,
    tochable?:  'alpha' | 'all'
}

export default function IconButton({ 
    icon, 
    style, 
    size, 
    iconSize, 
    iconWidth, 
    color, 
    onPress, 
    tochable
}: Props) {
    return (
        <Pressable
            style={({ pressed }) => ([
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: (tochable === 'all' && pressed) ? Colors.light : undefined,
                    opacity: (tochable && pressed) ? 0.6 : 1,
                    padding: rem(5),
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                style
            ])}
            onPress={onPress}
        >
            {({ pressed }) => (
                <Icon 
                    name={icon} 
                    size={iconSize || "100%"} 
                    width={iconWidth} 
                    color={(pressed && tochable === 'all') ? 'primary' : color || 'grey'} 
                />
            )}
        </Pressable>
    );
}