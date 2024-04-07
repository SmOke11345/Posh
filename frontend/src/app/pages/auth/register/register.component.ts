import { Component, NgModule } from "@angular/core";
import { NgClass, NgIf } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { AuthService } from "../auth.service";
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

    constructor(private authService: AuthService) {
        this.registerForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            lastname: new FormControl(""),
            gender: new FormControl("Женский", [Validators.required]),
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

        this.authService.register({ ...this.registerForm.value }).subscribe({
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
    exports: [RegisterComponent],
    declarations: [RegisterComponent],
    providers: [AuthService],
})
export class RegisterModule {}
