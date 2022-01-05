import { Request, Response } from "express";

import { ListCategoriesUseCases } from "./ListCategoriesUseCases";

class ListCategoriesController {
    constructor(private listCategoriesUseCases: ListCategoriesUseCases) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const listAll = await this.listCategoriesUseCases.execute();

        return response.status(200).json(listAll);
    }
}

export { ListCategoriesController };
