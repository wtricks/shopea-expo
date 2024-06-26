import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, TextInput } from 'react-native';
import Input, { Props as RProps } from '~/components/Input';

import { rem } from '~/utils/metric';

interface Props extends Omit<RProps, 'value' | 'onTextChange'> {
    value: string;
    onTextChange: (value: string) => void;
    containerStyle?: StyleProp<ViewStyle>;
    otpLength?: number;
}

export default function OtpInput({ value, onTextChange, containerStyle, otpLength = 6, ...props }: Props) {
    const [state, setState] = useState(Array.from({ length: otpLength }, (index: number) => value[index] || ''));
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleTextChange = (text: string, index: number) => {
        const newState = [...state];
        newState[index] = text;
        setState(newState);

        if (text && index < otpLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        onTextChange(newState.join(''));
    };

    const handleKeyPress = ({ nativeEvent: { key } }: { nativeEvent: { key: string } }, index: number) => {
        if (key === 'Backspace' && !state[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {state.map((_, index) => (
                <Input
                    key={index}
                    ref={(ref: TextInput | null) => (inputRefs.current[index] = ref)}
                    value={state[index]}
                    onTextChange={(text) => handleTextChange(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    containerStyle={styles.input}
                    contentStyle={styles.input}
                    style={styles.input}
                    maxLength={1}
                    keyboardType='numeric'
                    {...props}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: rem(8),
        overflow: 'hidden',
        maxWidth: 380,
    },
    input: {
        width: rem(50),
        textAlign: 'center',
    },
});
