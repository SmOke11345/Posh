import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { MailService } from "./mail.service";
import { JwtAuthGuard } from "../auth/guard/auth.guard";

@Controller("mail")
export class MailController {
    constructor(private readonly mailService: MailService) {}

    /**
     * Путь для отправки письма подписки.
     * @param email - введенная почта
     * @param request
     */
    @UseGuards(JwtAuthGuard)
    @Post("subscribe")
    async subscribeToDiscount(
        @Body("email") email: string,
        @Request() request: any,
    ): Promise<{ message: string }> {
        return await this.mailService.subscribeToDiscount(
            email,
            request.user.sub,
        );
    }
}
