import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCases } from "./ResetPasswordUserUseCases";

class ResetPasswordUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;
        const resetPasswordUserUseCases = container.resolve(
            ResetPasswordUserUseCases
        );

        await resetPasswordUserUseCases.execute({
            token: String(token),
            password,
        });

        return response.send();
    }
}

export { ResetPasswordUserController };
