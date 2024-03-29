import { Injectable } from "@angular/core";
import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { StoreDataUserService } from "../utils/storeDataUser.service";

@Injectable()
export class AuthInterceptorsService implements HttpInterceptor {
    constructor(private storeData: StoreDataUserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.storeData.getToken();

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
