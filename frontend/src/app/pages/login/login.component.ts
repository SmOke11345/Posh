import { Component, NgModule } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgClass, NgIf, NgStyle } from "@angular/common";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent {
    showPassword: boolean;
    loginForm: FormGroup;

    typeInputPassword: string = "password";

    constructor() {
        this.loginForm = new FormGroup({
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(8),
            ]),
            rememberMe: new FormControl(false),
        });

        this.showPassword = false;
    }

    /**
     * Авторизация пользователя
     */
    onSubmit(event: Event) {
        event.preventDefault();
        // Устанавливать значение checkbox в form group при помощи setValue
        if (this.loginForm.invalid) {
            return;
        }
    }

    /**
     * Показать пароль
     */
    showPasswordInput() {
        if (this.typeInputPassword === "password") {
            this.typeInputPassword = "text";
        } else {
            this.typeInputPassword = "password";
        }
        this.showPassword = !this.showPassword;
    }
}

@NgModule({
    imports: [ReactiveFormsModule, NgIf, NgClass, NgStyle],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule {}
