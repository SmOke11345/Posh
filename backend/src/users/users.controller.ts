import { Controller, Patch, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { User } from "../models/User";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    /**
     * Изменение данные пользователя. Как всех, так и по отдельности.
     * Для страницы profile
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Patch("profile")
    async patchUserData(@Request() request: any): Promise<User> {
        return this.usersService.patchUserData(request.user.sub, request.body);
    }

    /**
     * Изменение пароля пользователя.
     * Для страницы reset-password
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Patch("reset-password")
    async patchUserPassword(@Request() request: any): Promise<User> {
        return this.usersService.patchUserPassword(
            request.user.email,
            request.body.password,
        );
    }
}
