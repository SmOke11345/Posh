import { User } from "./User";

export type Order = {
    id: number;
    name: string;
    lastname: string;
    email: string;
    user_id: number;
    status_id: number;
    tel: string;
    products: string;
    delivery: string;
    createdAt: Date;
    updatedAt: Date;
    statusId?: {
        name: string;
    };
    userId?: Omit<User, "password">;
};
