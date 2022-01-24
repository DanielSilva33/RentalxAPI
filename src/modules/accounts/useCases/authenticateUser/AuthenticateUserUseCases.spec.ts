import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCases } from "../createUser/CreateUserUseCases";
import { AuthenticateUserUseCases } from "./AuthenticateUserUseCases";

let authenticateUserUseCases: AuthenticateUserUseCases;
let usersRepositoryInMemory: UsersRepositoryInMemory;0
let createUserUseCases: CreateUserUseCases;

describe("Authenticate User" , () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCases = new AuthenticateUserUseCases(usersRepositoryInMemory);
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to athenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "daniel@gmail.com",
            password: "1234",
            name: "User test"
        };

        await createUserUseCases.execute(user);

        const result = await authenticateUserUseCases.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCases.execute({
                email: "false@gamil.com",
                password: "123456"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000123",
                email: "user@gmail.com",
                password: "1234",
                name: "User test"
            };
    
            await createUserUseCases.execute(user);

            await authenticateUserUseCases.execute({
                email: user.email,
                password: "IncorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
