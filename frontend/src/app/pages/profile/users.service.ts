import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/User";
import { Url } from "../../models/enums/requestUrls";
import { catchError, tap, throwError } from "rxjs";
import { StoreDataUserService } from "../../services/storeDataUser.service";

@Injectable({ providedIn: "root" })
export class UsersService {
    constructor(
        private http: HttpClient,
        private storeData: StoreDataUserService,
    ) {}

    /**
     * Изменение данных пользователя.
     * @param user - данные пользователя.
     */
    patchUser(user: User) {
        return this.http.patch<User>(`${Url.USERS}/profile`, user).pipe(
            catchError((error) => throwError(error)),
            tap((data) => {
                const { password, ...rest } = data;
                this.storeData.setUserData(rest);
            }),
        );
    }

    /**
     * Изменение пароля пользователя. При восстановлении пароля через почту.
     * @param password - новый пароль пользователя
     */
    patchUserPassword(password: string) {
        return this.http
            .patch<{
                password: string;
            }>(`${Url.USERS}/reset-password`, { password })
            .pipe(catchError((error) => throwError(error)));
    }
}
