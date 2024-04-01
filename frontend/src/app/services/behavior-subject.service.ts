import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BehaviorSubjectService {
    private rememberMe = new BehaviorSubject<boolean>(false);
    rememberMe$ = this.rememberMe.asObservable(); // Хранит в себе последние значение

    constructor() {}

    /**
     * Устанавливаем значение rememberMe глобально
     * @param value
     */
    setRememberMe(value: boolean) {
        this.rememberMe.next(value);
    }
}
