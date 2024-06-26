import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";

import { User } from "../models/User";
import { jwtConstants } from "./utils/jwtConstants";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcryptjs";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
        private mailService: MailService,
    ) {}

    /**
     * Создание токена.
     * @param payload
     */
    async generateToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
        });
    }

    /**
     * Получение email.
     * @param email
     */
    async getEmail(email: string): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: { email },
        });
    }

    /**
     * Регистрация пользователя
     * @param user - данные пользователя
     */
    async register(user: User): Promise<User> {
        //Ищем пользователя в базе данных
        const foundedEmail = await this.getEmail(user.email);

        if (foundedEmail)
            throw new ForbiddenException("Такой E-mail уже существует");

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(user.password, 10);

        return this.prismaService.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });
    }

    /**
     * Валидация пользователя.
     * Получение данных пользователя.
     * @param email
     * @param password
     */
    async validateUser(email: string, password: string) {
        const user: any = await this.getEmail(email);

        if (user === null) throw new UnauthorizedException("E-mail не найден");

        if (!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException("Неверный пароль");

        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Аутентификация пользователя.
     * @param user - данные пользователя (id, email)
     */
    async singIn(user: User): Promise<string> {
        return this.generateToken({ sub: user.id, email: user.email });
    }

    /**
     * Отправка письма с кодом восстановления пароля.
     * @param email - e-mail пользователя
     */
    async resetPassword(email: string) {
        const foundedEmail = await this.getEmail(email);

        if (!foundedEmail)
            throw new ForbiddenException("Такой E-mail не существует");

        const token = this.jwtService.sign({ email }, { expiresIn: "1h" });

        return await this.mailService.resetPassword(email, token);
    }
}
