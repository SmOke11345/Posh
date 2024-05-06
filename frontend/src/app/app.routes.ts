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
import { ProductComponent } from "./pages/product/product.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ReviewsComponent } from "./pages/reviews/reviews.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { OrderComponent } from "./pages/order/order.component";
import { CatalogComponent } from "./pages/catalog/catalog.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { MainComponent } from "./pages/main/main.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: Pages.MAIN,
        pathMatch: "full",
    },
    {
        path: Pages.PROFILE,
        redirectTo: `${Pages.PROFILE}`,
    },
    {
        path: "auth",
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
        ],
    },
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: Pages.CART,
                title: "Корзина",
                component: CartComponent,
                canActivate: [AuthGuard],
            },
            {
                path: Pages.CHECKOUT,
                title: "Оформление заказа",
                component: CheckoutComponent,
                canActivate: [AuthGuard],
            },
            {
                path: `${Pages.PRODUCT}/:id`,
                component: ProductComponent,
            },
            {
                path: Pages.CATALOG,
                title: "Каталог",
                component: CatalogComponent,
            },
            {
                path: Pages.MAIN,
                title: "Главная",
                component: MainComponent,
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
                        path: Pages.REVIEW,
                        title: "Мои отзывы",
                        component: ReviewsComponent,
                    },
                    {
                        path: Pages.FAVORITE,
                        title: "Избранное",
                        component: FavoriteComponent,
                    },
                    {
                        path: Pages.ORDER,
                        title: "Мои заказы",
                        component: OrdersComponent,
                    },
                    {
                        path: `${Pages.ORDER}/:id`,
                        title: "Заказ",
                        component: OrderComponent,
                    },
                ],
            },
            {
                path: "**",
                title: "Страница не найдена",
                component: NotFoundComponent,
            },
        ],
    },
];
