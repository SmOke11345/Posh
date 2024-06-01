import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";

@Controller("mail")
export class MailController {
    constructor(private readonly mailService: MailService) {}

    /**
     * Путь для отправки письма подписки.
     * @param email - введенная почта
     */
    @Post("subscribe")
    async subscribeToDiscount(@Body("email") email: string) {
        await this.mailService.subscribeToDiscount(email);
    }
}
