import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "../utils/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";

@Module({
    exports: [UsersService, PrismaService, JwtService],
    providers: [UsersService, PrismaService, JwtService, AuthService],
})
export class UsersModule {}
