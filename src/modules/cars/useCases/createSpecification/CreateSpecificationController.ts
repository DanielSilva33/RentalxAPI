import { Request, Response } from "express";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCases";

class CreateSpecificationController {
    constructor(private createSpecificationUseCases: CreateSpecificationUseCases) { }
    handle(request: Request, response: Response) {
        const { name, description } = request.body;

        this.createSpecificationUseCases.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController };
