import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller("favorites")
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    /**
     * Добавление товара в избранное.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addFavorite(@Request() request: any) {
        return this.favoritesService.addFavorite(
            request.user.id,
            request.body.catalog_id,
        );
    }

    /**
     * Удаление товара из избранного.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Post("remove")
    async removeFavorite(@Request() request: any) {
        return this.favoritesService.removeFavorite(
            request.user.id,
            request.body.catalog_id,
        );
    }
}
