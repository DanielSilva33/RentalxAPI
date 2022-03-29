import { DayjsProvider } from "../../../../shared/container/providers/DateProvider/implementation/DayjsProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCases } from "./SendForgotPasswordMailUseCases";

let sendForgotPasswordMailUseCases: SendForgotPasswordMailUseCases;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        sendForgotPasswordMailUseCases = new SendForgotPasswordMailUseCases(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "5465AFG",
            email: "forgotPassword@gmail.com",
            name: "Forgot password",
            password: "555889665",
        });

        await sendForgotPasswordMailUseCases.execute(
            "forgotPassword@gmail.com"
        );

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCases.execute("teste@teste.com.br")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        usersRepositoryInMemory.create({
            driver_license: "7814KLE",
            email: "email@email.com.br",
            name: "Name",
            password: "555889665",
        });

        await sendForgotPasswordMailUseCases.execute("email@email.com.br");

        expect(generateTokenMail).toBeCalled();
    });
});
