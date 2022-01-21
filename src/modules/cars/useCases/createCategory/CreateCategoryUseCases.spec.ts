import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCases } from "./CreateCategoryUseCases";

let createCategoryUseCases: CreateCategoryUseCases;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCases = new CreateCategoryUseCases(categoriesRepositoryInMemory);
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }

        await createCategoryUseCases.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with name exists", async () => {

        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description test"
            }
    
            await createCategoryUseCases.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCases.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});