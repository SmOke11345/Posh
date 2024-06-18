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
import { BehaviorSubjectService } from "../services/behavior-subject.service";

@Injectable({
    providedIn: "root",
})
export class CheckoutGuard implements CanActivate, CanActivateChild {
    constructor(
        private subjectService: BehaviorSubjectService,
        private router: Router,
    ) {}

    canActivate(
        _next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot,
    ): MaybeAsync<GuardResult> {
        const dataCheckout = this.subjectService.getCheckout();
        if (dataCheckout.length > 0) {
            return true;
        } else {
            return this.router.navigate(["/cart"]);
        }
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): MaybeAsync<GuardResult> {
        return this.canActivate(childRoute, state);
    }
}
