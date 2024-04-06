import { Component, ElementRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, NgIf, NgForOf, NgClass],
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

    constructor(private el: ElementRef) {
        // TODO: Потом получить значение через behaviorSubject.
        this.cartCount = 0;
    }

    toggleMenu() {
        const menu = this.el.nativeElement.querySelector(".menu-burger");
        this.showMenu = !this.showMenu;

        if (this.showMenu) {
            document.body.style.overflow = "hidden";
            menu.style.display = "flex";
        } else {
            document.body.style.overflow = "auto";
            setTimeout(() => {
                menu.style.display = "none";
            }, 400);
        }
    }

    hideMenu() {
        this.showMenu = false;
        document.body.style.overflow = "auto";
    }
}
