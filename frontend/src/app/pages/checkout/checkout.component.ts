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
import { NavigationStart, Router, RouterLink } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CardOrderComponent } from "../../components/cards/card-order/card-order.component";
import { Subscription } from "rxjs";

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit {
    dataCheckout: Cart[];
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

    private readonly subRouter: Subscription;

    constructor(
        private storeData: StoreDataUserService,
        private subjectService: BehaviorSubjectService,
        private orderService: OrdersService,
        private cartService: CartService,
        private router: Router,
    ) {
        this.userData = {} as User;
        this.dataCheckout = [] as Cart[];
        this.subjectService.checkout$.subscribe((data) => {
            this.dataCheckout = data;
        });
        this.subRouter = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                if (event) {
                    this.subjectService.setCheckout([]);
                    // TODO: Удалить товар из корзины после перехода на другую страницу. Либо сделать получение ICatalog в product другим способом, без добавления в корзину.
                    this.cartService.removeFromCart(this.dataCheckout[0].id);
                }
            }
        });
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
            const products = this.dataCheckout;
            const summary = this.getTotalCost();
            this.orderService
                .createOrder({ ...this.orderForm.value, products, summary })
                .subscribe({
                    next: () => {
                        this.cartService.clearCart().subscribe();
                        this.subjectService.setCheckout([]);
                        return this.router.navigate(["/orders"]);
                    },
                });
        }
    }

    ngOnDestroy() {
        if (this.subRouter) this.subRouter.unsubscribe();
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
