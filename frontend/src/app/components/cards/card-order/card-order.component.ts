import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
export class CardOrderComponent implements OnInit {
    @Input() item: OrderProduct;
    @Input() status: string;
    @Output() createReview = new EventEmitter<{
        catalog_id: number;
        isModal: boolean;
        title: string;
    }>();

    isModal = false;
    isReview: boolean;

    constructor(private reviewsService: ReviewsService) {
        this.item = {} as OrderProduct;
        this.isReview = false;
        this.status = "Ожидайте звонка";
    }

    ngOnInit() {
        this.reviewsService.getUserReviews().subscribe((data) => {
            if (!data.length) {
                this.isReview = true;
            }
            data.find((item) => {
                if (item.catalog_id !== this.item.id) {
                    this.isReview = true;
                }
            });
        });
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
