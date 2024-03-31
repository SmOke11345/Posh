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

    // TODO: получить данные пользователя
    constructor(
        private usersService: UsersService,
        private storeData: StoreDataUserService,
    ) {
        this.userData = {} as User;

        console.log(this.userData.name);
    }

    ngOnInit() {
        // Для SSR
        if (typeof window !== "undefined") {
            this.userData = this.storeData.getUserData();
        }

        // TODO: Изменить gender должно отправляться словом
        // TODO: Сделать, чтобы сразу был выбран пол из представленных галочек
        // this.userData.gender = this.userData.gender == 'Мужской' ? '1' : '2';

        this.updateForm = new FormGroup({
            name: new FormControl(this.userData.name),
            lastname: new FormControl(this.userData.lastname),
            email: new FormControl(this.userData.email, [Validators.required]),
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
        // this.usersService.updateUser(this.userData).subscribe();
        console.log("this.updateForm", this.userData);
    }

    /**
     * Выход пользователя из аккаунта.
     */
    // TODO: Реализовать выход => удаление данный из cookie, localStorage.
    logout() {}
}

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [NgIf, ReactiveFormsModule, NgClass],
    providers: [UsersService, StoreDataUserService],
})
export class ProfileModule {}
