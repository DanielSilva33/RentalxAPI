import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCases } from "./ListRentalsByUserUseCases";

class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const listRentalsByUserUseCases = container.resolve(
            ListRentalsByUserUseCases
        );

        const rentals = await listRentalsByUserUseCases.execute(id);

        return response.json(rentals);
    }
}

export { ListRentalsByUserController };
