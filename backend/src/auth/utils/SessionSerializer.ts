import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "../../users/users.service";
import { User } from "../../models/User";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    /**
     * Преобразование полученных данных в формат JSON.
     * @param user
     * @param done
     */
    serializeUser(user: User, done: (err: Error, user: any) => void) {
        done(null, user);
    }

    /**
     * Преобразование в исходный формат, который был до сериализация.
     * @param user
     * @param done
     */
    async deserializeUser(user: User, done: (err: Error, user: any) => void) {
        const user_DB = await this.usersService.getUserById(user.id);
        return user_DB ? done(null, user_DB) : done(null, null);
    }
}
