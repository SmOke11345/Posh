import { Component, OnDestroy } from "@angular/core";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { StoreDataUserService } from "../../../services/storeDataUser.service";
import { UsersService } from "../../profile/users.service";
import { ModalComponent } from "../../../components/modal/modal.component";

@Component({
    selector: "app-reset-password",
    standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        RouterLink,
        NgClass,
        ModalComponent,
    ],
    templateUrl: "./reset-password.component.html",
    styles: `
        .reset-password {
            .form__title h2 {
                @media screen and (min-width: 425px) {
                    font-size: 3rem;
                }
            }
        }
    `,
})
export class ResetPasswordComponent implements OnDestroy {
    resetForm: FormGroup;
    error: string = "";
    condition: boolean = false;
    showPassword: boolean;
    typeInputPassword: string = "password";
    dataModal: { isSend: boolean; title: string; content: string } = {
        isSend: false,
        title: "",
        content: "",
    };
    private readonly subRouter: Subscription;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private router: ActivatedRoute,
        private route: Router,
        private storeData: StoreDataUserService,
    ) {
        this.showPassword = false;
        this.resetForm = new FormGroup({
            email: new FormControl<string>("", [Validators.email]),
            password: new FormControl<string>("", [Validators.minLength(8)]),
        });

        this.subRouter = this.router.queryParams.subscribe((params) => {
            if (params["token"]) {
                this.storeData.setToken(params["token"]);
                this.condition = !!params["token"];
            }
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
     * Обработка ошибок и отправка данных.
     */
    onSubmit() {
        if (this.resetForm.invalid) {
            return;
        }
        if (this.condition) {
            this.usersService
                .patchUserPassword(this.resetForm.controls["password"].value)
                .subscribe({
                    next: () => {
                        this.resetForm.reset();
                        this.error = "";
                        this.route.navigate(["/auth/login"]);
                    },
                    error: (error) => {
                        this.error = error.error.message;
                    },
                });
        } else {
            this.authService
                .resetPassword(this.resetForm.controls["email"].value)
                .subscribe({
                    next: (response: any) => {
                        this.dataModal = {
                            isSend: true,
                            title:
                                "Письмо отправлено на почту: " +
                                this.resetForm.controls["email"].value,
                            content: response.message,
                        };
                        this.error = "";
                    },
                    error: (error) => {
                        this.error = error.error.message;
                    },
                });
        }
    }

    ngOnDestroy(): void {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
}
