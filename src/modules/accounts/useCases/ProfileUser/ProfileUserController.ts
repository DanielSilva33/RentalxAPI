import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCases } from "./ProfileUserUseCases";

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const profileUserUseCases = container.resolve(ProfileUserUseCases);

        const user = await profileUserUseCases.execute(id);

        return response.json(user);
    }
}

export { ProfileUserController };
