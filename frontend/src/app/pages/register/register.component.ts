import { Component, NgModule } from "@angular/core";
import { NgClass, NgIf } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
})
export class RegisterComponent {
    showPassword: boolean;
    registerForm: FormGroup;

    errors: string = "";

    typeInputPassword: string = "password";

    constructor(private usersService: AuthService) {
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
        if (this.registerForm.invalid) {
            return;
        }

        this.usersService.register({ ...this.registerForm.value }).subscribe({
            next: () => {
                if (this.registerForm.value.rememberMe) {
                    this.usersService
                        .login({ ...this.registerForm.value })
                        .subscribe();
                }
            },
            error: (error) => {
                this.errors = error.error.message;
            },
            complete: () => {
                this.errors = "";
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
    imports: [NgIf, ReactiveFormsModule, NgClass, RouterLink],
    exports: [],
    declarations: [RegisterComponent],
    providers: [AuthService],
})
export class RegisterModule {}
