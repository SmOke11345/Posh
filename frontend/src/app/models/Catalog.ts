import { Review } from "./Review";

export interface ICatalog {
    id: number;
    title: string;
    description: {
        titles: string[];
        texts: string[];
    };
    images: string[];
    sizes: string[];
    colors: string[];
    cost: number;
    countProduct: number;
    status: string;
    type: string;
    chapter: string;
    gender: string;
    createdAt: Date;
    updatedAt: Date;
    review?: Review[];
}

export type shortCatalog = {
    id: number;
    image: string;
    title: string;
    cost: number;
    status: string;
    isFavorite?: boolean;
};
