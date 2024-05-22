import { IsOptional, IsString } from "@nestjs/class-validator";

export class FilterDto {
    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsOptional()
    chapter: string;

    @IsString()
    @IsOptional()
    type: string;

    @IsString()
    @IsOptional()
    sort: string;

    @IsString()
    @IsOptional()
    orderBy: string;

    @IsString()
    @IsOptional()
    colors: string;

    @IsString()
    @IsOptional()
    sizes: string;

    @IsString()
    @IsOptional()
    search: string;
}
