import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { LayoutComponent } from "./pages/layout.component";
import { Pages } from "./models/enums/pages";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
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
        ],
    },
];
