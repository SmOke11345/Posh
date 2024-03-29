export type User = {
    id: number;
    name: string;
    lastname: string;
    gender: number;
    email: string;
    password: string;
};

export type LoginResponse = {
    access_token: string;
    data: {
        passport: {
            user: User;
        };
    };
};
