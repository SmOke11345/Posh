import { Component, NgModule } from "@angular/core";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.scss",
})
export class CartComponent {}

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    // imports: [],
    providers: [],
})
export class CartModule {}
