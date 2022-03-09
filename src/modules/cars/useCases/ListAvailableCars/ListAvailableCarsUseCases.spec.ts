import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCases } from "./ListAvailableCarsUseCases";

let listAvailableCarsUseCases: ListAvailableCarsUseCases;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCases = new ListAvailableCarsUseCases(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 200,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Car brand",
            category_id: "Category ID"
        });

        const cars = await listAvailableCarsUseCases.execute({});
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 200,
            license_plate: "ABCD-1234",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "Category ID"
        });

        const cars = await listAvailableCarsUseCases.execute({
            brand: "Car_brand"
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 200,
            license_plate: "ABCD-1254",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "Category ID Test"
        });

        const cars = await listAvailableCarsUseCases.execute({
            category_id: "Category ID Test"
        });
        
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car description",
            daily_rate: 200,
            license_plate: "ABCD-12364",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "Category ID"
        });

        const cars = await listAvailableCarsUseCases.execute({
            name: "Car4",
        });
        
        expect(cars).toEqual([car]);
    });
});