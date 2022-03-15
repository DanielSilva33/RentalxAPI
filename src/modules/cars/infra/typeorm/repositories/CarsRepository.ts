import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { ICreateCarDTO } from "../../dtos/IcreateCarDTO";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications,
            id,
        });

        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });
        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("cars")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("cars.category_id = :category_id", {
                category_id,
            });
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);

        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id")
            .setParameters({ id })
            .execute();
    }
}

export { CarsRepository };
