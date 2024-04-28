import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { ICatalog, shortCatalog } from "../../models/Catalog";
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
     * @param payload
     */
    getFilteredCatalog(
        query: Params,
        payload: { colors: string[]; sizes: string[] },
    ) {
        const _query = Object.entries(query);

        // TODO: осталось лишь убрать - перед asc sort, back на него ругается.
        const preparedQuery = _query
            .map((key) => `${key[0]}=${key[1]}`)
            .join("&");

        return this.http
            .post<{ countPage: number; items: shortCatalog[] }>(
                `${Url.CATALOG}?${preparedQuery}`,
                {
                    ...payload,
                },
            )
            .pipe(catchError((error) => throwError(error)));
    }
}
