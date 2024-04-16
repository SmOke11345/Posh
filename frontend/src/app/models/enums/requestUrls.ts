// const host = "https://posh.vercel.app/api";
const host = "https://posh-st51.onrender.com/";

export enum Url {
    LOGIN = `${host}/auth/login`,
    REGISTER = `${host}/auth/register`,
    PROFILE = `${host}/users/profile`,
    CATALOG = `${host}/catalogs`,
    CART = `${host}/cart`,
    FAVORITE = `${host}/favorites`,
}
