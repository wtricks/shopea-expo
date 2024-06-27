import { StyleSheet } from "react-native";
import { rem } from "~/utils/metric";

export const primaryColor = "#FB7181"; // "#5C61F4" | "#40BFFF" | "#FB7181" | "#FFC833" | "#53D1B6";

// Theme colors
export const Colors = {
    primary: primaryColor,

    dark: "#223263",
    grey: "#9098B1",
    light: `${primaryColor}1A`,
    border: "#E6E6E6",

    white: "#FFFFFF",
    error: "#FB7181",
    shadow: `${primaryColor}3B`,
};

// Fonts import
export const FontFamily = {
    Bold: require("~/assets/fonts/Poppins-Bold.ttf"),
    Regular: require("~/assets/fonts/Poppins-Regular.ttf"),
};

// Base Style
export const BaseStyle = StyleSheet.create({
    h1: {
        fontFamily: "Bold",
        fontSize: rem(32),
        lineHeight: rem(32 * 1.5),
    },
    h2: {
        fontFamily: "Bold",
        fontSize: rem(24),
        lineHeight: rem(24 * 1.5),
    },
    h3: {
        fontFamily: "Bold",
        fontSize: rem(20),
        lineHeight: rem(20 * 1.5),
    },
    h4: {
        fontFamily: "Bold",
        fontSize: rem(16),
        lineHeight: rem(16 * 1.5),
    },
    h5: {
        fontFamily: "Bold",
        fontSize: rem(14),
        lineHeight: rem(14 * 1.5),
    },
    h6: {
        fontFamily: "Bold",
        fontSize: rem(10),
        lineHeight: rem(10 * 1.5),
    },

    bodyBoldLg: {
        fontFamily: "Bold",
        fontSize: rem(16),
        lineHeight: rem(16 * 1.8),
    },
    bodyRegularLg: {
        fontFamily: "Regular",
        fontSize: rem(16),
        lineHeight: rem(16 * 1.8),
    },
    bodyBoldMd: {
        fontFamily: "Bold",
        fontSize: rem(14),
        lineHeight: rem(14 * 1.8),
    },
    bodyRegularMd: {
        fontFamily: "Regular",
        fontSize: rem(14),
        lineHeight: rem(14 * 1.8),
    },
    bodyBoldSm: {
        fontFamily: "Bold",
        fontSize: rem(12),
        lineHeight: rem(12 * 1.8),
    },
    bodyRegularSm: {
        fontFamily: "Regular",
        fontSize: rem(12),
        lineHeight: rem(12 * 1.8),
    },

    captionBoldSm: {
        fontFamily: "Bold",
        fontSize: rem(12),
        lineHeight: rem(12 * 1.5),
    },
    captionRegularSm: {
        fontFamily: "Regular",
        fontSize: rem(12),
        lineHeight: rem(12 * 1.5),
    },
    captionBoldXs: {
        fontFamily: "Bold",
        fontSize: rem(10),
        lineHeight: rem(10 * 1.5),
    },
    captionRegularXs: {
        fontFamily: "Regular",
        fontSize: rem(10),
        lineHeight: rem(10 * 1.5),
    }
});

// App assets
export const Assets = {
    logo: require("~/assets/images/logo.png"),
    googleImage: require("~/assets/images/google.png"),
    facebookImage: require("~/assets/images/facebook.png"),
};
