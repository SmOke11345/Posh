import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../../components/Header/header.component";
import { FooterComponent } from "../../components/Footer/footer.component";
import { ServiceModule } from "../../services/service.module";
import { RegisterModule } from "../register/register.component";
import { LoginModule } from "../login/login.component";
import { CommonModule } from "@angular/common";
import { ProfileModule } from "../profile/profile.component";
import { StoreDataUserService } from "../../utils/storeDataUser.service";
import { CartModule } from "../cart/cart.component";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [
        CartModule,
        ProfileModule,
        ServiceModule,
        RegisterModule,
        LoginModule,
        CommonModule,
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
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
            this.router.navigate(["/profile"]);
        }
    }
}
