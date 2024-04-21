import { Controller, Patch, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";
import { User } from "../models/User";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Patch("profile")
    async patchUserData(@Request() request: any): Promise<User> {
        return this.usersService.patchUserData(request.user.sub, request.body);
    }
}
