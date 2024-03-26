import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: "Header",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    // Потом получить значение через behaviorSubject или может подключить глобальный стейт.
    cartCount: number = 0;
}
