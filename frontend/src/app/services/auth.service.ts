import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginResponse, User } from "../models/User";
import { Url } from "../models/enums/requestUrls";
import { catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { StoreDataUserService } from "../utils/storeDataUser.service";
import { BehaviorSubjectService } from "./behavior-subject.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        private storeData: StoreDataUserService,
        private subject: BehaviorSubjectService,
        private http: HttpClient,
        private router: Router,
    ) {}

    /**
     * Регистрация пользователя.
     * @param payload
     */
    register(payload: User & { rememberMe: boolean }) {
        const { rememberMe, ...data } = payload;
        this.subject.setRememberMe(rememberMe); // Сохраняем в глобальном хранилище

        return this.http.post<User>(`${Url.REGISTER}`, data).pipe(
            catchError((error) => throwError(error)),
            tap(() => {
                console.log(rememberMe);
                if (rememberMe) {
                    this.login({ ...payload }).subscribe();
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
        this.subject.setRememberMe(rememberMe); // Сохраняем в глобальном хранилище

        return this.http.post<LoginResponse>(`${Url.LOGIN}`, data).pipe(
            catchError((error) => throwError(error)),
            tap((response) => {
                const { access_token } = response;
                const user_data = response.data.passport.user;

                if (rememberMe) {
                    this.setDataUser({ ...user_data }, access_token);
                } else {
                    this.storeData.setToken(access_token);
                    this.storeData.setUserData(user_data);
                }
                this.router.navigate(["/catalog"]);
            }),
        );
    }

    /**
     * Установка данных пользователя в cookies (30 дней) и localStorage.
     * @param payload
     * @param token
     */
    setDataUser(payload: User, token: string) {
        this.storeData.setToken(token);
        this.storeData.setUserData(payload);
    }

    /**
     * Выход пользователя из аккаунта.
     */
    logout() {
        this.storeData.destroyUserData();
        this.subject.setRememberMe(false);
        this.router.navigate(["/login"]);
    }
}
