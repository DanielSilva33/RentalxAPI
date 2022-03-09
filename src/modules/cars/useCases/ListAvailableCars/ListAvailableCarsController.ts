import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCases } from "./ListAvailableCarsUseCases";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsUseCases = container.resolve(ListAvailableCarsUseCases);

        const cars = await listAvailableCarsUseCases.execute({
            name: name as string,
            brand: brand as string,
            category_id: category_id as string
        });

        return response.json(cars);
    }
}

export { ListAvailableCarsController };