import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCases } from "./CreateSpecificationUseCases";


const specificationsRepository = new SpecificationsRepository();
const createSpecificationUsecases = new CreateSpecificationUseCases(specificationsRepository);
const createSpecificationController = new CreateSpecificationController(createSpecificationUsecases);

export { createSpecificationController };