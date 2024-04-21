import { Catalog } from "./Catalog";

export type Cart = {
    id: number;
    user_id: number;
    catalog_id: number;
    size: string;
    color: string;
    chapterAndType: string;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    catalogId?: Catalog;
};
