import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthService } from "../pages/auth/auth.service";
import { UsersService } from "../pages/profile/users.service";

@NgModule({
    exports: [],
    imports: [CommonModule, HttpClientModule],
    providers: [HttpClient],
})
export class ServiceModule {}
