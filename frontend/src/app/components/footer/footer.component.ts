import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { AuthService } from "../../pages/auth/auth.service";
import { ModalComponent } from "../modal/modal.component";
import { Modal } from "../../models/Modal";

@Component({
    selector: "app-footer",
    standalone: true,
    imports: [RouterLink, FormsModule, ReactiveFormsModule, ModalComponent],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
})
export class FooterComponent {
    form: FormGroup;
    dataModal: Modal = {
        title: "Письмо отправлено",
        content: "Спасибо за подписку!",
        btnActionText: "ОК",
        isShow: false,
    };

    constructor(private authService: AuthService) {
        this.form = new FormGroup({
            email_promo: new FormControl("", [
                Validators.email,
                Validators.required,
            ]),
        });
    }

    /**
     * Отправка email для добавления в клуб
     */
    onSubmit() {
        if (this.form.invalid) return;

        this.authService
            .subscribeToDiscount(this.form.value.email_promo)
            .subscribe({
                next: (response: any) => {
                    this.form.reset();
                    this.dataModal.title = response.message;
                    this.dataModal.content = `Спасибо что присоединились к нам!`;
                },
                error: (error) => {
                    this.dataModal.title = "Письмо не отправлено";
                    this.dataModal.content = error.error.message;
                    this.dataModal.isShow = true;
                    this.form.reset();
                },
                complete: () => {
                    this.dataModal.isShow = true;
                },
            });
    }
}
