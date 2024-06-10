// TODO: НЕ ТРОГАТЬ!!!!!!
// const host = "https://posh-ebv2.onrender.com/api";
const host = "http://localhost:3000/api";

export enum Url {
    LOGIN = `${host}/auth/login`,
    REGISTER = `${host}/auth/register`,
    RESTORE = `${host}/auth/reset-password`,
    SUBSCRIBE = `${host}/mail/subscribe`,
    USERS = `${host}/users`,
    CATALOG = `${host}/catalogs`,
    REVIEW = `${host}/reviews`,
    ORDER = `${host}/orders`,
    CART = `${host}/cart`,
    FAVORITE = `${host}/favorites`,
}
