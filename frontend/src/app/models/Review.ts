import { User } from "./User";

export interface IReview {
    average_rating: number;
    reviews: Review[];
}

export type Review = {
    id: number;
    user_id: number;
    userId?: User;
    catalog_id: number;
    text: string;
    rating: number;
    ratingStars?: number[];
    createdAt: Date;
    updatedAt: Date;
    image?: string;
};
