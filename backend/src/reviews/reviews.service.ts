import { ForbiddenException, Injectable } from "@nestjs/common";
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
                catalogId: true,
            },
        });

        if (!reviews)
            throw new ForbiddenException("Вы еще не оставили ни одного отзыва");

        return reviews.map((review) => {
            const { catalogId, ...rest } = review;
            const image = catalogId.images[0];
            const id = catalogId.id;
            const { password, ...userId } = review.userId;

            return {
                ...rest,
                userId,
                image,
                catalog_id: id,
            };
        });
    }

    /**
     * Получение списка всех отзывов товара.
     * @param catalog_id - id товара
     */
    async getReviews(
        catalog_id: number,
    ): Promise<{ average_rating: number; reviews: Review[] }> {
        const reviews: Review[] = await this.prismaService.review.findMany({
            where: {
                catalog_id,
            },
            include: {
                userId: true,
            },
        });

        if (!reviews.length)
            throw new ForbiddenException("Пока еще нет отзывов");

        const averageRating: number = reviews.reduce(
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
        const findReview = await this.prismaService.catalog.findFirst({
            where: {
                id: catalog_id,
            },
        });

        if (!findReview)
            throw new ForbiddenException("Такого товара не существует");

        if (payload.text.trim() === "")
            throw new ForbiddenException("Текст отзыва не может быть пустым");

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

        await this.prismaService.catalog.update({
            where: {
                id: catalog_id,
            },
            data: {
                rating: {
                    increment: payload.rating,
                },
            },
        });

        return review;
    }

    /**
     * Удаление отзыва.
     * @param review_id - id отзыва
     * @param user_id - id пользователя
     */
    async deleteReview(
        review_id: number,
        user_id: number,
    ): Promise<{ message: string }> {
        const findReview = await this.prismaService.review.findFirst({
            where: {
                id: review_id,
            },
            include: {
                catalogId: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!findReview)
            throw new ForbiddenException("Такого отзыва не существует");

        const {
            rating,
            catalogId: { id },
        } = findReview;

        await this.prismaService.catalog.update({
            where: {
                id,
            },
            data: {
                rating: {
                    decrement: rating,
                },
            },
        });

        await this.prismaService.review.delete({
            where: {
                id: review_id,
                user_id,
            },
        });

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
    async updateReview(
        review_id: number,
        user_id: number,
        text: string,
    ): Promise<{ message: string }> {
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
