import { AppError } from "../../../../shared/errors/AppError";
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
        const car = await createCarUseCases.execute({
            name: "name", 
            description: "description", 
            daily_rate: 200, 
            license_plate: "abc123", 
            fine_amount: 60, 
            brand: "brand", 
            category_id: "Category"
        });

        expect(car).toHaveProperty("id");
    });

    it("Should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCases.execute({
                name: "Car1", 
                description: "description", 
                daily_rate: 200, 
                license_plate: "abc123", 
                fine_amount: 60, 
                brand: "brand", 
                category_id: "Category"
            });

            await createCarUseCases.execute({
                name: "Car2", 
                description: "description", 
                daily_rate: 200, 
                license_plate: "abc123", 
                fine_amount: 60, 
                brand: "brand", 
                category_id: "Category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCases.execute({
                name: "Car available", 
                description: "description", 
                daily_rate: 200, 
                license_plate: "abc-123", 
                fine_amount: 60, 
                brand: "brand", 
                category_id: "Category"
            });
            expect(car.available).toBe(true);
        });
    });