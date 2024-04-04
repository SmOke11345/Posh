import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { CartModule } from "./cart/cart.module";
import { CatalogsModule } from "./catalogs/catalogs.module";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        CartModule,
        CatalogsModule,
        PassportModule.register({
            session: true,
        }),
    ],
})
export class AppModule {}
