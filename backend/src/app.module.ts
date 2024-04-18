import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { CartModule } from "./cart/cart.module";
import { CatalogsModule } from "./catalogs/catalogs.module";
import { FavoritesModule } from "./favorites/favorites.module";
import { PrismaService } from "./utils/prisma.service";
import { ReviewsModule } from "./reviews/reviews.module";

@Module({
    imports: [
        UsersModule,
        AuthModule,
        CartModule,
        CatalogsModule,
        PassportModule.register({
            session: true,
        }),
        FavoritesModule,
        ReviewsModule,
    ],
    providers: [PrismaService],
})
export class AppModule {}
