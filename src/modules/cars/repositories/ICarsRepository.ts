import { ICreateCarDTO } from "../infra/dtos/IcreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: String): Promise<Car>;
}

export { ICarsRepository };