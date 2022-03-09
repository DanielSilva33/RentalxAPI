import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationUseCases } from "./CreateCarSpecificationUseCases";

class CreateCarSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationUseCases = container.resolve(CreateCarSpecificationUseCases);

        const cars = await createCarSpecificationUseCases.execute({
            car_id: id,
            specifications_id
        });

        return response.json(cars);
    }
}

export { CreateCarSpecificationsController };