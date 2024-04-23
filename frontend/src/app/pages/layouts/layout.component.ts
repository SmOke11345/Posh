import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ServiceModule } from "../../services/service.module";
import { RegisterModule } from "../auth/register/register.component";
import { LoginModule } from "../auth/login/login.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "../profile/profile.component";
import { StoreDataUserService } from "../../services/storeDataUser.service";
import { CartModule } from "../cart/cart.component";
import { FavoriteModule } from "../favorite/favorite.component";
import { ProductModule } from "../product/product.component";
import { OrderModule } from "../orders/orders.component";
import { CheckoutModule } from "../checkout/checkout.component";
import { ReviewModule } from "../reviews/reviews.component";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [
        OrderModule,
        CheckoutModule,
        CartModule,
        ProfileModule,
        FavoriteModule,
        ReviewModule,
        ProductModule,
        ServiceModule,
        RegisterModule,
        LoginModule,
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        OrderModule,
    ],
    providers: [RouterLink],
    template: `
        <div class="container">
            <div class="container-grid">
                <app-header></app-header>
                <router-outlet></router-outlet>
                <app-footer></app-footer>
            </div>
        </div>
    `,
    styleUrls: ["../../../styles.scss"],
})
export class LayoutComponent implements OnInit {
    constructor(
        private router: Router,
        private storeData: StoreDataUserService,
    ) {}

    ngOnInit() {
        const data = this.storeData.getUserData();
        if (data) {
            // TODO: Сделать в будущем
            // this.router.navigate(["/catalog"]);
        }
    }
}
