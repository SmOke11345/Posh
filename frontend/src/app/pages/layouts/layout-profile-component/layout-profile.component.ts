import { Component, DoCheck, OnInit } from "@angular/core";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { UsersService } from "../../profile/users.service";
import { NgClass, NgForOf } from "@angular/common";
import { StoreDataUserService } from "../../../services/storeDataUser.service";
import { User } from "../../../models/User";

@Component({
    selector: "app-layout-profile-component",
    standalone: true,
    templateUrl: "./layout-profile.component.html",
    styleUrl: "./layout-profile.component.scss",
    imports: [NgClass, NgForOf, RouterLink, RouterOutlet],
    providers: [UsersService, StoreDataUserService],
})
export class LayoutProfileComponent implements OnInit, DoCheck {
    // TODO: Дописать links
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
            link: "/favorite",
        },
    ];

    userData: User;

    constructor(
        public router: Router,
        private usersService: UsersService,
        private storeData: StoreDataUserService,
    ) {
        this.userData = {} as User;
    }

    ngOnInit() {
        // Для SSR
        if (typeof window !== "undefined")
            this.userData = this.storeData.getUserData();
    }

    ngDoCheck() {
        if (this.userData !== this.storeData.getUserData()) {
            this.userData = this.storeData.getUserData();
        }
    }
}
