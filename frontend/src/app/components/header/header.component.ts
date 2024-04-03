import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, NgIf, NgForOf],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    cartCount: number;
    linkList: { name: string; url: string }[] = [
        { name: "🔥Новинки", url: "" },
        {
            name: "Мужчинам",
            url: "/cart",
        },
        { name: "Женщинам", url: "" },
        { name: "🔍Поиск", url: "" },
    ];

    showMenu: boolean = false;

    constructor() {
        // TODO: Потом получить значение через behaviorSubject.
        this.cartCount = 0;
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;

        if (this.showMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }

    hideMenu() {
        this.showMenu = false;
        document.body.style.overflow = "auto";
    }
}
