import { Component, NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrdersService } from "./orders.service";
import { Order } from "../../models/Order";
import { EmptyComponent } from "../../components/empty/empty.component";
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrl: "./orders.component.scss",
})
export class OrdersComponent implements OnInit {
    dataOrders: Order[];
    isLoading: boolean;

    constructor(private ordersService: OrdersService) {
        this.dataOrders = [] as Order[];
        this.isLoading = true;
    }

    // TODO: Сделать window.scrollTo(0, 0); при нажатии на кнопки.
    // TODO: Изменить баннер на странице main.

    ngOnInit() {
        this.ordersService.getUserOrders().subscribe({
            next: (data) => {
                this.dataOrders = data;
            },
            complete: () => {
                this.isLoading = false;
            },
        });
    }
}

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent],
    imports: [
        FormsModule,
        EmptyComponent,
        NgIf,
        NgForOf,
        RouterLink,
        NgClass,
        NgStyle,
    ],
    providers: [OrdersService],
})
export class OrderModule {}
