import { Component, NgModule, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
    preparedForm: FormGroup;

    constructor() {
        this.preparedForm = new FormGroup({
            // TODO: поля которые нужно будет отправить на следующую страницу для оформления заказа.
        });
    }

    ngOnInit() {
        // TODO: Получение данных с сервера (корзина).
    }

    onSubmit() {
        // TODO: Отправка данных формы в behaviorSubject?!
    }
}

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    imports: [ReactiveFormsModule, CardComponent],
    providers: [],
})
export class CartModule {}
