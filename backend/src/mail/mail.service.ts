import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    /**
     * Отправляет письмо о подписке на введенную почту.
     * @param email - введенная почта
     */
    async subscribeToDiscount(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: "Подписка на рассылку",
            template: "./subscribe",
            // Нужен для .hbs
            context: {
                name: "Пользователь",
                url: "https://posh-clothes.vercel.app/",
            },
        });
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
            message: "Письмо с ссылкой для восстановления пароля отправлено",
        };
    }
}
