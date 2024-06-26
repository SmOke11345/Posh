import {
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller("cart")
export class CartController {
    constructor(private readonly cartService: CartService) {}

    /**
     * Получение всех товаров пользователя.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Get("")
    async getCart(@Request() request: any) {
        return this.cartService.getCart(request.user.sub);
    }

    /**
     * Добавление товара в корзину.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addToCart(@Request() request: any) {
        return this.cartService.addToCart(request.body, request.user.sub);
    }

    /**
     * Удаление товара из корзины.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Delete("remove")
    async removeFromCart(@Request() request: any): Promise<{ status: string }> {
        return this.cartService.removeFromCart(
            request.body.catalog_id,
            request.user.sub,
        );
    }

    /**
     * Удаление всех товаров из корзины.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Delete("clear")
    async clearCart(@Request() request: any): Promise<{ status: string }> {
        return this.cartService.clearCart(request.user.sub);
    }

    /**
     * Увеличение количества товара.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Patch("increment")
    async incrementProduct(
        @Request() request: any,
    ): Promise<{ status: string }> {
        return this.cartService.incrementProduct(
            request.body.catalog_id,
            request.user.sub,
        );
    }

    /**
     * Уменьшение количества товара.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Patch("decrement")
    async decrementProduct(
        @Request() request: any,
    ): Promise<{ status: string }> {
        return this.cartService.decrementProduct(
            request.body.catalog_id,
            request.user.sub,
        );
    }

    /**
     * Проверка является ли товар в корзине.
     * @param request
     * @param id
     */
    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getStatusCartItem(
        @Request() request: any,
        @Param("id") id: string,
    ): Promise<{ isCart: boolean; isFavorite: boolean }> {
        return this.cartService.getStatusCartItem(request.user.sub, +id);
    }
}
