import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationUseCases } from "./CreateCarSpecificationUseCases";

let createCarSpecificationUseCases: CreateCarSpecificationUseCases;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCases = new CreateCarSpecificationUseCases(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("Should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "123";
        const specifications_id = ["54321"];

        expect(
            createCarSpecificationUseCases.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });

    it("Should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car available",
            description: "description",
            daily_rate: 200,
            license_plate: "abc-123",
            fine_amount: 60,
            brand: "brand",
            category_id: "Category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: "Test",
            description: "Test description",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCases.execute(
            {
                car_id: car.id,
                specifications_id,
            }
        );

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });
});
