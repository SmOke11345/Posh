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

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit {
    orderForm: FormGroup = new FormGroup({});
    cart: Cart[];
    userData: User;
    selectedDelivery: number = 1;
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
    ) {
        this.userData = {} as User;
        this.cart = [] as Cart[];
    }

    ngOnInit() {
        if (typeof window !== "undefined")
            this.userData = this.storeData.getUserData();
        console.log(this.userData);

        this.orderForm = new FormGroup({
            email: new FormControl(this.userData.email, [
                Validators.email,
                Validators.required,
            ]),
            name: new FormControl(this.userData.name, [Validators.required]),
            lastname: new FormControl(this.userData.lastname),
            address: new FormControl("", [Validators.required]),
            phone: new FormControl("", [Validators.required]),
            delivery: new FormControl("Обычная доставка", [
                Validators.required,
            ]),
        });

        this.cart = this.subjectService.getCart();
    }

    selectDelivery(name: string, id: number) {
        this.selectedDelivery = id;
        this.orderForm.controls["delivery"].setValue(name);
    }

    getTotalCount() {
        return this.subjectService.getCountProductInCart();
    }

    getTotalCost() {
        return this.subjectService.getTotalCost();
    }

    onSubmit() {
        console.log(this.orderForm.controls["delivery"]);
    }
}

@NgModule({
    imports: [ReactiveFormsModule, NgForOf, NgIf, NgClass, CardBasketComponent],
    exports: [CheckoutComponent],
    declarations: [CheckoutComponent],
    providers: [StoreDataUserService, BehaviorSubjectService],
})
export class CheckoutModule {}
