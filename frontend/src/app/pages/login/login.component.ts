import { Component, NgModule } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    showPassword: boolean;
    loginForm: FormGroup;

    typeInputPassword: string = "password";

    constructor(private authService: AuthService) {
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
    onSubmit() {
        // Устанавливать значение checkbox в form group при помощи setValue
        if (this.loginForm.invalid) {
            return;
        }
        // TODO: Доделать отображение ошибок
        this.authService.login({ ...this.loginForm.value }).subscribe({
            error: (error) => {},
        });
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
    imports: [ReactiveFormsModule, NgIf, NgClass, NgStyle, RouterLink],
    exports: [],
    declarations: [LoginComponent],
    providers: [AuthService],
})
export class LoginModule {}
