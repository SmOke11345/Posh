import { Component, NgModule } from "@angular/core";
import { NgClass, NgIf } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
})
export class RegisterComponent {
    showPassword: boolean;
    registerForm: FormGroup;

    errors: string = "";

    typeInputPassword: string = "password";

    constructor(
        private router: Router,
        private usersService: AuthService,
    ) {
        this.registerForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            lastname: new FormControl(""),
            gender: new FormControl(2, [Validators.required]),
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
     * Регистрация пользователя.
     */
    onSubmit() {
        // Если сheckbox оставить меня в системе равен true, то сохранять данные пользователя в cookie.
        if (this.registerForm.invalid) {
            return;
        }

        this.usersService.register({ ...this.registerForm.value }).subscribe({
            error: (error) => {
                this.errors = error.error.message;
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
    imports: [NgIf, ReactiveFormsModule, RouterLink, NgClass],
    exports: [],
    declarations: [RegisterComponent],
    providers: [AuthService],
})
export class RegisterModule {}
