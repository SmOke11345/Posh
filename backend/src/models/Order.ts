import { User } from "./User";

export type Order = {
    id: number;
    user_id: number;
    name: string;
    lastname: string;
    email: string;
    status_id?: number;
    tel: string;
    products: string;
    delivery: string;
    summary: number;
    createdAt?: Date;
    updatedAt: Date;
    statusId?: {
        name: string;
    };
    userId?: Omit<User, "password">;
};
