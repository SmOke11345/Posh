import { Component, NgModule, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CardProductComponent } from "../../components/cards/card-product/card-product.component";
import { SliderComponent } from "../../components/slider/slider.component";
import { EmptyComponent } from "../../components/empty/empty.component";
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from "@angular/common";
import { CartService } from "./cart.service";
import { CardBasketComponent } from "../../components/cards/card-basket/card-basket.component";
import { Cart } from "../../models/Cart";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";
import { Router, RouterLink } from "@angular/router";
import { ModalComponent } from "../../components/modal/modal.component";
import { Modal } from "../../models/Modal";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
    cartData: Cart[] = [];
    remove_id: number;
    isLoading: boolean;

    dataModal: Modal = {
        title: "Удалить все товары из корзины?",
        content:
            "Вы точно хотите удалить все товары из корзины? Отменить данное действие будет невозможно.",
        btnActionText: "Удалить",
        isShow: false,
    };

    constructor(
        private router: Router,
        private cartService: CartService,
        private subjectService: BehaviorSubjectService,
    ) {
        this.remove_id = 0;
        this.isLoading = true;
        this.subjectService.cart$.subscribe((data) => {
            this.cartData = data;
        });
    }

    ngOnInit() {
        this.cartService.getCart().subscribe({
            next: (data) => {
                this.subjectService.setCart(data);
            },
            complete: () => {
                setTimeout(() => {
                    this.isLoading = false;
                }, 200);
            },
        });
    }

    /**
     * Удаление одного товара из корзины.
     * @param catalog_id
     */
    removeFromCart(catalog_id: number) {
        this.remove_id = catalog_id; // Устанавливаем полученный catalog_id из child-компонента в переменную remove_id.
        this.cartService.removeFromCart(this.remove_id).subscribe(() => {
            this.cartData = this.cartData.filter(
                (item) => item.id !== this.remove_id,
            );
            this.subjectService.removeFromCart(this.remove_id);
        });
    }

    /**
     * Удаление всех товаров из корзины.
     */
    clearCart(condition: boolean) {
        if (condition) {
            this.cartService.clearCart().subscribe(() => {
                this.subjectService.clearCart();
                this.cartData = [];
            });
        }
        this.dataModal.isShow = false;
    }

    /**
     * Получение итоговой суммы корзины.
     */
    getTotalCost() {
        return this.subjectService.getTotalCost(true);
    }

    /**
     * Получение итогового количества товаров в корзине.
     */
    getTotalCount() {
        return this.subjectService.getCountProductInCart(true);
    }

    setCheckout(value: Cart[]) {
        this.subjectService.setCheckout(value);
        this.router.navigate(["/checkout"]);
    }
}

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    imports: [
        ReactiveFormsModule,
        CardProductComponent,
        SliderComponent,
        EmptyComponent,
        NgIf,
        CardBasketComponent,
        NgForOf,
        AsyncPipe,
        JsonPipe,
        RouterLink,
        ModalComponent,
    ],
    providers: [CartService, BehaviorSubjectService],
})
export class CartModule {}
