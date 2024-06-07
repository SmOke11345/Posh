import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIf } from "@angular/common";
import { OrderProduct } from "../../../models/Order";
import { RouterLink } from "@angular/router";
import { ReviewsService } from "../../../pages/reviews/reviews.service";

@Component({
    selector: "app-card-order",
    standalone: true,
    imports: [NgIf, RouterLink],
    templateUrl: "./card-order.component.html",
    styleUrl: "./card-order.component.scss",
    providers: [ReviewsService],
})
export class CardOrderComponent {
    @Input() item: OrderProduct;
    @Input() status: string;
    @Input() isReview: boolean;
    @Output() createReview = new EventEmitter<{
        catalog_id: number;
        isModal: boolean;
        title: string;
    }>();

    isModal: boolean;

    constructor() {
        this.item = {} as OrderProduct;
        this.status = "Ожидайте звонка";
        this.isModal = false;
        this.isReview = false;
    }

    /**
     * Получение id товара для отправки в компонент order.
     * @param catalog_id
     */
    getCatalogId(catalog_id: number) {
        const data = {
            id: this.item.id,
            catalog_id,
            isModal: !this.isModal,
            title: this.item.title,
        };
        this.createReview.emit(data);
    }
}
