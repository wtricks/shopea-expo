import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";

import { TextWithoutLocale } from "~/components/Text";
import IconButton from "~/components/IconButton";

import { IconName } from "~/assets/icons/info";
import { Colors } from "~/constants/Theme";
import { rem } from "~/utils/metric";
import { StyleSheet } from "react-native";
import { useCallback } from "react";

type TabType = {
    name: string,
    label: string,
    icon: {
        default: IconName,
        selected: IconName
    }
}

const TabData: TabType[] = [
    {
        name: 'index',
        label: 'Home',
        icon: {
            default: 'home',
            selected: 'homeSolid'
        }
    },
    {
        name: 'search',
        label: 'Search',
        icon: {
            default: 'search',
            selected: 'searchSolid'
        }
    },
    {
        name: 'cart',
        label: 'Cart',
        icon: {
            default: 'cart',
            selected: 'cartSolid'
        }
    },
    {
        name: 'offer',
        label: 'Offer',
        icon: {
            default: 'offer',
            selected: 'offerSolid'
        }
    },
    {
        name: 'account',
        label: 'Account',
        icon: {
            default: 'user',
            selected: 'userSolid'
        }
    }
]

export default function TabsLayout() {
    const dummyFn = useCallback(() => { }, [])

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.primary,
                    headerShown: false,
                    tabBarLabel({ focused, children }) {
                        return (
                            <TextWithoutLocale
                                type={focused ? "captionBoldXs" : "captionRegularXs"}
                                color={focused ? "primary" : "grey"}
                                value={children}
                            />
                        )
                    },
                    tabBarStyle: styles.tabBarStyle,
                    tabBarHideOnKeyboard: true
                }}>

                {TabData.map(({ name, label, icon }) => (
                    <Tabs.Screen
                        key={name}
                        name={name}
                        options={{
                            title: label,
                            tabBarIcon: ({ focused }) => (
                                <IconButton
                                    size={30}
                                    icon={focused ? icon.selected : icon.default}
                                    color={focused ? 'primary' : 'grey'}
                                    onPress={dummyFn}
                                    tochable="all"
                                />
                            )
                        }}
                    />
                ))}
            </Tabs>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: rem(55),
        backgroundColor: Colors.white,
        borderTopWidth: 0
    }
})