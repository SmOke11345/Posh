import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "../utils/jwtConstants";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request); // Получаем токен

        if (!token) {
            throw new UnauthorizedException("Необходима авторизация");
        }

        try {
            // Для получения доступа в контроллере используя request.user
            request["user"] = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    /**
     * Получение токена из заголовка.
     * @param request
     * @private
     */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers["authorization"]?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }
}
