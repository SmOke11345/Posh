import { Component, NgModule } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgClass, NgFor, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { StoreDataUserService } from "../../../services/storeDataUser.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    showPassword: boolean;
    loginForm: FormGroup;

    errors: string[] = [];

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
        if (this.loginForm.invalid) {
            return;
        }
        this.authService.login({ ...this.loginForm.value }).subscribe({
            error: (error) => {
                console.log(error);
                this.errors = [`${error.error.message}`];
            },
            complete: () => {
                this.errors = [];
            },
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
    imports: [ReactiveFormsModule, NgFor, NgIf, NgClass, NgStyle, RouterLink],
    exports: [LoginComponent],
    declarations: [LoginComponent],
    providers: [AuthService, StoreDataUserService],
})
export class LoginModule {}
