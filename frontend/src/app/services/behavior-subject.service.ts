import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class BehaviorSubjectService {
    // Сохраняю в localStorage, потому что после перезагрузки значение сбрасываться.
    // TODO: localStorage not defined.
    private initRememberMe: boolean = JSON.parse(
        localStorage.getItem("rememberMe") as string,
    );
    private rememberMe = new BehaviorSubject<boolean>(this.initRememberMe);
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
