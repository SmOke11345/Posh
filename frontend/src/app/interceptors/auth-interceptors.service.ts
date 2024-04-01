import { Injectable } from "@angular/core";
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { StoreDataUserService } from "../utils/storeDataUser.service";
import { tap } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private storeData: StoreDataUserService) {}

    /**
     * Добавляет в каждый запрос токен.
     * не забывать подключать в app.config.ts :)
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.storeData.getToken();

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    console.log("Intercepted request", event);
                }
            }),
        );
    }
}
