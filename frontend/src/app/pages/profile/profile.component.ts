import { Component, NgModule, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { User } from "../../models/User";
import { StoreDataUserService } from "../../utils/storeDataUser.service";
import { NgClass, NgIf } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
    userData: User;
    updateForm: FormGroup = new FormGroup({});

    errors: string = "";

    change: boolean = false;
    showPassword: boolean = false;
    typeInputPassword: string = "password";

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
        private storeData: StoreDataUserService,
    ) {
        this.userData = {} as User;
    }

    ngOnInit() {
        // Для SSR
        if (typeof window !== "undefined") {
            this.userData = this.storeData.getUserData();
        }

        this.updateForm = new FormGroup({
            name: new FormControl(this.userData.name),
            lastname: new FormControl(this.userData.lastname),
            email: new FormControl(this.userData.email),
            gender: new FormControl(this.userData.gender),
            password: new FormControl("", [Validators.minLength(8)]),
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

    /**
     * Изменение данных пользователя.
     */
    onSubmit() {
        const formFieldTouched: { [key: string]: any } = {};
        for (const control in this.updateForm.controls) {
            if (this.updateForm.controls[control].touched) {
                formFieldTouched[control] = this.updateForm.value[control];
            }
        }
        this.usersService.patchUser(formFieldTouched as User).subscribe({
            next: () => {
                window.location.reload();
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
     * Выход пользователя из аккаунта.
     */
    logout() {
        this.authService.logout();
    }
}

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [NgIf, ReactiveFormsModule, NgClass],
    providers: [UsersService, StoreDataUserService],
})
export class ProfileModule {}
