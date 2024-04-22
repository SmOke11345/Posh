export type Order = {
    id: number;
    user_id: number;
    name: string;
    lastname: string;
    email: string;
    address: string;
    tel: string;
    status: string;
    products: OrderProduct[];
    delivery: string;
    summary: number;
    date: string;
    updatedAt: Date;
};

export type OrderProduct = {
    id: number;
    title: string;
    image: string;
    color: string;
    size: string;
    chapterAndType: string;
    count: number;
};
