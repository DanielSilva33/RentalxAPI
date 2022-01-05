import { Request, Response } from "express";

import { CreateCategoryUseCases } from "./CreateCategoryUseCases";

class CreateCategoryController {
    constructor(private createCategoryUseCases: CreateCategoryUseCases) { }
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        await this.createCategoryUseCases.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
