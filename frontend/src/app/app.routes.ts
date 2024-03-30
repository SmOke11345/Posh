import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LayoutComponent } from "./pages/layouts/layout.component";
import { Pages } from "./models/enums/pages";
import { LayoutProfileComponent } from "./pages/layouts/layout-profile-component/layout-profile.component";
import { ProfileComponent } from "./pages/profile/profile.component";

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
                path: "",
                title: "Профиль",
                component: LayoutProfileComponent,
                children: [
                    {
                        path: Pages.PROFILE,
                        title: "Профиль",
                        component: ProfileComponent,
                    },
                ],
            },
        ],
    },
];
