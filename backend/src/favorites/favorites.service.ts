import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog } from "../models/Catalog";

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Добавление товара в избранное.
     * @param user_id - id пользователя
     * @param catalog_id - id товара
     */
    async addFavorite(user_id: number, catalog_id: number) {
        const prod: Catalog = await this.prismaService.catalog.findFirst({
            where: {
                id: catalog_id,
            },
        });

        if (!prod) {
            throw new ForbiddenException("Товар не найден");
        }

        return this.prismaService.favorite.create({
            data: {
                user_id,
                catalog_id,
            },
        });
    }

    /**
     * Удаление товара из избранного.
     * @param user_id - id пользователя
     * @param catalog_id - id товара
     */
    async removeFavorite(user_id: number, catalog_id: number) {
        return this.prismaService.favorite.deleteMany({
            where: {
                user_id,
                catalog_id,
            },
        });
    }
}
