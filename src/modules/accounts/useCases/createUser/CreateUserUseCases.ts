import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCases {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}


    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            email,
            password,
            driver_license
        });
    }
}

export { CreateUserUseCases };