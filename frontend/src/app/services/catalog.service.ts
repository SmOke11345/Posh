import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../models/enums/requestUrls";
import { Catalog } from "../models/Catalog";

@Injectable()
export class CatalogService {
    constructor(private http: HttpClient) {}

    /**
     * Получение товаров для каруселей.
     */
    getProdCarousel() {
        return this.http.get<Catalog[]>(`${Url.CATALOG}/get-prods-carousel`);
    }
}
