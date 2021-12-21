import { Request, Response } from "express";

import { CreateCategoryUseCases } from "./CreateCategoryUseCases";

class CreateCategoryController {
    constructor(private createCategoryUseCases: CreateCategoryUseCases) {}
    handle(request: Request, response: Response) {
        const { name, description } = request.body;

        this.createCategoryUseCases.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateCategoryController };
