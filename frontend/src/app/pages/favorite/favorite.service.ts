import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { shortCatalog } from "../../models/Catalog";
import { map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FavoriteService {
    constructor(private http: HttpClient) {}

    /**
     * Получение избранных товаров.
     */
    getFavoriteItems() {
        return this.http.get<shortCatalog[]>(`${Url.FAVORITE}`).pipe(
            map((data) => {
                return data.map((item) => {
                    return {
                        ...item,
                        isFavorite: true,
                    };
                });
            }),
        );
    }
}
