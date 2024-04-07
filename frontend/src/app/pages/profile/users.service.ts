import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/User";
import { Url } from "../../models/enums/requestUrls";
import { catchError, tap, throwError } from "rxjs";
import { StoreDataUserService } from "../../services/storeDataUser.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UsersService {
    constructor(
        private http: HttpClient,
        private storeData: StoreDataUserService,
        private router: Router,
    ) {}

    /**
     * Изменение данных пользователя.
     * @param user - данные пользователя.
     */
    patchUser(user: User) {
        return this.http.patch<User>(`${Url.PROFILE}`, user).pipe(
            catchError((error) => throwError(error)),
            tap((data) => {
                const { password, ...rest } = data;
                this.storeData.setUserData(rest);
            }),
        );
    }
}
