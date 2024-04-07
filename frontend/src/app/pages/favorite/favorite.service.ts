import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { shortCatalog } from "../../models/Catalog";

@Injectable({
    providedIn: "root",
})
export class FavoriteService {
    constructor(private http: HttpClient) {}

    /**
     * Получение избранных товаров.
     */
    getFavoriteItems() {
        return this.http.get<shortCatalog[]>(
            `${Url.FAVORITE}/get-favorite-items`,
        );
    }
}
