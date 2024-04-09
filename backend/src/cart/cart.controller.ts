import {
    Controller,
    Delete,
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
     * Добавление товара в корзину.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addToCart(@Request() request: any) {
        return this.cartService.addToCart(
            +request.body.catalog_id,
            +request.user.id,
        );
    }

    /**
     * Получение всех товаров пользователя.
     * @param request - данные пользователя
     */
    // @UseGuards(JwtAuthGuard)
    // @Get("")
    // async getCart(@Request() request: any) {
    //     return this.cartService.getCart(+request.user.id);
    // }

    /**
     * Удаление товара из корзины.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Delete("remove")
    async removeFromCart(@Request() request: any) {
        return this.cartService.removeFromCart(
            +request.body.catalog_id,
            +request.user.id,
        );
    }

    /**
     * Удаление всех товаров из корзины.
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Delete("clear")
    async clearCart(@Request() request: any) {
        return this.cartService.clearCart(+request.user.id);
    }

    /**
     * Увеличение количества товара.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Patch("increment")
    async incrementProduct(@Request() request: any) {
        return this.cartService.incrementProduct(
            +request.body.catalog_id,
            +request.user.id,
        );
    }

    /**
     * Уменьшение количества товара.
     * @param request - данные пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Patch("decrement")
    async decrementProduct(@Request() request: any) {
        return this.cartService.decrementProduct(
            +request.body.catalog_id,
            +request.user.id,
        );
    }
}
