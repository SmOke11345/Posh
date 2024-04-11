import { Component, NgModule } from "@angular/core";

@Component({
    selector: "app-orders",
    templateUrl: "./orders.component.html",
    styleUrl: "./orders.component.scss",
})
export class OrdersComponent {
    // TODO: Когда пользователь нажимает кнопку оставить отзыв появляется модальное окно.
}

@NgModule({
    declarations: [OrdersComponent],
    exports: [OrdersComponent],
    imports: [],
    providers: [],
})
export class OrdersModule {}
