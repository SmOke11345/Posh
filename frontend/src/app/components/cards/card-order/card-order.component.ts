import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { OrderProduct } from "../../../models/Order";

@Component({
    selector: "app-card-order",
    standalone: true,
    imports: [NgIf],
    templateUrl: "./card-order.component.html",
    styleUrl: "./card-order.component.scss",
})
export class CardOrderComponent {
    @Input() item: OrderProduct;
    @Input() status: string;
    @Output() createReview = new EventEmitter<number>();

    constructor() {
        this.item = {} as OrderProduct;
        this.status = "Ожидайте звонка";
    }

    /**
     * Получение id товара для отправки в компонент order.
     * @param catalog_id
     */
    getCatalogId(catalog_id: number) {
        this.createReview.emit(catalog_id);
    }
}
