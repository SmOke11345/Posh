import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Поиск пользователя по id.
     * @param id
     */
    async getUserById(id: number) {
        return this.prismaService.user.findFirst({
            where: { id },
        });
    }
}
