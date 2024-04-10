import { Catalog } from "./Catalog";

export type Favorite = {
    id: number;
    user_id: number;
    catalog_id: number;
    catalogId: Catalog;
};
