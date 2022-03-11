import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCases } from "./CreateRentalUseCases";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;
        const createRentalUseCases = container.resolve(CreateRentalUseCases);

        const rental = await createRentalUseCases.execute({
            user_id: id,
            car_id,
            expected_return_date,
        });

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };
