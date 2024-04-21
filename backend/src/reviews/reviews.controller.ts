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
import { ReviewsService } from "./reviews.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { Review } from "../models/Review";

@Controller("reviews")
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    /**
     * Получение отзывов пользователя.
     * @param request - id пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Get("get-user-reviews")
    async getUserReviews(@Request() request: any) {
        return this.reviewsService.getUserReviews(request.user.sub);
    }

    /**
     * Получение списка всех отзывов.
     * @param id - id товара
     */
    @Get("/:id")
    async getReviews(
        @Param("id") id: string,
    ): Promise<{ average_rating: number; reviews: Review[] }> {
        return this.reviewsService.getReviews(+id);
    }

    /**
     * Добавление отзыва.
     * @param id - id товара
     * @param request - данные отзыва
     */
    @UseGuards(JwtAuthGuard)
    @Post("create/:id")
    async createReview(
        @Param("id") id: string,
        @Request() request: any,
    ): Promise<Review> {
        return this.reviewsService.createReview(
            +id,
            request.user.sub,
            request.body,
        );
    }

    /**
     * Удаление отзыва.
     * @param id - id отзыва
     * @param request - id пользователя
     */
    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    async deleteReview(
        @Param("id") id: string,
        @Request() request: any,
    ): Promise<{ message: string }> {
        return this.reviewsService.deleteReview(+id, request.user.sub);
    }

    /**
     * Изменение текста отзыва.
     * @param id - id отзыва
     * @param request - данные отзыва
     */
    @UseGuards(JwtAuthGuard)
    @Patch("update/:id")
    async updateReview(
        @Param("id") id: string,
        @Request() request: any,
    ): Promise<{ message: string }> {
        return this.reviewsService.updateReview(
            +id,
            request.user.sub,
            request.body.text,
        );
    }
}
