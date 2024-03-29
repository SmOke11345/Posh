import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/User";

@Injectable({ providedIn: "root" })
export class StoreDataUserService {
    constructor(private readonly cookieService: CookieService) {}

    /**
     * Установка токена в cookie (30 дней) или в cookie express session.
     * @param name
     * @param token
     */
    setToken(name: "cookie" | "sessionCookie", token: string) {
        name === "cookie"
            ? this.cookieService.set("access_token", token, {
                  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
                  sameSite: "Strict",
              })
            : this.cookieService.set("access_token", token);
    }

    /**
     * Получение токена из cookie.
     */
    getToken() {
        return this.cookieService.get("access_token");
    }

    /**
     * Установка данных пользователя в localStorage или sessionStorage.
     * @param name
     * @param payload
     */
    setUserData(name: "localStorage" | "sessionStorage", payload: User) {
        name === "localStorage"
            ? localStorage.setItem("user_data", JSON.stringify(payload))
            : sessionStorage.setItem("user_data", JSON.stringify(payload));
    }

    /**
     * Получение данных пользователя из localStorage или sessionStorage.
     * @param name
     */
    getUserData(name: "localStorage" | "sessionStorage") {
        return JSON.parse(
            name === "localStorage"
                ? (localStorage.getItem("user_data") as string)
                : (sessionStorage.getItem("user_data") as string),
        );
    }
}
