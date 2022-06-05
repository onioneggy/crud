import { UserRepository } from ".";
import { UserController } from "../controller";
import { User } from "../model";
import { SequelizeUser } from "../sequelize/userModel";

export class SequelizeUserRepository implements UserRepository {
    async addUser(user: User): Promise<void> {
        await SequelizeUser.create({username: user.username, password: user.password})
    }
    async findUser(name: string): Promise<User | undefined> {
        const SeqUser = await SequelizeUser.findOne({raw: true, where: {username: name}, attributes: ['username', 'password']})
        return SeqUser as User
    }
    
}