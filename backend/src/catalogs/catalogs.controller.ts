import {
    Controller,
    Get,
    Post,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";

/**
 * Локальное хранилище данных.
 * нужно для проверки изображений и отправки их в облачное хранилище
 */
const storage = multer.diskStorage({
    destination: "./assets/images",
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
    ) {
        return this.catalogsService.create(request.body, files);
    }

    /**
     * Получение товаров из каталога для слайдеров.
     */
    @Get("get-prods-carousel")
    async getProdCarousel() {
        return this.catalogsService.getProdCarousel();
    }
}
