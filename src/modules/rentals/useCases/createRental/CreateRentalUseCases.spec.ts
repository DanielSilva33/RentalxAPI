import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCases } from "./CreateRentalUseCases";
import dayjs from "dayjs";
import { DayjsProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsProvider";

let createRentalUseCases: CreateRentalUseCases;
let rentlasRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentlasRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsProvider();
        createRentalUseCases = new CreateRentalUseCases(
            rentlasRepositoryInMemory,
            dayjsDateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCases.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCases.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCases.execute({
                user_id: "12345",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCases.execute({
                user_id: "123",
                car_id: "54321",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCases.execute({
                user_id: "321",
                car_id: "54321",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCases.execute({
                user_id: "123",
                car_id: "54321",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
