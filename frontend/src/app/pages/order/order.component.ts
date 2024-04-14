import { Component, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrl: "./order.component.scss",
})
export class OrderComponent {
    // TODO: Когда пользователь нажимает кнопку оставить отзыв появляется модальное окно.
}

@NgModule({
    declarations: [OrderComponent],
    exports: [OrderComponent],
    imports: [FormsModule],
    providers: [],
})
export class OrderModule {}
