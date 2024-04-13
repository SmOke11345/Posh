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
        return this.http.get<shortCatalog[]>(`${Url.FAVORITE}`);
    }

    /**
     * Добавление товара в избранное.
     * @param catalog_id
     */
    addFavorite(catalog_id: number) {
        return this.http.post(`${Url.FAVORITE}/add`, { catalog_id });
    }

    /**
     * Проверка наличия в избранном.
     * @param catalog_id
     */
    isFavorite(catalog_id: number) {
        return this.http.get<boolean>(`${Url.FAVORITE}/${catalog_id}`);
    }

    /**
     * Удаление товара из избранного.
     */
    removeFavorite(catalog_id: number) {
        return this.http.delete(`${Url.FAVORITE}/remove`, {
            body: { catalog_id },
        });
    }
}
