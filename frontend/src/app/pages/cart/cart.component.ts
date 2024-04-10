import { Component, NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { EmptyComponent } from "../../components/empty/empty.component";
import { NgForOf, NgIf } from "@angular/common";
import { CartService } from "./cart.service";
import { CardBasketComponent } from "../../components/cards/card-basket/card-basket.component";
import { Cart } from "../../models/Cart";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
    cartData: Cart[] = [];

    // TODO: Сделать динамическое отображение данных

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.cartService.getCart().subscribe((data) => {
            this.cartData = data;
        });
    }

    /**
     * Удаление всех товаров из корзины.
     */
    clearCart() {
        this.cartService.clearCart().subscribe(() => {
            this.cartData = [];
        });
    }

    /**
     * Получение итоговой суммы корзины.
     */
    getTotalCost() {
        return this.cartData
            .map((item) => item.cost * item.count)
            .reduce((a, b) => a + b, 0);
    }
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
