import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./users/users.controller";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PassportModule.register({
            session: true,
        }),
    ],
    controllers: [UsersController],
    providers: [],
})
export class AppModule {}
