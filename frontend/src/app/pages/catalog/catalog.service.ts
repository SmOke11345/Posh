import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { IProduct, shortCatalog } from "../../models/Catalog";

@Injectable()
export class CatalogService {
    constructor(private http: HttpClient) {}

    /**
     * Получение товара по id.
     * @param id
     */
    getProduct(id: string) {
        return this.http.get<IProduct>(`${Url.CATALOG}/${id}`);
    }

    /**
     * Получение товаров для каруселей.
     */
    getProdCarousel() {
        return this.http.get<shortCatalog[]>(
            `${Url.CATALOG}/get-prods-carousel`,
        );
    }
}
