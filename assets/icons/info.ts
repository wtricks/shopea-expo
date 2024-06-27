const ICONS = {
    arrowDown: require("~/assets/icons/arrowDown.png"),
    arrowLeft: require("~/assets/icons/arrowLeft.png"),
    arrowRight: require("~/assets/icons/arrowRight.png"),
    arrowUp: require("~/assets/icons/arrowUp.png"),
    calendar: require("~/assets/icons/calendar.png"),
    doubleArrowDown: require("~/assets/icons/doubleArrowDown.png"),
    doubleArrowLeft: require("~/assets/icons/doubleArrowLeft.png"),
    doubleArrowRight: require("~/assets/icons/doubleArrowRight.png"),
    doubleArrowUp: require("~/assets/icons/doubleArrowUp.png"),
    email: require("~/assets/icons/email.png"),
    user: require("~/assets/icons/user.png"),
    userSolid: require("~/assets/icons/userSolid.png"),
    lock: require("~/assets/icons/lock.png"),
    eyeClose: require("~/assets/icons/eyeClose.png"),
    eyeOpen: require("~/assets/icons/eyeOpen.png"),
    home: require("~/assets/icons/home.png"),
    homeSolid: require("~/assets/icons/homeSolid.png"),
    cart: require("~/assets/icons/cart.png"),
    cartSolid: require("~/assets/icons/cartSolid.png"),
    search: require("~/assets/icons/search.png"),
    searchSolid: require("~/assets/icons/searchSolid.png"),
    offer: require("~/assets/icons/offer.png"),
    offerSolid: require("~/assets/icons/offerSolid.png"),
}

export type IconName = keyof typeof ICONS;

export default ICONS