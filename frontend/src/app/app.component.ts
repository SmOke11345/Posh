import { Component } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet],
    template: "<router-outlet></router-outlet>",
    styleUrls: ["../assets/scss/_normalize.scss"],
})
export class AppComponent {
    constructor(private router: Router) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }
}
