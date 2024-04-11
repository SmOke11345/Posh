import { User } from "./User";

export type Review = {
    id: number;
    user_id: number;
    userId: User;
    catalog_id: number;
    text: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
};
