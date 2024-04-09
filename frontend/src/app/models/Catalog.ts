export type Catalog = {
    id: number;
    title: string;
    description: string[];
    images: string[];
    sizes: string[];
    colors: string[];
    cost: number;
    isFavorite: boolean;
    isCart: boolean;
    countProduct: number;
    gender: string;
    type: string;
    chapter: string;
    createdAt: Date;
    updatedAt: Date;
};

export type shortCatalog = {
    id: number;
    image: string;
    title: string;
    cost: number;
    status: string;
};
