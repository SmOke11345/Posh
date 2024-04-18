import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../utils/prisma.service";
import { User } from "../models/User";
import { Review } from "../models/Review";

@Injectable()
export class ReviewsService {
    constructor(private prismaService: PrismaService) {}

    /**
     * Получение отзывов пользователя.
     * @param user_id - id пользователя
     */
    async getUserReviews(user_id: number) {
        const reviews: Review[] = await this.prismaService.review.findMany({
            where: {
                user_id,
            },
            include: {
                userId: true,
                // catalogId: true,
            },
        });

        if (!reviews)
            throw new ForbiddenException("Вы еще не оставили ни одного отзыва");

        return reviews;
    }

    /**
     * Получение списка всех отзывов товара.
     * @param catalog_id - id товара
     */
    async getReviews(catalog_id: number) {
        const reviews: Review[] = await this.prismaService.review.findMany({
            where: {
                catalog_id,
            },
            include: {
                userId: true,
                // catalogId: true,
            },
        });

        if (!reviews.length)
            throw new ForbiddenException("Пока еще нет отзывов");

        const averageRating = reviews.reduce(
            (acc, review) => acc + review.rating / reviews.length,
            0,
        );

        return {
            average_rating: averageRating,
            reviews,
        };
    }

    /**
     * Добавление отзыва.
     * @param catalog_id - id товара
     * @param user_id - id пользователя
     * @param payload - данные отзыва
     */
    async createReview(
        catalog_id: number,
        user_id: number,
        payload: { text: string; rating: number } & User,
    ) {
        const prod = await this.prismaService.catalog.findFirst({
            where: {
                id: catalog_id,
            },
        });

        if (!prod) throw new ForbiddenException("Такого товара не существует");

        if (payload.text === undefined || payload.rating === undefined)
            throw new NotFoundException("Введите данные для отправки отзыва");

        // TODO: Проверить у разных пользователей
        const reviewExists = await this.prismaService.review.findFirst({
            where: {
                user_id,
                catalog_id,
            },
        });

        if (reviewExists)
            throw new ForbiddenException("Вы уже оставляли отзыв");

        const review: Review = await this.prismaService.review.create({
            data: {
                text: payload.text,
                rating: payload.rating,
                user_id,
                catalog_id,
            },
        });

        if (!review) throw new ForbiddenException("Не удалось оставить отзыв");

        return review;
    }

    /**
     * Удаление отзыва.
     * @param review_id - id отзыва
     * @param user_id - id пользователя
     */
    async deleteReview(review_id: number, user_id: number) {
        // const review: Review =
        await this.prismaService.review.delete({
            where: {
                id: review_id,
                user_id,
            },
        });

        // TODO: Добавить проверку на то есть или нет отзыва
        // if (!review === null)
        //     throw new ForbiddenException("Не удалось удалить отзыв");

        return {
            message: "Отзыв удален",
        };
    }

    /**
     * Изменение текста отзыва.
     * @param review_id - id отзыва
     * @param user_id - id пользователя
     * @param text - новый текст
     */
    async updateReview(review_id: number, user_id: number, text: string) {
        const review: Review = await this.prismaService.review.update({
            where: {
                id: review_id,
                user_id,
            },
            data: {
                text,
            },
        });

        if (!review) throw new ForbiddenException("Не удалось изменить отзыв");

        return {
            message: "Отзыв изменен",
        };
    }
}
