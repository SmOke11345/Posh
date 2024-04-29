import {
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { Catalog, shortCatalog } from "../models/Catalog";

/**
 * Локальное хранилище данных.
 * нужно для проверки изображений и отправки их в облачное хранилище
 */
const storage = multer.diskStorage({
    destination: "./public/assets/images",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

@Controller("catalogs")
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) {}

    /**
     * Добавление которого товара в каталог.
     * @param request - данные товара
     * @param files
     */
    @UseGuards(JwtAuthGuard)
    @Post("create")
    @UseInterceptors(FilesInterceptor("images", 4, { storage: storage }))
    async create(
        @Request() request: any,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<Catalog> {
        return this.catalogsService.create(request.body, files);
    }

    /**
     * Получение товаров из каталога для слайдеров.
     */
    @Get("get-prods-carousel")
    async getProdCarousel(): Promise<shortCatalog[]> {
        return this.catalogsService.getProdCarousel();
    }

    /**
     * Получение товара по id.
     * @param id - id товара
     */
    @Get("/:id")
    async getProduct(@Param("id") id: string) {
        return this.catalogsService.getProduct(+id);
    }

    /**
     * Фильтрация/Сортировка товаров.
     * @param gender - пол
     * @param chapter - раздел
     * @param type - тип
     * @param sort - название поля сортировки
     * @param orderBy - desc|asc
     * @param colors
     * @param sizes
     */
    @Post()
    async filter(
        @Query("gender") gender: string,
        @Query("chapter") chapter: string,
        @Query("type") type: string,
        @Query("sort") sort: string,
        @Query("orderBy") orderBy: string,
        @Query("colors") colors: string,
        @Query("sizes") sizes: string,
    ) {
        return this.catalogsService.filter(
            gender,
            chapter,
            type,
            sort,
            orderBy,
            colors,
            sizes,
        );
    }
}
