// TODO: Сделать защиту checkout
// import {
//     ActivatedRouteSnapshot,
//     CanActivate,
//     GuardResult,
//     MaybeAsync,
//     Router,
//     RouterStateSnapshot,
// } from "@angular/router";
// import { Injectable } from "@angular/core";
// import { BehaviorSubjectService } from "../services/behavior-subject.service";
//
// @Injectable({
//     providedIn: "root",
// })
// export class CheckoutGuard implements CanActivate {
//     isCheckout: boolean = false;
//
//     constructor(
//         private subjectService: BehaviorSubjectService,
//         private router: Router,
//     ) {
//         this.subjectService.isCheckout$.subscribe((data) => {
//             this.isCheckout = data;
//         });
//     }
//
//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot,
//     ): MaybeAsync<GuardResult> {
//         if (this.isCheckout) {
//             return true;
//         } else {
//             this.router.navigate(["/cart"]);
//             return false;
//         }
//     }
// }
