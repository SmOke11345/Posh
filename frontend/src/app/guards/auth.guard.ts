import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    GuardResult,
    MaybeAsync,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { StoreDataUserService } from "../utils/storeDataUser.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private storeData: StoreDataUserService,
        private router: Router,
    ) {}

    canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
    ): MaybeAsync<GuardResult> {
        //!!this.storeData.getToken()
        return !!this.storeData.getUserData()
            ? true
            : this.router.navigate(["/login"]);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): MaybeAsync<GuardResult> {
        return this.canActivate(childRoute, state);
    }
}
