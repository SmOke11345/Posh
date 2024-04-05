import { Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog } from "../models/Catalog";
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
    async create(payload: Catalog, files: Array<Express.Multer.File>) {
        const images: string[] = [];

        for (const file of files) {
            const imageUrl = await Cloudinary.v2.uploader.upload(file.path);
            await fs.promises.unlink(file.path); // Удаление изображений после загрузки в облачное хранилище
            images.push(imageUrl.secure_url);
        }

        const catalogItem: Catalog = await this.prismaService.catalog.create({
            data: {
                ...payload,
                images,
            },
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
