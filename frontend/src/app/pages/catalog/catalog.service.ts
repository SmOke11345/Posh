import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { catalogQuery, ICatalog, shortCatalog } from "../../models/Catalog";
import { Params } from "@angular/router";
import { catchError, throwError } from "rxjs";

@Injectable()
export class CatalogService {
    constructor(private http: HttpClient) {}

    /**
     * Получение товара по id.
     * @param id
     */
    getProduct(id: string) {
        return this.http.get<ICatalog>(`${Url.CATALOG}/${id}`);
    }

    /**
     * Получение товаров для каруселей.
     */
    getProdCarousel() {
        return this.http.get<shortCatalog[]>(
            `${Url.CATALOG}/get-prods-carousel`,
        );
    }

    /**
     * Получение отфильтрованного каталога.
     * @param query
     */
    getFilteredCatalog(query: Params) {
        const _query = Object.entries(query);

        const preparedQuery = _query
            .map((key) => `${key[0]}=${key[1]}`)
            .join("&");

        return this.http
            .post<catalogQuery>(`${Url.CATALOG}?${preparedQuery}`, {})
            .pipe(catchError((error) => throwError(error)));
    }
}
