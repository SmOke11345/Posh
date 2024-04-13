import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    /**
     * Получение избранных товаров.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Get("")
    async getFavorites(@Request() request: any) {
        return this.favoritesService.getFavorites(request.user.sub);
    }

    /**
     * Добавление товара в избранное.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addFavorite(@Request() request: any) {
        return this.favoritesService.addFavorite(
            request.user.sub,
            request.body.catalog_id,
        );
    }

    /**
     * Удаление товара из избранного.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Delete("remove")
    async removeFavorite(@Request() request: any) {
        return this.favoritesService.removeFavorite(
            request.user.sub,
            request.body.catalog_id,
        );
    }

    /**
     * Проверка является ли товар избранным.
     * @param request
     * @param id
     */
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async isFavorite(@Request() request: any, @Param("id") id: string) {
        return this.favoritesService.isFavorite(request.user.sub, +id);
    }
}
