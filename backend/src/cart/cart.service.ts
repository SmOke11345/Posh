import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog } from "../models/Catalog";
import { Cart } from "../models/Cart";

@Injectable()
export class CartService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Получение всех товаров пользователя.
     * @param user_id - id пользователя
     */
    async getCart(user_id: number) {
        const cart: Cart[] = await this.prismaService.cart.findMany({
            where: {
                user_id,
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                catalogId: true,
            },
        });

        return cart.map((item) => {
            return {
                id: item.catalogId.id,
                title: item.catalogId.title,
                image: item.catalogId.images[0],
                cost: item.catalogId.cost,
                color: item.color,
                size: item.size,
                chapterAndType: item.chapterAndType,
                count: item.count,
            };
        });
    }

    /**
     * Добавление товара в корзину.
     * @param payload
     * @param user_id - id пользователя
     */
    async addToCart(
        payload: { catalog_id: number; size: string },
        user_id: number,
    ) {
        const prod: Catalog = await this.prismaService.catalog.findFirst({
            where: {
                id: payload.catalog_id,
            },
        });

        if (!prod) throw new ForbiddenException("Товар не найден");

        const cart: Cart = await this.prismaService.cart.findFirst({
            where: {
                user_id,
                catalog_id: payload.catalog_id,
                size: payload.size,
            },
        });

        if (cart) {
            return this.prismaService.cart.update({
                where: {
                    id: cart.id,
                },
                data: {
                    count: {
                        increment: 1,
                    },
                },
            });
        }

        return this.prismaService.cart.create({
            data: {
                ...payload,
                user_id,
                color: prod.description[prod.description.length - 2], // Сделано так потому что, все равно отсутствует логики отображения товара в зависимости от цвета, нет разного количества товаров для разных цветов и размеров.
                chapterAndType:
                    prod.gender + "/" + prod.chapter + "/" + prod.type,
            },
        });
    }

    /**
     * Удаление товара из корзины.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async removeFromCart(
        catalog_id: number,
        user_id: number,
    ): Promise<{ status: string }> {
        const prod = await this.prismaService.cart.deleteMany({
            where: {
                user_id,
                catalog_id,
            },
        });

        if (!prod.count) throw new ForbiddenException("Товар не найден");

        return {
            status: "Товар удален",
        };
    }

    /**
     * Удаление всех товаров из корзины.
     * @param user_id - id пользователя
     */
    async clearCart(user_id: number): Promise<{ status: string }> {
        const prods = await this.prismaService.cart.deleteMany({
            where: {
                user_id,
            },
        });

        if (!prods) throw new ForbiddenException("Товаров не найдено!");

        return {
            status: "Корзина пуста",
        };
    }

    /**
     * Увеличение количества товара.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async incrementProduct(
        catalog_id: number,
        user_id: number,
    ): Promise<{ status: string }> {
        const { count } = await this.prismaService.cart.findFirst({
            where: {
                user_id,
                catalog_id,
            },
        });

        const { countProduct }: Catalog =
            await this.prismaService.catalog.findFirst({
                where: {
                    id: catalog_id,
                },
            });

        if (count >= countProduct)
            throw new NotFoundException("Товар закончился");

        await this.prismaService.cart.updateMany({
            where: {
                user_id,
                catalog_id,
            },
            data: {
                count: {
                    increment: 1,
                },
            },
        });

        return {
            status: "Товар увеличен на 1",
        };
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async decrementProduct(
        catalog_id: number,
        user_id: number,
    ): Promise<{ status: string }> {
        const { count } = await this.prismaService.cart.findFirst({
            where: {
                user_id,
                catalog_id,
            },
        });

        if (count === 1) return await this.removeFromCart(catalog_id, user_id);

        await this.prismaService.cart.updateMany({
            where: {
                user_id,
                catalog_id,
            },
            data: {
                count: {
                    decrement: 1,
                },
            },
        });

        return {
            status: "Товар уменьшен на 1",
        };
    }

    /**
     * Проверка есть ли товар в корзине.
     * @param catalog_id
     * @param user_id
     */
    async isCart(user_id: number, catalog_id: number): Promise<boolean> {
        const condition = await this.prismaService.cart.findFirst({
            where: {
                user_id,
                catalog_id,
            },
        });

        return !!condition;
    }
}
