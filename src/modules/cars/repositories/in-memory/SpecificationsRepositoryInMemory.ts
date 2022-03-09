import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

    specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign({
            name,
            description,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name);
    }

    async findById(id: string[]): Promise<Specification[]> {
        const allSpecifications =  this.specifications.filter((specification) => id.includes(specification.id));

        return allSpecifications;
    }
}

export { SpecificationsRepositoryInMemory };