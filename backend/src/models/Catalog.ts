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
    createdAt: Date;
    updatedAt: Date;
};
