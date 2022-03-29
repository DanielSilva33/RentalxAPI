import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPasswordMailUseCases } from "./SendForgotPasswordMailUseCases";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const sendForgotPasswordMailUseCases = container.resolve(
            SendForgotPasswordMailUseCases
        );

        await sendForgotPasswordMailUseCases.execute(email);

        return response.send();
    }
}

export { SendForgotPasswordMailController };
