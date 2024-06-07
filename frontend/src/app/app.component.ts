import { Component } from "@angular/core";
import {
    NavigationEnd,
    NavigationStart,
    Router,
    RouterOutlet,
} from "@angular/router";

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
            if (
                event instanceof NavigationStart ||
                event instanceof NavigationEnd
            ) {
                if (typeof window !== "undefined")
                    window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }
}
