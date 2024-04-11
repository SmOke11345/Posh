import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CartService } from "../../../pages/cart/cart.service";
import { NgIf, NgStyle } from "@angular/common";
import { Cart } from "../../../models/Cart";
import { BehaviorSubjectService } from "../../../services/behavior-subject.service";

@Component({
    selector: "app-card-basket",
    standalone: true,
    imports: [NgIf, NgStyle],
    providers: [CartService, BehaviorSubjectService],
    templateUrl: "./card-basket.component.html",
    styleUrl: "../cards.component.scss",
})
export class CardBasketComponent {
    @Input() data: Cart;
    @Output() dataChange = new EventEmitter<number>();

    constructor(
        private cartService: CartService,
        private subjectService: BehaviorSubjectService,
    ) {
        this.data = {} as Cart;
    }

    /**
     * Отправляем catalog_id в родительский компонент, для изменения общего массива.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        this.dataChange.emit(catalog_id);
    }

    /**
     * Увеличение количества товара.
     * @param catalog_id
     */
    incrementProduct(catalog_id: number) {
        this.cartService.incrementProduct(catalog_id).subscribe({
            next: () => {
                this.data.count++;
                this.subjectService.changeCountProduct(catalog_id, true);
            },
        });
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id
     */
    decrementProduct(catalog_id: number) {
        this.cartService.decrementProduct(catalog_id).subscribe({
            next: () => {
                if (this.data.count === 1) {
                    return this.removeFromCart(catalog_id);
                }
                this.data.count--;
                this.subjectService.changeCountProduct(catalog_id, false);
            },
        });
    }
}
