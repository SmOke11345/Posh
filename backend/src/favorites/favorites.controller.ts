import {
    Controller,
    Delete,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { shortCatalog } from "../models/Catalog";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    /**
     * Получение избранных товаров.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Get("")
    async getFavorites(@Request() request: any): Promise<shortCatalog[]> {
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
    async removeFavorite(@Request() request: any): Promise<{ status: string }> {
        return this.favoritesService.removeFavorite(
            request.user.sub,
            request.body.catalog_id,
        );
    }
}
