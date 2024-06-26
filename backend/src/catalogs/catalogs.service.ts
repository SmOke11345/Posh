import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { Catalog, shortCatalog } from "../models/Catalog";
import { Cloud } from "../models/cloud";
import * as Cloudinary from "cloudinary";
import * as fs from "fs";
import { FilterDto } from "./dto/FilterDto";

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
    async getProdCarousel(): Promise<shortCatalog[]> {
        const randomNumbers = this.randomCatalogsId(12);
        const prod: Catalog[] = await this.prismaService.catalog.findMany({
            where: {
                id: { in: randomNumbers },
            },
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

    randomCatalogsId(count: number): number[] {
        const numbers: number[] = [];
        for (let i = 0; i <= count; i++) {
            if (numbers.length <= count) {
                const random = Math.floor(Math.random() * 48) + 1;
                if (!numbers.includes(random)) numbers.push(random);
            }
        }
        return numbers;
    }

    /**
     * Фильтрация/сортировка товаров
     * @param filterDto
     */
    async filter(filterDto: FilterDto) {
        let { sizes, sort, orderBy, colors, gender, type, chapter, search } =
            filterDto;
        const limit: number = 8;

        if (!sizes) sizes = "";
        if (!colors) colors = "";
        if (!sort) sort = "createdAt";
        if (!orderBy) orderBy = "desc";

        if (sort[0] === "-") sort = sort.replace("-", "");

        const filtered: Catalog[] = await this.prismaService.catalog.findMany({
            where: {
                ...(chapter ? { chapter } : {}),
                ...(type ? { type } : {}),
                ...(gender ? { gender } : {}),
                ...(sizes ? { sizes: { hasEvery: sizes.split(",") } } : {}),
                ...(colors
                    ? {
                          colors: {
                              hasEvery: colors
                                  .split(",")
                                  .map((item) => "#" + item),
                          },
                      }
                    : {}),
                ...(search
                    ? {
                          OR: [
                              {
                                  title: {
                                      contains: search,
                                      mode: "insensitive",
                                  },
                              },
                          ],
                      }
                    : {}),
            },
            orderBy: { [sort]: orderBy },
        });

        if (filtered.length === 0)
            throw new ForbiddenException("По вашему запросу ничего не найдено");

        const preparedItems = filtered.map((item) => {
            let {
                description,
                sizes,
                colors,
                type,
                chapter,
                gender,
                images,
                ...rest
            } = item;

            return {
                ...rest,
                image: images[0],
            };
        });

        const pagination = Math.round(filtered.length / limit);

        return {
            countPage: pagination,
            colors: await this.getColors(filtered),
            sizes: await this.getSizes(filtered),
            items: [...preparedItems],
        };
    }

    /**
     * Получение всех имеющихся цветов в каталоге.
     */
    async getColors(data: Catalog[]) {
        const prepareColors = data
            .map((item) => {
                return item.colors;
            })
            .flat();

        return [...new Set(prepareColors)];
    }

    /**
     * Получение всех имеющихся размеров в каталоге.
     */
    async getSizes(data: Catalog[]) {
        const prepareSizes = data
            .map((item) => {
                return item.sizes;
            })
            .flat();

        return [...new Set(prepareSizes)].sort((a, b) => +a - +b);
    }

    async search(value: string) {
        const searchProd = await this.prismaService.catalog.findMany({
            where: {
                title: {
                    contains: value,
                    mode: "insensitive", // без учета регистра
                },
            },
            distinct: ["title"], // Только уникальные значения
        });

        if (searchProd.length === 0)
            throw new ForbiddenException("По вашему запросу ничего не найдено");

        return searchProd.map((item) => {
            let { title } = item;
            return { title };
        });
    }
}
