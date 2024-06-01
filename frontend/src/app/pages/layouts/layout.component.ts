import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ServiceModule } from "../../services/service.module";
import { RegisterModule } from "../auth/register/register.component";
import { LoginModule } from "../auth/login/login.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "../profile/profile.component";
import { CartModule } from "../cart/cart.component";
import { FavoriteModule } from "../favorite/favorite.component";
import { ProductModule } from "../product/product.component";
import { OrderModule } from "../orders/orders.component";
import { CheckoutModule } from "../checkout/checkout.component";
import { ReviewModule } from "../reviews/reviews.component";
import { CatalogModule } from "../catalog/catalog.component";
import { MainModule } from "../main/main.component";
import { FixedDirective } from "../../directives/fixed.directive";
import { CatalogService } from "../catalog/catalog.service";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";

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
        CatalogModule,
        MainModule,
        FixedDirective,
    ],
    providers: [RouterLink],
    template: `
        <div class="container">
            <div class="container-grid">
                <app-header></app-header>
                <router-outlet></router-outlet>
                <app-footer></app-footer>
            </div>
            <div class="scroll-up" fixed (click)="scrollTop()"></div>
        </div>
    `,
    styleUrls: ["../../../styles.scss"],
})
export class LayoutComponent implements OnInit {
    constructor(
        private subject: BehaviorSubjectService,
        private catalogService: CatalogService,
    ) {}

    ngOnInit() {
        this.catalogService.getProdCarousel().subscribe((data) => {
            this.subject.setSlider(data);
        });
    }

    scrollTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}
