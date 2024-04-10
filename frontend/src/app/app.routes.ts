import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LayoutComponent } from "./pages/layouts/layout.component";
import { Pages } from "./models/enums/pages";
import { LayoutProfileComponent } from "./pages/layouts/layout-profile-component/layout-profile.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { AuthGuard } from "./guards/auth.guard";
import { CartComponent } from "./pages/cart/cart.component";
import { FavoriteComponent } from "./pages/favorite/favorite.component";

// TODO: Когда пользователь заходит он попадает в main.
export const routes: Routes = [
    {
        path: "",
        redirectTo: Pages.LOGIN,
        pathMatch: "full",
    },
    {
        path: Pages.PROFILE,
        redirectTo: `${Pages.PROFILE}`,
    },
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: Pages.LOGIN,
                title: "Авторизация",
                component: LoginComponent,
            },
            {
                path: Pages.REGISTER,
                title: "Регистрация",
                component: RegisterComponent,
            },
            {
                path: Pages.CART,
                title: "Корзина",
                component: CartComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "",
                title: "Профиль",
                component: LayoutProfileComponent,
                canActivate: [AuthGuard],
                canActivateChild: [AuthGuard],
                children: [
                    {
                        path: Pages.PROFILE,
                        title: "Профиль",
                        component: ProfileComponent,
                    },
                    {
                        path: Pages.FAVORITE,
                        title: "Избранное",
                        component: FavoriteComponent,
                    },
                ],
            },
        ],
    },
];
