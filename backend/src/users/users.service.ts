import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { User } from "../models/User";

import * as bcrypt from "bcryptjs";
import { AuthService } from "../auth/auth.service";

// TODO: Получение отзывов пользователя.
@Injectable()
export class UsersService {
    constructor(
        private prismaService: PrismaService,
        private authService: AuthService,
    ) {}

    /**
     * Поиск пользователя по id.
     * @param id - id пользователя
     */
    async getUserById(id: number) {
        return this.prismaService.user.findFirst({
            where: { id },
        });
    }

    /**
     * Изменение данных пользователя.
     * @param id - id пользователя
     * @param data - данные которые нужно изменить.
     */
    async patchUserData(id: number, data: User) {
        if (data.password) {
            if (data.password.length < 8)
                throw new ForbiddenException("Не менее 8 символов");

            data.password = await bcrypt.hash(data.password, 10);
        }

        if (data.email) {
            const foundedEmail = await this.authService.getEmail(data.email);

            if (foundedEmail)
                throw new ForbiddenException("Такой E-mail уже существует");
        }

        return this.prismaService.user.update({
            where: { id },
            data: {
                ...data,
            },
        });
    }
}
