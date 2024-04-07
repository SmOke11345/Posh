const host = "http://localhost:3000/api";

export enum Url {
    LOGIN = `${host}/auth/login`,
    REGISTER = `${host}/auth/register`,
    PROFILE = `${host}/users/profile`,
    CATALOG = `${host}/catalog`,
    FAVORITE = `${host}/favorite`,
}