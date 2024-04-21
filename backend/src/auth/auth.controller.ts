import {
    Body,
    Controller,
    Post,
    Request,
    Session,
    UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../models/User";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * Регистрация пользователя
     * @param user - данные пользователя
     */
    @Post("register")
    async register(@Body() user: User): Promise<User> {
        return this.authService.register(user);
    }

    /**
     * Аутентификация пользователя.
     * @param request - объект запроса
     * @param session - данные сессии
     */
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(
        @Request() request: any,
        @Session() session: Record<string, any>,
    ) {
        const token = await this.authService.singIn(request.user);

        return {
            access_token: token,
            data: session,
        };
    }
}
