import {
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { Order } from "../models/Order";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    /**
     * Добавление нового заказа.
     * @param request - id пользователя и данные о заказе
     */
    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createOrder(@Request() request: any): Promise<Order> {
        return this.ordersService.createOrder(request.user.sub, request.body);
    }

    /**
     * Получение всех заказов пользователя.
     * @param request - id пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Get("get-user-orders")
    async getUserOrders(@Request() request: any): Promise<Order[]> {
        return this.ordersService.getUserOrders(request.user.sub);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/:id")
    async getOrder(
        @Request() request: any,
        @Param("id") id: string,
    ): Promise<Order> {
        return this.ordersService.getOrder(request.user.sub, +id);
    }
}
