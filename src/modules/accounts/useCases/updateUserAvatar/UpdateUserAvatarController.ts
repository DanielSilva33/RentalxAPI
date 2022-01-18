import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCases } from "./UpdateUserAvatarUseCases";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const avatar_file = request.file.filename;

        const updateUserAvatarUseCases = container.resolve(UpdateUserAvatarUseCases);

        await updateUserAvatarUseCases.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };