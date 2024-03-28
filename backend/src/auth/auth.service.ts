import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";

import { User } from "../models/User";
import * as bcrypt from "bcryptjs";
import { jwtConstants } from "./utils/jwtConstants";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prismaService: PrismaService,
    ) {}

    /**
     * Создание токена.
     * @param payload
     */
    async generateToken(payload: any) {
        return this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
        });
    }

    /**
     * Получение email.
     * @param email
     */
    async getEmail(email: string) {
        return await this.prismaService.user.findFirst({
            where: { email },
        });
    }

    /**
     * Регистрация пользователя
     * @param user
     */
    async register(user: User) {
        //Ищем пользователя в базе данных
        const foundedEmail = await this.getEmail(user.email);

        if (foundedEmail) {
            throw new ForbiddenException("Такой E-mail уже существует");
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Вместо цифр буквы
        const gender = user.gender === "1" ? "Мужской" : "Женский";

        return this.prismaService.user.create({
            data: {
                ...user,
                gender,
                password: hashedPassword,
            },
        });
    }

    async validateUser(email: string, password: string) {
        const user: any = await this.getEmail(email);

        if (user === null) {
            throw new UnauthorizedException("E-mail не найден");
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new UnauthorizedException("Неверный пароль");
        }

        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    /**
     * Аутентификация пользователя.
     * @param user
     */
    async singIn(user: User) {
        return this.generateToken({ sub: user.id, email: user.email });
    }
}
