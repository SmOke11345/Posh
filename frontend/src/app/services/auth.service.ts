import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User";
import { Url } from "../models/enums/RequestUrls";
import { catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
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
                if (rememberMe) {
                    // TODO: Сохранить данные в cookies (30 дней) и localStorage.
                    // this.setCookie(response); // Устанавливает токен в cookies
                    this.router.navigate(["/profile"]);
                } else {
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

        return this.http.post<User>(`${Url.LOGIN}`, data).pipe(
            catchError((error) => throwError(error)),
            tap(() => {
                if (rememberMe) {
                    // TODO: Сохранить данные в cookies (30 дней) и localStorage.
                    // this.setCookie(response); // Устанавливает токен в cookies
                } else {
                    // TODO: сохранить данные пользователя в SessionStorage. А access_token в cookies session.
                    this.router.navigate(["/profile"]);
                }
            }),
        );
    }
}
