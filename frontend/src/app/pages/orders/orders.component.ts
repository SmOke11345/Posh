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
    // TODO: Когда пользователь нажимает кнопку оставить отзыв появляется модальное окно.
    dataOrders: Order[];

    constructor(private ordersService: OrdersService) {
        this.dataOrders = [] as Order[];
    }

    ngOnInit() {
        this.ordersService.getUserOrders().subscribe({
            next: (data) => {
                console.log(data);
                this.dataOrders = data;
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
