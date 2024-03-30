import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

@NgModule({
    exports: [],
    imports: [CommonModule, HttpClientModule],
    providers: [HttpClient],
})
export class ServiceModule {}
