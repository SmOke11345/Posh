import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaService } from "../utils/prisma.service";
import { jwtConstants } from "./utils/jwtConstants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { SessionSerializer } from "./utils/SessionSerializer";
import { UsersService } from "../users/users.service";

@Module({
    exports: [AuthService, PrismaService],
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: "7d",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        UsersService,
        AuthService,
        PrismaService,
        JwtStrategy,
        LocalStrategy,
        SessionSerializer,
    ],
})
export class AuthModule {}
