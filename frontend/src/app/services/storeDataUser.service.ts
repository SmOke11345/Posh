import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../models/User";
import { BehaviorSubjectService } from "./behavior-subject.service";

@Injectable({ providedIn: "root" })
export class StoreDataUserService {
    private rememberMe?: boolean;

    constructor(
        private readonly cookieService: CookieService,
        private subject: BehaviorSubjectService,
    ) {
        this.subject.rememberMe$.subscribe(
            (value) => (this.rememberMe = value),
        );
    }

    /**
     * Установка токена в cookie (30 дней) или в cookie express session.
     * @param token
     */
    setToken(token: string) {
        this.rememberMe
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
     * @param payload
     */
    setUserData(payload: Omit<User, "password">) {
        this.rememberMe
            ? localStorage.setItem("user_data", JSON.stringify(payload))
            : sessionStorage.setItem("user_data", JSON.stringify(payload));
    }

    /**
     * Получение данных пользователя из localStorage или sessionStorage.
     * Сначала ищет в localStorage, если нет, то в sessionStorage.
     */
    getUserData() {
        // Для SSR
        if (typeof window !== "undefined") {
            if (localStorage.getItem("user_data") !== null) {
                return JSON.parse(localStorage.getItem("user_data") as string);
            } else {
                return JSON.parse(
                    sessionStorage.getItem("user_data") as string,
                );
            }
        }
    }

    /**
     * Удаление данных пользователя из localStorage и cookie.
     */
    destroyUserData() {
        this.cookieService.delete("access_token");
        localStorage.removeItem("user_data");
        sessionStorage.removeItem("user_data");
    }
}
