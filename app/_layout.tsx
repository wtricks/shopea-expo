import { Stack, router } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import {
    SafeAreaProvider,
    initialWindowMetrics,
} from "react-native-safe-area-context";
import {
    hideAsync,
    preventAutoHideAsync
} from "expo-splash-screen";

import { store } from "~/store";
import { FontFamily } from "~/constants/Theme";

preventAutoHideAsync();

export default function App() {
    const [fontsLoaded, error] = useFonts(FontFamily);

    const onReady = useCallback(async () => {
        if (fontsLoaded && !error) {
            await hideAsync();

            router.push('(auth)/signin')
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded || error) {
        hideAsync();
        return null;
    }

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onReady}>
            <Provider store={store}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </Provider>
        </SafeAreaProvider>
    )
}
