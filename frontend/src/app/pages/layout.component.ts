import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HeaderComponent } from "../components/Header/header.component";
import { FooterComponent } from "../components/Footer/footer.component";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
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
