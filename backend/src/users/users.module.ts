import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "../utils/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { UsersController } from "./users.controller";
import { MailService } from "../mail/mail.service";

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        PrismaService,
        JwtService,
        AuthService,
        MailService,
    ],
})
export class UsersModule {}
