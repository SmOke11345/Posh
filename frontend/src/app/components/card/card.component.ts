import { Component, Input } from "@angular/core";
import { NgClass, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";
import { CartService } from "../../pages/cart/cart.service";
import { CatalogService } from "../../pages/catalog/catalog.service";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [NgIf, NgStyle, NgClass, RouterLink],
    providers: [CartService],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.scss",
})
export class CardComponent {
    @Input() card_basket: boolean = false;
    @Input() card_product: boolean = false;

    // TODO: Динамическая типизация!? Catalog | shortCatalog
    @Input() cartData: any;

    constructor(private cartService: CartService) {
        this.cartData = {} as any;
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
