import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Catalog } from "../../models/Catalog";
import { Url } from "../../models/enums/requestUrls";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(private http: HttpClient) {}

    /**
     * Добавление товара в корзину.
     * @param catalog_id
     */
    addToCart(catalog_id: number) {
        return this.http
            .post<Catalog>(`${Url.CART}`, catalog_id)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Получение товаров в корзине.
     */
    getCart() {
        return this.http.get<Catalog[]>(`${Url.CART}`);
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
            .patch(`${Url.CART}/increment`, catalog_id)
            .pipe(catchError((error) => throwError(error)));
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id
     */
    decrementProduct(catalog_id: number) {
        return this.http.patch(`${Url.CART}/decrement`, catalog_id);
    }
}
