import { Component, NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { EmptyComponent } from "../../components/empty/empty.component";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { CartService } from "./cart.service";
import { CardBasketComponent } from "../../components/cards/card-basket/card-basket.component";
import { Cart } from "../../models/Cart";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
    cartData: Cart[] = [];
    remove_id: number;

    // TODO: Сделать скелитон.
    constructor(
        private cartService: CartService,
        private subjectService: BehaviorSubjectService,
    ) {
        this.remove_id = 0;
        this.subjectService.cart$.subscribe((data) => {
            this.cartData = data;
        });
    }

    ngOnInit() {
        this.cartService.getCart().subscribe((data) => {
            this.subjectService.setCart(data);
        });
    }

    /**
     * Удаление одного товара из корзины.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        this.remove_id = catalog_id; // Устанавливаем полученный catalog_id из child-компонента в переменную remove_id.
        this.cartService.removeFromCart(this.remove_id).subscribe({
            next: () => {
                this.cartData = this.cartData.filter(
                    (item) => item.id !== this.remove_id,
                );
                this.subjectService.removeFromCart(this.remove_id);
            },
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
        return this.subjectService.getTotalCost();
    }

    getTotalCount() {
        return this.subjectService.getCountProductInCart();
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
        AsyncPipe,
        JsonPipe,
    ],
    providers: [CartService, BehaviorSubjectService],
})
export class CartModule {}
