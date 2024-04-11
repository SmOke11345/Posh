import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { catchError, throwError } from "rxjs";
import { Cart } from "../../models/Cart";

@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(private http: HttpClient) {}

    /**
     * Получение товаров в корзине.
     */
    getCart() {
        return this.http.get<Cart[]>(`${Url.CART}`);
    }

    /**
     * Добавление товара в корзину.
     * @param catalog_id
     * @param size
     */
    addToCart(catalog_id: number, size: string) {
        return this.http
            .post<Cart>(`${Url.CART}/add`, { catalog_id, size })
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Удаление всех товаров из корзины.
     */
    clearCart() {
        return this.http
            .delete(`${Url.CART}/clear`)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Удаление одного товара из корзины.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        return this.http
            .delete(`${Url.CART}/remove`, { body: { catalog_id } })
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Увеличение количества товара.
     * @param catalog_id
     */
    incrementProduct(catalog_id: number) {
        return this.http
            .patch(`${Url.CART}/increment`, { catalog_id })
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id
     */
    decrementProduct(catalog_id: number) {
        return this.http.patch(`${Url.CART}/decrement`, { catalog_id });
    }
}
