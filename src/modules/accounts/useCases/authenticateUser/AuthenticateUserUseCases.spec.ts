import { DayjsProvider } from "../../../../shared/container/providers/DateProvider/implementation/DayjsProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCases } from "../createUser/CreateUserUseCases";
import { AuthenticateUserUseCases } from "./AuthenticateUserUseCases";

let authenticateUserUseCases: AuthenticateUserUseCases;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsProvider;
let createUserUseCases: CreateUserUseCases;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsProvider();
        authenticateUserUseCases = new AuthenticateUserUseCases(
            usersRepositoryInMemory,
            userTokenRepositoryInMemory,
            dateProvider
        );
        createUserUseCases = new CreateUserUseCases(usersRepositoryInMemory);
    });

    it("Should be able to athenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "daniel@gmail.com",
            password: "1234",
            name: "User test",
        };

        await createUserUseCases.execute(user);

        const result = await authenticateUserUseCases.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an nonexistent user", async () => {
        await expect(
            authenticateUserUseCases.execute({
                email: "false@gamil.com",
                password: "123456",
            })
        ).rejects.toEqual(new AppError("Email or password incerrect!"));
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@gmail.com",
            password: "1234",
            name: "User test",
        };

        await createUserUseCases.execute(user);

        await expect(
            authenticateUserUseCases.execute({
                email: user.email,
                password: "IncorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incerrect!"));
    });
});
