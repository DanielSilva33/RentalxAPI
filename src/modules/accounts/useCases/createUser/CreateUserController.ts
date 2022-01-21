import { Request, Response } from "express";
import { container } from "tsyringe";
import emailValidator from "email-validator";
import { CreateUserUseCases } from "./CreateUserUseCases";


class CreateUserController { 
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body;

        const createUserUseCases = container.resolve(CreateUserUseCases);

        if (!emailValidator.validate(email)) {
            return response.status(400).json({message: "Email invalid"});
        }

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