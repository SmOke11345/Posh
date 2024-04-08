import { Component, DoCheck, ElementRef } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { CartService } from "../../pages/cart/cart.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, NgIf, NgForOf, NgClass],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements DoCheck {
    linkList: { name: string; url: string }[] = [
        { name: "🔥Новинки", url: "" },
        {
            name: "Мужчинам",
            url: "/cart",
        },
        { name: "Женщинам", url: "" },
        { name: "🔍Поиск", url: "" },
    ];
    cartCount: number = 0;
    showMenu: boolean = false;

    constructor(
        private el: ElementRef,
        private cartService: CartService,
    ) {
        this.cartService.getCart().subscribe((data) => {
            this.cartCount = data.length;
        });
    }

    // TODO: Сделать динамическое обновление количества корзины.
    ngDoCheck() {
        // if (this.cartCount !== this.cartService.getCart()) {
        //     this.cartCount = this.cartService.getCartCount();
        // }
    }

    /**
     * Показать/скрыть меню.
     */
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

    /**
     * Скрыть меню при нажатии на ссылку.
     */
    hideMenu() {
        this.showMenu = false;
        document.body.style.overflow = "auto";
    }
}
