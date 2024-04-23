import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Url } from "../../models/enums/requestUrls";
import { Order } from "../../models/Order";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class OrdersService {
    constructor(private http: HttpClient) {}

    /**
     * Отправка данных заказа.
     * @param order
     */
    createOrder(order: any): Observable<Order> {
        return this.http.post<Order>(`${Url.ORDER}/create`, order);
    }

    /**
     * Получение заказов пользователя.
     */
    getUserOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${Url.ORDER}/get-user-orders`);
    }

    /**
     * Получение заказа.
     * @param id
     */
    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(`${Url.ORDER}/${id}`);
    }
}
