import { ForbiddenException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { PrismaService } from "../utils/prisma.service";

@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        private prismaService: PrismaService,
    ) {}

    /**
     * Отправляет письмо о подписке на введенную почту.
     * @param email_promo - полученная почта
     * @param user_id - id пользователя
     */
    async subscribeToDiscount(
        email_promo: string,
        user_id: number,
    ): Promise<{ message: string }> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: user_id,
            },
        });

        if (!user) throw new ForbiddenException("Пользователь не найден");

        const isExist = await this.prismaService.promo.findFirst({
            where: {
                OR: [{ email_promo }, { user_id }],
            },
        });

        if (isExist) throw new ForbiddenException("Вы уже состоите в клубе");

        await this.mailerService.sendMail({
            to: email_promo,
            subject: "Поздравляем вы вступили в сообщество POSH!",
            template: "./subscribe",
            // Нужен для .hbs
            context: {
                name: user.name,
                url: "https://posh-clothes.vercel.app/",
            },
        });

        await this.prismaService.promo.create({
            data: {
                email_promo,
                user_id,
            },
        });

        return {
            message: `Письмо отправлено на ${email_promo}`,
        };
    }

    /**
     * Отправка письма со ссылкой для восстановления пароля.
     * @param email - e-mail пользователя
     * @param token - Jwt токен для временной авторизации
     */
    async resetPassword(email: string, token: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Восстановление пароля",
            template: "./reset-password",
            // Нужен для .hbs
            context: {
                url: `https://posh-clothes.vercel.app/auth/reset-password?token=${token}`,
            },
        });

        return {
            message:
                "Письмо отправлено. Для восстановления пароля перейдите по ссылке указанной в письме.",
        };
    }
}
