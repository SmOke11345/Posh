import { Injectable } from "@angular/core";
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthInterceptorsService implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.cookieService.get("access_token");

        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(req);
    }
}
