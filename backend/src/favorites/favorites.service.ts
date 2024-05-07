import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog, shortCatalog } from "../models/Catalog";
import { Favorite } from "../models/Favorite";

@Injectable()
export class FavoritesService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Получение избранных товаров.
     * @param user_id - id пользователя
     */
    async getFavorites(user_id: number): Promise<shortCatalog[]> {
        const favorites: Favorite[] =
            await this.prismaService.favorite.findMany({
                where: {
                    user_id,
                },
                include: {
                    catalogId: true,
                },
            });

        if (!favorites) throw new ForbiddenException("Товар не найден");

        return favorites.map((favorite) => {
            return {
                id: favorite.catalogId.id,
                title: favorite.catalogId.title,
                image: favorite.catalogId.images[0],
                cost: favorite.catalogId.cost,
                status: favorite.catalogId.status,
            };
        });
    }

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

        if (!prod) throw new ForbiddenException("Товар не найден");

        const _favorite = await this.prismaService.favorite.findFirst({
            where: {
                catalog_id,
            },
        });

        if (_favorite) throw new ForbiddenException("Товар уже в избранном");

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
    async removeFavorite(
        user_id: number,
        catalog_id: number,
    ): Promise<{ status: string }> {
        const _favorite = await this.prismaService.favorite.findFirst({
            where: {
                user_id,
                catalog_id,
            },
        });

        if (!_favorite) throw new ForbiddenException("Товар не найден");

        await this.prismaService.favorite.deleteMany({
            where: {
                user_id,
                catalog_id,
            },
        });

        return {
            status: "Удалено",
        };
    }
}
