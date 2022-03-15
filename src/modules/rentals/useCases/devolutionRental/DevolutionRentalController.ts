import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCases } from "./DevolutionRentalUseCases";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const devolutionRentalUseCases = container.resolve(
            DevolutionRentalUseCases
        );

        const rental = await devolutionRentalUseCases.execute({
            id,
            user_id,
        });

        return response.status(200).json(rental);
    }
}

export { DevolutionRentalController };
