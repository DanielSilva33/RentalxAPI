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

        console.log(rental);
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });
});
