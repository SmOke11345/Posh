import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog } from "../models/Catalog";

@Injectable()
export class CatalogsService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Добавление нового товара в каталог.
     * @param payload - данные товара
     */
    async create(payload: Catalog) {
        const catalogItem: Catalog = await this.prismaService.catalog.create({
            data: { ...payload },
        });
        // TODO: Можно добавить валидацию

        return catalogItem;
    }

    /**
     * Получение товаров из каталога для слайдеров.
     */
    // TODO: Сделать рандомное получение 12-ти товаров.
    async getProdCarousel() {
        const prod: Catalog[] = await this.prismaService.catalog.findMany({
            where: {
                createdAt: "desc",
            },
            take: 12,
        });

        return prod;
    }
}
