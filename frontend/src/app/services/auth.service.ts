import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginResponse, User } from "../models/User";
import { Url } from "../models/enums/RequestUrls";
import { catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { StoreDataUserService } from "../utils/storeDataUser.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private storeData: StoreDataUserService,
        private http: HttpClient,
        private router: Router,
    ) {}

    /**
     * Регистрация пользователя.
     * @param payload
     */
    register(payload: User & { rememberMe: boolean }) {
        const { rememberMe, ...data } = payload;

        return this.http.post<User>(`${Url.REGISTER}`, data).pipe(
            catchError((error) => throwError(error)),
            tap(() => {
                if (!rememberMe) {
                    this.router.navigate(["/login"]);
                }
            }),
        );
    }

    /**
     * Аутентификация пользователя.
     * @param payload
     */
    login(payload: { email: string; password: string; rememberMe: boolean }) {
        const { rememberMe, ...data } = payload;

        return this.http.post<LoginResponse>(`${Url.LOGIN}`, data).pipe(
            catchError((error) => throwError(error)),
            tap((response) => {
                const { access_token } = response;
                const user_data = response.data.passport.user;

                if (rememberMe) {
                    this.setDataUser({ ...user_data }, access_token);
                } else {
                    this.storeData.setToken("sessionCookie", access_token);
                    this.storeData.setUserData("sessionStorage", user_data);
                    this.router.navigate(["/profile"]);
                }
            }),
        );
    }

    /**
     * Установка данных пользователя в cookies (30 дней) и localStorage.
     * @param payload
     * @param token
     */
    setDataUser(payload: User, token: string) {
        this.storeData.setToken("cookie", token);
        this.storeData.setUserData("localStorage", payload);
        this.router.navigate(["/profile"]);
    }
}
