import { ICreateCarDTO } from "../infra/dtos/IcreateCarDTO";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<void>;
}

export { ICarsRepository };