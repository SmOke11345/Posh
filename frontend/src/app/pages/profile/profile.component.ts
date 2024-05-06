import { Component, DoCheck, NgModule, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { User } from "../../models/User";
import { StoreDataUserService } from "../../services/storeDataUser.service";
import { NgClass, NgIf } from "@angular/common";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit, DoCheck {
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

    ngDoCheck() {
        if (this.userData !== this.storeData.getUserData()) {
            this.userData = this.storeData.getUserData();
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

    /**
     * Изменение данных пользователя.
     */
    onSubmit() {
        console.log(this.updateForm["controls"]);
        let formFieldTouched: { [key: string]: any } = {};
        for (const control in this.updateForm.controls) {
            if (this.updateForm.controls[control].touched) {
                formFieldTouched[control] = this.updateForm.value[control];
            }
        }
        this.usersService.patchUser(formFieldTouched as User).subscribe({
            next: () => {
                this.change = false;
                this.updateForm.markAsUntouched();
                formFieldTouched = {};
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

    /**
     * Завершить изменение данный.
     */
    cancelChange() {
        this.change = false;
        this.errors = "";
        this.updateForm.markAsUntouched();
    }
}

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [NgIf, ReactiveFormsModule, NgClass],
    providers: [UsersService, StoreDataUserService],
})
export class ProfileModule {}
