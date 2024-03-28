import { ForbiddenException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        // Изначально ожидает получить username и password,
        // меняем это поведение и ожидаем получить
        super({
            usernameField: "email",
            passwordField: "password",
        });
    }

    /**
     * Вывод данных пользователя после успешной аутентификации.
     * @param email
     * @param password
     */
    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new ForbiddenException("E-mail не найден");
        }

        return user;
    }
}
