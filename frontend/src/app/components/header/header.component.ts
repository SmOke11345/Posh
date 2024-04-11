import { Component, DoCheck, ElementRef, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubjectService } from "../../services/behavior-subject.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [RouterLink, NgIf, NgForOf, NgClass],
    providers: [BehaviorSubjectService],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit, DoCheck {
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
        private subjectService: BehaviorSubjectService,
    ) {}

    ngOnInit() {
        this.setCartCount();
    }

    ngDoCheck() {
        if (this.cartCount !== this.subjectService.getCountProductInCart()) {
            this.setCartCount();
        }
    }

    setCartCount() {
        this.cartCount = this.subjectService.getCountProductInCart();
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
