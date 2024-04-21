import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";

@Injectable({
    providedIn: "root",
})
export class OrderService {
    constructor(private http: HttpClient) {}

    /**
     * Отправка данных заказа.
     * @param order
     */
    createOrder(order: any) {
        return this.http.post(`${Url.ORDER}/create`, order);
    }
}
