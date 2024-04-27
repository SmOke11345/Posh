import { User } from "./User";
import { Catalog } from "./Catalog";

export type Review = {
    id: number;
    user_id: number;
    userId?: User;
    catalog_id: number;
    catalogId?: Catalog;
    text: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    count?: number;
};
