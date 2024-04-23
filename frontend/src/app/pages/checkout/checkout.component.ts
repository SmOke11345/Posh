import { Component, NgModule, OnInit } from "@angular/core";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { User } from "../../models/User";
import { StoreDataUserService } from "../../services/storeDataUser.service";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";
import { CardBasketComponent } from "../../components/cards/card-basket/card-basket.component";
import { Cart } from "../../models/Cart";
import { NgxMaskDirective } from "ngx-mask";
import { OrdersService } from "../orders/orders.service";
import { Router, RouterLink } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CardOrderComponent } from "../../components/cards/card-order/card-order.component";

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit {
    cart: Cart[];
    userData: User;

    orderForm: FormGroup = new FormGroup({});
    isFreeDelivery: boolean = true;
    selectedDelivery: number = 2;

    delivery: {
        id: number;
        name: string;
        text: string;
        costDisplay: string;
        cost: number;
    }[] = [
        {
            id: 1,
            name: "Обычная доставка",
            text: "Введите ваш адрес, чтобы узнать когда вы получите заказ ",
            costDisplay: "500₽",
            cost: 500,
        },
        {
            id: 2,
            name: "Забрать в магазине",
            text: "Оплатите сейчас и заберите в магазине",
            costDisplay: "Бесплатно",
            cost: 0,
        },
    ];

    constructor(
        private storeData: StoreDataUserService,
        private subjectService: BehaviorSubjectService,
        private orderService: OrdersService,
        private cartService: CartService,
        private router: Router,
    ) {
        this.userData = {} as User;
        this.cart = [] as Cart[];
    }

    ngOnInit() {
        if (typeof window !== "undefined")
            this.userData = this.storeData.getUserData();

        this.orderForm = new FormGroup({
            email: new FormControl(this.userData.email, [
                Validators.email,
                Validators.required,
            ]),
            name: new FormControl(this.userData.name, [Validators.required]),
            lastname: new FormControl(this.userData.lastname),
            address: new FormControl("", [Validators.required]),
            tel: new FormControl("", [Validators.required]),
            delivery: new FormControl("Забрать в магазине", [
                Validators.required,
            ]),
        });

        this.cart = this.subjectService.getCart();
    }

    selectDelivery(name: string, id: number) {
        this.selectedDelivery = id;
        this.orderForm.controls["delivery"].setValue(name);
        this.isFreeDelivery = name === "Забрать в магазине";
    }

    getTotalCount() {
        return this.subjectService.getCountProductInCart();
    }

    getTotalCost() {
        return this.subjectService.getTotalCost();
    }

    onSubmit() {
        if (this.isFreeDelivery) {
            this.orderForm.controls["address"].setValue("Забрать в магазине");
        }
        if (this.orderForm.valid) {
            const products = this.cart;
            const summary = this.getTotalCost();
            this.orderService
                .createOrder({ ...this.orderForm.value, products, summary })
                .subscribe({
                    next: () => {
                        this.cartService.clearCart().subscribe();
                        this.subjectService.setCart([]);
                        return this.router.navigate(["/orders"]);
                    },
                });
        }
    }
}

@NgModule({
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        NgClass,
        CardBasketComponent,
        NgxMaskDirective,
        RouterLink,
        CardOrderComponent,
    ],
    exports: [CheckoutComponent],
    declarations: [CheckoutComponent],
    providers: [
        StoreDataUserService,
        BehaviorSubjectService,
        OrdersService,
        CartService,
    ],
})
export class CheckoutModule {}
