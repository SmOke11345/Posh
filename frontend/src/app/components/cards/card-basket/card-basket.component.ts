import { Component, Input } from "@angular/core";
import { CartService } from "../../../pages/cart/cart.service";
import { NgIf, NgStyle } from "@angular/common";

@Component({
    selector: "app-card-basket",
    standalone: true,
    imports: [NgIf, NgStyle],
    providers: [CartService],
    templateUrl: "./card-basket.component.html",
    styleUrl: "../cards.component.scss",
})
export class CardBasketComponent {
    // TODO: сделать тип
    @Input() data: any;

    constructor(private cartService: CartService) {
        this.data = {} as any;
    }

    /**
     * Удаление одного товара из корзины.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        this.cartService.removeFromCart(catalog_id).subscribe();
    }

    /**
     * Увеличение количества товара.
     * @param catalog_id
     */
    incrementProduct(catalog_id: number) {
        this.cartService.incrementProduct(catalog_id).subscribe();
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id
     */
    decrementProduct(catalog_id: number) {
        this.cartService.decrementProduct(catalog_id).subscribe();
    }
}
