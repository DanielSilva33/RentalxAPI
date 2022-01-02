import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCases } from "./CreateCategoryUseCases";

export default(): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();

    const createCategoryUseCases = new CreateCategoryUseCases(categoriesRepository);
    
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCases
    );

    return createCategoryController;
}
