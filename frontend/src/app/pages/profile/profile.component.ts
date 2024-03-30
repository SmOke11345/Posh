import { Component, NgModule } from "@angular/core";
import { UsersService } from "../../services/users.service";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
    // TODO: получить данные пользователя
    constructor(private usersService: UsersService) {}
}

@NgModule({
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    imports: [],
    providers: [UsersService],
})
export class ProfileModule {}
