import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../components/Header/header.component";
import { FooterComponent } from "../components/Footer/footer.component";
import { ServiceModule } from "../services/service.module";
import { RegisterModule } from "./register/register.component";
import { LoginModule } from "./login/login.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [
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
    styleUrls: ["../../styles.scss"],
})
export class LayoutComponent {}
