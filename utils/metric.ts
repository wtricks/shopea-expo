import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const BASE_WIDTH = 375; // iPhone 6/7/8 width

const scale = width / BASE_WIDTH;

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isWeb = Platform.OS === "web";

export const rem = (size: number) => {
    if (isWeb) {
        return size
    }

    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};