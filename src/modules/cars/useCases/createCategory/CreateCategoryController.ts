import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCases } from "./CreateCategoryUseCases";

class CreateCategoryController {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        const createCategoryUseCases = container.resolve(CreateCategoryUseCases);

        await createCategoryUseCases.execute({ name, description });


        return response.status(201).send();
    }
}

export { CreateCategoryController };
