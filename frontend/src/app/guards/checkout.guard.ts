// TODO: Сделать защиту для checkout.
// import {
//     ActivatedRouteSnapshot,
//     CanActivate,
//     GuardResult,
//     MaybeAsync,
//     Router,
//     RouterStateSnapshot,
// } from "@angular/router";
// import { Injectable, OnInit } from "@angular/core";
// import { BehaviorSubjectService } from "../services/behavior-subject.service";
//
// @Injectable({
//     providedIn: "root",
// })
// export class CheckoutGuard implements CanActivate, OnInit {
//     constructor(
//         private subjectService: BehaviorSubjectService,
//         private router: Router,
//     ) {}
//
//     ngOnInit() {}
//
//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot,
//     ): MaybeAsync<GuardResult> {
//         if (this.subjectService.buttonGuard.value) {
//             return true;
//         } else {
//             this.router.navigate(["/cart"]);
//             return false;
//         }
//     }
// }
