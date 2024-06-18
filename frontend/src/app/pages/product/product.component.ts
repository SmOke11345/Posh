import { Component, NgModule, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CatalogService } from "../catalog/catalog.service";
import { SliderComponent } from "../../components/slider/slider.component";
import { Title } from "@angular/platform-browser";
import { ICatalog } from "../../models/Catalog";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { CartService } from "../cart/cart.service";
import { FormsModule } from "@angular/forms";
import { FavoriteService } from "../favorite/favorite.service";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";
import { CardReviewComponent } from "../../components/cards/card-review/card-review.component";
import { ReviewsService } from "../reviews/reviews.service";
import { Review } from "../../models/Review";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnDestroy {
    dataProduct: ICatalog;
    dataReview: Review[];

    selectedSize: string = "";
    selectedImage: string = "";
    error: string = "";
    productRating: number = 0;

    _isFavorite: boolean = false;
    _isCart: boolean = false;
    rating: number[] = [];

    private readonly subRouter: Subscription;

    constructor(
        private router: ActivatedRoute,
        private route: Router,
        private catalogService: CatalogService,
        private cartService: CartService,
        private favoriteService: FavoriteService,
        private subjectService: BehaviorSubjectService,
        private reviewService: ReviewsService,
        private titleService: Title,
    ) {
        this.dataProduct = {} as ICatalog;
        this.dataReview = [] as Review[];

        this.subRouter = this.router.params.subscribe((params) => {
            const id = params["id"];

            if (id) {
                this.setData(id);
            }
        });
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }

    setData(id: string) {
        this.catalogService.getProduct(id).subscribe((data: ICatalog) => {
            this.dataProduct = data;
            this.setupDefaultData();
            this.selectedSize = data.sizes[0];
            this.selectedImage = data.images[0];
            this.titleService.setTitle(data.title);
        });

        this.reviewService.getReviews(id).subscribe({
            next: (data) => {
                const { reviews, average_rating } = data;
                this.dataReview = reviews;
                this.productRating = average_rating ?? 0;
                for (let i = 0; i < average_rating; i++) {
                    this.rating.push(i);
                }
            },
            error: (error) => {
                this.error = error.error.message;
                this.dataReview = [];
                this.rating = [];
            },
            complete: () => {
                this.error = "";
            },
        });
    }

    /**
     * Установка выбранного размера.
     * @param size
     */
    selectSize(size: string) {
        this.selectedSize = size;
    }

    /**
     * Установка выбранного изображения.
     * слайдер.
     * @param image
     * @param index
     */
    selectImage(image: string, index: number) {
        this.selectedImage = image;
        this.updateDotSlider(index);
    }

    /**
     * Обновление точек слайдера.
     * @param index
     */
    updateDotSlider(index: number) {
        const dots = document.querySelectorAll(".dot__item");

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        dots[index].classList.add("active");
    }

    /**
     * Установка значений по умолчанию для избранного и корзины.
     */
    setupDefaultData() {
        this.getStatusCartItem(this.dataProduct.id);
    }

    /**
     * Добавление/удаление товара в избранное.
     * @param catalog_id
     */
    toggleFavorite(catalog_id: number) {
        if (this._isFavorite) {
            this.favoriteService.removeFavorite(catalog_id).subscribe();
            this._isFavorite = false;
        } else {
            this.favoriteService.addFavorite(catalog_id).subscribe({
                error: () => this.route.navigate(["/auth/login"]),
            });
            this._isFavorite = true;
        }
    }

    /**
     * Добавление/удаление товара в корзину.
     */
    toggleCart(catalog_id: number) {
        if (this._isCart) {
            this.cartService.removeFromCart(catalog_id).subscribe();
            this.subjectService.removeCartOneItem(catalog_id);
            return (this._isCart = false);
        } else {
            this.cartService
                .addToCart(catalog_id, this.selectedSize)
                .subscribe({
                    error: () => this.route.navigate(["/auth/login"]),
                });
            this.subjectService.setCartOneItem({
                id: catalog_id,
                title: this.dataProduct.title,
                size: this.selectedSize,
                color: this.dataProduct.colors[0],
                image: this.dataProduct.images[0],
                cost: this.dataProduct.cost,
                count: 1,
                chapterAndType: "", // Сделано для отображения => не обязательно заполнять все данные.
            });
            return (this._isCart = true);
        }
    }

    /**
     * Проверка статусов товара.
     * @param catalog_id
     */
    getStatusCartItem(catalog_id: number) {
        this.cartService.getStatusCartItem(catalog_id).subscribe((data) => {
            this._isCart = data.isCart;
            this._isFavorite = data.isFavorite;
        });
    }

    // TODO: Доделать в будущем.
    showMoreReviews() {}

    /**
     * Добавление в корзину и перенаправление на страницу оформления заказа.
     * @param catalog_id
     */
    addToCheckout(catalog_id: number) {
        const size = this.selectedSize;
        // TODO: как-то так...
        const preparedColor =
            this.dataProduct.description.titles.slice(-2, -1) +
            " - " +
            this.dataProduct.description.texts.slice(-2, -1);
        const preparedDataCart = {
            id: catalog_id,
            title: this.dataProduct.title,
            size: size,
            color: preparedColor,
            image: this.dataProduct.images[0],
            cost: this.dataProduct.cost,
            count: 1,
            chapterAndType:
                this.dataProduct.gender +
                "/" +
                this.dataProduct.chapter +
                "/" +
                this.dataProduct.type,
        };
        this.subjectService.setCheckout([preparedDataCart]);
        this.route.navigate(["/checkout"]);
    }
}

@NgModule({
    declarations: [ProductComponent],
    exports: [ProductComponent],
    imports: [
        SliderComponent,
        NgForOf,
        NgClass,
        FormsModule,
        CardReviewComponent,
        NgIf,
        NgStyle,
    ],
    providers: [
        CatalogService,
        CartService,
        FavoriteService,
        BehaviorSubjectService,
        CatalogService,
        ReviewsService,
    ],
})
export class ProductModule {}
