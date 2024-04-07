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
     * Добавление товара в корзину.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async addToCart(catalog_id: number, user_id: number) {
        const prod: Catalog = await this.prismaService.catalog.update({
            where: {
                id: catalog_id,
            },
            data: {
                isCart: true,
            },
        });

        if (!prod) {
            throw new ForbiddenException("Товар не найден");
        }

        return this.prismaService.cart.create({
            data: {
                user_id,
                catalog_id,
            },
        });
    }

    /**
     * Получение всех товаров пользователя.
     * @param user_id
     */
    async getCart(user_id: number) {
        return this.prismaService.cart.findMany({
            where: {
                user_id,
            },
        });
    }

    /**
     * Удаление товара из корзины.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async removeFromCart(catalog_id: number, user_id: number) {
        const prod: Cart = await this.prismaService.cart.deleteMany({
            where: {
                user_id,
                catalog_id,
            },
        });

        if (!prod) {
            throw new ForbiddenException("Товар не найден");
        }

        return prod;
    }

    // TODO: При покупке товара убирать количество купленного товара из countProduct (к примеру , было 20 позиций, пользователь купил 2 => countProduct = 18)

    /**
     * Удаление всех товаров из корзины.
     * @param user_id
     */
    async clearCart(user_id: number) {
        const prods: Cart = await this.prismaService.cart.deleteMany({
            where: {
                user_id,
            },
        });

        if (!prods) {
            throw new ForbiddenException("Товаров не найдено!");
        }

        return prods;
    }

    /**
     * Увеличение количества товара.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async incrementProduct(catalog_id: number, user_id: number) {
        const prod: Cart = await this.prismaService.cart.updateMany({
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

        const { countProduct }: Catalog =
            await this.prismaService.catalog.findFirst({
                where: {
                    id: catalog_id,
                },
            });

        if (prod.count >= countProduct) {
            throw new NotFoundException("Товар закончился");
        }

        return prod;
    }

    /**
     * Уменьшение количества товара.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     */
    async decrementProduct(catalog_id: number, user_id: number) {
        const prod: Cart = await this.prismaService.cart.updateMany({
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

        if (prod.count === 0) {
            return await this.removeFromCart(catalog_id, user_id);
        }

        return prod;
    }
}
