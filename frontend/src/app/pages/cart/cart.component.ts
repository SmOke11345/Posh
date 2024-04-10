import { Component, DoCheck, NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { EmptyComponent } from "../../components/empty/empty.component";
import { NgForOf, NgIf } from "@angular/common";
import { CartService } from "./cart.service";
import { Catalog } from "../../models/Catalog";
import { CardBasketComponent } from "../../components/cards/card-basket/card-basket.component";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit, DoCheck {
    cartData: Catalog[] = [];

    // preparedForm: FormGroup;

    constructor(private cartService: CartService) {
        // this.preparedForm = new FormGroup({
        //     // TODO: поля которые нужно будет отправить на следующую страницу для оформления заказа.
        // });
    }

    ngOnInit() {
        this.cartService.getCart().subscribe({
            next: (data) => {
                this.cartData = data.map((item) => {
                    return { ...item, isCart: true };
                });
            },
        });
    }

    ngDoCheck() {
        if (this.cartData.length !== this.cartData.length) {
            this.getTotalCost();
        }
    }

    /**
     * Удаление всех товаров из корзины.
     */
    clearCart() {
        this.cartService.clearCart().subscribe();
    }

    /**
     * Получение итоговой суммы корзины.
     */
    getTotalCost() {
        return this.cartData.reduce((acc, val) => acc + val.cost, 0);
    }

    // onSubmit() {
    // // TODO: Отправить данные корзины на страницу check out
    //     // TODO: Отправка данных формы в behaviorSubject?!
    // }
}

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    imports: [
        ReactiveFormsModule,
        CardProductComponent,
        SliderComponent,
        EmptyComponent,
        NgIf,
        CardBasketComponent,
        NgForOf,
    ],
    providers: [CartService],
})
export class CartModule {}
