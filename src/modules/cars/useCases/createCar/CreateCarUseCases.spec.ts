import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCases } from "./CreateCarUseCases";

let createCarUseCases: CreateCarUseCases;
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCases = new CreateCarUseCases(carsRepositoryInMemory);
    });

    it("Should be able to create a new car", async () => {
        await createCarUseCases.execute({
            name: "name", 
            description: "description", 
            daily_rate: 200, 
            license_plate: "abc123", 
            fine_amount: 60, 
            brand: "brand", 
            category_id: "Category"
        });
    });
});