import { Component, NgModule, OnDestroy } from "@angular/core";
import { OrdersService } from "../orders/orders.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Order } from "../../models/Order";
import { NgForOf, NgIf } from "@angular/common";
import { CardOrderComponent } from "../../components/cards/card-order/card-order.component";
import { ReviewsService } from "../reviews/reviews.service";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnDestroy {
    dataOrder: Order;
    private readonly subRouter: Subscription;

    constructor(
        private ordersService: OrdersService,
        private reviewsService: ReviewsService,
        private router: ActivatedRoute,
    ) {
        this.dataOrder = {} as Order;
        this.subRouter = this.router.params.subscribe((params) => {
            const id = params["id"];

            if (id) {
                this.setData(id);
            }
        });
    }

    /**
     * Установка данных в dataOrder.
     * @param id
     */
    setData(id: string) {
        this.ordersService.getOrder(id).subscribe({
            next: (data) => {
                this.dataOrder = data;
            },
        });
    }

    /**
     * Добавление отзыва.
     * @param catalog_id
     */
    // payload: {rating: number, text: string}
    createReview(catalog_id: number) {
        // TODO: данные из модального окна передать сюда
        const payload = {
            text: "Не очень товар",
            rating: 2,
        };
        this.reviewsService.createReview(catalog_id, payload).subscribe({
            next: () => {},
            error: () => {},
        });
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }
}

@NgModule({
    declarations: [OrderComponent],
    exports: [OrderComponent],
    imports: [RouterLink, NgIf, NgForOf, CardOrderComponent],
    providers: [OrdersService, ReviewsService],
})
export class OrderModule {}
