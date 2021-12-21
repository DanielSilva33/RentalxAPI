import { Request, Response } from "express";

import { ListCategoriesUseCases } from "./ListCategoriesUseCases";

class ListCategoriesController {
    constructor(private listCategoriesUseCases: ListCategoriesUseCases) {}
    handle(request: Request, response: Response): Response {
        const listAll = this.listCategoriesUseCases.execute();

        return response.status(200).json(listAll);
    }
}

export { ListCategoriesController };
