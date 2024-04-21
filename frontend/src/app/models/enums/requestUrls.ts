// TODO: НЕ ТРОГАТЬ!!!!!!
const host = "https://posh-yo13.onrender.com/api";
// const host = "http://localhost:3000/api";

export enum Url {
    LOGIN = `${host}/auth/login`,
    REGISTER = `${host}/auth/register`,
    PROFILE = `${host}/users/profile`,
    CATALOG = `${host}/catalogs`,
    REVIEW = `${host}/reviews`,
    ORDER = `${host}/orders`,
    CART = `${host}/cart`,
    FAVORITE = `${host}/favorites`,
}
