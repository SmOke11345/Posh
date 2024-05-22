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
import { FilterDto } from "./dto/FilterDto";
import { Catalog, shortCatalog } from "../models/Catalog";
import * as multer from "multer";
// TODO: Если что может быть ошибка тут
import { FilesInterceptor } from "@nestjs/platform-express/multer/interceptors";

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
     * Функция для "Предложение товара" при поиске товара в каталоге.
     * @param search
     */
    @Get("search")
    async search(@Query("search") search: string) {
        return this.catalogsService.search(search);
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
     * @param filterDto - объект содержащий данные для фильтрации
     */
    @Get()
    async filter(@Query() filterDto: FilterDto) {
        return this.catalogsService.filter(filterDto);
    }
}
