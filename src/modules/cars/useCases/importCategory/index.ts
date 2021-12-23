import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCases } from "./ImportCategoryUseCases";


const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCases = new ImportCategoryUseCases(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCases);

export { importCategoryController };