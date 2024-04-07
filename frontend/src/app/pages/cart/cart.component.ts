import { Component, NgModule, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CardComponent } from "../../components/card/card.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { EmptyComponent } from "../../components/empty/empty.component";
import { NgIf } from "@angular/common";
import { CartService } from "./cart.service";
import { Catalog } from "../../models/Catalog";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
    cartData: Catalog[] = [];
    // preparedForm: FormGroup;

    constructor(private cartService: CartService) {
        // this.preparedForm = new FormGroup({
        //     // TODO: поля которые нужно будет отправить на следующую страницу для оформления заказа.
        // });
    }

    ngOnInit() {
        // TODO: Получение данных с сервера (корзина).
        this.cartService.getCart().subscribe({
            next: (data) => {
                this.cartData = data;
            },
        });
    }

    // onSubmit() {
    //     // TODO: Отправка данных формы в behaviorSubject?!
    // }
}

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    imports: [
        ReactiveFormsModule,
        CardComponent,
        SliderComponent,
        EmptyComponent,
        NgIf,
    ],
    providers: [CartService],
})
export class CartModule {}
