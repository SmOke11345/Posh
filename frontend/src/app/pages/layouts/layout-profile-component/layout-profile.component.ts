import { Component } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { UsersService } from "../../../services/users.service";
import { NgClass, NgForOf } from "@angular/common";

@Component({
    selector: "app-layout-profile-component",
    standalone: true,
    templateUrl: "./layout-profile.component.html",
    styleUrl: "./layout-profile.component.scss",
    imports: [NgClass, NgForOf, RouterLink, RouterOutlet],
    providers: [UsersService],
})
export class LayoutProfileComponent {
    // TODO: Дописать routы
    navList: { name: string; link: string }[] = [
        {
            name: "Личные данные",
            link: "/profile",
        },
        {
            name: "Моя корзина",
            link: "/cart",
        },
        {
            name: "Мои заказы",
            link: "",
        },
        {
            name: "Мои отзывы",
            link: "",
        },
        {
            name: "Избранное",
            link: "/favorites",
        },
    ];

    constructor(
        public router: Router,
        private usersService: UsersService,
    ) {}
}
