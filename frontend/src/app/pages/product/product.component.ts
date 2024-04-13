import { Component, DoCheck, NgModule, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CatalogService } from "../catalog/catalog.service";
import { SliderComponent } from "../../components/slider/slider.component";
import { Title } from "@angular/platform-browser";
import { IProduct } from "../../models/Catalog";
import { NgClass, NgForOf } from "@angular/common";
import { CartService } from "../cart/cart.service";
import { FormsModule } from "@angular/forms";
import { FavoriteService } from "../favorite/favorite.service";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {
    dataProduct: IProduct;
    id: string = "";

    selectedSize: string = "";
    selectedImage: string = "";

    _isFavorite: boolean = false;
    _isCart: boolean = false;

    private readonly subRouter: Subscription;

    constructor(
        private router: ActivatedRoute,
        private catalogService: CatalogService,
        private cartService: CartService,
        private favoriteService: FavoriteService,
        private subjectService: BehaviorSubjectService,
        private titleService: Title,
    ) {
        this.dataProduct = {} as IProduct;

        this.subRouter = this.router.params.subscribe((params) => {
            this.id = params["id"];
        });
    }

    ngOnInit() {
        this.setData();
    }

    ngDoCheck() {
        if (+this.id !== this.dataProduct.id) {
            this.setData();
        }
    }

    ngOnDestroy() {
        if (this.subRouter) {
            this.subRouter.unsubscribe();
        }
    }

    setData() {
        this.catalogService.getProduct(this.id).subscribe((data) => {
            this.dataProduct = data;
            this.setupDefaultData();
            this.selectedSize = data.sizes[0];
            this.selectedImage = data.images[0];
            this.titleService.setTitle(data.title);
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

    updateDotSlider(index: number) {
        const dots = document.querySelectorAll(".dot__item");

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        dots[index].classList.add("active");
    }

    setupDefaultData() {
        this.isFavorite(this.dataProduct.id);
        this.isCart(this.dataProduct.id);
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
            this.favoriteService.addFavorite(catalog_id).subscribe();
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
            this._isCart = false;
        } else {
            this.cartService
                .addToCart(catalog_id, this.selectedSize)
                .subscribe();
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
            this._isCart = true;
        }
    }

    /**
     * Проверка наличия в избранном.
     * @param catalog_id
     */
    isFavorite(catalog_id: number) {
        this.favoriteService
            .isFavorite(catalog_id)
            .subscribe((data: boolean) => {
                this._isFavorite = data;
            });
    }

    isCart(catalog_id: number) {
        this.cartService.isCart(catalog_id).subscribe((data: boolean) => {
            this._isCart = data;
        });
    }
}

@NgModule({
    declarations: [ProductComponent],
    exports: [ProductComponent],
    imports: [SliderComponent, NgForOf, NgClass, FormsModule],
    providers: [
        CatalogService,
        CartService,
        FavoriteService,
        BehaviorSubjectService,
        CatalogService,
    ],
})
export class ProductModule {}
