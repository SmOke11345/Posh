import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CartService } from "../../../pages/cart/cart.service";
import { NgIf, NgStyle } from "@angular/common";
import { Cart } from "../../../models/Cart";
import { BehaviorSubjectService } from "../../../services/behavior-subject.service";
import { FavoriteService } from "../../../pages/favorite/favorite.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-card-basket",
    standalone: true,
    imports: [NgIf, NgStyle, RouterLink],
    providers: [CartService, BehaviorSubjectService, FavoriteService],
    templateUrl: "./card-basket.component.html",
    styleUrl: "../cards.component.scss",
})
export class CardBasketComponent implements OnInit {
    @Input() data: Cart;
    @Output() dataChange = new EventEmitter<number>();
    _isCart: boolean = false;
    _isFavorite: boolean = false;

    constructor(
        private cartService: CartService,
        private favoriteService: FavoriteService,
        private subjectService: BehaviorSubjectService,
    ) {
        this.data = {} as Cart;
    }

    ngOnInit() {
        this.isCart(this.data.id);
        this.isFavorite(this.data.id);
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

    /**
     * Проверка на наличие в корзине.
     * @param catalog_id
     */
    isCart(catalog_id: number) {
        this.cartService.isCart(catalog_id).subscribe((data) => {
            this._isCart = data;
        });
    }

    /**
     * Проверка на наличие в избранном.
     * @param catalog_id
     */
    isFavorite(catalog_id: number) {
        this.favoriteService.isFavorite(catalog_id).subscribe((data) => {
            this._isFavorite = data;
        });
    }
}
