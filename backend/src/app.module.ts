import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { UsersController } from "./users/users.controller";
import { CatalogsController } from "./catalogs/catalogs.controller";
import { CatalogsModule } from "./catalogs/catalogs.module";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PassportModule.register({
            session: true,
        }),
        CatalogsModule,
    ],
    controllers: [UsersController, CatalogsController],
})
export class AppModule {}
