import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { jwtConstants } from "./auth/utils/jwtConstants";

import * as passport from "passport";
import * as session from "express-session";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const globalPrefix = "api";

    app.setGlobalPrefix(globalPrefix);

    // гарантирует, что все конечные точки защищены от получения не верных данных
    // app.useGlobalPipes(new ValidationPipe());

    app.use(
        session({
            name: "NESTJS_SESSION_ID",
            secret: jwtConstants.secret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());

    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
    );
}

bootstrap();
