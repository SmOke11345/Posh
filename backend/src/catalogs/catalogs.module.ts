import { Module } from "@nestjs/common";
import { CatalogsService } from "./catalogs.service";
import { CatalogsController } from "./catalogs.controller";
import { PrismaService } from "../utils/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers: [CatalogsController],
    providers: [CatalogsService, PrismaService, JwtService],
})
export class CatalogsModule {}
