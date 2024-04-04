import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller("catalogs")
export class CatalogsController {
    constructor(private readonly catalogsService: CatalogsService) {}

    /**
     * Добавление которого товара в каталог.
     * @param request - данные товара
     */
    @UseGuards(JwtAuthGuard)
    @Post("create")
    async create(@Request() request: any) {
        return this.catalogsService.create(request.body);
    }

    /**
     * Получение товаров из каталога для слайдеров.
     */
    @Get("get-prods-carousel")
    async getProdCarousel() {
        return this.catalogsService.getProdCarousel();
    }
}
