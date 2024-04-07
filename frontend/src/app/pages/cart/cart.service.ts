import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Catalog } from "../../models/Catalog";
import { Url } from "../../models/enums/requestUrls";
import { StoreDataUserService } from "../../services/storeDataUser.service";

@Injectable({
    providedIn: "root",
})
export class CartService {
    constructor(
        private http: HttpClient,
        private storeData: StoreDataUserService,
    ) {}

    /**
     * Получение товаров в корзине.
     */
    getCart() {
        return this.http.get<Catalog[]>(`${Url.CART}`);
    }
}
