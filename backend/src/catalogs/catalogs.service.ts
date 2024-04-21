import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog, shortCatalog } from "../models/Catalog";
import { Cloud } from "../models/cloud";
import * as Cloudinary from "cloudinary";
import * as fs from "fs";

@Injectable()
export class CatalogsService {
    constructor(private prismaService: PrismaService) {
        /**
         * Конфигурация облачного хранилища.
         */
        Cloudinary.v2.config({
            cloud_name: Cloud.CLOUD_NAME,
            api_key: Cloud.API_KEY,
            api_secret: Cloud.API_SECRET,
        });
    }

    /**
     * Добавление нового товара в каталог.
     * @param payload - данные товара
     * @param files - изображения
     */
    async create(
        payload: Catalog,
        files: Array<Express.Multer.File>,
    ): Promise<Catalog> {
        const images: string[] = [];

        for (const file of files) {
            const imageUrl = await Cloudinary.v2.uploader.upload(file.path);
            await fs.promises.unlink(file.path); // Удаление изображений после загрузки в облачное хранилище
            images.push(imageUrl.secure_url);
        }

        // TODO: Можно добавить валидацию

        return await this.prismaService.catalog.create({
            data: {
                ...payload,
                images,
                cost: +payload.cost,
                countProduct: +payload.countProduct,
                // TODO: потом пофиксить
                review: {},
            },
        });
    }

    /**
     * Получение товара по id.
     * @param id - id товара
     */
    async getProduct(id: number) {
        const prod: Catalog = await this.prismaService.catalog.findFirst({
            where: {
                id,
            },
        });

        const preparedDescription = this.preparedDescription(prod.description);

        return {
            ...prod,
            description: preparedDescription,
        };
    }

    preparedDescription(payload: string[]): {
        titles: string[];
        texts: string[];
    } {
        const titles: string[] = [];
        const texts: string[] = [];

        payload.forEach((item) => {
            let _item = item.split(" - ");
            titles.push(_item.slice(0, 1).join(" "));
            texts.push(_item.slice(1, 2).join(" "));
        });

        return {
            titles,
            texts,
        };
    }

    /**
     * Получение товаров из каталога для слайдеров.
     */
    // TODO: Сделать рандомное получение 12-ти товаров.
    async getProdCarousel(): Promise<shortCatalog[]> {
        const prod: Catalog[] = await this.prismaService.catalog.findMany({
            where: {
                createdAt: {
                    lt: new Date(), // lt - меньше чем
                },
            },
            take: 12,
        });

        // Превращение типа Catalog в shortCatalog
        return prod.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image: item.images[0],
                cost: item.cost,
                status: item.status,
            };
        });
    }
}
