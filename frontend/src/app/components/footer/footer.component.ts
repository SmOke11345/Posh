import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

@Component({
    selector: "app-footer",
    standalone: true,
    imports: [RouterLink, FormsModule, ReactiveFormsModule],
    templateUrl: "./footer.component.html",
    styleUrl: "./footer.component.scss",
})
export class FooterComponent {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            email_promo: new FormControl("", [Validators.email]),
        });
    }

    // Отправка email для добавления в клуб
    submit(event: Event) {}
}
