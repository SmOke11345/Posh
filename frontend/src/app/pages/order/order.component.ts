import { Component, NgModule, OnDestroy } from "@angular/core";
import { OrdersService } from "../orders/orders.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Order } from "../../models/Order";
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { CardOrderComponent } from "../../components/cards/card-order/card-order.component";
import { ReviewsService } from "../reviews/reviews.service";
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent implements OnDestroy {
    reviewForm: FormGroup;
    dataOrder: Order;
    isLoading: boolean;

    modalData: {
        catalogId: number;
        isModal: boolean;
        title: string;
    } = {
        title: "",
        catalogId: 0,
        isModal: false,
    };
    rating: number[] = [0];
    error: string = "";

    private readonly subRouter: Subscription;

    constructor(
        private ordersService: OrdersService,
        private reviewsService: ReviewsService,
        private router: ActivatedRoute,
        private route: Router,
    ) {
        this.dataOrder = {} as Order;
        this.isLoading = true;
        this.subRouter = this.router.params.subscribe((params) => {
            const id = params["id"];

            if (id) {
                this.setData(id);
            }
        });

        this.reviewForm = new FormGroup({
            rating: new FormControl(1, Validators.required),
            text: new FormControl("", Validators.required),
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
            complete: () => {
                this.isLoading = false;
            },
        });
    }

    /**
     * Добавление отзыва.
     * @param payload
     */
    // payload: {rating: number, text: string}
    collectModalData(payload: {
        catalog_id: number;
        isModal: boolean;
        title: string;
    }) {
        this.modalData = {
            catalogId: payload.catalog_id,
            isModal: payload.isModal,
            title: payload.title,
        };
    }

    /**
     * Выбор рейтинга.
     * @param star
     */
    selectStar(star: number) {
        this.rating = [0];
        for (let i = 0; i <= star; i++) {
            this.rating.push(i);
        }
        this.reviewForm.controls["rating"].setValue(star + 1);
    }

    /**
     * Добавление отзыва.
     */
    createReview() {
        const { catalogId } = this.modalData;
        this.reviewsService
            .createReview(catalogId, { ...this.reviewForm.value })
            .subscribe({
                next: () => {
                    this.reviewForm.reset();
                    this.modalData = {
                        catalogId: 0,
                        isModal: false,
                        title: "",
                    };
                    this.route.navigate(["/reviews"]);
                },
                error: (error) => {
                    this.error = error.error.message;
                },
                complete: () => {
                    this.error = "";
                },
            });
    }

    /**
     * Закрытие модального окна.
     * @param event
     */
    closeModal(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.modalData = {
                catalogId: 0,
                isModal: false,
                title: "",
            };
        }
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
    imports: [
        RouterLink,
        NgIf,
        NgForOf,
        CardOrderComponent,
        NgStyle,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [OrdersService, ReviewsService],
})
export class OrderModule {}
