import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Order } from "../models/Order";

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Добавление нового заказа.
     * @param user_id - id пользователя
     * @param payload - данные о заказе
     */
    async createOrder(user_id: number, payload: any): Promise<Order> {
        const { products, ...rest } = payload;
        const preparedProducts = JSON.stringify(payload.products);

        const orders: Order = await this.prismaService.order.create({
            data: {
                user_id,
                ...rest,
                products: preparedProducts,
            },
        });

        for (const product of products) {
            await this.prismaService.catalog.update({
                where: {
                    id: product.id,
                },
                data: {
                    countProduct: {
                        decrement: product.count,
                    },
                },
            });
        }

        return orders;
    }

    /**
     * Получение всех заказов пользователя.
     * @param user_id
     */
    async getUserOrders(user_id: number): Promise<Order[]> {
        const orders: Order[] = await this.prismaService.order.findMany({
            where: {
                user_id,
            },
            include: {
                statusId: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!orders) {
            throw new ForbiddenException("Еще нет заказов");
        }

        return orders.map((order) => {
            const { statusId, status_id, createdAt, ...rest } = order;
            const date = this.prepareDate(createdAt);
            return {
                ...rest,
                products: JSON.parse(rest.products),
                status: statusId.name,
                date,
            };
        });
    }

    async getOrder(user_id: number, order_id: number) {
        const order: Order = await this.prismaService.order.findFirst({
            where: {
                id: order_id,
                user_id,
            },
            include: {
                statusId: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!order) {
            throw new ForbiddenException("Еще нет заказов");
        }

        const { statusId, status_id, createdAt, ...rest } = order;
        const date = this.prepareDate(createdAt);
        const tel = this.preparedTel(rest.tel);
        const costDelivery = rest.delivery === "Обычная доставка" ? 500 : 0;

        return {
            ...rest,
            products: JSON.parse(rest.products),
            status: statusId.name,
            date,
            tel,
            costDelivery,
        };
    }

    /**
     * Преобразование типа Date в string;
     * @param date
     */
    prepareDate(date: Date): string {
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];

        const _date = new Date(date);
        const day = date.getDate();
        const month = months[_date.getMonth()];

        return `${day} ${month}`;
    }

    /**
     * Определение формата телефона.
     * @param tel
     */
    preparedTel(tel: string) {
        return tel.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2-$3-$4");
    }

    // async deleteOrder(user_id: number, order_id: number) {
    //     const order = await this.prismaService.order.findFirst({
    //         where: {
    //             id: order_id,
    //             user_id,
    //         },
    //     });
    //
    //     if (!order) {
    //         return null;
    //     }
    //
    //     return await this.prismaService.order.delete({
    //         where: {
    //             id: order_id,
    //         },
    //     });
    // }

    // TODO: сделать функцию изменения статуса для админа
    // async changeStatusOrder(order_id: number, status_id: number) {}
}
