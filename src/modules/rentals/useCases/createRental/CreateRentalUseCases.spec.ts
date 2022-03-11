import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCases } from "./CreateRentalUseCases";

let createRentalUseCases: CreateRentalUseCases;
let rentlasRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentlasRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCases = new CreateRentalUseCases(
            rentlasRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCases.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCases.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date(),
            });

            await createRentalUseCases.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCases.execute({
                user_id: "123",
                car_id: "54321",
                expected_return_date: new Date(),
            });

            await createRentalUseCases.execute({
                user_id: "321",
                car_id: "54321",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
