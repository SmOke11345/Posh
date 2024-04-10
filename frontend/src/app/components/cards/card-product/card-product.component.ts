import { Component, Input } from "@angular/core";
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CartService } from "../../../pages/cart/cart.service";

@Component({
    selector: "app-card-product",
    standalone: true,
    imports: [NgIf, NgStyle, NgClass, RouterLink],
    providers: [CartService],
    templateUrl: "./card-product.component.html",
    styleUrl: "../cards.component.scss",
})
export class CardProductComponent {
    // TODO: Сделать тип
    @Input() data: any;

    // TODO: Переделать отображение с учетом что нет isFavorite и isCart

    constructor(private cartService: CartService) {
        this.data = {} as any;
    }

    /**
     * Добавление товара в корзину.
     * @param catalog_id
     */
    addToCart(catalog_id: number) {
        this.cartService.addToCart(catalog_id).subscribe();
    }
}
