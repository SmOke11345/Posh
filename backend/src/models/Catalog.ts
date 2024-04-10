export type Catalog = {
    id: number;
    title: string;
    description: string[];
    images: string[];
    sizes: string[];
    colors: string[];
    cost: number;
    countProduct: number;
    gender: string;
    type: string;
    status: string;
    chapter: string;
    createdAt: Date;
    updatedAt: Date;
};

export type shortCatalog = {
    id: number;
    title: string;
    image: string;
    cost: number;
    status: string;
};
