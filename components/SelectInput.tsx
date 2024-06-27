import { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, Pressable, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import BaseInput, { Props as RProps } from "~/components/Input";
import { TextWithoutLocale } from "~/components/Text";

import { Colors } from "~/constants/Theme";
import { rem } from "~/utils/metric";

interface Props<T> extends Partial<RProps> {
    options: T[],
    onSelected: (value: T) => void,
    listItemRender: (item: T) => string,
    isSelected: (value: T) => boolean,
    selected?: string
}

export default function SelectInput<T>({ options, onSelected, listItemRender, isSelected, selected, ...props }: Props<T>) {
    const [value, setValue] = useState(selected || '')
    const [focus, setFocus] = useState(false)
    const [maxHeight, setMaxHeight] = useState(rem(260))

    const isInitial = useRef(true)

    // Animation values
    const animatedHeight = useSharedValue(0);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            opacity: opacity.value,
        };
    });

    const onTextChange = useCallback(() => {
        // Do nothing
    }, [])

    const onLayout = useCallback(({ nativeEvent: { layout: { height } } }: any) => {
        if (!isInitial.current) {
            return;
        }

        const totalHeight = options.length * height;
        setMaxHeight(totalHeight > rem(260) ? rem(260) : totalHeight);
        isInitial.current = false;
    }, []);

    const onSelectItem = (item: T) => {
        toggleFocus();
        setValue(listItemRender(item));
        onSelected(item);
    }

    const renderItem = ({ item }: { item: T }) => (
        <Pressable
            onLayout={onLayout}
            onPress={() => onSelectItem(item)}
            style={({ pressed }) => [
                styles.listConatinerItem,
                pressed && { opacity: 0.5 }
            ]}
        >
            <TextWithoutLocale
                type={isSelected(item) ? "bodyBoldMd" : "bodyRegularMd"}
                color={isSelected(item) ? 'primary' : 'grey'}
                value={listItemRender(item)}
            />
        </Pressable>
    )

    const toggleFocus = () => {
        setFocus(prev => !prev);
        animatedHeight.value = withTiming(focus ? 0 : maxHeight, { duration: 300 });
        opacity.value = withTiming(focus ? 0 : 1, { duration: 300 });
    };

    return (
        <>
            <BaseInput
                {...props}
                value={value}
                onTextChange={onTextChange}
                rightIcon="arrowDown"
                onIconPress={toggleFocus}
                readOnly={true}
                rightIconProps={{ iconSize: 16 }}
                contentStyle={{ borderColor: props.error ? Colors.error : focus ? Colors.primary : Colors.border }}
            />

            <Animated.View style={[styles.listContainer, animatedStyle]}>
                {focus && (
                    <FlatList
                        data={options}
                        renderItem={renderItem}
                        keyExtractor={listItemRender}
                    />
                )}
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: '100%',
        marginTop: rem(5),
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: rem(8)
    },
    listConatinerItem: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        padding: rem(14),
    }
})
