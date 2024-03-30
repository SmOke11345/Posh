import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import * as Url from "url";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    // Потом получить значение через behaviorSubject или может подключить глобальный стейт.
    cartCount: number = 0;
}
