import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCases } from "./CreateUserUseCases";


class CreateUserController { 
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCases = container.resolve(CreateUserUseCases);

        await createUserUseCases.execute({
            name,
            email,
            password,
            driver_license
        });

        return response.status(201).send();
    }
}

export { CreateUserController };