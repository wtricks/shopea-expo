import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { connect } from "react-redux";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import BaseInput, { Props as RProps } from "~/components/Input";
import { TextWithoutLocale } from "~/components/Text";
import IconButton from "~/components/IconButton";

import { rem } from "~/utils/metric";
import { Colors } from "~/constants/Theme";
import { RootState } from "~/store";

export type Weeks = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

interface Props extends Omit<RProps, 'value' | 'onTextChange'> {
    weekStart?: Weeks,
    value: Date,
    onDateChange: (val: Date) => void,
    hideOutDays?: boolean,
    locale: RootState['locale']['data']['date'],
    holiday?: Weeks
}

const DateInput: React.FC<Props> = ({ weekStart = 'sun', value, onDateChange, hideOutDays = false, locale, holiday }) => {
    const days = useMemo(() => ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'], []);
    const weekStartIndex = useMemo(() => days.findIndex(day => day === weekStart), [days, weekStart]);
    const holidayPosition = useMemo(() => {
        const position = holiday ? days.findIndex(day => day === holiday) - weekStartIndex : 0;
        return position === 7 ? 0 : position === -1 ? 6 : position;
    }, [days, holiday, weekStartIndex]);

    const [state, setState] = useState({
        value: value || new Date(),
        focus: false,
        width: 0,
        weekStart: weekStartIndex,
        holidayPosition: holidayPosition
    });

    // Animation values
    const animatedHeight = useSharedValue(0);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            opacity: opacity.value,
        };
    });

    const onLayout = useCallback(({ nativeEvent: { layout: { width } } }: any) => {
        setState(prev => ({ ...prev, width: width / 7 - 0.29 }));
    }, []);

    const onIconPress = useCallback(() => {
        setState(prev => ({ ...prev, focus: !prev.focus }));
        animatedHeight.value = withTiming(state.focus ? 0 : rem(state.width * 7), { duration: 300 });
        opacity.value = withTiming(state.focus ? 0 : 1, { duration: 300 });
    }, [state.focus]);

    const getPrevYear = useCallback(() => {
        setState(prev => ({
            ...prev,
            value: new Date(prev.value.getFullYear() - 1, prev.value.getMonth(), prev.value.getDate())
        }));
    }, []);

    const getNextYear = useCallback(() => {
        setState(prev => ({
            ...prev,
            value: new Date(prev.value.getFullYear() + 1, prev.value.getMonth(), prev.value.getDate())
        }));
    }, []);

    const getNextMonth = useCallback(() => {
        setState(prev => ({
            ...prev,
            value: new Date(prev.value.getFullYear(), prev.value.getMonth() + 1, prev.value.getDate())
        }));
    }, []);

    const getPrevMonth = useCallback(() => {
        setState(prev => ({
            ...prev,
            value: new Date(prev.value.getFullYear(), prev.value.getMonth() - 1, prev.value.getDate())
        }));
    }, []);

    const renderDays = useCallback(() => {
        type DayType = {
            type: 'current' | 'out' | 'week',
            day: string | number
        };

        const days: DayType[] = [];
        let i = 0, startFrom = state.weekStart,
            daysNames = locale.days;
        while (i < 7) {
            days.push({
                type: 'week',
                day: daysNames[startFrom],
            });

            if (++startFrom === 7) {
                startFrom = 0;
            }

            if (++i === 7) {
                break;
            }
        }

        const firstDayOfMonth = new Date(state.value.getFullYear(), state.value.getMonth(), 1).getDay();
        const totalDaysInMonth = new Date(state.value.getFullYear(), state.value.getMonth() + 1, 0).getDate();
        const totalDaysInLastMonth = new Date(state.value.getFullYear(), state.value.getMonth(), 0).getDate();

        startFrom = (totalDaysInLastMonth - (firstDayOfMonth - state.weekStart)) + 1;
        while (startFrom <= totalDaysInLastMonth) {
            days.push({
                type: 'out',
                day: startFrom
            });

            if (++startFrom > totalDaysInLastMonth) {
                break;
            }
        }

        startFrom = 1;
        while (startFrom <= totalDaysInMonth) {
            days.push({
                type: 'current',
                day: startFrom
            });

            if (++startFrom > totalDaysInMonth) {
                break;
            }
        }

        startFrom = 1;
        while (days.length < 42) {
            days.push({
                type: 'out',
                day: startFrom
            });

            if (++startFrom > 42) {
                break;
            }
        }

        if (days.length == 44) {
            days[8] = days.pop() as DayType;
            days[7] = days.pop() as DayType;
        } else if (startFrom === 1) {
            days[7] = days.pop() as DayType;
        }

        return days;
    }, [state.weekStart, state.value, locale.days]);

    const getHeading = useCallback((months: string[]) => {
        const date = state.value;
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }, [state.value]);

    const onDayPress = useCallback((day: number | string, type: string) => {
        if (typeof day === 'string') {
            return;
        }

        const month = state.value.getMonth() + (type === 'current' ? 0 : day < 15 ? 1 : -1);
        const year = state.value.getFullYear();

        onDateChange(new Date(year, month, day));
    }, [state.value, onDateChange]);

    const isSelected = useCallback((day: number | string, type: string) => {
        if (typeof day === 'string' || !value) {
            return false;
        }

        const month = state.value.getMonth();
        const year = state.value.getFullYear();

        const monthFromProps = value.getMonth();
        const yearFromProps = value.getFullYear();
        const dayFromProps = value.getDate();

        if (type === 'current') {
            return (
                year === yearFromProps &&
                month === monthFromProps &&
                day === dayFromProps
            );
        }

        return (
            year === yearFromProps &&
            month === monthFromProps + (day > 15 ? 1 : -1) &&
            day === dayFromProps
        );
    }, [state.value, value]);

    const inputValue = useCallback((months: string[]) => {
        const date = value;
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }, [value]);

    const { width } = state;
    const months = locale.months;

    return (
        <>
            <BaseInput
                {...{ value, onDateChange, hideOutDays, locale, holiday }}
                value={value ? inputValue(months) : ''}
                onTextChange={() => { }}
                rightIcon="calendar"
                readOnly={false}
                onIconPress={onIconPress}
                rightIconProps={{ iconSize: 26 }}
            />

            <Animated.View style={[styles.container, animatedStyle]} onLayout={onLayout}>
                {state.focus && (
                    <>
                        <View style={styles.header}>
                            <View style={styles.icons}>
                                <IconButton
                                    icon="doubleArrowLeft"
                                    color="grey"
                                    onPress={getPrevYear}
                                    size={rem(32)}
                                    tochable="all"
                                    style={styles.icon}
                                />
                                <IconButton
                                    icon="arrowLeft"
                                    color="grey"
                                    onPress={getPrevMonth}
                                    size={rem(32)}
                                    iconSize={16}
                                    tochable="all"
                                />
                            </View>
                            <TextWithoutLocale
                                style={styles.headerHeading}
                                value={getHeading(months)}
                                type="h5"
                                color="dark"
                            />
                            <View style={styles.icons}>
                                <IconButton
                                    icon="arrowRight"
                                    color="grey"
                                    onPress={getNextMonth}
                                    size={rem(32)}
                                    iconSize={16}
                                    tochable="all"
                                    style={styles.icon}
                                />
                                <IconButton
                                    icon="doubleArrowRight"
                                    color="grey"
                                    onPress={getNextYear}
                                    size={rem(32)}
                                    tochable="all"
                                />
                            </View>
                        </View>

                        <View style={styles.body}>
                            {renderDays().map(({ day, type }, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => onDayPress(day, type)}
                                    style={({ pressed }) => ([
                                        styles.bodyBox,
                                        {
                                            opacity: pressed ? 0.7 : 1,
                                            width: width,
                                            height: width,
                                            borderLeftWidth: index % 7 === 0 ? 0 : 1,
                                            backgroundColor:
                                                pressed || (type == 'out' && isSelected(day, type))
                                                    ? Colors.light
                                                    : isSelected(day, type)
                                                        ? Colors.primary : undefined
                                        }
                                    ])}>
                                    <TextWithoutLocale
                                        type={index < 7 || (index % 7 === state.weekStart || isSelected(day, type)) ? 'bodyBoldMd' : 'bodyRegularMd'}
                                        value={day as string}
                                        style={{
                                            opacity: type === 'out'
                                                ? hideOutDays
                                                    ? 0 : 0.4 : 1
                                        }}
                                        color={
                                            type === 'current' && isSelected(day, type)
                                                ? 'white' : (index % 7 === state.holidayPosition)
                                                    ? 'error' : 'grey'
                                        }
                                    />
                                </Pressable>
                            ))}
                        </View>
                    </>
                )}
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: rem(8),
        width: '100%',
        marginTop: rem(8),
        overflow: 'hidden', // Ensure child elements are clipped within the animated container
        maxWidth: 380
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: rem(8),
        paddingVertical: rem(8),
    },
    icons: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    icon: {
        marginRight: rem(6),
    },
    headerHeading: {
        textAlign: 'center'
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bodyBox: {
        borderWidth: 1,
        borderColor: Colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0,
        borderBottomWidth: 0
    }
});

export default connect((state: RootState) => ({
    locale: state.locale.data.date
}))(DateInput);
